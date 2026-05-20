import { storefrontApiRequest } from "./shopify";
import { deriveSwatches, type Swatch } from "./swatches";

export interface ProductVariantSummary {
  id: string;
  available: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
  image: string | null;
  price: { amount: string; currencyCode: string } | null;
}

export interface CollectionProduct {
  id: string;
  handle: string;
  title: string;
  imageUrl: string | null;
  imageAlt: string | null;
  price: { amount: string; currencyCode: string } | null;
  firstVariantId: string | null;
  swatches: Swatch[];
  options: Array<{ name: string; values: string[] }>;
  variants: ProductVariantSummary[];
}

export interface CollectionData {
  handle: string;
  title: string;
  description: string;
  products: CollectionProduct[];
}

const QUERY = `
  query CollectionByHandle($handle: String!) {
    collection(handle: $handle) {
      handle
      title
      description
      products(first: 36) {
        edges {
          node {
            id
            handle
            title
            featuredImage { url altText }
            priceRange { minVariantPrice { amount currencyCode } }
            options { name values }
            variants(first: 50) {
              edges {
                node {
                  id
                  availableForSale
                  price { amount currencyCode }
                  selectedOptions { name value }
                  image { url altText }
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface RawVariantNode {
  id: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string } | null;
  selectedOptions: Array<{ name: string; value: string }>;
  image: { url: string; altText: string | null } | null;
}

interface RawNode {
  id: string;
  handle: string;
  title: string;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } } | null;
  options: Array<{ name: string; values: string[] }>;
  variants: { edges: Array<{ node: RawVariantNode }> };
}

interface QueryResult {
  collection: {
    handle: string;
    title: string;
    description: string;
    products: { edges: Array<{ node: RawNode }> };
  } | null;
}

export function toProductSummary(node: RawNode): CollectionProduct {
  const variants = node.variants.edges.map((ve) => ve.node);
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    imageUrl: node.featuredImage?.url ?? null,
    imageAlt: node.featuredImage?.altText ?? node.title,
    price: node.priceRange?.minVariantPrice ?? null,
    firstVariantId: variants[0]?.id ?? null,
    swatches: deriveSwatches(node.options, variants),
    options: node.options ?? [],
    variants: variants.map((v) => ({
      id: v.id,
      available: v.availableForSale,
      selectedOptions: v.selectedOptions,
      image: v.image?.url ?? null,
      price: v.price,
    })),
  };
}

export async function getCollectionByHandle(handle: string): Promise<CollectionData | null> {
  const data = await storefrontApiRequest<QueryResult>(QUERY, { handle });
  const c = data.collection;
  if (!c) return null;
  return {
    handle: c.handle,
    title: c.title,
    description: c.description ?? "",
    products: c.products.edges.map((e) => toProductSummary(e.node)),
  };
}
