# Shopify Migration Plan

## Source of Truth Update

As of 2026-06-17, `zoda-theme-187588706594/` is the only active Shopify theme implementation folder. It was pulled from Shopify theme `Website 2.0 [Dev]` (`#187588706594`) on store `zoda-fit`.

`zoda-shopify-theme/` is an old/deprecated folder. Do not use it as a reference, donor, merge source, or deploy target unless a future task explicitly asks for a separate salvage review.

## Executive Summary

This repository currently contains a TanStack Start/Vite React storefront prototype, a base Shopify Space theme extracted at `incoming/space-theme-extracted/`, and the active Shopify theme target in `zoda-theme-187588706594/`. The cleanest migration path is not to convert every React file one-to-one, but to continue improving `zoda-theme-187588706594/` from the extracted Space base theme, using the Vite/React implementation as the source for page structure, styling, copy, and behaviour.

`zoda-theme-187588706594/` is the only active Shopify theme implementation target. New Shopify work should be implemented there from the Vite/React source files under `src/routes/`, `src/components/zoda/`, `src/styles/`, and `src/assets/`.

`incoming/space-theme-extracted/` is the base theme source. Other `incoming/` material should remain archive/import material unless explicitly promoted. `SHOPIFY_MIGRATION_TRACKER.md` is the source of truth for current progress, `SHOPIFY_CONTENT_MODEL_SPEC.md` is the source for metafield/metaobject definitions, and `SHOPIFY_QA_CHECKLIST.md` is the QA checklist.

## Current State

- `zoda-theme-187588706594/` is scaffolded from `incoming/space-theme-extracted/` and is the final implementation target.
- The React app remains a visual, content, and behaviour reference only; it is not production Shopify runtime code.
- Homepage, Fabrics, and Ikigai are already modularized or in progress in `zoda-theme-187588706594/`; Mission is out of scope for this pulled theme unless requested as a separate salvage task.
- Product, collection, and list-collections pages remain on Space base sections for the current migration pass.
- A full custom ZODA PDP/collection rebuild is later optional scope after content model implementation and Shopify preview QA.

## Architecture Diagram

```text
React reference app
src/routes/* + src/components/zoda/* + src/styles/*
        |
        | design, layout, copy, behaviour reference only
        v
Base Shopify theme source
incoming/space-theme-extracted/
  layout/theme.liquid
        |
        v
  templates/*.json
        |
        v
  sections/*.liquid
        |
        v
  snippets/*.liquid
        |
        v
base assets, sections, snippets, config, locales

Shopify data layer
Products, Collections, Pages, Menus, Theme Settings,
Metafields, Metaobjects, App Blocks
        |
        v
Final Shopify theme folder
zoda-theme-187588706594/
        |
        v
Merchant-editable Theme Editor experience
```

## Project Audit

### Folder Structure

| Path                                | Role                                      | Migration Notes                                                                                                |
| ----------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `src/`                              | React storefront reference app            | Use as source of design, behaviour, and content patterns. Do not ship as-is in Shopify.                         |
| `src/routes/`                       | TanStack route pages                      | Map to Shopify JSON templates and Liquid sections.                                                             |
| `src/components/zoda/`              | Brand-specific React components           | Rebuild as Liquid sections/snippets plus vanilla JS where interactive.                                         |
| `src/components/ui/`                | shadcn/Radix UI React primitives          | Do not migrate directly. Recreate only needed UI patterns in Liquid/HTML/CSS/vanilla JS.                       |
| `src/styles/`                       | Split React CSS architecture              | Already suitable as the source for Shopify asset copies. Continue tokenizing and scoping.                      |
| `src/assets/`                       | Local image/video/audio assets            | Move final licensed assets into Shopify theme assets, Shopify Files, or section settings.                      |
| `incoming/space-theme-extracted/`   | Base Shopify Space theme source           | Clean base source used to scaffold `zoda-theme-187588706594/`.                                                      |
| `zoda-theme-187588706594/`               | Final Shopify OS 2.0 theme target         | Continue implementation, QA, and launch preparation here.                                                      |
| `incoming/`                         | Imported/archive theme material           | `space-theme-extracted/` is the confirmed base theme source; leave other incoming material untouched.          |
| `.lovable/`                         | Planning notes                            | Keep as project planning only.                                                                                 |
| `dist/`, `.tanstack/`, `.wrangler/` | Build/runtime artifacts                   | Not part of the Shopify theme deliverable.                                                                     |

