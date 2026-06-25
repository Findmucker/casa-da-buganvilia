import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const categoryData = [
  {
    slug: "vestuario",
    sortOrder: 1,
    pt: ["Moda", "Peças de vestuário e acessórios selecionados pela Casa da Buganvília"],
    en: ["Fashion", "Clothing and accessories selected by Casa da Buganvília"],
  },
  {
    slug: "louca-mesa",
    sortOrder: 2,
    pt: ["Cerâmica & Mesa", "Cerâmica decorativa, jarros, pratos e peças para a casa"],
    en: ["Ceramics & Tableware", "Decorative ceramics, pitchers, plates and home pieces"],
  },
  {
    slug: "joalharia",
    sortOrder: 3,
    pt: ["Joalharia & Acessórios", "Joalharia colorida, carteiras e acessórios artesanais"],
    en: ["Jewellery & Accessories", "Colourful jewellery, wallets and artisan accessories"],
  },
  {
    slug: "gastronomia",
    sortOrder: 4,
    pt: ["Sabores & Tapas", "Produtos regionais, conservas, compotas, queijos, enchidos e tapas"],
    en: ["Flavours & Tapas", "Regional products, preserves, jams, cheeses, charcuterie and tapas"],
  },
  {
    slug: "sabonetes-cremes",
    sortOrder: 5,
    pt: ["Aromas & Casa", "Velas aromáticas, fragrâncias e detalhes para a casa"],
    en: ["Fragrance & Home", "Scented candles, fragrances and details for the home"],
  },
  {
    slug: "vinhos",
    sortOrder: 6,
    pt: ["Vinhos & Licores", "Vinhos portugueses, ginja e licores regionais"],
    en: ["Wines & Liqueurs", "Portuguese wines, sour cherry liqueur and regional spirits"],
  },
] as const;

