# Shopify Migration Tracker

## Project Overview

| Field                             | Value                                                                                                                                                                                                                                                       |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project Name                      | ZODA Shopify OS 2.0 Migration                                                                                                                                                                                                                               |
| Source Technology Stack           | TanStack Start, Vite, React 19, TypeScript, TanStack Router/Query, Radix/shadcn UI, Zustand, Tailwind tooling, custom CSS                                                                                                                                   |
| Target Shopify Theme Architecture | Shopify Online Store 2.0 theme in `zoda-shopify-theme/`, scaffolded from `incoming/space-theme-extracted/`, using Liquid layouts, JSON templates, modular page-area sections, snippets, CSS assets, vanilla JS, theme settings, metafields, and metaobjects |
| Current Migration Status          | `zoda-shopify-theme/` scaffolded from `incoming/space-theme-extracted/`; ZODA foundation assets copied. The Vite/React app remains the source for page structure, styling, copy, and behavior.                                         |
| Last Updated                      | 2026-05-31                                                                                                                                                                                                                                                  |

## Migration Dashboard

### Overall Progress

| Area             | Progress | Notes                                                                                                                                                                     |
| ---------------- | -------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Audit            |      55% | Active theme structure, modular page templates, section schemas, JS syntax, and final-theme references checked locally.                                                   |
| Foundation       |      30% | `zoda-shopify-theme/` scaffolded from Space base; ZODA assets copied and conditionally wired. First homepage section started.                                             |
| Sections         |      91% | Homepage, Fabrics, Ikigai, and Mission modular sections created and reference-audited. Product/collection cleanup and QA still pending.                                   |
| Templates        |      97% | Homepage, Fabrics, Ikigai, and Mission templates assembled and reference-audited. Remaining work is product/collection cleanup and QA.                                    |
| Content Modeling |      30% | Product, collection, page metafield requirements and reusable metaobject requirements drafted in `SHOPIFY_CONTENT_MODEL_SPEC.md`; definitions not created in Shopify yet. |
| QA               |      10% | `SHOPIFY_QA_CHECKLIST.md` drafted; Shopify preview/store access and live QA still pending.                                                                                |

## Component Migration Status

| Component               | Shopify Target                                                                                         | Status      | Notes                                                                                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| App Shell / Root Layout | `layout/theme.liquid`, `layout/minimal.liquid`                                                         | In Progress | Layouts reviewed. `theme.liquid` currently loads all ZODA page CSS globally; conditional loading still needed.                                              |
| Homepage Circuit        | `templates/index.json`, modular `zoda-home-*` sections                                                 | In Progress | Existing `circuit-home.liquid` is reference/temporary port. Final build should split into page-area sections.                                               |
| Hero                    | `sections/zoda-home-hero.liquid`                                                                       | In Progress | Created with editable kicker, heading, CTAs, video embed URL, and press-logo blocks. Needs visual QA.                                                       |
| Product Motion Gallery  | `sections/zoda-home-product-motion.liquid` or snippet                                                  | In Progress | Created editable product rail section using a selected collection and product limit. Needs visual/cart QA.                                                  |
| Fabric System           | `sections/zoda-home-fabrics.liquid`, later `fabric_system` metaobjects                                 | In Progress | Created editable fabric-card section with block-based cards and scoped progress/active-card JS. Needs visual QA.                                            |
| Technology Features     | `sections/zoda-home-technology.liquid`, later `technology_feature` metaobjects                         | In Progress | Created editable feature summary/callout section with scoped tab accordion JS. Needs visual QA.                                                             |
| Reviews Rail            | `sections/zoda-home-reviews.liquid`, `snippets/zoda-review-card.liquid`, optional app block            | In Progress | Created editable manual review rail with reusable card snippet. Decide later whether to replace with app data.                                              |
| Contact CTA             | `sections/zoda-home-contact.liquid`, `snippets/zoda-social-icon.liquid`                                | In Progress | Created editable contact/CTA/social section. Needs visual QA and final social URLs.                                                                         |
| Header                  | `sections/zoda-header.liquid`                                                                          | Not Started | Section exists; verify menus, logo settings, mobile nav, cart trigger.                                                                                      |
| Footer                  | `sections/zoda-footer.liquid`                                                                          | Not Started | Section exists; verify newsletter, menus, social links, localization.                                                                                       |
| Cart Drawer             | `snippets/zoda-cart-drawer.liquid`, `sections/zoda-cart-drawer-fragment.liquid`, `assets/zoda-cart.js` | In Progress | Added final-theme drawer markup, refresh fragment, guarded layout render, AJAX quick-add, quantity, remove, and checkout handoff. Needs Shopify preview QA. |
| Product Card            | `snippets/zoda-product-card.liquid`                                                                    | In Progress | Added final-theme snippet with image, swatches, price, link, and quick-add button wired to ZODA AJAX cart. Needs variant/state QA.                          |
| Product Details Grid    | Future `sections/zoda-product-*`, product metafields                                                   | Not Started | No final ZODA PDP section exists yet; current product page uses Space base `product__main`. Move future specs/care/details to metafields.                   |
| Product Page            | `templates/product.json`, Space `sections/product__main.liquid`                                        | Review      | Reviewed final theme reality: default PDP remains Space base for now; ZODA PDP CSS only loads for future guarded ZODA product templates.                    |
| Collection Page         | `templates/collection.json`, Space `sections/collection__main.liquid`                                  | Review      | Reviewed final theme reality: collection page remains Space base with banner, filters, product grid, and recent slider.                                     |
| Collections Directory   | `templates/list-collections.json`, Space `sections/list-collections__main.liquid`                      | Review      | Reviewed final theme reality: collections directory remains Space base with banner and collection grid.                                                     |
| Fabrics Page            | `templates/page.fabrics.json`, modular `zoda-fabrics-*` sections                                       | Review      | Created `zoda-fabrics-hero`, `zoda-fabrics-directory`, and reusable `zoda-fabrics-feature`; needs visual/mobile QA.                                         |
| Ikigai Page             | `templates/page.ikigai.json`, modular `zoda-ikigai-*` sections                                         | Review      | Created hero, intro, pillars, technology, AuraForm, sustainability, and community sections. Needs visual/mobile QA.                                         |
| Mission Page            | `templates/page.mission.json`, modular `zoda-mission-*` sections, JS                                   | Review      | Created Mission hero, game, playbook, inclusions, and materials sections with vanilla JS. Needs visual/mobile QA.                                           |
| Snap Scroll Behavior    | `assets/zoda-page.js` or page-specific JS                                                              | Not Started | Needs reduced-motion and mobile content-height safeguards.                                                                                                  |
| Circuit Interactions    | `assets/zoda-circuit.js`                                                                               | Not Started | Existing asset needs audit and cleanup.                                                                                                                     |
| Swatches                | `snippets/zoda-swatches.liquid` or product card/PDP snippets                                           | Not Started | Decide metafield/variant-option source.                                                                                                                     |
| Icons                   | `snippets/zoda-icon.liquid` or static SVG assets                                                       | Not Started | Replace `lucide-react`.                                                                                                                                     |

