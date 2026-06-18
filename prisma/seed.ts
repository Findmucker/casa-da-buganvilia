import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Seed admin user
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

  // Seed categories
  const categoriesData = [
    {
      slug: "vestuario",
      translations: [
        { locale: "pt", name: "Vestuário", description: "Roupa elegante e sofisticada" },
        { locale: "en", name: "Clothing", description: "Elegant and sophisticated clothing" },
      ],
    },
    {
      slug: "louca-mesa",
      translations: [
        { locale: "pt", name: "Louça & Mesa", description: "Louça artesanal e peças únicas" },
        { locale: "en", name: "Tableware", description: "Handmade crockery and unique pieces" },
      ],
    },
    {
      slug: "joalharia",
      translations: [
        { locale: "pt", name: "Joalharia", description: "Joias únicas e exclusivas" },
        { locale: "en", name: "Jewellery", description: "Unique and exclusive jewellery" },
      ],
    },
    {
      slug: "gastronomia",
      translations: [
        { locale: "pt", name: "Gastronomia", description: "Produtos gourmet, enchidos, queijos e tapas" },
        { locale: "en", name: "Food & Tapas", description: "Gourmet products, cured meats, cheese and tapas" },
      ],
    },
    {
      slug: "sabonetes-cremes",
      translations: [
        { locale: "pt", name: "Sabonetes & Cremes", description: "Sabonetes artesanais e cremes naturais" },
        { locale: "en", name: "Soaps & Creams", description: "Artisan soaps and natural creams" },
      ],
    },
    {
      slug: "vinhos",
      translations: [
        { locale: "pt", name: "Vinhos", description: "Vinhos portugueses selecionados" },
        { locale: "en", name: "Wines", description: "Selected Portuguese wines" },
      ],
    },
  ];

  const categories: Record<string, string> = {};
  for (const cat of categoriesData) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        slug: cat.slug,
        translations: { create: cat.translations },
      },
    });
    categories[cat.slug] = created.id;
  }

  // Seed default site settings
  const settings = [
    { key: "whatsapp_number", value: "+351910341182" },
    { key: "instagram_url", value: "https://www.instagram.com/casadabuganviliaobidos/" },
    { key: "facebook_url", value: "https://www.facebook.com/casadabuganviliaobidos/" },
    { key: "address", value: "Tv. de Baltazar Gomes Figueira S/N, 2510-001 Óbidos" },
    { key: "opening_hours", value: "10:00 - 19:00, Todos os dias" },
    { key: "email", value: "info@casadabuganvilia.pt" },
  ];

  for (const setting of settings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  // ─── Mock Products ────────────────────────────────────────────────
  // Using picsum.photos with fixed seeds for consistent images

  const productsData = [
    // Vestuário (Clothing)
    {
      slug: "vestido-linho-azul",
      price: 89.90,
      categorySlug: "vestuario",
      featured: true,
      stock: 5,
      images: [
        { seed: 101, isPrimary: true, alt: "Vestido de linho azul" },
        { seed: 102, isPrimary: false, alt: "Vestido de linho azul - detalhe" },
      ],
      translations: [
        { locale: "pt", name: "Vestido de Linho Azul", description: "Vestido elegante em linho natural, tingido com índigo. Perfeito para os dias quentes de verão em Óbidos. Corte fluido e confortável.", shortDescription: "Linho natural tingido com índigo" },
        { locale: "en", name: "Blue Linen Dress", description: "Elegant natural linen dress, indigo dyed. Perfect for hot summer days in Óbidos. Flowing and comfortable cut.", shortDescription: "Natural indigo-dyed linen" },
      ],
    },
    {
      slug: "camisa-bordada-flores",
      price: 65.00,
      categorySlug: "vestuario",
      featured: false,
      stock: 8,
      images: [
        { seed: 103, isPrimary: true, alt: "Camisa bordada com flores" },
      ],
      translations: [
        { locale: "pt", name: "Camisa Bordada com Flores", description: "Camisa de algodão com bordados florais feitos à mão. Cada peça é única, com motivos inspirados na flora de Óbidos.", shortDescription: "Bordados florais feitos à mão" },
        { locale: "en", name: "Flower Embroidered Shirt", description: "Cotton shirt with handmade floral embroidery. Each piece is unique, with motifs inspired by Óbidos flora.", shortDescription: "Handmade floral embroidery" },
      ],
    },
    {
      slug: "lenco-seda-obidos",
      price: 45.00,
      categorySlug: "vestuario",
      featured: true,
      stock: 12,
      images: [
        { seed: 104, isPrimary: true, alt: "Lenço de seda" },
        { seed: 105, isPrimary: false, alt: "Lenço de seda - padrão" },
      ],
      translations: [
        { locale: "pt", name: "Lenço de Seda Óbidos", description: "Lenço em seda pura com padrão inspirado nas buganvílias de Óbidos. Cores vibrantes que complementam qualquer visual.", shortDescription: "Seda pura com padrão de buganvílias" },
        { locale: "en", name: "Óbidos Silk Scarf", description: "Pure silk scarf with a pattern inspired by the bougainvilleas of Óbidos. Vibrant colours to complement any look.", shortDescription: "Pure silk with bougainvillea pattern" },
      ],
    },
    {
      slug: "casaco-la-artesanal",
      price: 135.00,
      categorySlug: "vestuario",
      featured: false,
      stock: 2,
      images: [
        { seed: 106, isPrimary: true, alt: "Casaco de lã artesanal" },
      ],
      translations: [
        { locale: "pt", name: "Casaco de Lã Artesanal", description: "Casaco em lã portuguesa, tricotado à mão. Ideal para os dias frescos de outono e inverno. Peça única.", shortDescription: "Lã portuguesa tricotada à mão" },
        { locale: "en", name: "Handknit Wool Coat", description: "Portuguese wool coat, hand-knitted. Ideal for cool autumn and winter days. One of a kind.", shortDescription: "Hand-knitted Portuguese wool" },
      ],
    },

    // Louça & Mesa (Tableware)
    {
      slug: "prato-ceramica-azulejo",
      price: 38.50,
      categorySlug: "louca-mesa",
      featured: true,
      stock: 15,
      images: [
        { seed: 201, isPrimary: true, alt: "Prato de cerâmica azulejo" },
        { seed: 202, isPrimary: false, alt: "Prato de cerâmica - detalhe" },
      ],
      translations: [
        { locale: "pt", name: "Prato Cerâmica Azulejo", description: "Prato artesanal em cerâmica pintada à mão com motivos de azulejo português. Cada peça é única e pode ser usada como prato decorativo ou de servir.", shortDescription: "Cerâmica pintada à mão" },
        { locale: "en", name: "Azulejo Ceramic Plate", description: "Handmade ceramic plate hand-painted with Portuguese tile motifs. Each piece is unique and can be used as a decorative or serving plate.", shortDescription: "Hand-painted ceramic" },
      ],
    },
    {
      slug: "caneca-terracota-rustica",
      price: 18.00,
      categorySlug: "louca-mesa",
      featured: false,
      stock: 20,
      images: [
        { seed: 203, isPrimary: true, alt: "Caneca de terracota rústica" },
      ],
      translations: [
        { locale: "pt", name: "Caneca Terracota Rústica", description: "Caneca em terracota com acabamento rústico, feita em olaria tradicional. Perfeita para café ou chá.", shortDescription: "Terracota tradicional" },
        { locale: "en", name: "Rustic Terracotta Mug", description: "Terracotta mug with rustic finish, made in traditional pottery. Perfect for coffee or tea.", shortDescription: "Traditional terracotta" },
      ],
    },
    {
      slug: "travessa-ceramica-oval",
      price: 52.00,
      categorySlug: "louca-mesa",
      featured: true,
      stock: 6,
      images: [
        { seed: 204, isPrimary: true, alt: "Travessa de cerâmica oval" },
        { seed: 205, isPrimary: false, alt: "Travessa de cerâmica - uso" },
      ],
      translations: [
        { locale: "pt", name: "Travessa Cerâmica Oval", description: "Travessa oval em cerâmica artesanal, ideal para servir pratos tradicionais portugueses. Acabamento vidrado em tons de azul e branco.", shortDescription: "Cerâmica vidrada azul e branco" },
        { locale: "en", name: "Oval Ceramic Platter", description: "Oval handmade ceramic platter, ideal for serving traditional Portuguese dishes. Glazed finish in blue and white tones.", shortDescription: "Blue and white glazed ceramic" },
      ],
    },

    // Joalharia (Jewellery)
    {
      slug: "brincos-filigrana-prata",
      price: 75.00,
      categorySlug: "joalharia",
      featured: true,
      stock: 10,
      images: [
        { seed: 301, isPrimary: true, alt: "Brincos de filigrana em prata" },
        { seed: 302, isPrimary: false, alt: "Brincos filigrana - detalhe" },
      ],
      translations: [
        { locale: "pt", name: "Brincos Filigrana Prata", description: "Brincos em filigrana de prata portuguesa, técnica ancestral transmitida de geração em geração. Design contemporâneo com raízes tradicionais.", shortDescription: "Filigrana de prata portuguesa" },
        { locale: "en", name: "Silver Filigree Earrings", description: "Portuguese silver filigree earrings, an ancestral technique passed down through generations. Contemporary design with traditional roots.", shortDescription: "Portuguese silver filigree" },
      ],
    },
    {
      slug: "colar-cortica-natural",
      price: 42.00,
      categorySlug: "joalharia",
      featured: false,
      stock: 7,
      images: [
        { seed: 303, isPrimary: true, alt: "Colar de cortiça natural" },
      ],
      translations: [
        { locale: "pt", name: "Colar Cortiça Natural", description: "Colar feito em cortiça portuguesa natural com detalhes em prata. Leve, sustentável e elegante.", shortDescription: "Cortiça portuguesa com prata" },
        { locale: "en", name: "Natural Cork Necklace", description: "Necklace made from natural Portuguese cork with silver details. Light, sustainable and elegant.", shortDescription: "Portuguese cork with silver" },
      ],
    },
    {
      slug: "pulseira-azulejo-ceramica",
      price: 35.00,
      categorySlug: "joalharia",
      featured: true,
      stock: 0,
      images: [
        { seed: 304, isPrimary: true, alt: "Pulseira com azulejo" },
      ],
      translations: [
        { locale: "pt", name: "Pulseira Azulejo Cerâmica", description: "Pulseira artesanal com peça central em cerâmica pintada à mão, reproduzindo um azulejo português. Montada em prata 925.", shortDescription: "Cerâmica pintada à mão em prata 925" },
        { locale: "en", name: "Ceramic Tile Bracelet", description: "Handmade bracelet with hand-painted ceramic centrepiece reproducing a Portuguese tile. Set in 925 silver.", shortDescription: "Hand-painted ceramic in 925 silver" },
      ],
    },

    // Gastronomia (Food & Tapas)
    {
      slug: "caixa-queijos-artesanais",
      price: 28.50,
      categorySlug: "gastronomia",
      featured: true,
      stock: 25,
      images: [
        { seed: 401, isPrimary: true, alt: "Caixa de queijos artesanais" },
        { seed: 402, isPrimary: false, alt: "Queijos artesanais - selecção" },
      ],
      translations: [
        { locale: "pt", name: "Caixa de Queijos Artesanais", description: "Selecção de queijos regionais curados, incluindo queijo de ovelha e cabra. Produção artesanal da região Oeste.", shortDescription: "Queijos regionais curados" },
        { locale: "en", name: "Artisan Cheese Box", description: "Selection of regional cured cheeses, including sheep and goat cheese. Artisan production from the West region.", shortDescription: "Regional cured cheeses" },
      ],
    },
    {
      slug: "compota-ginja-obidos",
      price: 12.50,
      categorySlug: "gastronomia",
      featured: false,
      stock: 30,
      images: [
        { seed: 403, isPrimary: true, alt: "Compota de ginja de Óbidos" },
      ],
      translations: [
        { locale: "pt", name: "Compota de Ginja de Óbidos", description: "Compota artesanal feita com a famosa ginja de Óbidos. Ideal para acompanhar queijos ou sobremesas.", shortDescription: "Ginja de Óbidos artesanal" },
        { locale: "en", name: "Óbidos Sour Cherry Jam", description: "Artisan jam made with the famous sour cherry of Óbidos. Ideal to accompany cheeses or desserts.", shortDescription: "Artisan Óbidos sour cherry" },
      ],
    },
    {
      slug: "azeite-extra-virgem-premium",
      price: 22.00,
      categorySlug: "gastronomia",
      featured: true,
      stock: 18,
      images: [
        { seed: 404, isPrimary: true, alt: "Azeite extra virgem premium" },
      ],
      translations: [
        { locale: "pt", name: "Azeite Extra Virgem Premium", description: "Azeite extra virgem de produção limitada, prensado a frio de azeitonas galega. Sabor frutado e intenso.", shortDescription: "Produção limitada, prensado a frio" },
        { locale: "en", name: "Premium Extra Virgin Olive Oil", description: "Limited production extra virgin olive oil, cold-pressed from galega olives. Fruity and intense flavour.", shortDescription: "Limited production, cold-pressed" },
      ],
    },

    // Sabonetes & Cremes (Soaps & Creams)
    {
      slug: "sabonete-lavanda-artesanal",
      price: 8.50,
      categorySlug: "sabonetes-cremes",
      featured: true,
      stock: 40,
      images: [
        { seed: 501, isPrimary: true, alt: "Sabonete de lavanda artesanal" },
        { seed: 502, isPrimary: false, alt: "Sabonete lavanda - textura" },
      ],
      translations: [
        { locale: "pt", name: "Sabonete Lavanda Artesanal", description: "Sabonete artesanal feito com óleo essencial de lavanda e manteiga de karité. Suave e hidratante.", shortDescription: "Lavanda e manteiga de karité" },
        { locale: "en", name: "Artisan Lavender Soap", description: "Artisan soap made with lavender essential oil and shea butter. Gentle and moisturising.", shortDescription: "Lavender and shea butter" },
      ],
    },
    {
      slug: "creme-maos-rosa-mosqueta",
      price: 15.00,
      categorySlug: "sabonetes-cremes",
      featured: false,
      stock: 22,
      images: [
        { seed: 503, isPrimary: true, alt: "Creme de mãos rosa mosqueta" },
      ],
      translations: [
        { locale: "pt", name: "Creme de Mãos Rosa Mosqueta", description: "Creme de mãos nutritivo com óleo de rosa mosqueta e vitamina E. Absorção rápida sem deixar oleosidade.", shortDescription: "Rosa mosqueta e vitamina E" },
        { locale: "en", name: "Rosehip Hand Cream", description: "Nourishing hand cream with rosehip oil and vitamin E. Quick absorption without oily residue.", shortDescription: "Rosehip and vitamin E" },
      ],
    },
    {
      slug: "conjunto-sabonetes-flores",
      price: 24.00,
      categorySlug: "sabonetes-cremes",
      featured: true,
      stock: 15,
      images: [
        { seed: 504, isPrimary: true, alt: "Conjunto de sabonetes de flores" },
        { seed: 505, isPrimary: false, alt: "Sabonetes flores - caixa" },
      ],
      translations: [
        { locale: "pt", name: "Conjunto Sabonetes de Flores", description: "Caixa com 4 sabonetes artesanais de diferentes flores: rosa, lavanda, jasmim e flor de laranjeira. Embalagem perfeita para presente.", shortDescription: "4 sabonetes artesanais de flores" },
        { locale: "en", name: "Flower Soap Gift Set", description: "Box with 4 artisan soaps of different flowers: rose, lavender, jasmine and orange blossom. Perfect gift packaging.", shortDescription: "4 artisan flower soaps" },
      ],
    },
  ];

  // Create products
  for (const p of productsData) {
    const existing = await prisma.product.findUnique({ where: { slug: p.slug } });
    if (existing) continue;

    await prisma.product.create({
      data: {
        slug: p.slug,
        price: p.price,
        categoryId: categories[p.categorySlug],
        featured: p.featured,
        stock: p.stock,
        hasStock: p.stock > 0,
        active: true,
        translations: {
          create: p.translations,
        },
        images: {
          create: p.images.map((img, i) => ({
            cloudinaryPublicId: `mock/${p.slug}-${i}`,
            url: `https://picsum.photos/seed/${img.seed}/600/800`,
            alt: img.alt,
            sortOrder: i,
            isPrimary: img.isPrimary,
          })),
        },
      },
    });
  }

  // ─── Mock Artists & Artworks ──────────────────────────────────────

  const artistsData = [
    {
      slug: "maria-santos",
      photoUrl: "https://picsum.photos/seed/artist1/200/200",
      translations: [
        { locale: "pt", name: "Maria Santos", bio: "Pintora natural de Óbidos, explora a luz e as cores da vila medieval nas suas obras em acrílico e óleo sobre tela." },
        { locale: "en", name: "Maria Santos", bio: "Painter from Óbidos, she explores the light and colours of the medieval village in her acrylic and oil on canvas works." },
      ],
      artworks: [
        {
          slug: "por-do-sol-obidos",
          price: 450.00,
          medium: "Óleo sobre tela",
          translations: [
            { locale: "pt", title: "Pôr do Sol em Óbidos", description: "Pintura a óleo capturando o pôr do sol sobre as muralhas de Óbidos. 60x80cm." },
            { locale: "en", title: "Sunset in Óbidos", description: "Oil painting capturing the sunset over the walls of Óbidos. 60x80cm." },
          ],
          images: [{ seed: 601, alt: "Pôr do sol em Óbidos - pintura" }],
        },
        {
          slug: "buganvilias-rua-direita",
          price: 380.00,
          medium: "Acrílico sobre tela",
          translations: [
            { locale: "pt", title: "Buganvílias da Rua Direita", description: "Pintura vibrante das buganvílias que decoram a Rua Direita de Óbidos. 50x70cm." },
            { locale: "en", title: "Bougainvilleas of Rua Direita", description: "Vibrant painting of the bougainvilleas that decorate Rua Direita in Óbidos. 50x70cm." },
          ],
          images: [{ seed: 602, alt: "Buganvílias - pintura" }],
        },
        {
          slug: "castelo-nevoeiro",
          price: 520.00,
          medium: "Óleo sobre tela",
          translations: [
            { locale: "pt", title: "Castelo no Nevoeiro", description: "O castelo de Óbidos emerge do nevoeiro matinal. Obra de grande formato, 80x100cm." },
            { locale: "en", title: "Castle in the Fog", description: "The castle of Óbidos emerges from the morning fog. Large format work, 80x100cm." },
          ],
          images: [{ seed: 603, alt: "Castelo no nevoeiro - pintura" }],
        },
      ],
    },
    {
      slug: "joao-ferreira",
      photoUrl: "https://picsum.photos/seed/artist2/200/200",
      translations: [
        { locale: "pt", name: "João Ferreira", bio: "Escultor contemporâneo que trabalha com cerâmica e materiais reciclados. As suas peças reflectem a relação entre tradição e modernidade." },
        { locale: "en", name: "João Ferreira", bio: "Contemporary sculptor working with ceramics and recycled materials. His pieces reflect the relationship between tradition and modernity." },
      ],
      artworks: [
        {
          slug: "forma-organica-i",
          price: 280.00,
          medium: "Cerâmica",
          translations: [
            { locale: "pt", title: "Forma Orgânica I", description: "Escultura em cerâmica de alta temperatura, formas orgânicas inspiradas na natureza. 30x25cm." },
            { locale: "en", title: "Organic Form I", description: "High-temperature ceramic sculpture, organic forms inspired by nature. 30x25cm." },
          ],
          images: [{ seed: 604, alt: "Forma Orgânica I - escultura" }],
        },
        {
          slug: "memoria-fragmentada",
          price: 350.00,
          medium: "Materiais mistos",
          translations: [
            { locale: "pt", title: "Memória Fragmentada", description: "Instalação em materiais mistos — cerâmica, metal e vidro reciclado. Reflexão sobre a passagem do tempo." },
            { locale: "en", title: "Fragmented Memory", description: "Mixed media installation — ceramics, metal and recycled glass. Reflection on the passage of time." },
          ],
          images: [{ seed: 605, alt: "Memória Fragmentada - escultura" }],
        },
      ],
    },
  ];

  for (const a of artistsData) {
    const existingArtist = await prisma.artist.findUnique({ where: { slug: a.slug } });
    if (existingArtist) continue;

    const artist = await prisma.artist.create({
      data: {
        slug: a.slug,
        photoUrl: a.photoUrl,
        active: true,
        translations: { create: a.translations },
      },
    });

    for (const aw of a.artworks) {
      await prisma.artwork.create({
        data: {
          slug: aw.slug,
          artistId: artist.id,
          price: aw.price,
          medium: aw.medium,
          active: true,
          translations: { create: aw.translations },
          images: {
            create: aw.images.map((img, i) => ({
              cloudinaryPublicId: `mock/${aw.slug}-${i}`,
              url: `https://picsum.photos/seed/${img.seed}/800/800`,
              alt: img.alt,
              sortOrder: i,
            })),
          },
        },
      });
    }
  }

  console.log("✅ Seed completed successfully");
  console.log("   - Admin user: admin@casadabuganvilia.pt / admin123");
  console.log("   - 6 categories with translations");
  console.log(`   - ${productsData.length} products with images`);
  console.log(`   - ${artistsData.length} artists with ${artistsData.reduce((acc, a) => acc + a.artworks.length, 0)} artworks`);
  console.log("   - 6 site settings");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