const catalogProducts = [
  {
    slug: "colecao-moda-artesanal",
    category: "vestuario",
    featured: true,
    image: "moda-artesanal.jpg",
    source: "DO_rVmDDBME",
    pt: [
      "Coleção de Moda Artesanal",
      "Seleção de vestuário e acessórios com texturas, bordados e detalhes de inspiração artesanal. Os modelos disponíveis variam ao longo da estação.",
      "Vestuário e acessórios selecionados",
    ],
    en: [
      "Artisan Fashion Collection",
      "A selection of clothing and accessories featuring textures, embroidery and artisan-inspired details. Available styles change throughout the season.",
      "Selected clothing and accessories",
    ],
  },
  {
    slug: "joalharia-floral-colorida",
    category: "joalharia",
    featured: true,
    image: "joalharia-colorida.jpg",
    source: "DO_rVmDDBME",
    pt: [
      "Joalharia Floral Colorida",
      "Conjuntos de colares e brincos com flores e apontamentos de cor, apresentados numa variedade de tons e desenhos.",
      "Colares e brincos com motivos florais",
    ],
    en: [
      "Colourful Floral Jewellery",
      "Necklace and earring sets with floral motifs and colourful details, available in a range of tones and designs.",
      "Floral necklace and earring sets",
    ],
  },
  {
    slug: "acessorios-carteiras-artesanais",
    category: "joalharia",
    featured: false,
    image: "acessorios-artesanais.jpg",
    source: "DO_rVmDDBME",
    pt: [
      "Acessórios & Carteiras Artesanais",
      "Brincos, pulseiras, colares e pequenas carteiras em diferentes materiais, cores e acabamentos.",
      "Acessórios e carteiras em vários estilos",
    ],
    en: [
      "Artisan Accessories & Wallets",
      "Earrings, bracelets, necklaces and small wallets in a variety of materials, colours and finishes.",
      "Accessories and wallets in varied styles",
    ],
  },
  {
    slug: "velas-aromaticas",
    category: "sabonetes-cremes",
    featured: false,
    image: "velas-aromaticas.jpg",
    source: "DO_rVmDDBME",
    pt: [
      "Velas Aromáticas",
      "Velas perfumadas em copo, com fragrâncias e embalagens decorativas para criar um ambiente acolhedor em casa.",
      "Velas perfumadas e decorativas",
    ],
    en: [
      "Scented Candles",
      "Scented candles in glass vessels, with decorative fragrances and packaging for a warm atmosphere at home.",
      "Decorative scented candles",
    ],
  },
  {
    slug: "compotas-pates-portugueses",
    category: "gastronomia",
    featured: true,
    image: "compotas-pates.jpg",
    source: "DQFBnurDENp",
    pt: [
      "Compotas & Patés Portugueses",
      "Seleção de compotas artesanais, patés de caça e outros sabores portugueses para levar ou partilhar.",
      "Compotas, patés e sabores regionais",
    ],
    en: [
      "Portuguese Jams & Pâtés",
      "A selection of artisan jams, game pâtés and other Portuguese flavours to take home or share.",
      "Jams, pâtés and regional flavours",
    ],
  },
  {
    slug: "selecao-vinhos-portugueses",
    category: "vinhos",
    featured: true,
    image: "vinhos-portugueses.jpg",
    source: "DQFBnurDENp",
    pt: [
      "Seleção de Vinhos Portugueses",
      "Gama rotativa de vinhos portugueses de diferentes regiões, incluindo referências do Dão, Douro e Beira Interior.",
      "Vinhos portugueses de várias regiões",
    ],
    en: [
      "Portuguese Wine Selection",
      "A rotating range of Portuguese wines from different regions, including labels from Dão, Douro and Beira Interior.",
      "Portuguese wines from several regions",
    ],
  },
  {
    slug: "ginja-licores-regionais",
    category: "vinhos",
    featured: true,
    image: "ginja-licores.jpg",
    source: "DQFBnurDENp",
    pt: [
      "Ginja & Licores Regionais",
      "Ginja e outros licores portugueses, acompanhados por uma seleção de produtos gourmet e lembranças regionais.",
      "Ginja e licores portugueses",
    ],
    en: [
      "Sour Cherry & Regional Liqueurs",
      "Óbidos sour cherry liqueur and other Portuguese spirits, alongside selected gourmet products and regional gifts.",
      "Portuguese sour cherry and liqueurs",
    ],
  },
  {
    slug: "tabua-queijos-enchidos-vinho",
    category: "gastronomia",
    featured: true,
    image: "tabua-queijos-enchidos.jpg",
    source: "DSKXrIwjFpe",
    pt: [
      "Tábua de Queijos, Enchidos & Vinho",
      "Tábua para partilhar com queijos portugueses, enchidos, pão e vinho tinto. A composição pode variar conforme a seleção do dia.",
      "Queijos, enchidos, pão e vinho",
    ],
    en: [
      "Cheese, Charcuterie & Wine Board",
      "A sharing board with Portuguese cheeses, charcuterie, bread and red wine. Contents may vary with the daily selection.",
      "Cheese, charcuterie, bread and wine",
    ],
  },
  {
    slug: "bacalhau-azeitonas-vinho",
    category: "gastronomia",
    featured: false,
    image: "bacalhau-azeitonas.jpg",
    source: "DSKXrIwjFpe",
    pt: [
      "Bacalhau, Azeitonas & Vinho",
      "Petisco português com lascas de bacalhau, azeitonas recheadas, pão torrado e vinho branco.",
      "Bacalhau, azeitonas e vinho branco",
    ],
    en: [
      "Codfish, Olives & Wine",
      "A Portuguese snack with flaked codfish, stuffed olives, toasted bread and white wine.",
      "Codfish, olives and white wine",
    ],
  },
  {
    slug: "petiscos-portugueses",
    category: "gastronomia",
    featured: false,
    image: "petiscos-portugueses.jpg",
    source: "DSKXrIwjFpe",
    pt: [
      "Petiscos Portugueses",
      "Seleção para petiscar com queijo, azeitonas, conservas e pão, pensada para acompanhar um copo de vinho.",
      "Queijo, azeitonas, conservas e pão",
    ],
    en: [
      "Portuguese Tapas Selection",
      "A snack selection with cheese, olives, preserves and bread, designed to accompany a glass of wine.",
      "Cheese, olives, preserves and bread",
    ],
  },
  {
    slug: "colecao-ceramica-floral",
    category: "louca-mesa",
    featured: true,
    image: "ceramica-floral.jpg",
    source: "DY0AIhtDGj6",
    pt: [
      "Coleção de Cerâmica Floral",
      "Jarros, vasos, canecas e pratos em cerâmica com riscas azuis e motivos florais pintados à mão.",
      "Cerâmica azul com motivos florais",
    ],
    en: [
      "Floral Ceramic Collection",
      "Ceramic pitchers, vases, mugs and plates with blue stripes and hand-painted floral motifs.",
      "Blue ceramics with floral motifs",
    ],
  },
  {
    slug: "jarro-pratos-ceramica",
    category: "louca-mesa",
    featured: false,
    image: "jarro-pratos-ceramica.jpg",
    source: "DY0AIhtDGj6",
    pt: [
      "Jarro Floral & Pratos de Cerâmica",
      "Jarro decorativo com flores de cerâmica e conjunto de pratos com motivos florais, peixes e riscas azuis.",
      "Jarro floral e pratos decorativos",
    ],
    en: [
      "Floral Pitcher & Ceramic Plates",
      "A decorative pitcher with ceramic flowers and plates featuring floral, fish and blue stripe motifs.",
      "Floral pitcher and decorative plates",
    ],
  },
] as const;

