# 🌺 Casa da Buganvília

Loja online artesanal em Óbidos — vestuário, louça, joalharia, gastronomia, vinhos e sabonetes. Com painel de administração, integração Moloni e temas sazonais.

## Funcionalidades

### 🛍️ Loja Online
- Catálogo de produtos por categoria (vestuário, louça, joalharia, gastronomia, sabonetes, vinhos)
- Página individual por produto com galeria de imagens
- Indicador de stock em tempo real
- Contacto via WhatsApp para encomendas

### 🌍 Internacionalização
- 7 idiomas: Português, English, Français, Español, Deutsch, 日本語, 中文
- Routing por locale (`/pt/shop`, `/en/shop`, etc.)
- Traduções completas via `next-intl`

### 🎨 Temas Sazonais
- **Buganvília** (default) — cores quentes, mediterrâneo
- **Christmas** — tema natalício
- **Medieval** — inspirado na vila medieval de Óbidos
- Switching dinâmico de tema

### 🔧 Painel de Administração
- Login seguro (NextAuth)
- Gestão de produtos (CRUD)
- Upload de imagens (Cloudinary)
- Gestão de categorias
- Configurações da loja

### 📊 Integração Moloni
- Sincronização de produtos com Moloni (ERP/faturação)
- Controlo de stock automático
- Dashboard de estado da integração

## Tech Stack

- **Framework:** Next.js 16.2.4 (App Router)
- **UI:** Tailwind CSS v4, Radix UI, Lucide Icons
- **Database:** SQLite via Prisma ORM
- **Auth:** NextAuth v5 (beta)
- **Images:** Cloudinary
- **i18n:** next-intl
- **ERP:** Moloni API
- **Deploy:** Vercel

## Setup Local

### 1. Clonar e instalar

```bash
git clone https://github.com/Findmucker/casa-da-buganvilia.git
cd casa-da-buganvilia
npm install
```

### 2. Configurar variáveis de ambiente

Criar ficheiro `.env.local`:

```env
# Database
DATABASE_URL="file:./prisma/dev.db"

# NextAuth
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000

# Cloudinary (upload de imagens)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Moloni (ERP - opcional)
MOLONI_CLIENT_ID=your_client_id
MOLONI_CLIENT_SECRET=your_client_secret
MOLONI_REFRESH_TOKEN=your_refresh_token
MOLONI_COMPANY_ID=your_company_id
```

### 3. Configurar base de dados

```bash
# Criar/migrar database
npm run db:push

# Seed com dados iniciais
npm run db:seed

# Visualizar dados (opcional)
npm run db:studio
```

### 4. Correr localmente

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Estrutura do Projeto

```
casa-da-buganvilia/
├── prisma/
│   ├── schema.prisma       # Schema da base de dados
│   └── seed.ts             # Dados iniciais
├── public/
│   ├── logo.jpg            # Logo da loja
│   └── logo-original.jpg   # Logo original
├── src/
│   ├── app/
│   │   ├── [locale]/       # Páginas públicas (i18n)
│   │   │   ├── shop/       # Loja
│   │   │   ├── gallery/    # Galeria
│   │   │   ├── about/      # Sobre nós
│   │   │   └── contact/    # Contacto
│   │   ├── admin/          # Painel de administração
│   │   └── api/            # API routes
│   ├── components/
│   │   ├── layout/         # Header, Footer, LanguageSwitcher
│   │   ├── shop/           # ProductCard, StockBadge, WhatsApp
│   │   ├── themes/         # Temas sazonais (buganvilia, christmas, medieval)
│   │   ├── ui/             # Componentes base (Button, etc.)
│   │   └── admin/          # Sidebar admin
│   ├── i18n/               # Configuração i18n
│   ├── lib/                # Utilities (prisma, auth, moloni, cloudinary)
│   └── messages/           # Ficheiros de tradução (pt, en, fr, es, de, ja, zh)
└── package.json
```

## Scripts Disponíveis

| Script | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | Linting |
| `npm run db:migrate` | Migrar base de dados |
| `npm run db:seed` | Seed com dados iniciais |
| `npm run db:studio` | Prisma Studio (UI para DB) |
| `npm run db:push` | Push schema para DB |

## Deploy

### Vercel (recomendado)

1. Ligar repo ao Vercel
2. Configurar variáveis de ambiente no dashboard
3. Deploy automático a cada push

### Nota sobre Database

Em produção, trocar SQLite por PostgreSQL (ex: Neon, Supabase):
1. Alterar `provider` em `prisma/schema.prisma`
2. Atualizar `DATABASE_URL` com connection string do PostgreSQL

## Licença

Projeto pessoal — feito com 🌺
