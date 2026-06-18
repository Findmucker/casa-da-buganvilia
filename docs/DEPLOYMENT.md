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

## Launch

1. Confirm the storefront, database, authentication, uploads, and external integrations are production-ready.
2. Set `NEXT_PUBLIC_SITE_LIVE=true` in the production environment.
3. Trigger a new deployment. `NEXT_PUBLIC_*` values are embedded at build time.
4. Verify the home page, shop, gallery, contact page, locale routing, and admin login.

## Rollback

For an immediate public rollback:

1. Set `NEXT_PUBLIC_SITE_LIVE=false`.
2. Redeploy the last known-good commit.
3. Verify that public routes return to the construction page.
4. Keep `/admin` available for diagnosis.

For a code rollback, use the hosting provider's previous deployment promotion feature or revert the responsible Git commit. Do not rewrite shared branch history.