### Current React Pages

| React Route                          | Purpose                                                             | Shopify Target                                                                          |
| ------------------------------------ | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `src/routes/index.tsx`               | Homepage wrapper for `ZodaCircuit`                                  | `templates/index.json` plus modular `zoda-home-*` sections                              |
| `src/routes/fabrics.tsx`             | Fabrics brand page with hero, directory, fabric accordions/sections | `templates/page.fabrics.json` plus modular `zoda-fabrics-*` sections                    |
| `src/routes/ikigai.tsx`              | Our Ikigai brand page                                               | New `templates/page.ikigai.json` plus modular `zoda-ikigai-*` sections                  |
| `src/routes/mission.tsx`             | Mission/game/playbook page                                          | New `templates/page.mission.json` plus modular `zoda-mission-*` sections and vanilla JS |
| `src/routes/collections.index.tsx`   | Collections directory                                               | Current pass: Space base `templates/list-collections.json`; future optional `zoda-list-collections` rebuild |
| `src/routes/collections.$handle.tsx` | Collection grid                                                     | Current pass: Space base `templates/collection.json`; future optional `zoda-collection-*` rebuild |
| `src/routes/product.$handle.tsx`     | Product detail page                                                 | Current pass: Space base `templates/product.json`; future optional `zoda-product-*` rebuild after content model and QA |
| `src/routes/__root.tsx`              | React app shell, providers, CSS imports                             | `layout/theme.liquid`, `layout/minimal.liquid`, theme settings                          |

### Current ZODA Components

| Component                       | Purpose                                   | Migration Status                                                                                                          |
| ------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `ZodaCircuit.tsx`               | Homepage circuit and brand panels         | Partially exists as `sections/circuit-home.liquid`; use as a reference/temporary port for modular `zoda-home-*` sections. |
| `SiteHeader.tsx` / `Header.tsx` | Header, navigation, cart trigger          | Partially exists as `sections/zoda-header.liquid`.                                                                        |
| `Footer.tsx`                    | Footer, menus, newsletter                 | Partially exists as `sections/zoda-footer.liquid`.                                                                        |
| `CartDrawer.tsx`                | Cart drawer UI and cart store integration | Partially exists as `snippets/zoda-cart-drawer.liquid` and `assets/zoda-cart.js`.                                         |
| `ProductCard.tsx`               | Product card, swatches, quick add         | Partially exists as `snippets/zoda-product-card.liquid`.                                                                  |
| `ProductMotionGallery.tsx`      | Homepage product motion merchandising     | Convert to section blocks or snippet inside homepage section.                                                             |
| `ReviewsRail.tsx`               | Review carousel/rail                      | Partially exists as `snippets/zoda-reviews.liquid`; may need app integration.                                             |
| `ProductDetailsGrid.tsx`        | Product information layout                | Fold into `sections/zoda-product.liquid` and product metafields.                                                          |
| `snap-controller.ts`            | Snap scrolling behaviour                   | Rewrite/keep as vanilla JS only where needed.                                                                             |
| `circuit-script.ts`             | Homepage interaction script               | Convert to maintainable `zoda-circuit.js` modules.                                                                        |

### Styles and Assets

The React CSS has already been split into Shopify-friendly files:

```text
globals.css          -> zoda-globals.css
fonts.css            -> zoda-fonts.css
tokens.css           -> zoda-tokens.css
site-light.css       -> zoda-site-light.css
home-circuit.css     -> zoda-home-circuit.css
product-card.css     -> zoda-product-card.css
cart-drawer.css      -> zoda-cart-drawer.css
pdp-page.css         -> zoda-pdp-page.css
fabrics-page.css     -> zoda-fabrics-page.css
ikigai-page.css      -> zoda-ikigai-page.css
mission-page.css     -> zoda-mission-page.css
```

These assets now exist in `zoda-theme-187588706594/assets/`. Keep generated/copied assets inside `zoda-theme-187588706594/` only until Shopify preview confirms the new loading path, then remove unused bundles.

### Framework and Dependency Detection

The React app uses:

