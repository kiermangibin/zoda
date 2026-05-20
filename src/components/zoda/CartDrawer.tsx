import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Minus, Plus, X, ShoppingBag, Loader2, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";

function formatMoney(amount: string, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(Number(amount));
  } catch {
    return `${currency} ${Number(amount).toFixed(2)}`;
  }
}

const FREE_SHIPPING_THRESHOLD = 75;

export function CartDrawer() {
  const { items, isOpen, isLoading, isSyncing, setOpen, updateQuantity, removeItem, checkoutUrl, syncCart } =
    useCartStore();

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const currency = items[0]?.price.currencyCode ?? "USD";
  const total = items.reduce((s, i) => s + Number(i.price.amount) * i.quantity, 0);

  const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
  const progress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="zoda-cart-drawer zoda-cart-drawer--light flex w-full flex-col p-0 sm:max-w-[440px]">
        <SheetHeader className="zoda-cart-drawer__head">
          <div className="flex items-center justify-between">
            <SheetTitle className="zoda-cart-drawer__title">
              Cart <span className="zoda-cart-drawer__count">{totalItems}</span>
            </SheetTitle>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close cart"
              className="zoda-cart-drawer__close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <SheetDescription className="sr-only">
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? "s" : ""} in cart`}
          </SheetDescription>

          {items.length > 0 ? (
            <div className="zoda-cart-drawer__ship">
              <p className="zoda-cart-drawer__ship-text">
                {remainingForFreeShip > 0 ? (
                  <>
                    You're <strong>{formatMoney(String(remainingForFreeShip), currency)}</strong> away from free shipping.
                  </>
                ) : (
                  <>Congrats — you've unlocked free shipping.</>
                )}
              </p>
              <div className="zoda-cart-drawer__ship-bar" aria-hidden>
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>
          ) : null}
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col">
          {items.length === 0 ? (
            <div className="zoda-cart-drawer__empty">
              <ShoppingBag className="h-10 w-10" />
              <p className="zoda-cart-drawer__empty-title">Your cart is empty.</p>
              <p className="zoda-cart-drawer__empty-sub">Start with a hero piece — explore the latest drop.</p>
              <button
                type="button"
                className="zoda-cart-drawer__empty-cta"
                onClick={() => setOpen(false)}
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <>
              <div className="zoda-cart-drawer__list">
                {items.map((it) => (
                  <article key={it.variantId} className="zoda-cart-drawer__item">
                    <div className="zoda-cart-drawer__item-thumb">
                      {it.imageUrl ? <img src={it.imageUrl} alt={it.productTitle} /> : null}
                    </div>
                    <div className="zoda-cart-drawer__item-body">
                      <div className="zoda-cart-drawer__item-head">
                        <div className="min-w-0">
                          <p className="zoda-cart-drawer__item-title">{it.productTitle}</p>
                          {it.variantTitle && it.variantTitle !== "Default Title" ? (
                            <p className="zoda-cart-drawer__item-variant">{it.variantTitle}</p>
                          ) : null}
                        </div>
                        <p className="zoda-cart-drawer__item-price">
                          {formatMoney(String(Number(it.price.amount) * it.quantity), it.price.currencyCode)}
                        </p>
                      </div>
                      <div className="zoda-cart-drawer__item-foot">
                        <div className="zoda-cart-drawer__qty">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() => updateQuantity(it.variantId, it.quantity - 1)}
                            className="zoda-cart-drawer__qty-btn"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="zoda-cart-drawer__qty-val">{it.quantity}</span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() => updateQuantity(it.variantId, it.quantity + 1)}
                            className="zoda-cart-drawer__qty-btn"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(it.variantId)}
                          className="zoda-cart-drawer__remove"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="zoda-cart-drawer__footer">
                <div className="zoda-cart-drawer__totals">
                  <div className="zoda-cart-drawer__totals-row">
                    <span>Subtotal</span>
                    <span>{formatMoney(String(total), currency)}</span>
                  </div>
                  <p className="zoda-cart-drawer__totals-note">
                    Taxes and shipping calculated at checkout.
                  </p>
                </div>
                <button
                  type="button"
                  className="zoda-cart-drawer__checkout"
                  disabled={isLoading || isSyncing || !checkoutUrl}
                  onClick={() => {
                    if (checkoutUrl) {
                      window.open(checkoutUrl, "_blank");
                      setOpen(false);
                    }
                  }}
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Checkout · {formatMoney(String(total), currency)}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
