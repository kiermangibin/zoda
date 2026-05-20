import { storefrontApiRequest } from "./shopify";

export interface CartLineItem {
  lineId: string | null;
  variantId: string;
  productHandle: string;
  productTitle: string;
  variantTitle: string;
  imageUrl: string | null;
  price: { amount: string; currencyCode: string };
  quantity: number;
}

const CART_CREATE = `mutation cartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart { id checkoutUrl lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } } }
    userErrors { field message }
  }
}`;

const CART_LINES_ADD = `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart { id lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } } }
    userErrors { field message }
  }
}`;

const CART_LINES_UPDATE = `mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { id } userErrors { field message } }
}`;

const CART_LINES_REMOVE = `mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { id } userErrors { field message } }
}`;

export const CART_QUERY = `query cart($id: ID!) { cart(id: $id) { id totalQuantity } }`;

function formatCheckoutUrl(url: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set("channel", "online_store");
    return u.toString();
  } catch {
    return url;
  }
}

function isCartNotFound(errs: Array<{ message: string }>) {
  return errs.some((e) => /cart not found|does not exist/i.test(e.message));
}

export async function createCart(item: CartLineItem) {
  const data = await storefrontApiRequest<any>(CART_CREATE, {
    input: { lines: [{ quantity: item.quantity, merchandiseId: item.variantId }] },
  });
  const errs = data?.cartCreate?.userErrors ?? [];
  if (errs.length) {
    console.error("cartCreate errors", errs);
    return null;
  }
  const cart = data?.cartCreate?.cart;
  const lineId = cart?.lines?.edges?.[0]?.node?.id;
  if (!cart?.checkoutUrl || !lineId) return null;
  return { cartId: cart.id as string, checkoutUrl: formatCheckoutUrl(cart.checkoutUrl), lineId: lineId as string };
}

export async function addLine(cartId: string, item: CartLineItem) {
  const data = await storefrontApiRequest<any>(CART_LINES_ADD, {
    cartId,
    lines: [{ quantity: item.quantity, merchandiseId: item.variantId }],
  });
  const errs = data?.cartLinesAdd?.userErrors ?? [];
  if (isCartNotFound(errs)) return { success: false, cartNotFound: true } as const;
  if (errs.length) return { success: false } as const;
  const lines = data?.cartLinesAdd?.cart?.lines?.edges ?? [];
  const newLine = lines.find((l: any) => l.node.merchandise.id === item.variantId);
  return { success: true, lineId: newLine?.node?.id as string | undefined } as const;
}

export async function updateLine(cartId: string, lineId: string, quantity: number) {
  const data = await storefrontApiRequest<any>(CART_LINES_UPDATE, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });
  const errs = data?.cartLinesUpdate?.userErrors ?? [];
  if (isCartNotFound(errs)) return { success: false, cartNotFound: true } as const;
  return { success: errs.length === 0 } as const;
}

export async function removeLine(cartId: string, lineId: string) {
  const data = await storefrontApiRequest<any>(CART_LINES_REMOVE, { cartId, lineIds: [lineId] });
  const errs = data?.cartLinesRemove?.userErrors ?? [];
  if (isCartNotFound(errs)) return { success: false, cartNotFound: true } as const;
  return { success: errs.length === 0 } as const;
}