- React 19 and React DOM
- TanStack Start, TanStack Router, TanStack Query
- Vite
- Tailwind CSS 4 tooling
- Radix UI and shadcn-style components
- lucide-react icons
- Zustand cart store
- zod validation
- embla-carousel-react
- Shopify Storefront API helpers

These are useful in the prototype but are not directly usable inside a normal Shopify Liquid runtime.

### Code That Cannot Directly Migrate

- JSX/TSX components, React hooks, React context/providers, and client-side route components.
- TanStack Router, generated route tree, Start server files, and React Query data fetching.
- Zustand cart state; Shopify should use the AJAX Cart API and Liquid-rendered cart state.
- Radix/shadcn UI primitives; rebuild needed behaviour with accessible HTML, CSS, and vanilla JS.
- `lucide-react`; replace with inline SVG snippets, Shopify icon snippets, or static assets.
- Vite/TanStack/Cloudflare runtime files such as `src/server.ts`, `src/start.ts`, `.tanstack/`, `.wrangler/`, and `dist/`.
- Storefront API calls for products/collections that Shopify Liquid can render natively.

## Recommended Shopify Architecture

```text
zoda-theme-187588706594/
  layout/
    theme.liquid
    minimal.liquid
  templates/
    index.json
    collection.json
    list-collections.json
    product.json
    page.fabrics.json
    page.ikigai.json
    page.mission.json
    cart.json
    search.json
    customers/*.liquid
  sections/
    zoda-header.liquid
    zoda-footer.liquid
    zoda-home-hero.liquid
    zoda-home-product-motion.liquid
    zoda-home-mindset.liquid
    zoda-home-pillars.liquid
    zoda-home-collection.liquid
    zoda-home-fabrics.liquid
    zoda-home-technology.liquid
    zoda-home-reviews.liquid
    zoda-home-contact.liquid
    zoda-collection.liquid
    zoda-list-collections.liquid
    zoda-product.liquid
    zoda-fabrics-hero.liquid
    zoda-fabrics-directory.liquid
    zoda-fabrics-detail.liquid
    zoda-ikigai-hero.liquid
    zoda-ikigai-intro.liquid
    zoda-ikigai-pillars.liquid
    zoda-ikigai-technology.liquid
    zoda-ikigai-auraform.liquid
    zoda-ikigai-sustainability.liquid
    zoda-ikigai-community.liquid
    zoda-mission-hero.liquid
    zoda-mission-materials.liquid
    zoda-mission-game.liquid
    zoda-mission-playbook.liquid
    zoda-mission-finishers.liquid
    zoda-feature-panel.liquid
    zoda-media-text.liquid
    zoda-reviews-section.liquid
  snippets/
    zoda-product-card.liquid
    zoda-cart-drawer.liquid
    zoda-pim.liquid
    zoda-reviews.liquid
    zoda-icon.liquid
    zoda-responsive-image.liquid
    zoda-price.liquid
    zoda-swatches.liquid
  assets/
    zoda-globals.css
    zoda-fonts.css
    zoda-tokens.css
    zoda-site-light.css
    zoda-home-circuit.css
    zoda-product-card.css
    zoda-cart-drawer.css
    zoda-pdp-page.css
    zoda-fabrics-page.css
    zoda-ikigai-page.css
    zoda-mission-page.css
    zoda-cart.js
    zoda-circuit.js
    zoda-page.js
  config/
    settings_schema.json
    settings_data.json
  locales/
    en.default.json
```

### Architecture Principles

- Use `zoda-theme-187588706594/` for all active Shopify implementation work.
- Use JSON templates for page composition and Theme Editor control.
- In this plan, "section" means an editable Shopify page area, not a whole-page mega section.
- Prefer modular page-area sections over whole-page sections; whole-page ports are temporary references only.
- Keep Space theme's default sections available in `zoda-theme-187588706594/` for merchant flexibility.
- Build purpose-made ZODA modular sections for primary brand and commerce pages.
- Put merchant-editable page content in section settings, blocks, metafields, and metaobjects.
- Keep snippets small and reusable for product cards, swatches, cart rows, reviews, media, and icons.
- Load global CSS once, then page/component CSS conditionally where possible.
- Keep JavaScript vanilla, scoped, and progressively enhanced.
- Avoid React bundles in the final Shopify theme unless an explicit app embed requires them.

### Section Granularity Examples

