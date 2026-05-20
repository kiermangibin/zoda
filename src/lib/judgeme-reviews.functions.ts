import { createServerFn } from "@tanstack/react-start";

export interface JudgemeReview {
  id: string;
  rating: number;
  body: string;
  reviewerName: string;
  verified: boolean;
  productTitle: string;
  productHandle: string | null;
  productUrl: string;
  imageUrl: string | null;
  createdAt: string | null;
}

const SHOP_DOMAIN = "zoda-holdings-pte-ltd.myshopify.com";
const SHOP_URL = "https://zoda.sg";
const ENDPOINT = "https://cdn.judge.me/reviews/reviews_for_carousel";

function decode(s: string): string {
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

interface RawReview {
  uuid: string;
  rating: number;
  body?: string;
  body_html?: string;
  reviewer_name?: string;
  verified_buyer?: boolean;
  product_title?: string;
  product_url?: string;
  picture_urls?: string[];
  pictures?: Array<{ urls?: { original?: string; compact?: string; huge?: string } }>;
  created_at?: string;
}

function pickImage(r: RawReview): string | null {
  if (Array.isArray(r.picture_urls) && r.picture_urls.length > 0) {
    return r.picture_urls[0];
  }
  if (Array.isArray(r.pictures) && r.pictures.length > 0) {
    const u = r.pictures[0]?.urls;
    return u?.compact ?? u?.original ?? u?.huge ?? null;
  }
  return null;
}

export const getJudgemeReviews = createServerFn({ method: "GET" }).handler(
  async (): Promise<JudgemeReview[]> => {
    const params = new URLSearchParams({
      reviews_selection: "all",
      carousel_type: "testimonials",
      star_rating: "5_star",
      max_reviews: "30",
      url: SHOP_URL,
      shop_domain: SHOP_DOMAIN,
      platform: "shopify",
      primary_language: "en",
    });
    try {
      const res = await fetch(`${ENDPOINT}?${params.toString()}`, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) return [];
      const json = (await res.json()) as { reviews?: RawReview[] };
      const reviews = json.reviews ?? [];
      return reviews
        .map((r): JudgemeReview => {
          const body = r.body && r.body.trim().length > 0 ? r.body : decode(r.body_html ?? "");
          const url = r.product_url ?? "";
          const handleMatch = url.match(/\/products\/([^/?#]+)/);
          return {
            id: r.uuid,
            rating: Number(r.rating) || 5,
            body: decode(body),
            reviewerName: (r.reviewer_name ?? "").trim(),
            verified: Boolean(r.verified_buyer),
            productTitle: decode(r.product_title ?? ""),
            productHandle: handleMatch ? handleMatch[1] : null,
            productUrl: url.startsWith("http") ? url : `${SHOP_URL}${url}`,
            imageUrl: pickImage(r),
            createdAt: r.created_at ?? null,
          };
        })
        .filter((r) => r.body.length > 0 && r.reviewerName.length > 0);
    } catch {
      return [];
    }
  },
);
