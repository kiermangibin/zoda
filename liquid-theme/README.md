# ZODA Liquid Theme

Canonical source of the Shopify Liquid theme for **zoda-sg-space**.
Originally exported from Shopify on 15 May 2026 06:25am as
`theme_export_zoda-sg-space_15MAY2026-0625am.zip`, then layered with the
Circuit dark design ported from the React app under `src/`.

## Workflow

1. Edit Liquid files in this folder (`liquid-theme/`).
2. Re-zip from inside this folder so the entries sit at the zip root
   (Shopify rejects zips wrapped in an extra folder):

   ```bash
   cd liquid-theme
   zip -rq /mnt/documents/zoda-liquid-theme.zip . -x "*.DS_Store" "__MACOSX/*"
   ```

3. Upload `zoda-liquid-theme.zip` in Shopify Admin > Online Store >
   Themes > Add theme > Upload zip. Preview before publishing.

## Shared Design System

The React app CSS now lives in focused files under `src/styles/`; see
`src/styles/README.md` for the current ownership map and the suggested
Shopify asset names.

This Liquid theme still uses the older asset names in `layout/theme.liquid`
until the Shopify conversion pass creates matching assets. Do not change
those Liquid asset tags until the files exist in `liquid-theme/assets/`.

## What The Circuit Port Covers

Ported 1:1 from the React app:

- Home page (`sections/circuit-home.liquid` + `assets/zoda-circuit.js`)
- Header (`sections/zoda-header.liquid`)
- Footer (`sections/zoda-footer.liquid`)
- Collection (`sections/zoda-collection.liquid` +
  `snippets/zoda-product-card.liquid`)
- Product / PDP (`sections/zoda-product.liquid`)
- Cart drawer (`snippets/zoda-cart-drawer.liquid` +
  `assets/zoda-cart.js`)

Auxiliary pages (article, blog, gift card, contact, customer accounts,
password, search, 404) keep the original exported sections. They pick up
the dark palette and fonts through the current Liquid assets, but are not
redesigned panel-by-panel.