```text
templates/page.ikigai.json
  zoda-ikigai-hero
  zoda-ikigai-intro
  zoda-ikigai-pillars
  zoda-ikigai-technology
  zoda-ikigai-auraform
  zoda-ikigai-sustainability
  zoda-ikigai-community

templates/page.mission.json
  zoda-mission-hero
  zoda-mission-materials
  zoda-mission-game
  zoda-mission-playbook
  zoda-mission-finishers

templates/index.json
  zoda-home-hero
  zoda-home-product-motion
  zoda-home-mindset
  zoda-home-pillars
  zoda-home-collection
  zoda-home-fabrics
  zoda-home-technology
  zoda-home-reviews
  zoda-home-contact
```

### Recommended Section Counts

| Page       | Recommended Sections | Content Model                                                                                                                 |
| ---------- | -------------------: | ----------------------------------------------------------------------------------------------------------------------------- |
| Homepage   |                    9 | Sections for layout, blocks for repeatable cards/logos/reviews, metaobjects only for reused fabrics/technology/press/reviews. |
| Fabrics    |                    3 | Sections for hero/directory/detail layout, `fabric_system` metaobjects for each fabric.                                       |
| Ikigai     |                    7 | Sections for major story areas, blocks for pillars/cards, metaobjects only if reused elsewhere.                               |
| Mission    |                    5 | Sections for hero/materials/game/playbook/finishers, blocks for steps/checklists/badges, optional metaobjects for campaigns.  |
| Product    |                    5 | Product sections plus product metafields for specs, care, fit, fabric, features, badges, and sustainability.                  |
| Collection |                    4 | Collection sections plus collection metafields for subtitle, hero media, story copy, featured fabric, and SEO copy.           |

Recommended baseline:

- Fabrics should be metaobjects.
- Products should use metafields.
- Homepage, Ikigai, and Mission should use sections plus blocks for layout and editing.
- Reusable brand claims, technology features, press, and reviews should become metaobjects only when reused across pages.

## Component Mapping