## Dependency Migration Status

| Dependency                             | Action   | Status      | Notes                                                                                                                                           |
| -------------------------------------- | -------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Shopify Liquid base theme              | Keep     | Pending     | Active production target.                                                                                                                       |
| `zoda-shopify-theme/assets/zoda-*.css` | Keep     | In Progress | Foundation assets copied; layout references added with guarded page/template loading.                                                           |
| `zoda-cart.js`                         | Keep     | Review      | Uses Shopify AJAX Cart API, refreshes `zoda-cart-drawer-fragment`, and keeps drawer DOM references fresh after rerender. Needs live Shopify QA. |
| `zoda-circuit.js`                      | Keep     | In Progress | Copied to final theme assets; audit for homepage-only scope and performance needed.                                                             |
| Theme audio/media assets               | Keep     | Pending     | Keep only if used, compressed, and licensed.                                                                                                    |
| React                                  | Replace  | Pending     | Use Liquid rendering instead.                                                                                                                   |
| React DOM                              | Replace  | Pending     | Not needed in final Shopify theme.                                                                                                              |
| React Hooks                            | Rewrite  | Pending     | Convert stateful UI to Liquid plus vanilla JS.                                                                                                  |
| TanStack Router                        | Replace  | Pending     | Shopify templates handle routing.                                                                                                               |
| TanStack Start                         | Remove   | Pending     | Prototype runtime only.                                                                                                                         |
| TanStack Query                         | Replace  | Pending     | Use Shopify Liquid objects where possible.                                                                                                      |
| Vite build runtime                     | Remove   | Pending     | Keep source reference only unless maintaining a separate build pipeline.                                                                        |
| Tailwind tooling                       | Evaluate | Pending     | Keep only if an intentional build pipeline is adopted; otherwise compiled CSS only.                                                             |
| Radix UI                               | Rewrite  | Pending     | Recreate menus/drawers/accordions accessibly.                                                                                                   |
| shadcn UI components                   | Rewrite  | Pending     | Do not migrate React primitives directly.                                                                                                       |
| lucide-react                           | Replace  | Pending     | Use SVG/icon snippets or assets.                                                                                                                |
| Zustand                                | Replace  | Pending     | Use Shopify AJAX Cart API.                                                                                                                      |
| Storefront API helpers                 | Replace  | Pending     | Use Liquid product/collection/cart objects on theme pages.                                                                                      |
| embla-carousel-react                   | Rewrite  | Pending     | Use vanilla slider only where needed.                                                                                                           |
| zod                                    | Remove   | Pending     | Not needed in theme runtime.                                                                                                                    |
| Mission localStorage logic             | Rewrite  | In Progress | `zoda-mission.js` stores the mission start date and playbook checklist state.                                                                   |
| `dist/`, `.tanstack/`, `.wrangler/`    | Remove   | Pending     | Exclude from final Shopify deliverable.                                                                                                         |

## Section Inventory

### Recommended Final Section Baseline

| Page       | Final Section Count | Section Pattern            | Data Strategy                                                                                                                                    |
| ---------- | ------------------: | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Homepage   |                   9 | `zoda-home-*`              | Blocks for repeatable layout items; metaobjects only for reused fabrics/technology/press/reviews.                                                |
| Fabrics    |                   3 | `zoda-fabrics-*`           | `fabric_system` metaobjects for each fabric.                                                                                                     |
| Ikigai     |                   7 | `zoda-ikigai-*`            | Blocks for pillars/cards; metaobjects only if reused elsewhere.                                                                                  |
| Mission    |                   5 | `zoda-mission-*`           | Blocks for steps/checklists/badges; optional metaobjects for campaigns.                                                                          |
| Product    |                   5 | Future `zoda-product-*`    | Product metafields for specs, care, fit, fabric, features, badges, sustainability. Current default PDP uses Space base sections.                 |
| Collection |                   4 | Future `zoda-collection-*` | Collection metafields for subtitle, hero media, story copy, featured fabric, SEO copy. Current default collection pages use Space base sections. |

