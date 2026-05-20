export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "zoda-holdings-pte-ltd.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = "69994e070da960ea33c6d135592bf2d7";

export async function storefrontApiRequest<T = any>(
  query: string,
  variables: Record<string, any> = {},
): Promise<T> {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify HTTP ${response.status}`);
  }
  const data = await response.json();
  if (data.errors) {
    throw new Error(`Shopify: ${data.errors.map((e: any) => e.message).join(", ")}`);
  }
  return data.data as T;
}
