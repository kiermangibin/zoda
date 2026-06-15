# Shopify QA Checklist

## Purpose

Use this checklist to prepare and verify `zoda-shopify-theme/` in Shopify preview before publishing.

Status: Drafted locally. Shopify preview/store access has not been verified yet.

## Theme Readiness

- [ ] Confirm `zoda-shopify-theme/` is the upload/preview folder.
- [ ] Confirm required Shopify folders exist: `assets/`, `config/`, `layout/`, `locales/`, `sections/`, `snippets/`, `templates/`.
- [ ] Run Shopify Theme Check when Shopify CLI/theme tooling is available.
- [ ] Confirm no missing section, snippet, or asset references after any new edits.
- [ ] Confirm `zoda-globals.css` remains unloaded unless it is converted to safe compiled CSS.
- [ ] Confirm generated/copied bundles in `zoda-shopify-theme/assets/` are intentionally retained until preview confirms whether they are still needed.

## Template Assignment

Assign these Shopify page templates in the admin before preview QA:

- [ ] Fabrics page uses `page.fabrics`.
- [ ] Our Ikigai page uses `page.ikigai`.
- [ ] Mission page uses `page.mission`.
- [ ] Homepage uses `templates/index.json`.
- [ ] Product pages can remain on default `product.json` for this phase.
- [ ] Collection pages can remain on default `collection.json` for this phase.
- [ ] Collections directory uses `list-collections.json`.

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

### Mission

- [ ] Hero video loads.
- [ ] Mission board spaces update the detail panel.
- [ ] Start Mission stores mission state in the browser.
- [ ] Playbook previous/next controls work.
- [ ] Playbook dots work.
- [ ] Playbook checklist items persist after reload.
- [ ] Inclusions and materials sections render correctly.
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
- [ ] Sorting behavior matches settings.
- [ ] Pagination or infinite load behavior works if enabled by the base theme.

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

- Shopify preview/store access has not been verified.
- Shopify Theme Check has not been run locally.
- Metafield/metaobject definitions are specified in `SHOPIFY_CONTENT_MODEL_SPEC.md` but not created in Shopify.
- Product and collection pages intentionally remain on Space base sections for this phase.
- Visual QA cannot be completed until the theme is previewed with real store data.

## QA Sign-Off

| Area                 | Status  | Notes |
| -------------------- | ------- | ----- |
| Theme upload/preview | Pending |       |
| Homepage             | Pending |       |
| Fabrics              | Pending |       |
| Ikigai               | Pending |       |
| Mission              | Pending |       |
| Product pages        | Pending |       |
| Collection pages     | Pending |       |
| Cart/checkout        | Pending |       |
| Theme editor         | Pending |       |
| Mobile               | Pending |       |
| Accessibility        | Pending |       |
| SEO                  | Pending |       |
| Performance          | Pending |       |
