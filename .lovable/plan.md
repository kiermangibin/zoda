## Goal

Make `.zoda-fabrics-directory__grid .zoda-fabrics-card` ratios responsive per the spec, and guarantee the Directory snap section (100svh, no inner scroll) fits cards + heading + flip-back content cleanly on desktop, tablet, and mobile.

## Current state (site-light.css)

- Snap section: `.zoda-fabrics-snap__section { height: 100svh; overflow: hidden; }` — strict viewport fit.
- Grid columns: 2 → 3 (≥720) → 4 (≥1024). Already correct, keep.
- Card aspect ratios (to be replaced):
  - base `3/4`, ≥720 `3/4`, ≥1024 `4/5`, ≥1400 `3/4`
  - mobile override `4/5`
- Card name `clamp(18px, 1.8vw, 26px)`, back-eyebrow `16px`, back-text clamped at 6 lines (recent change — keep).

## Changes (src/styles/site-light.css only)

### 1. Card aspect ratios (lines 1058–1067)

Replace the existing aspect-ratio rules with three breakpoints matching the spec:

```css
/* ≤760px: fluid — taller portrait so 2-col cards stay readable, capped by grid height */
.zoda-fabrics-directory__grid .zoda-fabrics-card {
  aspect-ratio: 3 / 4;
  min-width: 0;
  min-height: 0;
}
/* ≥720px (tablet, 3 columns): 4/5 portrait */
@media (min-width: 720px) {
  .zoda-fabrics-directory__grid .zoda-fabrics-card {
    aspect-ratio: 4 / 5;
  }
}
/* ≥1024px (desktop, 4 columns): 5/4 landscape */
@media (min-width: 1024px) {
  .zoda-fabrics-directory__grid .zoda-fabrics-card {
    aspect-ratio: 5 / 4;
  }
}
```

(Spec note: 720–760px overlap — 720 wins because it sets the tablet 3-col layout. Below 720, the card stays in the fluid 2-col portrait that already adapts via `min-height: 0` + grid container clamp below.)

### 2. Constrain grid to snap section height (line 1045 block)

Ensure the grid never pushes the section past 100svh, so the directory snap stays clean regardless of card ratio:

```css
.zoda-fabrics-directory__grid {
  /* existing rules kept */
  flex: 1 1 auto;
  min-height: 0;
  max-height: 100%;
  align-content: center;
}
```

Cards inside a height-bounded grid will shrink to fit while preserving the new aspect-ratio when there is room.

### 3. Mobile override (line 1854)

Update the small-screen override to match the new fluid behavior (keep 3/4, do not force 4/5 which is too tall at 2 columns on small phones with the heading + safe area):

```css
@media (max-width: 760px) {
  .zoda-fabrics-directory__grid .zoda-fabrics-card {
    aspect-ratio: 3 / 4;
  }
}
```

### 4. Flip-back fit safety

Keep the existing back-face rules (padding `clamp(14px, 2.2vw, 28px)`, gap clamp, `overflow: hidden`, back-text 6-line clamp). No further trimming needed once the card is height-bounded — back content already lives inside the card box. If QA still shows clipping on the smallest phones, tighten `.zoda-fabrics-card__back-text` `-webkit-line-clamp` to `5` at `max-width: 480px`.

## Verification

- Browser preview at desktop 1364w, tablet 820w, mobile 390w on `/fabrics`.
- For each: confirm the Directory snap section equals viewport height with no inner scrollbar and no clipped cards; hover/tap a card to confirm flip-back eyebrow + text + accordion area fit without overflow.
- Confirm hero + feature snap sections are untouched (no rules changed outside the Directory block).
