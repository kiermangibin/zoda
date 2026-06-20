# Shopify QA Checklist

## Source of Truth Update

As of 2026-06-17, QA applies to `zoda-theme-187588706594/` only. `zoda-shopify-theme/` is old/deprecated and must not be used as a reference, donor, merge source, or deploy target.

## Purpose

Use this checklist to prepare and verify `zoda-theme-187588706594/` in Shopify preview before publishing.

Status: In progress. Shopify CLI pull succeeded for `zoda-fit` theme `#187588706594` on June 17, 2026.

## Latest QA Run

Date: June 17, 2026

Store: `zoda-fit.myshopify.com`

Development theme: `#187588706594` (`Website 2.0 [Dev]`)

Preview URL: `https://zoda-fit.myshopify.com?preview_theme_id=187588706594`

CLI notes:

- Shopify CLI is available as `shopify.cmd` on Windows. The plain `shopify` PowerShell shim is blocked by local execution policy.
- `shopify.cmd theme check --path zoda-theme-187588706594 --fail-level error` passed with 0 errors.
- Current accepted warnings are remote asset references, hardcoded route suggestions in inherited/base sections, and the deprecated `helvetica_n7` default font warning.
- `shopify.cmd theme dev --store zoda-fit --theme 187588706594 --path zoda-theme-187588706594` is pending Shopify CLI device-login approval.

Live route status:

- Pending fresh Shopify preview QA after CLI auth.

Local structure status:

- Required theme folders exist.
- `index.json`, `page.fabrics.json`, `page.ikigai.json`, `product.json`, `collection.json`, and `list-collections.json` all reference existing section files.
- `asset_url` Liquid references resolve to files in `zoda-theme-187588706594/assets/`.
- Structural audit confirms no missing section, snippet, asset, or JSON-template references.

## Theme Readiness

- [x] Confirm `zoda-theme-187588706594/` is the upload/preview folder.
- [x] Confirm required Shopify folders exist: `assets/`, `config/`, `layout/`, `locales/`, `sections/`, `snippets/`, `templates/`.
- [x] Run Shopify Theme Check when Shopify CLI/theme tooling is available.
- [x] Confirm no missing section, snippet, or asset references after any new edits.
- [x] Confirm `zoda-globals.css` remains unloaded unless it is converted to safe compiled CSS.
- [ ] Confirm generated/copied bundles in `zoda-theme-187588706594/assets/` are intentionally retained until preview confirms whether they are still needed.

## Template Assignment

Assign these Shopify page templates in the admin before preview QA:

- [ ] Fabrics page uses `page.fabrics`. Blocked: `/pages/fabrics` currently returns `404` in preview.
- [ ] Our Ikigai page uses `page.ikigai`. Blocked: `/pages/ikigai` currently returns `404` in preview.
- [x] Mission page is out of scope for this pulled theme; no `page.mission` template exists in `zoda-theme-187588706594/`.
- [x] Homepage uses `templates/index.json`.
- [x] Product pages can remain on default `product.json` for this phase.
- [x] Collection pages can remain on default `collection.json` for this phase.
- [x] Collections directory uses `list-collections.json`.

## Page QA

### Homepage

- [ ] Hero renders with intended copy, CTAs, and media.
- [ ] Product motion rail renders products from the selected collection.
- [ ] Product quick-add opens the ZODA cart drawer.
- [ ] Mindset, pillars, collection, fabrics, technology, reviews, and contact sections render in order.
- [ ] Homepage circuit interactions work on desktop.
- [ ] Homepage mobile layout has no cut-off content or overlapping text.

### Fabrics

- [ ] Hero renders correctly.
- [ ] Directory cards link/scroll to the intended fabric sections.
- [ ] Each fabric feature section renders media, copy, CTAs, and accordion content.
- [ ] Fabric accordions can be opened and manually closed.
- [ ] Mobile view shows all content without clipping.

### Our Ikigai

- [ ] Hero, intro, pillars, technology, AuraForm, sustainability, and community sections render in order.
- [ ] Technology accordion works.
- [ ] Sustainability video loads and does not block content visibility.
- [ ] Community images load.
- [ ] Mobile view shows all content without clipping.

### Product Pages

- [ ] Default Space product page renders product media, title, price, options, add-to-cart, description, accordions, recommendations, and recent products.
- [ ] Variant selection works.
- [ ] Add-to-cart works.
- [ ] Product page does not incorrectly load ZODA PDP CSS unless using a future guarded ZODA product template.

### Collection Pages