### Current Reference Section Inventory

| Section                        | Editable | Mobile Ready | Tested | Notes                                                                                                          |
| ------------------------------ | -------- | ------------ | ------ | -------------------------------------------------------------------------------------------------------------- |
| `circuit-home.liquid`          | No       | No           | No     | Exists with minimal schema. Invalid `zoda-header` snippet render removed on 2026-05-31. Needs blocks/settings. |
| `zoda-header.liquid`           | Partial  | No           | No     | Exists with logo/menu settings. Needs full QA.                                                                 |
| `zoda-footer.liquid`           | Partial  | No           | No     | Exists with logo/tagline/menu blocks. Needs full QA.                                                           |
| `zoda-collection.liquid`       | No       | No           | No     | Not present in `zoda-shopify-theme/`; future optional ZODA collection section.                                 |
| `zoda-list-collections.liquid` | No       | No           | No     | Not present in `zoda-shopify-theme/`; current directory uses Space base `list-collections__main`.              |
| `zoda-product.liquid`          | No       | No           | No     | Not present in `zoda-shopify-theme/`; current PDP uses Space base `product__main`.                             |
| `zoda-fabrics.liquid`          | Partial  | No           | No     | Exists with section settings and fabric blocks.                                                                |
| `zoda-ikigai.liquid`           | No       | No           | No     | Not created yet.                                                                                               |
| `zoda-mission.liquid`          | No       | No           | No     | Not created yet.                                                                                               |
| `zoda-feature-panel.liquid`    | No       | No           | No     | Recommended reusable section, not created yet.                                                                 |
| `zoda-media-text.liquid`       | No       | No           | No     | Recommended reusable section, not created yet.                                                                 |
| `zoda-reviews-section.liquid`  | No       | No           | No     | Recommended section/app wrapper, not created yet.                                                              |

## Template Inventory

| Template                          | Status         | Notes                                                                                                                                    |
| --------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `templates/index.liquid`          | Review         | Existing Liquid template renders `sections/zoda-home-group.json`, which loads `circuit-home`. Decide whether to keep or convert to JSON. |
| `templates/collection.json`       | Review         | Existing template renders Space base `banner`, `collection__main`, and `recent-slider`; no ZODA collection section yet.                  |
| `templates/list-collections.json` | Review         | Existing template renders Space base `banner` and `list-collections__main`; no ZODA collections directory section yet.                   |
| `templates/product.json`          | Review         | Existing template renders Space base `product__main`, `accordions`, recommendations, and recent slider; no ZODA PDP section yet.         |
| `templates/page.fabrics.json`     | Review         | Created in final theme with hero, directory, and one detail section per fabric.                                                          |
| `templates/page.ikigai.json`      | Review         | Created in final theme with all seven planned Ikigai page-area sections. Needs Shopify preview QA.                                       |
| `templates/page.mission.json`     | Review         | Created in final theme with all five planned Mission page-area sections. Needs Shopify preview QA.                                       |
| `templates/cart.json`             | Pending Review | Existing template.                                                                                                                       |
| `templates/search.json`           | Pending Review | Existing template.                                                                                                                       |
| `templates/customers/*.liquid`    | Pending Review | Existing customer templates.                                                                                                             |

## Snippet Inventory

| Snippet                        | Status         | Notes                                                                                                |
| ------------------------------ | -------------- | ---------------------------------------------------------------------------------------------------- |
| `zoda-cart-drawer.liquid`      | In Progress    | Added to final theme with matching fragment section and AJAX cart controls. Needs visual/Shopify QA. |
| `zoda-product-card.liquid`     | In Progress    | Added to final theme for product motion. Needs visual/cart QA.                                       |
| `zoda-pim.liquid`              | Pending Review | Existing snippet.                                                                                    |
| `zoda-reviews.liquid`          | Pending Review | Existing snippet.                                                                                    |
| `zoda-icon.liquid`             | Not Started    | Recommended.                                                                                         |
| `zoda-responsive-image.liquid` | Not Started    | Recommended.                                                                                         |
| `zoda-price.liquid`            | Not Started    | Recommended.                                                                                         |
| `zoda-swatches.liquid`         | Not Started    | Recommended.                                                                                         |

## Theme Settings Inventory

| Setting                 | Implemented | Tested | Notes                                                                            |
| ----------------------- | ----------- | ------ | -------------------------------------------------------------------------------- |
| Brand Colors            | No          | No     | Add guarded global token settings.                                               |
| Typography              | No          | No     | Confirm local font assets and font settings.                                     |
| Section Spacing         | No          | No     | Needed for consistent mobile brand pages.                                        |
| Border Radius           | No          | No     | Tokenize globally.                                                               |
| Motion / Snap Scroll    | No          | No     | Add enable/disable and reduced-motion behavior.                                  |
| Header Logo             | Partial     | No     | Present in `zoda-header.liquid`; verify global placement.                        |
| Header Menu             | Partial     | No     | Present in `zoda-header.liquid`; verify mobile.                                  |
| Footer Logo             | Partial     | No     | Present in `zoda-footer.liquid`.                                                 |
| Footer Tagline          | Partial     | No     | Present in `zoda-footer.liquid`.                                                 |
| Footer Menus            | Partial     | No     | Present as footer blocks.                                                        |
| Social Links            | No          | No     | Add globally or footer-specific.                                                 |
| Announcement Bar        | No          | No     | Decide whether base theme section covers this.                                   |
| Free Shipping Threshold | No          | No     | Needed for cart drawer messaging.                                                |
| Featured Collection     | Partial     | No     | `zoda-pim.liquid` references `settings.zoda_featured_collection`; verify schema. |
| SEO Defaults            | No          | No     | Replace prototype defaults.                                                      |

