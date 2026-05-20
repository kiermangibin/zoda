# ZODA Liquid Theme

Canonical source of the Shopify Liquid theme for **zoda-sg-space**.
Originally exported from Shopify on 15 May 2026 06:25am as
`theme_export_zoda-sg-space_15MAY2026-0625am.zip`, then layered with the
Circuit (dark) design ported from the React app under `src/`.

## Workflow

1. Edit Liquid files in this folder (`liquid-theme/`).
2. Re-zip from inside this folder so the entries sit at the zip root
   (Shopify rejects zips wrapped in an extra folder):

   ```bash
   cd liquid-theme
   zip -rq /mnt/documents/zoda-liquid-theme.zip . -x "*.DS_Store" "__MACOSX/*"
   ```

3. Upload `zoda-liquid-theme.zip` in Shopify Admin → Online Store →
   Themes → Add theme → Upload zip. Preview before publishing.

## Shared design system

`assets/zoda-tokens.css`, `assets/zoda-circuit.css`, and
`assets/zoda-snap-fonts.css` are **byte-identical** to the files in
`src/styles/` of the React app. When you change the design system, edit
both sides — or better, copy from `src/styles/` to `assets/` so React and
Liquid stay in sync.

## What the Circuit port covers

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
password, search, 404) keep the original exported sections — they pick
up the new dark palette and fonts via `zoda-tokens.css` but are not
redesigned panel-by-panel.
