## Current CSS Structure

The React app CSS has been split by ownership so it can later map cleanly into Shopify theme assets.

## Shared Files

- `src/styles/globals.css` - app/global utility layer and base classes.
- `src/styles/fonts.css` - font-face declarations.
- `src/styles/tokens.css` - shared ZODA variables and theme tokens.
- `src/styles/home-circuit.css` - homepage circuit experience.
- `src/styles/site-light.css` - shared shell, header, footer, dark/light site chrome, and collection grid.

## Component And Page Files

- `src/styles/product-card.css` - product cards, swatches, quick-add, and size hover controls.
- `src/styles/cart-drawer.css` - cart drawer UI and empty cart state.
- `src/styles/pdp-page.css` - product detail page, PDP accordions, product info blocks, and media strip.
- `src/styles/fabrics-page.css` - Fabrics snap page, directory, feature panels, and fabric accordions.
- `src/styles/ikigai-page.css` - Our Ikigai page overrides and page-specific sections.
- `src/styles/mission-page.css` - The Mission page layout, game, playbook, inclusions, and mobile rules.

## Shopify Migration Note

When converting to Shopify, copy the ownership model from `src/styles/README.md`.

Suggested Shopify asset names:

- `assets/zoda-globals.css`
- `assets/zoda-fonts.css`
- `assets/zoda-tokens.css`
- `assets/zoda-home-circuit.css`
- `assets/zoda-site-light.css`
- `assets/zoda-product-card.css`
- `assets/zoda-cart-drawer.css`
- `assets/zoda-pdp-page.css`
- `assets/zoda-fabrics-page.css`
- `assets/zoda-ikigai-page.css`
- `assets/zoda-mission-page.css`

Load foundation files first, then shared shell/component files, then page-specific files. Do not change the existing `liquid-theme/` asset tags until those Shopify asset files actually exist in the theme.