const legacyProductSlugs = [
  "vestido-linho-azul",
  "camisa-bordada-flores",
  "lenco-seda-obidos",
  "casaco-la-artesanal",
  "prato-ceramica-azulejo",
  "caneca-terracota-rustica",
  "travessa-ceramica-oval",
  "brincos-filigrana-prata",
  "colar-cortica-natural",
  "pulseira-azulejo-ceramica",
  "caixa-queijos-artesanais",
  "compota-ginja-obidos",
  "azeite-extra-virgem-premium",
  "sabonete-lavanda-artesanal",
  "creme-maos-rosa-mosqueta",
  "conjunto-sabonetes-flores",
];

function productTranslations(
  pt: readonly [string, string, string],
  en: readonly [string, string, string],
) {
  return [
    {
      locale: "pt",
      name: pt[0],
      description: pt[1],
      shortDescription: pt[2],
    },
    {
      locale: "en",
      name: en[0],
      description: en[1],
      shortDescription: en[2],
    },
  ];
}

async function seedAdmin() {
  const passwordHash = await hash("admin123", 12);
  await prisma.adminUser.upsert({
    where: { email: "admin@casadabuganvilia.pt" },
    update: {},
    create: {
      email: "admin@casadabuganvilia.pt",
      passwordHash,
      name: "Admin",
    },
  });
}

async function seedCategories() {
  const categoryIds: Record<string, string> = {};

  for (const category of categoryData) {
    const saved = await prisma.category.upsert({
      where: { slug: category.slug },
      update: { active: true, sortOrder: category.sortOrder },
      create: {
        slug: category.slug,
        active: true,
        sortOrder: category.sortOrder,
      },
    });

    for (const [locale, values] of [
      ["pt", category.pt],
      ["en", category.en],
    ] as const) {
      await prisma.categoryTranslation.upsert({
        where: {
          categoryId_locale: {
            categoryId: saved.id,
            locale,
          },
        },
        update: {
          name: values[0],
          description: values[1],
        },
        create: {
          categoryId: saved.id,
          locale,
          name: values[0],
          description: values[1],
        },
      });
    }

    categoryIds[category.slug] = saved.id;
  }

  return categoryIds;
}