| Current File                                   | Purpose                           | Shopify Equivalent                                                                         | Editable                     |
| ---------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------- |
| `src/routes/__root.tsx`                        | App shell, CSS imports, providers | `layout/theme.liquid`, `layout/minimal.liquid`, global snippets                            | Partially via theme settings |
| `src/routes/index.tsx`                         | Homepage route                    | `templates/index.json`                                                                     | Yes                          |
| `src/components/zoda/ZodaCircuit.tsx`          | Space/circuit homepage            | Modular `zoda-home-*` sections; existing `circuit-home.liquid` is reference/temporary port | Yes                          |
| `src/components/zoda/ProductMotionGallery.tsx` | Featured product motion panel     | `sections/zoda-home-product-motion.liquid` or supporting snippet                           | Yes                          |
| `src/components/zoda/ReviewsRail.tsx`          | Reviews rail                      | `snippets/zoda-reviews.liquid`, optional reviews app block                                 | Partially                    |
| `src/components/zoda/SiteHeader.tsx`           | Header/nav/cart trigger           | `sections/zoda-header.liquid`                                                              | Yes                          |
| `src/components/zoda/Header.tsx`               | Alternate header implementation   | Merge into `zoda-header.liquid`                                                            | Yes                          |
| `src/components/zoda/Footer.tsx`               | Footer/newsletter/menu            | `sections/zoda-footer.liquid`                                                              | Yes                          |
| `src/components/zoda/CartDrawer.tsx`           | Cart drawer                       | `snippets/zoda-cart-drawer.liquid` + `assets/zoda-cart.js`                                 | Partially                    |
| `src/components/zoda/ProductCard.tsx`          | Product card and quick add        | `snippets/zoda-product-card.liquid`                                                        | Partially                    |
| `src/components/zoda/ProductDetailsGrid.tsx`   | PDP details                       | `sections/zoda-product.liquid` + metafields                                                | Yes                          |
| `src/routes/collections.index.tsx`             | Collections directory             | `templates/list-collections.json` + `sections/zoda-list-collections.liquid`                | Yes                          |
| `src/routes/collections.$handle.tsx`           | Collection page                   | `templates/collection.json` + `sections/zoda-collection.liquid`                            | Yes                          |
| `src/routes/product.$handle.tsx`               | Product page                      | `templates/product.json` + `sections/zoda-product.liquid`                                  | Yes                          |
| `src/routes/fabrics.tsx`                       | Fabrics page                      | `templates/page.fabrics.json` + modular `zoda-fabrics-*` sections                          | Yes                          |
| `src/lib/fabrics.ts`                           | Fabric content data               | Section blocks first, then `fabric_system` metaobjects if reused                           | Yes                          |
| `src/routes/ikigai.tsx`                        | Ikigai brand page                 | `templates/page.ikigai.json` + modular `zoda-ikigai-*` sections                            | Yes                          |
| `src/routes/mission.tsx`                       | Mission/playbook/game page        | `templates/page.mission.json` + modular `zoda-mission-*` sections + JS                     | Partially                    |
| `src/components/zoda/snap-controller.ts`       | Snap scroll behaviour              | `assets/zoda-page.js` or page-specific JS                                                  | No                           |
| `src/components/zoda/circuit-script.ts`        | Homepage interactions             | `assets/zoda-circuit.js`                                                                   | No                           |
| `src/stores/cartStore.ts`                      | React cart state                  | Shopify AJAX Cart API state in `zoda-cart.js`                                              | No                           |
| `src/hooks/useCartSync.ts`                     | Cart synchronization              | Shopify section rendering/AJAX cart refresh                                                | No                           |
| `src/lib/shopify.ts`                           | Storefront API helper             | Liquid objects for theme pages; Storefront API only if absolutely needed                   | No                           |
| `src/lib/collection.ts`                        | Collection API helper             | Shopify `collection` object and pagination                                                 | No                           |
| `src/lib/featured-collection.ts`               | Featured collection helper        | Theme setting selecting a collection                                                       | Yes                          |
| `src/lib/swatches.ts`                          | Swatch derivation                 | `snippets/zoda-swatches.liquid` plus variant/metafield data                                | Partially                    |
| `src/lib/judgeme-reviews.functions.ts`         | Review helper                     | Shopify app block/snippet integration                                                      | Partially                    |
| `src/components/ui/*.tsx`                      | React UI primitives               | Rebuild only needed patterns in Liquid/HTML/CSS/JS                                         | No                           |
| `src/styles/*.css`                             | Visual system and page CSS        | `assets/zoda-*.css`                                                                        | No, except token settings    |
| `src/assets/*`                                 | Brand media                       | Shopify Files, theme assets, or image/video settings                                       | Yes when settings-based      |

## Editable Content Strategy

### Theme Settings

Add or refine global settings in `config/settings_schema.json`:

- Brand logo, alternate logo, favicon, social links.
- Primary navigation menu, utility links, footer menus.
- Global announcement text and visibility.
- Free shipping threshold and cart drawer messaging.
- Featured collection handle for homepage/PIM modules.
- Global animation preferences: enable snap scroll, reduced motion fallback, hover effects.
- Design tokens exposed as guarded settings: accent colour, surface colour, text colour, radius scale, button style, section spacing.

### Sections

Recommended merchant-editable sections:

- Header and footer.
- Homepage circuit hero, product motion panel, brand pillars, fabric system, technology, press/reviews, coming soon, social/contact.
- Collection merchandising banner and grid settings.
- Product detail page blocks: media, title/price, variant picker, add to cart, specs, care, accordions, recommendations.
- Fabrics page hero, fabric directory, fabric detail blocks.
- Ikigai page hero, pillars, technology, auraform, sustainability, community.
- Mission page hero, mission steps, challenge cards, playbook/checklist, progress copy.

### Blocks

Use blocks for repeatable content:

- Hero CTAs.
- Homepage panels.
- Feature cards.
- Fabric entries.
- Technology benefits.
- Press logos.
- Review items when not powered by an app.
- Ikigai pillars.
- Mission challenges and playbook weeks.
- Footer menu columns.
- Product accordions.

### Metafields

Product metafields should cover:

- Fabric name/system.
- Product tagline/subtitle.
- Feature bullets.
- Care instructions.
- Fit notes.
- Size guide reference.
- Model measurements.
- Sustainability claims.
- Badge labels.
- Review app product reference if needed.

Collection metafields should cover:

- Collection subtitle.
- Hero media.
- Merchandising copy.
- Featured fabric/system.
- SEO description override when needed.

