import prisma from "./prisma";
import {
  getMoloniProducts,
  getMoloniCategories,
  getMoloniProductCount,
  isMoloniConfigured,
} from "./moloni";
import { getErrorMessage } from "./errors";
import { slugify } from "./utils";

export async function syncCategories(): Promise<{ synced: number; errors: string[] }> {
  if (!isMoloniConfigured()) {
    return { synced: 0, errors: ["Moloni not configured"] };
  }

  const errors: string[] = [];
  let synced = 0;

  try {
    const moloniCategories = await getMoloniCategories();

    for (const mc of moloniCategories) {
      try {
        await prisma.category.upsert({
          where: { moloniId: mc.category_id },
          update: {
            translations: {
              upsert: {
                where: {
                  categoryId_locale: {
                    categoryId: (await prisma.category.findUnique({ where: { moloniId: mc.category_id } }))?.id || "",
                    locale: "pt",
                  },
                },
                update: { name: mc.name, description: mc.description || null },
                create: { locale: "pt", name: mc.name, description: mc.description || null },
              },
            },
          },
          create: {
            slug: slugify(mc.name),
            moloniId: mc.category_id,
            translations: {
              create: {
                locale: "pt",
                name: mc.name,
                description: mc.description || null,
              },
            },
          },
        });
        synced++;
      } catch (err) {
        errors.push(`Category ${mc.category_id}: ${getErrorMessage(err)}`);
      }
    }
  } catch (err) {
    errors.push(`Fetch categories: ${getErrorMessage(err)}`);
  }

  await prisma.moloniSyncLog.create({
    data: {
      type: "categories",
      status: errors.length > 0 ? "error" : "success",
      message: errors.length > 0 ? errors.join("; ") : null,
      itemCount: synced,
    },
  });

  return { synced, errors };
}

export async function syncProducts(): Promise<{ synced: number; errors: string[] }> {
  if (!isMoloniConfigured()) {
    return { synced: 0, errors: ["Moloni not configured"] };
  }

  const errors: string[] = [];
  let synced = 0;

  try {
    const totalCount = await getMoloniProductCount();
    const batchSize = 50;
    let offset = 0;

    while (offset < totalCount) {
      const moloniProducts = await getMoloniProducts(offset, batchSize);

      for (const mp of moloniProducts) {
        try {
          // Find the local category by moloniId
          const localCategory = mp.category_id
            ? await prisma.category.findUnique({ where: { moloniId: mp.category_id } })
            : null;

          // If no matching category, use the first available
          const fallbackCategory = localCategory || await prisma.category.findFirst();
          if (!fallbackCategory) {
            errors.push(`Product ${mp.product_id}: No category available`);
            continue;
          }

          const existingProduct = await prisma.product.findUnique({
            where: { moloniId: mp.product_id },
          });

          if (existingProduct) {
            // Update existing
            await prisma.product.update({
              where: { moloniId: mp.product_id },
              data: {
                price: mp.price,
                stock: Math.max(0, Math.round(mp.stock)),
                hasStock: mp.has_stock === 1,
                categoryId: fallbackCategory.id,
                moloniSyncedAt: new Date(),
              },
            });

            // Update PT translation
            await prisma.productTranslation.upsert({
              where: {
                productId_locale: {
                  productId: existingProduct.id,
                  locale: "pt",
                },
              },
              update: {
                name: mp.name,
                description: mp.description || null,
              },
              create: {
                productId: existingProduct.id,
                locale: "pt",
                name: mp.name,
                description: mp.description || null,
              },
            });
          } else {
            // Create new
            const slug = slugify(mp.name) || `product-${mp.product_id}`;
            // Ensure unique slug
            const existing = await prisma.product.findUnique({ where: { slug } });
            const finalSlug = existing ? `${slug}-${mp.product_id}` : slug;

            await prisma.product.create({
              data: {
                slug: finalSlug,
                price: mp.price,
                stock: Math.max(0, Math.round(mp.stock)),
                hasStock: mp.has_stock === 1,
                moloniId: mp.product_id,
                categoryId: fallbackCategory.id,
                moloniSyncedAt: new Date(),
                active: true,
                translations: {
                  create: {
                    locale: "pt",
                    name: mp.name,
                    description: mp.description || null,
                  },
                },
              },
            });

            // If Moloni has an image URL, create a ProductImage
            if (mp.image) {
              const product = await prisma.product.findUnique({ where: { moloniId: mp.product_id } });
              if (product) {
                await prisma.productImage.create({
                  data: {
                    productId: product.id,
                    cloudinaryPublicId: `moloni-${mp.product_id}`,
                    url: mp.image,
                    isPrimary: true,
                  },
                });
              }
            }
          }

          synced++;
        } catch (err) {
          errors.push(`Product ${mp.product_id}: ${getErrorMessage(err)}`);
        }
      }

      offset += batchSize;
    }
  } catch (err) {
    errors.push(`Fetch products: ${getErrorMessage(err)}`);
  }

  await prisma.moloniSyncLog.create({
    data: {
      type: "products",
      status: errors.length > 0 ? "error" : "success",
      message: errors.length > 0 ? errors.join("; ") : null,
      itemCount: synced,
    },
  });

  return { synced, errors };
}

export async function syncAll(): Promise<{
  categories: { synced: number; errors: string[] };
  products: { synced: number; errors: string[] };
}> {
  const categories = await syncCategories();
  const products = await syncProducts();
  return { categories, products };
}

export async function getLastSyncLog() {
  return prisma.moloniSyncLog.findFirst({
    orderBy: { createdAt: "desc" },
  });
}

export async function getSyncLogs(limit = 20) {
  return prisma.moloniSyncLog.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}