async function seedSettings() {
  const settings = [
    { key: "whatsapp_number", value: "+351910341182" },
    {
      key: "instagram_url",
      value: "https://www.instagram.com/casadabuganviliaobidos/",
    },
    {
      key: "facebook_url",
      value: "https://www.facebook.com/casadabuganviliaobidos/",
    },
    {
      key: "address",
      value: "Tv. de Baltazar Gomes Figueira S/N, 2510-001 Óbidos",
    },
    { key: "opening_hours", value: "10:00 - 19:00" },
    { key: "working_days", value: "Todos os dias" },
    { key: "email", value: "info@casadabuganvilia.pt" },
    {
      key: "home_visit_description",
      value:
        "Estamos no coração de Óbidos, numa casa antiga transformada num espaço único de compras e cultura.",
    },
    {
      key: "about_story_text",
      value:
        "A Casa da Buganvília é uma casa antiga no coração de Óbidos, transformada num espaço único onde cada sala oferece uma experiência diferente. Com decoração vintage, os próprios produtos decoram o espaço, criando um ambiente acolhedor e autêntico.",
    },
    {
      key: "about_music_note",
      value: "Música sempre presente, criando uma atmosfera única.",
    },
  ];

  for (const setting of settings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
}

async function removeLegacyCatalog() {
  const legacyProducts = await prisma.product.findMany({
    where: { slug: { in: legacyProductSlugs } },
    select: { id: true },
  });
  const ids = legacyProducts.map((product) => product.id);

  if (ids.length === 0) return;

  await prisma.$transaction([
    prisma.productImage.deleteMany({ where: { productId: { in: ids } } }),
    prisma.productTranslation.deleteMany({
      where: { productId: { in: ids } },
    }),
    prisma.product.deleteMany({ where: { id: { in: ids } } }),
  ]);
}

async function seedCatalog(categoryIds: Record<string, string>) {
  for (const [index, product] of catalogProducts.entries()) {
    const translations = productTranslations(product.pt, product.en);
    const image = {
      cloudinaryPublicId: `official-instagram/${product.source}/${product.slug}`,
      url: `/products/${product.image}`,
      alt: product.pt[0],
      sortOrder: 0,
      isPrimary: true,
    };
    const shared = {
      price: 0,
      categoryId: categoryIds[product.category],
      featured: product.featured,
      sortOrder: (index + 1) * 10,
      stock: 0,
      hasStock: false,
      active: true,
    };

    await prisma.product.upsert({
      where: { slug: product.slug },
      create: {
        slug: product.slug,
        ...shared,
        translations: { create: translations },
        images: { create: image },
      },
      update: {
        ...shared,
        translations: {
          deleteMany: {},
          create: translations,
        },
        images: {
          deleteMany: {},
          create: image,
        },
      },
    });
  }
}

async function seedDemoGallery() {
  const artists = [
    {
      slug: "maria-santos",
      namePt: "Maria Santos",
      nameEn: "Maria Santos",
      bioPt:
        "Pintora natural de Óbidos, explora a luz e as cores da vila medieval.",
      bioEn:
        "Painter from Óbidos exploring the light and colours of the medieval village.",
      photo: "https://picsum.photos/seed/artist1/200/200",
      artworks: [
        ["por-do-sol-obidos", "Pôr do Sol em Óbidos", "Sunset in Óbidos", 601],
        [
          "buganvilias-rua-direita",
          "Buganvílias da Rua Direita",
          "Bougainvilleas of Rua Direita",
          602,
        ],
        ["castelo-nevoeiro", "Castelo no Nevoeiro", "Castle in the Fog", 603],
      ],
    },
    {
      slug: "joao-ferreira",
      namePt: "João Ferreira",
      nameEn: "João Ferreira",
      bioPt: "Escultor contemporâneo que trabalha com cerâmica.",
      bioEn: "Contemporary sculptor working with ceramics.",
      photo: "https://picsum.photos/seed/artist2/200/200",
      artworks: [
        ["forma-organica-i", "Forma Orgânica I", "Organic Form I", 604],
        [
          "memoria-fragmentada",
          "Memória Fragmentada",
          "Fragmented Memory",
          605,
        ],
      ],
    },
  ] as const;

  for (const artistData of artists) {
    const existing = await prisma.artist.findUnique({
      where: { slug: artistData.slug },
    });
    if (existing) continue;

    const artist = await prisma.artist.create({
      data: {
        slug: artistData.slug,
        photoUrl: artistData.photo,
        active: true,
        translations: {
          create: [
            {
              locale: "pt",
              name: artistData.namePt,
              bio: artistData.bioPt,
            },
            {
              locale: "en",
              name: artistData.nameEn,
              bio: artistData.bioEn,
            },
          ],
        },
      },
    });

    for (const [slug, titlePt, titleEn, seed] of artistData.artworks) {
      await prisma.artwork.create({
        data: {
          slug,
          artistId: artist.id,
          medium: "Técnica mista",
          active: true,
          translations: {
            create: [
              { locale: "pt", title: titlePt },
              { locale: "en", title: titleEn },
            ],
          },
          images: {
            create: {
              cloudinaryPublicId: `mock/${slug}`,
              url: `https://picsum.photos/seed/${seed}/800/800`,
              alt: titlePt,
              sortOrder: 0,
            },
          },
        },
      });
    }
  }
}

async function main() {
  await seedAdmin();
  const categoryIds = await seedCategories();
  await seedSettings();
  await removeLegacyCatalog();
  await seedCatalog(categoryIds);
  await seedDemoGallery();

  console.log("✅ Seed completed successfully");
  console.log("   - Admin user: admin@casadabuganvilia.pt / admin123");
  console.log(`   - ${categoryData.length} catalog categories`);
  console.log(`   - ${catalogProducts.length} verified catalog offerings`);
  console.log("   - 2 demo artists with 5 artworks");
  console.log("   - 10 site settings");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