- [ ] Collection banner renders title/copy.
- [ ] Product grid renders products.
- [ ] Filters work.
- [ ] Sorting behaviour matches settings.
- [ ] Pagination or infinite load behaviour works if enabled by the base theme.

### Cart

- [ ] ZODA cart drawer renders on guarded ZODA pages.
- [ ] Quick-add adds item through Shopify AJAX Cart API.
- [ ] Cart drawer refreshes from `zoda-cart-drawer-fragment`.
- [ ] Quantity increase works.
- [ ] Quantity decrease works.
- [ ] Remove works.
- [ ] Checkout button routes to Shopify checkout.
- [ ] Cart count updates after add/remove.

## Theme Editor QA

- [ ] Homepage sections are editable and reorderable.
- [ ] Fabrics sections expose useful settings/blocks.
- [ ] Ikigai sections expose useful settings/blocks.
- [ ] Mission sections expose useful settings/blocks.
- [ ] Product motion collection setting works.
- [ ] Review/contact/social settings are editable.
- [ ] Empty states are acceptable when optional blocks are removed.

## Responsive QA

Test at minimum:

- [ ] 360px mobile width.
- [ ] 390px mobile width.
- [ ] 430px mobile width.
- [ ] 768px tablet width.
- [ ] 1024px desktop width.
- [ ] 1440px desktop width.

For every viewport:

- [ ] No clipped content.
- [ ] No incoherent overlap.
- [ ] Buttons remain tappable/clickable.
- [ ] Text fits in buttons/cards.
- [ ] Videos and images render.
- [ ] Sticky/header/cart layers do not block content.

## Browser QA

- [ ] Chrome.
- [ ] Safari.
- [ ] Firefox.
- [ ] iOS Safari.
- [ ] Android Chrome.

## Accessibility QA

- [ ] Keyboard focus is visible.
- [ ] Cart drawer can be opened and closed by keyboard.
- [ ] Accordions and interactive buttons expose useful labels/states.
- [ ] Image alt text is present where needed.
- [ ] Decorative images are empty-alt or hidden.
- [ ] Color contrast is acceptable on dark sections.

## SEO QA

- [ ] Each key page has a title and description.
- [ ] Product pages use Shopify product structured data from the base theme.
- [ ] Brand pages have sensible H1 usage.
- [ ] No duplicate H1s introduced by custom sections where avoidable.
- [ ] Collection SEO copy/metafields are planned before launch if needed.

## Performance QA

- [ ] Unused ZODA page CSS is not loaded globally.
- [ ] Large images use Shopify `image_url` where possible.
- [ ] Video assets are reasonable in size and autoplay muted.
- [ ] Console has no recurring JavaScript errors.
- [ ] Lighthouse/performance check run after preview is available.

## Known Blockers

- Fabrics and Ikigai Shopify pages need fresh preview QA after CLI auth. If the routes do not exist, create pages with handles `fabrics` and `ikigai` in Shopify Admin, then assign the matching templates.
- Mission is out of scope for theme `#187588706594`; no `page.mission` template exists in the pulled active theme.
- Metafield/metaobject definitions are specified in `SHOPIFY_CONTENT_MODEL_SPEC.md` but not created in Shopify.
- Product and collection pages intentionally remain on Space base sections for this phase.
- Visual QA for custom brand pages cannot be completed until their Shopify pages exist in preview.

## QA Sign-Off

| Area                 | Status  | Notes |
| -------------------- | ------- | ----- |
| Theme upload/preview | Partial | Local validation is passing; Shopify preview is pending CLI device-login approval. |
| Homepage             | Pending | Visual and interaction QA still needed in Shopify preview. |
| Fabrics              | Pending | Template references resolve locally; live page route/template QA still needed. |
| Ikigai               | Pending | Template references resolve locally; live page route/template QA still needed. |
| Mission              | Deferred | Out of scope for theme `#187588706594`; no pulled active template exists. |
| Product pages        | Pending | Template references resolve locally; live product flow QA still needed. |
| Collection pages     | Partial | `/collections` preview route returns 200; visual/filter/sort QA still needed. |
| Cart/checkout        | Pending | Markup and assets present; live AJAX cart/checkout QA still needed. |
| Theme editor         | Pending | Section schemas exist locally; Theme Editor QA still needed. |
| Mobile               | Pending | Responsive visual QA still needed. |
| Accessibility        | Pending | Static markup has labels/states in key areas; keyboard and contrast QA still needed. |
| SEO                  | Pending | Local structure needs live rendered-page review. |
| Performance          | Pending | Theme Check is clean; Lighthouse/console QA still needed. |