## Metafields & Metaobjects

### Product Metafields

Namespace recommendation: `zoda`.

| Definition            | Key                     | Shopify Type                          | Status   | Used For                                               |
| --------------------- | ----------------------- | ------------------------------------- | -------- | ------------------------------------------------------ |
| Product subtitle      | `subtitle`              | Single line text                      | Drafted  | PDP title area and optional product card support.      |
| Product tagline       | `tagline`               | Multi-line text                       | Drafted  | PDP intro copy.                                        |
| Fabric system         | `fabric_system`         | Metaobject reference: `fabric_system` | Drafted  | PDP fabric callout, fabric filters, product cards.     |
| Feature bullets       | `feature_bullets`       | List of single line text              | Drafted  | PDP bullet list and accordions.                        |
| Care instructions     | `care_instructions`     | Rich text                             | Drafted  | PDP care accordion.                                    |
| Fit notes             | `fit_notes`             | Rich text                             | Drafted  | PDP fit/size guidance.                                 |
| Size guide            | `size_guide`            | Page reference or file reference      | Drafted  | PDP size guide link/modal.                             |
| Model measurements    | `model_measurements`    | Multi-line text                       | Drafted  | PDP model info.                                        |
| Product badges        | `badges`                | List of single line text              | Drafted  | Product cards and PDP badges.                          |
| Sustainability claims | `sustainability_claims` | List of single line text              | Drafted  | PDP sustainability/details accordion.                  |
| Technology tags       | `technology_tags`       | List of single line text              | Drafted  | PDP tags such as ZO-Dry, FluidMotion, Zenith Tech.     |
| Review anchor label   | `review_label`          | Single line text                      | Optional | PDP review summary when no review app data is present. |

### Collection Metafields

Namespace recommendation: `zoda`.

| Definition          | Key                   | Shopify Type                          | Status           | Used For                                           |
| ------------------- | --------------------- | ------------------------------------- | ---------------- | -------------------------------------------------- |
| Collection subtitle | `subtitle`            | Single line text                      | Drafted          | Collection hero below title.                       |
| Hero media          | `hero_media`          | File reference                        | Drafted          | Collection hero image/video.                       |
| Hero copy           | `hero_copy`           | Multi-line text                       | Drafted          | Collection hero supporting copy.                   |
| Featured fabric     | `featured_fabric`     | Metaobject reference: `fabric_system` | Drafted          | Fabric storytelling on collection pages.           |
| Merchandising copy  | `merchandising_copy`  | Rich text                             | Drafted          | Collection content bands.                          |
| SEO intro           | `seo_intro`           | Multi-line text                       | Drafted          | Merchant-controlled SEO copy near collection grid. |
| Product rail source | `featured_collection` | Collection reference                  | Existing pattern | Homepage/product-motion source if kept global.     |

### Page Metafields

Namespace recommendation: `zoda`.

| Definition          | Key                | Shopify Type     | Status  | Used For                                            |
| ------------------- | ------------------ | ---------------- | ------- | --------------------------------------------------- |
| Hero media          | `hero_media`       | File reference   | Drafted | Optional page-level hero override for brand pages.  |
| Hero eyebrow        | `hero_eyebrow`     | Single line text | Drafted | Optional page hero label.                           |
| SEO support copy    | `seo_support_copy` | Multi-line text  | Drafted | Extra copy for search/social context.               |
| Alternate nav label | `nav_label`        | Single line text | Drafted | Shorter navigation labels where page title is long. |

### Metaobject Definitions

| Metaobject Type         | Key Fields                                                                                                                                                                                          | Status   | First Use                                                       |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------- |
| `fabric_system`         | `name`, `handle`, `tagline`, `hero_title`, `description`, `swatch_image`, `feature_labels`, `feature_icons`, `performance_bullets`, `sustainability_bullets`, `community_copy`, `linked_collection` | Drafted  | Fabrics page, homepage fabric cards, product fabric references. |
| `technology_feature`    | `name`, `handle`, `short_copy`, `long_copy`, `media`, `product_or_collection_link`, `tags`                                                                                                          | Drafted  | Homepage technology and future PDP technology tags.             |
| `mission_challenge`     | `title`, `week`, `day`, `points`, `instructions`, `tone`, `badge_image`, `challenge_type`                                                                                                           | Drafted  | Mission board and playbook if moved out of section blocks.      |
| `mission_playbook_week` | `title`, `badge`, `week_number`, `checklist_items`, `guidance_copy`, `final_icon`                                                                                                                   | Drafted  | Mission playbook if the section schema becomes too large.       |
| `press_item`            | `publication_name`, `logo`, `quote`, `link`, `sort_order`                                                                                                                                           | Optional | Homepage press/review credibility areas.                        |
| `review_highlight`      | `quote`, `author`, `product`, `rating`, `source`, `verified_label`                                                                                                                                  | Optional | Only if no Shopify reviews app powers review content.           |
| `size_guide`            | `title`, `body`, `measurement_table`, `media`, `product_type`                                                                                                                                       | Optional | PDP size guide if page/file references are not enough.          |

