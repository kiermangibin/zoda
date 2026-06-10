# UX Fixes

## Hero Section

- [x] Investigate and fix hero video not loading on mobile.
- [x] Add play/pause button on desktop and mobile and put it on buttom-right of the viewport, position it absolute

## Product Section

- [x] Reduce size swatch dimensions on mobile.
- [x] Make the "Shop The Drop" "See The Fabrics" buttons in one line in mobile, especially if its fit and the button text are not too long.
- [x] Hide in it to win it on mobile
- [x] Fit common size sets on one row where space allows on desktop.
- [x] On mobile, show four full size swatches plus a partial next swatch so horizontal scrolling is obvious.
- [x] If size options exceed available width, keep them on one row and make them horizontally scrollable.
- [ ] Remove the specified mobile-only element.
- [x] Display CTA buttons side-by-side on mobile where space allows.
- [x] Maintain sufficient spacing between buttons for readability.

## Collection Section

- [x] Increase text size of collection tabs description on mobile

## Reviews Section

- [x] Pull and display product image above the product content using headless integration in shopify.
- [x] Move verified badge beside the customer/reviewer name.
- [x] Reduce spacing between product name and review.
- [x] Reduce margin spacing on review name.
- [x] Align review content more consistently toward center.
- [x] Make the review text smaller with a fixed-height area that scrolls vertically when needed.
- [x] Make the product images the same size with a 1:1 ratio.

# Navigation & Interaction

## Fabric Section

- [x] Ensure the **Explore** button links directly to the Fabrics page.

## Sticky/Scroll Sections

- [ ] Review sticky section behavior.
- [ ] Improve scroll progression so users naturally continue through the intended content flow.
- [ ] Investigate issue where scrolling back does not properly return users to the previous section.

## Back Navigation

- [ ] Investigate issue where returning to the previous page or section does not work as expected.

# Content & Copy

## Mobile Content Reduction

- [ ] Review long-form content sections on mobile.
- [ ] Consider removing secondary paragraphs from mobile versions where content becomes too dense.
- [ ] Test simplified content against desktop layout before final implementation.

## Mission / Vision Section

- [ ] Convert Mission & Vision content into a carousel on mobile.
- [ ] Alternative option: show one item at a time instead of displaying both simultaneously.

## AI-Generated Copy Cleanup

- [ ] Review all sections for copy that sounds like internal notes.
- [ ] Rewrite placeholder or internal-sounding content into polished customer-facing copy.

# Typography

## Global Mobile Typography Pass

- [ ] Increase font sizes across the mobile experience.
- [ ] Review all headings for readability.
- [ ] Review all body text for readability.
- [ ] Increase the size of key content blocks that currently feel undersized.
- [ ] Maintain proper visual hierarchy after scaling text.

# Layout & Spacing

## Global Spacing Audit

- [ ] Reduce unnecessary top padding throughout the site.
- [ ] Review vertical spacing consistency across all sections.
- [ ] Improve content alignment.
- [ ] Ensure balanced breathing room without creating excessive whitespace.

## CTA Layout

- [x] Keep buttons on a single row whenever possible.
- [x] Avoid wrapping buttons into multiple lines unless necessary.
- [x] Preserve sufficient spacing between adjacent buttons.

# Community Section

## Community Wordplay Enhancement

- [ ] Explore ways to make the "Community" wordplay more visually obvious.
- [ ] Consider presenting Community-related items in a continuous visual sequence.
- [ ] Alternative: remove current treatment and replace with a cleaner list format.
- [ ] Add square bullets for better visual structure.

# Lists & Bullets

## Consistency Pass

- [ ] Standardize all bullet styles.
- [ ] Replace mixed bullet treatments with square bullets sitewide.

# Homepage Section Reorganization

## Mobile Content Flow

- [ ] Review crowded mobile sections.
- [ ] Relocate homepage elements where necessary to improve flow.
- [ ] Prioritize guiding users through the intended journey instead of forcing interaction with sticky sections.

# Visual QA

## Cropping Issues

- [ ] Fix image/content cropping issue observed in section.
- [ ] Verify all breakpoints for clipping and overflow problems.

## Grid & Card Layouts

- [ ] Review breakpoint behavior causing layout crowding.
- [ ] If necessary, reduce visible items from 4 to 3 on affected breakpoints.
- [ ] Prioritize stability and consistency over fitting additional content.

# Future AI Layout Guidelines

Recurring issues observed in AI-generated layouts that should be included in future prompts:

- [ ] Avoid excessive vertical spacing.
- [ ] Avoid undersized typography on mobile.
- [ ] Keep CTA buttons side-by-side when possible.
- [ ] Do not wrap short button labels unnecessarily.
- [ ] Maintain consistent alignment throughout sections.
- [ ] Prevent orphaned content with large empty spaces.
- [ ] Ensure sticky sections support natural scrolling behavior.
- [ ] Use consistent bullet styles.
- [ ] Prioritize readability over visual experimentation.
- [ ] Avoid placeholder/internal-note copy.
- [ ] Validate all mobile breakpoints before handoff.
- [ ] Verify images and cards are not cropped unexpectedly.
- [ ] Design with scalability in mind, including additional sizes, tags, filters, etc.
- [ ] Keep reviewer badges and metadata grouped logically.
- [ ] Optimize content density separately for desktop and mobile.
- [ ] Always review AI-generated spacing, typography, and alignment before approval.
