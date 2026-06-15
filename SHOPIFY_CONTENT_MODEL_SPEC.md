# Shopify Content Model Spec

## Purpose

This document converts the migration tracker content model into an implementation-ready Shopify metafield and metaobject spec for the final theme in `zoda-shopify-theme/`.

Status: Drafted locally, not created in Shopify yet.

## Implementation Order

1. Create required product metafields under namespace `zoda`.
2. Create required collection metafields under namespace `zoda`.
3. Create optional page metafields under namespace `zoda`.
4. Create reusable metaobjects only when the same content needs to drive multiple pages.
5. Connect the current Space base product/collection sections or future ZODA sections to these definitions.

## Product Metafields

Owner resource: Product  
Namespace: `zoda`

| Name                  | Key                     | Shopify Type                              | Required | Use                                                |
| --------------------- | ----------------------- | ----------------------------------------- | -------- | -------------------------------------------------- |
| Product subtitle      | `subtitle`              | `single_line_text_field`                  | No       | PDP title area and optional product card support.  |
| Product tagline       | `tagline`               | `multi_line_text_field`                   | No       | PDP intro copy.                                    |
| Fabric system         | `fabric_system`         | `metaobject_reference` to `fabric_system` | No       | PDP fabric callout, fabric filters, product cards. |
| Feature bullets       | `feature_bullets`       | `list.single_line_text_field`             | No       | PDP bullet list and accordions.                    |
| Care instructions     | `care_instructions`     | `rich_text_field`                         | No       | PDP care accordion.                                |
| Fit notes             | `fit_notes`             | `rich_text_field`                         | No       | PDP fit and size guidance.                         |
| Size guide page       | `size_guide_page`       | `page_reference`                          | No       | PDP size guide link.                               |
| Size guide file       | `size_guide_file`       | `file_reference`                          | No       | PDP downloadable size guide fallback.              |
| Model measurements    | `model_measurements`    | `multi_line_text_field`                   | No       | PDP model info.                                    |
| Product badges        | `badges`                | `list.single_line_text_field`             | No       | Product cards and PDP badges.                      |
| Sustainability claims | `sustainability_claims` | `list.single_line_text_field`             | No       | PDP sustainability/details accordion.              |
| Technology tags       | `technology_tags`       | `list.single_line_text_field`             | No       | PDP tags such as ZO-Dry, FluidMotion, Zenith Tech. |
| Review label          | `review_label`          | `single_line_text_field`                  | No       | Manual PDP review summary fallback.                |

## Collection Metafields

Owner resource: Collection  
Namespace: `zoda`

| Name                | Key                  | Shopify Type                              | Required | Use                                                |
| ------------------- | -------------------- | ----------------------------------------- | -------- | -------------------------------------------------- |
| Collection subtitle | `subtitle`           | `single_line_text_field`                  | No       | Collection hero below title.                       |
| Hero media          | `hero_media`         | `file_reference`                          | No       | Collection hero image or video.                    |
| Hero copy           | `hero_copy`          | `multi_line_text_field`                   | No       | Collection hero supporting copy.                   |
| Featured fabric     | `featured_fabric`    | `metaobject_reference` to `fabric_system` | No       | Fabric storytelling on collection pages.           |
| Merchandising copy  | `merchandising_copy` | `rich_text_field`                         | No       | Collection content bands.                          |
| SEO intro           | `seo_intro`          | `multi_line_text_field`                   | No       | Merchant-controlled SEO copy near collection grid. |

## Shop Metafields

Owner resource: Shop  
Namespace: `zoda`

| Name                    | Key                       | Shopify Type           | Required | Use                                            |
| ----------------------- | ------------------------- | ---------------------- | -------- | ---------------------------------------------- |
| Featured collection     | `featured_collection`     | `collection_reference` | No       | Homepage/product-motion source if kept global. |
| Free shipping threshold | `free_shipping_threshold` | `number_integer`       | No       | Cart drawer messaging when implemented.        |

## Page Metafields

Owner resource: Page  
Namespace: `zoda`

| Name                | Key                | Shopify Type             | Required | Use                                                 |
| ------------------- | ------------------ | ------------------------ | -------- | --------------------------------------------------- |
| Hero media          | `hero_media`       | `file_reference`         | No       | Optional page-level hero override for brand pages.  |
| Hero eyebrow        | `hero_eyebrow`     | `single_line_text_field` | No       | Optional page hero label.                           |
| SEO support copy    | `seo_support_copy` | `multi_line_text_field`  | No       | Extra copy for search/social context.               |
| Alternate nav label | `nav_label`        | `single_line_text_field` | No       | Shorter navigation labels where page title is long. |