### Content Modeling Notes

- Products should use metafields first. Do not build custom ZODA PDP sections until the product data model is confirmed.
- Fabrics should become `fabric_system` metaobjects if the same fabric content needs to drive Fabrics, homepage, and PDP references.
- Mission content can stay as section blocks for launch; use metaobjects only if the merchant needs reusable campaigns or a cleaner admin data model.
- Reviews should use an app if possible; `review_highlight` is a fallback for manual curated reviews.

## Asset Inventory

| Asset                           | Status         | Notes                                                                                                                |
| ------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------- |
| `zoda-globals.css`              | Pending Review | Copied but not loaded; contains source Tailwind directives and should be replaced with compiled/safe CSS before use. |
| `zoda-fonts.css`                | In Progress    | Loaded globally in `theme.liquid` and `minimal.liquid`.                                                              |
| `zoda-tokens.css`               | In Progress    | Loaded only for guarded ZODA pages/templates.                                                                        |
| `zoda-site-light.css`           | In Progress    | Loaded only for guarded ZODA pages/templates.                                                                        |
| `zoda-home-circuit.css`         | In Progress    | Loaded only for guarded ZODA home templates.                                                                         |
| `zoda-product-card.css`         | In Progress    | Loaded only for guarded ZODA pages/templates.                                                                        |
| `zoda-cart-drawer.css`          | In Progress    | Loaded only for guarded ZODA pages/templates.                                                                        |
| `zoda-pdp-page.css`             | In Progress    | Loaded only for guarded ZODA product templates.                                                                      |
| `zoda-fabrics-page.css`         | In Progress    | Loaded only for the Fabrics page.                                                                                    |
| `zoda-ikigai-page.css`          | In Progress    | Loaded only for the Ikigai page.                                                                                     |
| `zoda-mission-page.css`         | In Progress    | Loaded only for the Mission page.                                                                                    |
| Generated/copied CSS/JS bundles | Pending Review | Keep until preview confirms they are unused.                                                                         |

## Open Issues

| Priority | Issue                                                                                   | Owner                | Status   |
| -------- | --------------------------------------------------------------------------------------- | -------------------- | -------- |
| High     | Create the first modular ZODA homepage sections and template wiring.                    | Developer            | Open     |
| High     | Create missing Ikigai and Mission Shopify templates/sections.                           | Developer            | Complete |
| High     | Define product, collection, page metafields and reusable metaobjects.                   | Developer            | Review   |
| High     | Replace React cart state with Shopify AJAX Cart source of truth.                        | Developer            | Review   |
| High     | Verify mobile content does not cut off on Fabrics, Ikigai, and Mission pages.           | Developer            | Open     |
| High     | Replace global loading of all ZODA page CSS with safer conditional/page-scoped loading. | Developer            | Open     |
| Medium   | Split whole-page reference ports into modular page-area sections for the final theme.   | Developer            | Review   |
| Medium   | Decide review integration: app block vs manual review highlights.                       | Developer / Merchant | Open     |
| Medium   | Audit generated bundles and copied CSS before removing.                                 | Developer            | Open     |
| Medium   | Replace prototype SEO defaults with Shopify-ready metadata.                             | Developer            | Open     |
| Medium   | Confirm final media asset locations and licensing.                                      | Developer / Merchant | Open     |

## Decisions Log

### 2026-05-31

Date: 2026-05-31  
Decision: Create `SHOPIFY_QA_CHECKLIST.md` before Shopify preview.  
Reason: The theme now has enough final-template work that QA needs a dedicated checklist covering upload readiness, page template assignment, responsive checks, cart behavior, Theme Editor editability, accessibility, SEO, and performance.  
Impact: QA progress can now be tracked against `SHOPIFY_QA_CHECKLIST.md`; live Shopify preview remains the main blocker.

Date: 2026-05-31  
Decision: Create `SHOPIFY_CONTENT_MODEL_SPEC.md` as the implementation-ready source for metafield and metaobject definitions.  
Reason: The tracker should summarize progress, while the content model needs enough detail for Shopify admin/CLI implementation without cluttering the migration dashboard.  
Impact: Future metafield/metaobject setup should use `SHOPIFY_CONTENT_MODEL_SPEC.md` as the detailed spec and update this tracker with implementation status.

Date: 2026-05-31  
Decision: Draft the Shopify content model before building custom ZODA product/collection sections.  
Reason: Product and collection pages should not be rebuilt around hardcoded content; the merchant editing model needs confirmed product metafields, collection metafields, page metafields, and reusable metaobjects first.  
Impact: `SHOPIFY_MIGRATION_TRACKER.md` now lists proposed `zoda.*` metafield keys and metaobject field sets for products, collections, pages, fabrics, technology, Mission, press, reviews, and size guides.

