# Catalog source register

The seeded catalog is a conservative snapshot of offerings visibly promoted by Casa da Buganvília on its official public Instagram account.

Snapshot date: June 18, 2026.

## Primary source

- Official account: [@casadabuganviliaobidos](https://www.instagram.com/casadabuganviliaobidos/)
- Profile description at review time: “Moda • Arte • Artesanato • Tapas • Vinhos”

## Seeded offerings

| Seeded offering | Category | Official post | Local image |
| --- | --- | --- | --- |
| Coleção de Moda Artesanal | Moda | [DO_rVmDDBME](https://www.instagram.com/p/DO_rVmDDBME/) | `public/products/moda-artesanal.jpg` |
| Joalharia Floral Colorida | Joalharia & Acessórios | [DO_rVmDDBME](https://www.instagram.com/p/DO_rVmDDBME/) | `public/products/joalharia-colorida.jpg` |
| Acessórios & Carteiras Artesanais | Joalharia & Acessórios | [DO_rVmDDBME](https://www.instagram.com/p/DO_rVmDDBME/) | `public/products/acessorios-artesanais.jpg` |
| Velas Aromáticas | Aromas & Casa | [DO_rVmDDBME](https://www.instagram.com/p/DO_rVmDDBME/) | `public/products/velas-aromaticas.jpg` |
| Compotas & Patés Portugueses | Sabores & Tapas | [DQFBnurDENp](https://www.instagram.com/p/DQFBnurDENp/) | `public/products/compotas-pates.jpg` |
| Seleção de Vinhos Portugueses | Vinhos & Licores | [DQFBnurDENp](https://www.instagram.com/p/DQFBnurDENp/) | `public/products/vinhos-portugueses.jpg` |
| Ginja & Licores Regionais | Vinhos & Licores | [DQFBnurDENp](https://www.instagram.com/p/DQFBnurDENp/) | `public/products/ginja-licores.jpg` |
| Tábua de Queijos, Enchidos & Vinho | Sabores & Tapas | [DSKXrIwjFpe](https://www.instagram.com/p/DSKXrIwjFpe/) | `public/products/tabua-queijos-enchidos.jpg` |
| Bacalhau, Azeitonas & Vinho | Sabores & Tapas | [DSKXrIwjFpe](https://www.instagram.com/p/DSKXrIwjFpe/) | `public/products/bacalhau-azeitonas.jpg` |
| Petiscos Portugueses | Sabores & Tapas | [DSKXrIwjFpe](https://www.instagram.com/p/DSKXrIwjFpe/) | `public/products/petiscos-portugueses.jpg` |
| Coleção de Cerâmica Floral | Cerâmica & Mesa | [DY0AIhtDGj6](https://www.instagram.com/p/DY0AIhtDGj6/) | `public/products/ceramica-floral.jpg` |
| Jarro Floral & Pratos de Cerâmica | Cerâmica & Mesa | [DY0AIhtDGj6](https://www.instagram.com/p/DY0AIhtDGj6/) | `public/products/jarro-pratos-ceramica.jpg` |

## Interpretation rules

- Entries represent product families or experiences visible in official posts, not guaranteed individual SKUs.
- Product names and descriptions are descriptive editorial labels when the post does not provide an exact commercial name.
- No public price or stock claim is inferred from an image.
- Price and availability must be confirmed through WhatsApp.
- The seed stores `price = 0` and disables stock tracking for these catalog entries.
- Portuguese and English descriptions are maintained. Other visitor locales fall back to English.

## Image handling

Images were copied from public posts on the store’s official account into `public/products/`. Local copies prevent the catalog from depending on temporary Instagram CDN URLs.

Do not add unrelated stock photography as store inventory. For future updates:

1. Confirm the item on an official Casa da Buganvília source.
2. Save a stable local image.
3. Add the source post to this register.
4. Describe only what is visible or explicitly stated.
5. Run the seed twice to verify idempotency.
6. Run `npm run check`.
