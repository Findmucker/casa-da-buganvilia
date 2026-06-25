# Deployment runbook

## Construction mode

Construction mode is the safe default. If `NEXT_PUBLIC_SITE_LIVE` is absent, empty, or not equal to `true`, public storefront routes redirect to the localized landing page.

Examples:

| Request | Construction destination |
| --- | --- |
| `/shop` | `/` |
| `/pt/gallery` | `/` |
| `/en/shop` | `/en` |
| `/fr/contact` | `/fr` |

The proxy matcher excludes `/admin`, `/api`, Next.js internals, Vercel internals, and static files.

## Vercel setup

1. Import `Findmucker/casa-da-buganvilia`.
2. Use `npm ci` as the install command.
3. Use `npm run build` as the build command.
4. Configure the variables documented in `.env.example`.
   Set `NEXT_PUBLIC_WHATSAPP_NUMBER=+351910341182`.
   Set `DATABASE_URL` to the Supabase Supavisor transaction pooler URL.
   Set `DIRECT_URL` to a Supabase direct/session connection for Prisma migrations.
   Set `AUTH_SECRET` to a long random value for production admin sessions.
5. Keep `NEXT_PUBLIC_SITE_LIVE=false` until launch approval.
6. Deploy and verify the production URL in desktop and mobile viewports.

`postinstall` generates the Prisma client automatically.

## Pre-deployment verification

```bash
npm ci
npm run check
```

Verify:

- `/` displays Portuguese construction copy.
- `/en` displays English construction copy.
- `/en/shop` redirects to `/en`.
- `/shop` redirects to `/`.
- `/admin/login` remains reachable.
- The logo, typography, floral artwork, and reduced-motion behavior render correctly.
- Product cards do not display prices and open the correct WhatsApp inquiry.
- The WhatsApp message contains the selected product name and public URL.
- Product images load from the local `/products/` assets.
- Product and category names fall back to English when a visitor locale has no catalog translation.

Catalog provenance and update rules are maintained in [CATALOG_SOURCES.md](CATALOG_SOURCES.md).

## WhatsApp language policy

The store owner handles messages in Portuguese and English. WhatsApp links therefore use this policy:

| Visitor locale | Message sent |
| --- | --- |
| Portuguese | Portuguese only |
| English | English only |
| French, Spanish, German, Chinese, or Japanese | Visitor-language message followed by an English owner summary |
| Unsupported locale | English fallback |

The English product summary includes:

- Customer intent: information or order
- Product name
- Customer language
- Canonical product URL

General contact messages use the same policy and include the customer language in the English summary. When adding another site locale, add its customer-facing message and English language label together, then extend the WhatsApp tests.

## Launch

1. Confirm the storefront, database, authentication, uploads, and external integrations are production-ready.
2. Set `NEXT_PUBLIC_SITE_LIVE=true` in the production environment.
3. Trigger a new deployment. `NEXT_PUBLIC_*` values are embedded at build time.
4. Verify the home page, shop, gallery, contact page, locale routing, and admin login.

The site requires a persistent Supabase Postgres database for admin catalog writes.
Do not deploy production admin editing with a local `file:` database URL.

## Supabase database setup

1. Create or choose a Supabase project.
2. In the Supabase SQL editor, create a dedicated Prisma role following Supabase's Prisma guide.
3. Copy the Supavisor transaction pooler URL for `DATABASE_URL`.
4. Copy the direct or session pooler URL for `DIRECT_URL`.
5. Add both values to local `.env`, Vercel preview, and Vercel production environments.
6. Run migrations and seed the first admin/catalog data:

```bash
npm run db:deploy
npm run db:seed
```

## Admin login

The seeded preview admin account is:

- Email: `admin@casadabuganvilia.pt`
- Password: `admin123`

The credentials callback reads this account from Supabase after `npm run db:seed`.
`AUTH_PREVIEW_ADMIN_FALLBACK=true` can enable the hardcoded preview account for
emergency testing, but production should leave that fallback disabled.

If `/admin/login` returns a server configuration error on Vercel, check the
Vercel project environment variables:

- `AUTH_SECRET` should be set for production admin sessions.
- `AUTH_URL` should match the production URL.
- `DATABASE_URL` should point to Supabase Postgres.
- `DIRECT_URL` should be configured for Prisma migrations.

## Rollback

For an immediate public rollback:

1. Set `NEXT_PUBLIC_SITE_LIVE=false`.
2. Redeploy the last known-good commit.
3. Verify that public routes return to the construction page.
4. Keep `/admin` available for diagnosis.

For a code rollback, use the hosting provider's previous deployment promotion feature or revert the responsible Git commit. Do not rewrite shared branch history.