Page metafields should cover:

- Optional hero media.
- SEO support copy.
- Alternate navigation labels.

### Metaobjects

Use metaobjects when content appears in multiple places or needs structured reuse:

| Metaobject              | Fields                                                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `fabric_system`         | Name, handle, tagline, description, image, performance bullets, sustainability bullets, community copy, linked collection |
| `technology_feature`    | Name, short copy, long copy, media, product/collection link                                                               |
| `ikigai_pillar`         | Title, subtitle, body, icon/media, order                                                                                  |
| `mission_challenge`     | Title, duration, instructions, reward text, badge image, active dates                                                     |
| `mission_playbook_week` | Week number, checklist items, guidance copy                                                                               |
| `press_item`            | Publication name, logo, quote, link                                                                                       |
| `review_highlight`      | Quote, author, product, rating, source                                                                                    |

## Dependency Audit

| Dependency / Area                              | Recommendation                        | Reasoning                                                                             |
| ---------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------- |
| Shopify Liquid theme base                      | Safe to keep                          | This is the production runtime for OS 2.0.                                            |
| `zoda-theme-187588706594/assets/zoda-*.css`         | Safe to keep                          | These are Shopify-ready CSS bridge assets for the active theme.                       |
| `zoda-theme-187588706594/assets/zoda-cart.js`       | Safe to keep after audit              | Needed for AJAX cart behaviour; keep vanilla and scoped.                               |
| `zoda-theme-187588706594/assets/zoda-circuit.js`    | Safe to keep after audit              | Needed for homepage behaviour if it is vanilla and resilient.                          |
| Theme media such as `click.wav`, `success.wav` | Safe to keep if used                  | Small interactive assets are acceptable if compressed and licensed.                   |
| React / React DOM                              | Replace with Shopify-native           | Shopify Liquid themes should not require React for core rendering.                    |
| TanStack Router / Start / Query                | Replace with Shopify-native           | Shopify handles routing and data rendering through templates, Liquid, and objects.    |
| Vite runtime bundles                           | Replace with Shopify assets           | Useful for prototype builds, not for production Shopify theme runtime.                |
| Zustand                                        | Replace with Shopify AJAX Cart API    | Cart state should be derived from Shopify cart endpoints and section rendering.       |
| Storefront API product/collection fetches      | Replace with Liquid objects           | Product and collection templates can render data natively, faster, and safer.         |
| Radix UI / shadcn components                   | Rewrite in Liquid/HTML/CSS/JS         | React primitives cannot run directly in Liquid templates.                             |
| lucide-react                                   | Replace with icon snippets/static SVG | Avoid React-only icon dependency.                                                     |
| embla-carousel-react                           | Rewrite or use vanilla slider         | Only keep carousel behaviour that is necessary and accessible.                         |
| zod                                            | Remove from theme                     | Runtime validation belongs in build tools/apps, not Liquid theme output.              |
| Tailwind tooling                               | Remove from final theme runtime       | Keep only compiled CSS/token strategy unless a build pipeline is intentionally added. |
| Mission localStorage game logic                | Rewrite in vanilla JS                 | Browser persistence can stay, but implementation must not depend on React.            |
| `dist/`, `.tanstack/`, `.wrangler/`            | Remove from final Shopify deliverable | Build/runtime artifacts unrelated to Shopify theme packaging.                         |

## Space Theme Design System

### Token Strategy

Use `zoda-tokens.css` as the single source for CSS custom properties, then connect selected values to Shopify theme settings where merchant control is useful.

```text
Theme settings
    -> CSS custom properties in theme layout or token asset
        -> component/page CSS
            -> sections, blocks, snippets
```

### Colors

Recommended token groups:

- `--zoda-color-space`: deep background / space black.
- `--zoda-color-surface`: elevated panels and drawers.
- `--zoda-color-surface-soft`: secondary surfaces.
- `--zoda-color-star`: primary light text.
- `--zoda-color-muted`: secondary copy.
- `--zoda-color-line`: borders and dividers.
- `--zoda-color-accent`: primary brand action.
- `--zoda-color-accent-2`: secondary glow/detail color.
- `--zoda-color-success`, `--zoda-color-warning`, `--zoda-color-error`: commerce states.

### Typography

