# Casa da Buganvília

Website e catálogo online da Casa da Buganvília, em Óbidos. O projeto apresenta os artigos da loja sem preços ou checkout; os pedidos de informação e compras são tratados pessoalmente através do WhatsApp.

## Estado atual

O site público está em modo de construção por omissão. Todas as rotas públicas encaminham para uma página de lançamento localizada, enquanto as rotas `/admin` e `/api` continuam disponíveis.

Para publicar a loja completa, configure:

```env
NEXT_PUBLIC_SITE_LIVE=true
```

Sem esta variável, ou com qualquer valor diferente de `true`, o modo de construção permanece ativo.

## Funcionalidades

- Página de lançamento responsiva em português, inglês, francês, espanhol, alemão, japonês e chinês
- Catálogo visual de produtos por categoria, sem preços públicos
- Contacto direto por WhatsApp em cada artigo, com mensagem localizada e pré-preenchida
- Galeria de arte e apresentação do espaço
- Administração protegida com NextAuth
- Upload de imagens através do Cloudinary
- Sincronização de produtos e stock com Moloni
- Identidade visual única e consistente da Casa da Buganvília

## Tecnologia

- Next.js 16 e React 19
- TypeScript em modo estrito
- Tailwind CSS 4
- next-intl
- Prisma ORM e SQLite no desenvolvimento
- Vitest
- ESLint

## Desenvolvimento local

Requisitos:

- Node.js 20 ou superior
- npm

```bash
git clone https://github.com/Findmucker/casa-da-buganvilia.git
cd casa-da-buganvilia
npm ci
Copy-Item .env.example .env.local
npm run db:push
npm run dev
```

Em macOS ou Linux, substitua `Copy-Item` por:

```bash
cp .env.example .env.local
```

O site fica disponível em [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

Consulte [.env.example](.env.example). As integrações Cloudinary e Moloni são opcionais para trabalhar exclusivamente na página pública de construção.

Nunca coloque credenciais reais no repositório.

## Qualidade

Execute a verificação completa antes de abrir um pull request ou publicar:

```bash
npm run check
```

Comandos individuais:

| Comando | Objetivo |
| --- | --- |
| `npm run lint` | Análise estática |
| `npm run typecheck` | Verificação TypeScript |
| `npm test` | Testes unitários |
| `npm run test:watch` | Testes durante desenvolvimento |
| `npm run build` | Build de produção |

## Base de dados

```bash
npm run db:push
npm run db:seed
npm run db:studio
```

SQLite serve apenas para desenvolvimento. Antes do lançamento comercial, deve ser adotada uma base de dados persistente adequada ao ambiente de produção.

O catálogo inicial é baseado em publicações da conta oficial da loja. As fontes, limitações e processo de atualização estão documentados em [docs/CATALOG_SOURCES.md](docs/CATALOG_SOURCES.md).

## Estrutura principal

```text
prisma/                   Modelo e dados iniciais
public/                   Recursos estáticos
src/app/                  Rotas Next.js
src/components/           Componentes visuais e funcionais
src/i18n/                 Configuração de idiomas
src/lib/                  Serviços e regras reutilizáveis
src/messages/             Traduções
src/proxy.ts              Gate público e routing localizado
```

## Publicação

O procedimento de configuração, lançamento e rollback está em [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

As alterações relevantes devem:

1. Ter uma issue associada.
2. Incluir testes para regras de negócio novas.
3. Passar `npm run check`.
4. Usar uma mensagem de commit que referencie a issue.

## Production admin access

For Vercel admin login, configure these project environment variables before deploying:

```env
AUTH_SECRET="use-a-long-random-production-secret"
AUTH_URL="https://your-production-domain"
```

Leave `DATABASE_URL` unset to use the bundled SQLite database for read-only preview deployments, or replace it with a managed production database URL. Do not use `file:./prisma/dev.db` on Vercel.

Preview admin account:

```text
Email: admin@casadabuganvilia.pt
Password: admin123
```

When deployed on Vercel with no managed `DATABASE_URL`, or with a SQLite
`file:` database URL, authentication falls back to this preview admin account if
the bundled SQLite lookup fails. Set `AUTH_PREVIEW_ADMIN_FALLBACK=false` to
disable that fallback after configuring a managed production database. In the
same preview mode, Auth.js also uses a stable preview secret if `AUTH_SECRET` is
missing so the login endpoint remains reachable. A real `AUTH_SECRET` should
still be configured before relying on production admin access.