Date: 2026-05-31  
Decision: Keep default product and collection templates on Space base sections for the current migration pass.  
Reason: `zoda-shopify-theme/` does not currently contain `zoda-product.liquid`, `zoda-collection.liquid`, or `zoda-list-collections.liquid`; the active commerce templates already render functional Space base sections. Building full ZODA commerce sections should be a deliberate later phase tied to metafield definitions and Shopify preview QA.  
Impact: `templates/product.json`, `templates/collection.json`, and `templates/list-collections.json` are tracked as reviewed Space base commerce templates, while `zoda-product-*` and `zoda-collection-*` remain future optional work.

Date: 2026-05-31  
Decision: Add the ZODA cart drawer markup and fragment section to the final theme.  
Reason: `zoda-cart.js` refreshed `/?section_id=zoda-cart-drawer-fragment`, but the final theme did not yet include the drawer snippet or fragment section, so quick-add could not reliably open/refetch a rendered cart.  
Impact: `zoda-shopify-theme/` now includes `snippets/zoda-cart-drawer.liquid`, `sections/zoda-cart-drawer-fragment.liquid`, guarded drawer rendering in `layout/theme.liquid`, and a refreshed `zoda-cart.js` that keeps its drawer reference current.

Date: 2026-05-31  
Decision: Treat the final-theme reference audit as clean after comment-aware JSON parsing.  
Reason: Shopify-generated JSON templates can include leading auto-generated comments, so the audit strips those before parsing while still checking section, snippet, and literal asset references.  
Impact: `zoda-shopify-theme/` currently has no missing section types, snippet renders, or literal asset references detected by the local audit.

Date: 2026-05-31  
Decision: Add `sections/zoda-mission-materials.liquid` as the fifth modular Mission section.  
Reason: Mission Bag material facts and statement copy should be editable in Shopify while preserving the existing nutrition-label style panel.  
Impact: `templates/page.mission.json` now renders all five planned Mission page-area sections.

Date: 2026-05-31  
Decision: Add `sections/zoda-mission-inclusions.liquid` as the fourth modular Mission section.  
Reason: Mission Bag inclusions should be merchant-editable blocks while preserving the existing blueprint list styling.  
Impact: `templates/page.mission.json` now renders hero, game, playbook, and inclusions sections.

Date: 2026-05-31  
Decision: Add `sections/zoda-mission-playbook.liquid` and extend `assets/zoda-mission.js` for playbook state.  
Reason: The Mission playbook needs Shopify-editable week/note items while preserving card navigation and persistent checklist behavior from React.  
Impact: `templates/page.mission.json` now renders hero, game, and playbook sections; `zoda-mission.js` manages board selection, mission start date, playbook cards, and checklist persistence.

Date: 2026-05-31  
Decision: Add `sections/zoda-mission-game.liquid` and `assets/zoda-mission.js` for the Mission board.  
Reason: The React mission board needs to become Liquid markup with vanilla JS selection/start-state behavior before the playbook checklist is migrated.  
Impact: `templates/page.mission.json` now renders hero and game sections; Mission trophy/logo assets were copied into `zoda-shopify-theme/assets/`.

Date: 2026-05-31  
Decision: Start the Mission page as modular OS 2.0 sections with `sections/zoda-mission-hero.liquid`.  
Reason: The Mission page needs a real Shopify JSON template before the more interactive game and playbook sections can be ported safely.  
Impact: `templates/page.mission.json` now exists and renders the editable Mission hero section.

Date: 2026-05-31  
Decision: Add `sections/zoda-ikigai-community.liquid` as the seventh modular Ikigai section.  
Reason: The final Ikigai page area needs editable community messaging, value blocks, and imagery without hardcoding content in a whole-page section.  
Impact: `templates/page.ikigai.json` now renders all seven planned Ikigai page-area sections.

Date: 2026-05-31  
Decision: Add `sections/zoda-ikigai-sustainability.liquid` as the sixth modular Ikigai section.  
Reason: The sustainability story needs its own editable page-area section with the existing motion asset and merchant-editable copy.  
Impact: `templates/page.ikigai.json` now renders hero, intro, pillars, technology, AuraForm, and sustainability; `sustainability-video.mp4` was copied into `zoda-shopify-theme/assets/`.

Date: 2026-05-31  
Decision: Add `sections/zoda-ikigai-auraform.liquid` as the fifth modular Ikigai section.  
Reason: AuraForm needs a dedicated editable spotlight panel before the sustainability story.  
Impact: `templates/page.ikigai.json` now renders hero, intro, pillars, technology, and AuraForm.

Date: 2026-05-31  
Decision: Add `sections/zoda-ikigai-technology.liquid` as the fourth modular Ikigai section.  
Reason: The Ikigai page needs an editable technology story section with the existing three-image media grid and principle accordion.  
Impact: `templates/page.ikigai.json` now renders hero, intro, pillars, and technology; technology media assets were copied into `zoda-shopify-theme/assets/`.

Date: 2026-05-31  
Decision: Add `sections/zoda-ikigai-pillars.liquid` as the third modular Ikigai section.  
Reason: The Ikigai page needs editable Technology, Sustainability, and Community pillar cards before the deeper story sections.  
Impact: `templates/page.ikigai.json` now renders hero, intro, and pillars; each pillar is an editable block with image/copy.

Date: 2026-05-31  
Decision: Add `sections/zoda-ikigai-intro.liquid` as the second modular Ikigai section.  
Reason: The Ikigai intro combines the brand purpose, Vision, and Mission into editable merchant-controlled content.  
Impact: `templates/page.ikigai.json` now renders hero plus intro; Vision and Mission are editable section blocks.