- Keep brand display font handling in `zoda-fonts.css`.
- Use a readable sans-serif stack for body and commerce UI.
- Use display typography only for hero and major brand moments.
- Use tighter, smaller typography for product cards, filters, drawers, and PDP controls.
- Ensure font files are local theme assets or stable Shopify-hosted files.

### Spacing

Use a predictable spacing scale:

```text
--zoda-space-2: 0.125rem
--zoda-space-4: 0.25rem
--zoda-space-8: 0.5rem
--zoda-space-12: 0.75rem
--zoda-space-16: 1rem
--zoda-space-24: 1.5rem
--zoda-space-32: 2rem
--zoda-space-48: 3rem
--zoda-space-64: 4rem
--zoda-space-96: 6rem
```

Brand pages should share mobile section padding with the fabrics page so content stays visible and vertically centered without viewport cutoffs.

### Radius

- Small controls: `4px`.
- Cards and product tiles: `8px` maximum unless a specific design reason exists.
- Drawers/modals: `8px`.
- Pills and circular controls: use radius only where the shape communicates function.

### Shadows and Effects

- Prefer subtle depth, borders, and light glows over heavy drop shadows.
- Keep space effects scoped to hero/circuit areas.
- Avoid one-colour monotony by balancing dark space surfaces with clear text, neutral borders, and selective accent colour.

### Motion

- Support `prefers-reduced-motion`.
- Keep scroll snapping optional and page-scoped.
- Avoid motion that blocks buying flows.
- Use short transitions for drawers, accordions, swatches, and buttons.

## Migration Roadmap

### Phase 1 — Audit

Estimated effort: 1-2 days.

Dependencies: access to Shopify preview store, current theme export, product/catalog sample data.

Tasks:

- Confirm `zoda-theme-187588706594/` is the active implementation target.
- Inventory all active templates, sections, snippets, assets, and settings.
- Identify unused generated bundles and copied CSS.
- Confirm which React pages must exist in Shopify at launch.
- Define required product, collection, and page metafields.

Deliverable: final migration inventory and deletion/keep list.

### Phase 2 — Theme Foundation

Estimated effort: 2-4 days.

Dependencies: Phase 1 decisions, brand tokens, font licensing.

Tasks:

- Harden `layout/theme.liquid` and `layout/minimal.liquid` asset loading.
- Finalize `zoda-fonts.css`, `zoda-tokens.css`, `zoda-site-light.css`.
- Add global theme settings for design tokens, cart threshold, menus, social links, and motion.
- Create shared snippets for icons, responsive images, swatches, prices, and section headers.
- Add localization keys for reusable UI text.

Deliverable: stable Shopify theme foundation with no broken asset references.

### Phase 3 — Sections & Blocks

Estimated effort: 5-10 days.

Dependencies: Phase 2 foundation and required content model.

Tasks:

- Continue refining the modular homepage sections already created in `zoda-theme-187588706594/`.
- Complete visual and Theme Editor QA for the Fabrics, Ikigai, and Mission page sections.
- Keep current product, collection, and list-collections pages on Space base sections for this pass.
- Treat full custom ZODA PDP and collection sections as optional later scope after content modeling and preview QA.
- Expand fabrics section schema or move fabrics to metaobjects if reused.
- Rewrite accordions, snap behaviour, cart interactions, sliders, and mission logic in vanilla JS.

Deliverable: merchant-editable pages matching the React visual system.

### Phase 4 — Content Modeling

Estimated effort: 2-5 days.

Dependencies: final product data needs and merchant workflow decisions.

Tasks:

- Create product metafield definitions.
- Create collection/page metafields.
- Create metaobject definitions for fabrics, technology features, Ikigai pillars, mission challenges, press, and review highlights.
- Map existing hardcoded React copy/media into Shopify content.
- Document merchant editing rules.

Deliverable: structured Shopify content model with sample populated records.

### Phase 5 — Optimization

Estimated effort: 2-4 days.

Dependencies: sections and content in place.

Tasks:

- Conditionally load page-specific CSS/JS where possible.
- Remove unused generated JS/CSS bundles after preview verification.
- Optimize images with Shopify `image_url`, responsive sizes, and lazy loading.
- Audit cumulative layout shift, drawer performance, scroll snapping, and mobile content height.
- Ensure accessibility for menus, accordions, drawers, forms, product options, and keyboard navigation.

