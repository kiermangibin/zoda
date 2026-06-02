# ZODA CSS Map

This folder is split so the current React app can later map cleanly into Shopify theme assets.

## Shared Foundation

- `globals.css` - app/global utility layer and base classes.
- `fonts.css` - font-face declarations.
- `tokens.css` - shared ZODA variables and theme tokens.
- `site-light.css` - shared shell, header, footer, dark/light site chrome, and collection grid.

## Experience And Page Styles

- `home-circuit.css` - homepage circuit experience and related chrome.
- `product-card.css` - product cards, swatches, quick-add, and size hover controls.
- `cart-drawer.css` - cart drawer UI and empty cart state.
- `pdp-page.css` - product detail page, PDP accordions, product info blocks, and PDP media strip.
- `fabrics-page.css` - Fabrics snap page, directory, feature panels, and fabric accordions.
- `ikigai-page.css` - Our Ikigai page overrides and page-specific sections.
- `mission-page.css` - The Mission page layout, game, playbook, inclusions, and mobile rules.

## Shopify Asset Naming

When this moves into Shopify, use the same ownership with Shopify-friendly asset names:

- `assets/zoda-globals.css`
- `assets/zoda-fonts.css`
- `assets/zoda-tokens.css`
- `assets/zoda-site-light.css`
- `assets/zoda-home-circuit.css`
- `assets/zoda-product-card.css`
- `assets/zoda-cart-drawer.css`
- `assets/zoda-pdp-page.css`
- `assets/zoda-fabrics-page.css`
- `assets/zoda-ikigai-page.css`
- `assets/zoda-mission-page.css`

Load `zoda-fonts.css`, `zoda-tokens.css`, and `zoda-site-light.css` before page-specific assets. Keep page files scoped by their page wrapper classes so Shopify templates and sections can load only what they need.