Date: 2026-05-31  
Decision: Start the Ikigai page as modular OS 2.0 sections with `sections/zoda-ikigai-hero.liquid`.  
Reason: Fabrics passed local structural audit and the next page group in the roadmap is Ikigai.  
Impact: `templates/page.ikigai.json` now exists in `zoda-shopify-theme/`; remaining Ikigai page-area sections can be added incrementally.

Date: 2026-05-31  
Decision: Complete a focused local Fabrics page audit before starting Ikigai.  
Reason: The full planned Fabrics page section set was created and needed section reference/schema checks before moving on.  
Impact: All Fabrics section types in `page.fabrics.json` exist and all `zoda-fabrics-*` schemas parse as JSON; Shopify Theme Check and visual/mobile QA remain pending.

Date: 2026-05-31  
Decision: Add `sections/zoda-fabrics-feature.liquid` as the reusable Fabrics detail section.  
Reason: Each fabric needs its own editable detail section, but the theme should not duplicate Liquid for every fabric.  
Impact: `templates/page.fabrics.json` now renders one detail section per fabric; feature accordions are scoped manual toggles so each panel can open and close independently.

Date: 2026-05-31  
Decision: Add `sections/zoda-fabrics-directory.liquid` as the second modular Fabrics page section.  
Reason: The Fabrics page needs a merchant-editable fabric directory before the individual fabric detail sections are added.  
Impact: `templates/page.fabrics.json` now renders hero plus directory; directory cards are manual blocks with fallback image URLs and future path to `fabric_system` metaobjects.

Date: 2026-05-31  
Decision: Start the Fabrics page as modular OS 2.0 sections with `sections/zoda-fabrics-hero.liquid`.  
Reason: The migration plan calls for the Fabrics page to be split into hero, directory, and feature/detail sections instead of a whole-page port.  
Impact: `templates/page.fabrics.json` now exists in `zoda-shopify-theme/`; Fabrics page CSS loads by either page handle or `fabrics` template suffix.

Date: 2026-05-31  
Decision: Complete a focused local homepage audit before starting the next page group.  
Reason: The full planned homepage section set was created and needed reference/schema checks before adding more surface area.  
Impact: All homepage section types in `index.json` exist, all ZODA render snippets exist, and all `zoda-home-*` schemas parse as JSON; Shopify Theme Check still needs to run when CLI/store access is available.

Date: 2026-05-31  
Decision: Add `sections/zoda-home-contact.liquid` as the ninth and final planned modular homepage section.  
Reason: The homepage needs a clear conversion and contact endpoint after reviews.  
Impact: `templates/index.json` now renders the full planned nine-section homepage; social icons use `snippets/zoda-social-icon.liquid`.

Date: 2026-05-31  
Decision: Add `sections/zoda-home-reviews.liquid` as the eighth modular homepage section.  
Reason: The homepage needs a working review/testimonial rail before a live review app is connected.  
Impact: `templates/index.json` now renders eight modular homepage sections; review cards are manual blocks using `snippets/zoda-review-card.liquid` and can later be replaced by app/metaobject data.

Date: 2026-05-31  
Decision: Add `sections/zoda-home-technology.liquid` as the seventh modular homepage section.  
Reason: Zenith Tech needs editable feature summaries and feature callouts, with a later path to reusable `technology_feature` metaobjects.  
Impact: `templates/index.json` now renders seven modular homepage sections; technology feature tabs are controlled by scoped section JavaScript.

Date: 2026-05-31  
Decision: Add `sections/zoda-home-fabrics.liquid` as the sixth modular homepage section.  
Reason: The homepage fabric carousel needs merchant-editable fabric cards now, with a path to `fabric_system` metaobjects later.  
Impact: `templates/index.json` now renders six modular homepage sections; fabric-card active state and progress are controlled by scoped section JavaScript.

Date: 2026-05-31  
Decision: Add `sections/zoda-home-collection.liquid` as the fifth modular homepage section.  
Reason: Collection merchandising is a core homepage commerce area and needs editable panels independent of the old full-circuit script.  
Impact: `templates/index.json` now renders five modular homepage sections; the collection accordion has scoped section-level JavaScript.

Date: 2026-05-31  
Decision: Add `sections/zoda-home-pillars.liquid` as the fourth modular homepage section.  
Reason: Pillars captures the brand standards and proves repeatable editable card blocks with existing circuit styling.  
Impact: `templates/index.json` now renders hero, product motion, mindset, and pillars in sequence; the next homepage section can focus on collections.

Date: 2026-05-31  
Decision: Add `sections/zoda-home-mindset.liquid` as the third modular homepage section.  
Reason: Mindset carries the homepage brand story after the product rail and proves editable repeatable statement blocks.  
Impact: `templates/index.json` now renders hero, product motion, and mindset in sequence; the next homepage section can move into brand pillars.

Date: 2026-05-31  
Decision: Add `sections/zoda-home-product-motion.liquid` as the second modular homepage section.  
Reason: Product motion proves reusable product rendering, collection-based merchandising, rail controls, and quick-add hooks after the hero.  
Impact: `templates/index.json` now renders hero followed by product motion; the next homepage section can focus on brand story/mindset.

Date: 2026-05-31  
Decision: Start homepage migration with `sections/zoda-home-hero.liquid` and a minimal ZODA `templates/index.json`.  
Reason: The hero proves asset loading, section schema, editable content, and the modular homepage direction before porting the rest of the circuit.  
Impact: The Space demo homepage has been replaced in `zoda-shopify-theme/`; remaining homepage sections should be added incrementally as `zoda-home-*`.