## Metaobjects

### `fabric_system`

Recommended first metaobject to create if reusable data is needed across Fabrics, homepage fabric cards, product references, and collection references.

| Field                    | Type                          | Required | Notes                            |
| ------------------------ | ----------------------------- | -------- | -------------------------------- |
| `name`                   | `single_line_text_field`      | Yes      | Merchant-facing fabric name.     |
| `handle`                 | `single_line_text_field`      | Yes      | Stable key matching fabric slug. |
| `tagline`                | `multi_line_text_field`       | No       | Short fabric positioning copy.   |
| `hero_title`             | `single_line_text_field`      | No       | Fabric detail heading.           |
| `description`            | `multi_line_text_field`       | No       | Long fabric intro.               |
| `swatch_image`           | `file_reference`              | No       | Fabric card/detail image.        |
| `feature_labels`         | `list.single_line_text_field` | No       | Technology badges.               |
| `feature_icons`          | `list.file_reference`         | No       | Optional icon assets.            |
| `performance_bullets`    | `list.single_line_text_field` | No       | Performance accordion/list.      |
| `sustainability_bullets` | `list.single_line_text_field` | No       | Sustainability accordion/list.   |
| `community_copy`         | `multi_line_text_field`       | No       | Community/athlete copy.          |
| `linked_collection`      | `collection_reference`        | No       | Shop link.                       |

### `technology_feature`

| Field        | Type                          | Required | Notes                                  |
| ------------ | ----------------------------- | -------- | -------------------------------------- |
| `name`       | `single_line_text_field`      | Yes      | Feature name.                          |
| `handle`     | `single_line_text_field`      | Yes      | Stable key.                            |
| `short_copy` | `multi_line_text_field`       | No       | Card copy.                             |
| `long_copy`  | `rich_text_field`             | No       | Detail copy.                           |
| `media`      | `file_reference`              | No       | Image/video asset.                     |
| `link`       | `url`                         | No       | Optional product/collection/page link. |
| `tags`       | `list.single_line_text_field` | No       | Related PDP tags.                      |

### `mission_challenge`

Optional. Keep Mission content as section blocks for launch unless the merchant needs reusable campaigns.

| Field            | Type                     | Required | Notes                                         |
| ---------------- | ------------------------ | -------- | --------------------------------------------- |
| `title`          | `single_line_text_field` | Yes      | Challenge label.                              |
| `week`           | `single_line_text_field` | No       | Week/group label.                             |
| `day`            | `number_integer`         | No       | Mission day.                                  |
| `points`         | `single_line_text_field` | No       | Points or reward text.                        |
| `instructions`   | `multi_line_text_field`  | No       | Challenge details.                            |
| `tone`           | `single_line_text_field` | No       | Visual tone token.                            |
| `badge_image`    | `file_reference`         | No       | Optional badge/trophy image.                  |
| `challenge_type` | `single_line_text_field` | No       | start, challenge, bonus, beast, badge, final. |

### `mission_playbook_week`

Optional fallback if the Mission playbook section schema becomes too large.

| Field             | Type                          | Required | Notes                        |
| ----------------- | ----------------------------- | -------- | ---------------------------- |
| `title`           | `single_line_text_field`      | Yes      | Week title.                  |
| `badge`           | `single_line_text_field`      | No       | Week badge label.            |
| `week_number`     | `number_integer`              | No       | Sort/order.                  |
| `checklist_items` | `list.single_line_text_field` | No       | Checklist rows.              |
| `guidance_copy`   | `rich_text_field`             | No       | Optional longer explanation. |
| `final_icon`      | `file_reference`              | No       | Final Mission artwork.       |

### Optional Metaobjects

| Metaobject         | Fields                                                             | Use                                                      |
| ------------------ | ------------------------------------------------------------------ | -------------------------------------------------------- |
| `press_item`       | `publication_name`, `logo`, `quote`, `link`, `sort_order`          | Homepage credibility area.                               |
| `review_highlight` | `quote`, `author`, `product`, `rating`, `source`, `verified_label` | Manual review fallback if no review app is used.         |
| `size_guide`       | `title`, `body`, `measurement_table`, `media`, `product_type`      | PDP size guide if page/file references are insufficient. |

## Launch Recommendation

For the current migration pass, create only these before preview QA if store access is available:

- Product metafields that support PDP copy and details.
- Collection metafields that support hero copy/media.
- `fabric_system` metaobject if fabrics must be reused across page, product, and collection contexts.

Keep Mission and review content as section blocks until the merchant confirms they need reusable content models.
