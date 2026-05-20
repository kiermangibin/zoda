import { storefrontApiRequest } from "./shopify";
import { type CollectionProduct, toProductSummary } from "./collection";

export type FeaturedProduct = CollectionProduct;

export interface FeaturedCollection {
  handle: string | null;
  title: string;
  source: "metafield" | "new-arrivals" | "all-products" | "empty";
  products: FeaturedProduct[];
}

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
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
`;

const QUERY = `
  ${PRODUCT_FRAGMENT}
  query FeaturedCollection {
    shop {
      metafield(namespace: "zoda", key: "featured_collection") {
        reference {
          ... on Collection {
            handle
            title
            products(first: 12) { edges { node { ...ProductFields } } }
          }
        }
      }
    }
    fallback: collection(handle: "new-arrivals") {
      handle
      title
      products(first: 12) { edges { node { ...ProductFields } } }
    }
    generic: products(first: 12) { edges { node { ...ProductFields } } }
  }
`;

type Edge = { node: Parameters<typeof toProductSummary>[0] };
type Coll = { handle: string; title: string; products: { edges: Edge[] } };
type QueryResult = {
  shop: { metafield: { reference: Coll | null } | null };
  fallback: Coll | null;
  generic: { edges: Edge[] };
};

function toProducts(edges: Edge[]): FeaturedProduct[] {
  return edges.map((e) => toProductSummary(e.node));
}

export async function getFeaturedCollection(): Promise<FeaturedCollection> {
  const data = await storefrontApiRequest<QueryResult>(QUERY);
  const metaColl = data.shop?.metafield?.reference;
  if (metaColl && metaColl.products.edges.length > 0) {
    return { handle: metaColl.handle, title: metaColl.title, source: "metafield", products: toProducts(metaColl.products.edges) };
  }
  const fallback = data.fallback;
  if (fallback && fallback.products.edges.length > 0) {
    return { handle: fallback.handle, title: fallback.title, source: "new-arrivals", products: toProducts(fallback.products.edges) };
  }
  if (data.generic.edges.length > 0) {
    return { handle: null, title: "All products", source: "all-products", products: toProducts(data.generic.edges) };
  }
  return { handle: null, title: "", source: "empty", products: [] };
}