Deliverable: performant, accessible theme candidate.

### Phase 6 — QA & Launch

Estimated effort: 3-5 days.

Dependencies: Shopify preview store, populated catalog, apps configured.

Tasks:

- Run Theme Check and formatting checks.
- Verify home, collection, product, cart, search, fabrics, Ikigai, Mission, customer pages, and 404.
- Test mobile, tablet, desktop, and reduced-motion behaviour.
- Test add to cart, update quantity, remove item, checkout handoff, sold out states, variant switching, and quick add.
- Validate SEO titles/descriptions, structured data, canonical URLs, redirects, and image alt text.
- Publish only after preview sign-off.

Deliverable: launch-ready Shopify OS 2.0 theme.

## Risk Assessment

| Risk                                                  | Impact | Mitigation                                                                            |
| ----------------------------------------------------- | ------ | ------------------------------------------------------------------------------------- |
| React features cannot run directly in Liquid          | High   | Rebuild rendering in Liquid and interactions in vanilla JS.                           |
| Hardcoded React content is not merchant-editable      | High   | Move content into section settings, blocks, metafields, and metaobjects.              |
| Global CSS may leak into base theme sections          | Medium | Scope page CSS with ZODA wrapper classes and load page-specific CSS conditionally.    |
| Scroll snapping can cut off mobile content            | High   | Keep snap optional, mobile-safe, and reduced-motion aware.                            |
| Cart drawer state can drift from Shopify cart         | High   | Use AJAX Cart API responses as source of truth.                                       |
| Review features may require an app                    | Medium | Integrate app blocks/snippets instead of hardcoded review data where required.        |
| Mission page game/progress features may exceed Liquid | Medium | Keep persistence in vanilla JS/localStorage or move advanced account logic to an app. |
| Media assets may be remote, duplicated, or unlicensed | Medium | Centralize final assets in Shopify Files/theme assets and verify licensing.           |
| Removing generated/copied assets too early can break preview | Medium | Keep needed assets until Shopify preview confirms they are unused.                    |
| SEO metadata still reflects prototype defaults        | High   | Replace default metadata and define SEO per template/product/page.                    |
| Theme schema can become too large or hard to edit     | Medium | Use metaobjects for large repeatable content instead of giant section schemas.        |
| App dependencies may not exist in all stores          | Medium | Use graceful fallbacks around app blocks and review widgets.                          |

## Shopify Best Practices Checklist

- Use `zoda-theme-187588706594/` as the final Shopify implementation target.
- Keep JSON templates for Online Store 2.0 page composition.
- Make all major brand/page content editable through section settings, blocks, metafields, or metaobjects.
- Keep snippets reusable and small.
- Use Shopify `image_url` with explicit widths and responsive loading.
- Use Shopify product, collection, cart, and page objects instead of Storefront API where Liquid can render the data.
- Use AJAX Cart API for cart drawer interactions.
- Scope CSS with ZODA page/component classes.
- Load global CSS once and page-specific CSS only where needed.
- Keep JavaScript vanilla, deferred, and resilient if elements are missing.
- Support keyboard navigation and ARIA states for menus, drawers, accordions, tabs, and variant controls.
- Respect `prefers-reduced-motion`.
- Avoid content cutoffs on mobile by avoiding fixed viewport heights for content-heavy sections.
- Move reusable UI strings into locale files.
- Add structured data for products, breadcrumbs, and organisation where appropriate.
- Configure product, collection, and page SEO fields.
- Keep old assets during transition; remove only after reference search and preview QA.
- Run Theme Check before launch.
- Test all buying flows on a Shopify preview store before publishing.

## Immediate Next Actions

1. Run Shopify Theme Check against `zoda-theme-187588706594/`.
2. Upload or preview `zoda-theme-187588706594/` in Shopify.
3. Complete visual, mobile, cart, and Theme Editor QA using `SHOPIFY_QA_CHECKLIST.md`.
4. Implement metafield and metaobject definitions from `SHOPIFY_CONTENT_MODEL_SPEC.md`.
5. Keep product, collection, and list-collections pages on Space base sections until content model and preview QA are stable.
6. Update `SHOPIFY_MIGRATION_TRACKER.md` after QA with current progress, blockers, and decisions.