Date: 2026-05-31  
Decision: Load ZODA assets conditionally in `zoda-shopify-theme/`.  
Reason: `zoda-tokens.css` affects global `html/body` styling, so loading all ZODA CSS on every Space page could break the base theme before ZODA sections are ready.  
Impact: `zoda-fonts.css` loads globally; tokens/site-light/component/page CSS and ZODA scripts load only for guarded ZODA pages/templates.

Date: 2026-05-31  
Decision: Scaffold `zoda-shopify-theme/` from `incoming/space-theme-extracted/` and copy ZODA foundation assets.  
Reason: Starting from the clean Space base preserves Shopify plumbing while giving ZODA its own final theme folder.  
Impact: Future implementation should happen inside `zoda-shopify-theme/`; next task is safe layout asset wiring and page-specific loading.

Date: 2026-05-31  
Decision: Keep Space theme default sections available in `zoda-shopify-theme/`.  
Reason: Default sections provide merchant flexibility for secondary pages without forcing every page area to be custom-built.  
Impact: Primary ZODA pages should use purpose-made modular sections, while default Space sections remain available unless they conflict with performance, styling, or maintenance goals.

Date: 2026-05-31  
Decision: Use recommended final section counts as the baseline: Homepage 9, Fabrics 3, Ikigai 7, Mission 5, Product 5, Collection 4.  
Reason: This balances Shopify Theme Editor flexibility with maintainability and avoids whole-page mega sections.  
Impact: Final `zoda-shopify-theme/` templates should be built from these modular section groups unless a later implementation constraint requires adjustment.

Date: 2026-05-31  
Decision: Use `incoming/space-theme-extracted/` as the base Shopify theme source.  
Reason: The user identified `space-theme-extracted` as the base theme file/folder.  
Impact: `zoda-shopify-theme/` should be scaffolded from `incoming/space-theme-extracted/`, then ZODA assets and modular sections should be layered in from the Vite/React app.

Date: 2026-05-31  
Decision: Name the final Shopify theme folder `zoda-shopify-theme/`.  
Reason: The name is specific to the brand and clear as the production Shopify theme target.  
Impact: Future theme implementation should be scaffolded in `zoda-shopify-theme/`.

Date: 2026-05-31  
Decision: Define Shopify sections as modular page areas, not whole-page mega sections.  
Reason: The Theme Editor is cleaner when templates assemble multiple focused sections with repeatable blocks.  
Impact: Existing whole-page ports like `circuit-home.liquid` and `zoda-fabrics.liquid` are references/temporary ports; final work should split pages into `zoda-home-*`, `zoda-fabrics-*`, `zoda-ikigai-*`, and `zoda-mission-*` sections.

Date: 2026-05-31  
Decision: Remove invalid `{% render 'zoda-header' %}` from `sections/circuit-home.liquid`.  
Reason: `zoda-header` exists as a section, not a snippet, and the layout already renders `header-group`.  
Impact: Homepage section no longer depends on a missing snippet and avoids duplicate header rendering.

Date: 2026-05-31  
Decision: Use the React app as a design and behavior reference, not as production Shopify runtime code.  
Reason: Shopify Liquid themes cannot directly run React route components, hooks, TanStack Router, or Zustand cart state.  
Impact: Components must be rebuilt as Liquid sections/snippets with scoped vanilla JS.

Date: 2026-05-31  
Decision: Keep generated/copied theme assets during the transition.  
Reason: Removing assets before preview QA could break existing layouts.  
Impact: Cleanup will happen only after asset reference search and Shopify preview verification.

### Decision Template

Date:  
Decision:  
Reason:  
Impact:

## Launch Checklist

- [ ] All templates migrated
- [ ] All sections editable
- [ ] Theme settings configured
- [ ] Metafields configured
- [ ] Metaobjects configured
- [ ] Mobile QA complete
- [ ] Accessibility audit complete
- [ ] SEO validation complete
- [ ] Theme Check passes
- [ ] Performance benchmark achieved
- [ ] Merchant customization tested
- [ ] Cart drawer tested
- [ ] Product variant selection tested
- [ ] Collection filtering/sorting tested
- [ ] Search tested
- [ ] Customer templates tested
- [ ] Unused generated/copied assets removed or intentionally retained
- [ ] Shopify preview approved

## Session Handoff Notes

### Last Completed Task

Created `SHOPIFY_QA_CHECKLIST.md` with theme readiness, template assignment, page, cart, responsive, accessibility, SEO, and performance QA tasks.

### Next Recommended Task

Run Shopify Theme Check and/or upload `zoda-shopify-theme/` to a Shopify preview store, then complete the first QA pass from `SHOPIFY_QA_CHECKLIST.md`.

### Current Blockers

- Shopify preview/store access has not been verified in this tracker.
- Final launch scope for Ikigai, Mission, reviews, and homepage modularity needs confirmation.
- Metafield and metaobject definitions are not yet implemented.

### Notes for Next Session

- Treat `incoming/space-theme-extracted/` as the base theme source; do not modify other `incoming/` material unless the project target changes.
- Keep the React app available as the visual reference until Shopify parity is verified.
- Update this tracker at the end of each migration session with progress percentages, completed components, decisions, and blockers.
