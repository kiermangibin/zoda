import { Link } from "@tanstack/react-router";
import { Loader2, Check } from "lucide-react";
import { useMemo, useState } from "react";

import type { CollectionProduct } from "@/lib/collection";
import { useCartStore } from "@/stores/cartStore";

function formatMoney(amount: string, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(Number(amount));
  } catch {
    return `${currency} ${Number(amount).toFixed(2)}`;
  }
}

function isColor(n: string) { return /colou?r/i.test(n); }
function isSize(n: string) { return /size/i.test(n); }

export function ProductCard({ p }: { p: CollectionProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const open = useCartStore((s) => s.open);
  const isLoading = useCartStore((s) => s.isLoading);
  const [adding, setAdding] = useState<string | null>(null);

  const colorOpt = useMemo(() => p.options.find((o) => isColor(o.name)), [p.options]);
  const sizeOpt = useMemo(() => p.options.find((o) => isSize(o.name)), [p.options]);

  // Selected color defaults to the first swatch value
  const initialColor = p.swatches[0]?.value ?? colorOpt?.values[0] ?? null;
  const [selectedColor, setSelectedColor] = useState<string | null>(initialColor);

  // Image follows the selected color
  const displayImage = useMemo(() => {
    if (selectedColor) {
      const sw = p.swatches.find((s) => s.value === selectedColor);
      if (sw?.image) return sw.image;
      const v = p.variants.find((v) =>
        colorOpt && v.selectedOptions.some((o) => o.name === colorOpt.name && o.value === selectedColor),
      );
      if (v?.image) return v.image;
    }
    return p.imageUrl;
  }, [selectedColor, p.swatches, p.variants, p.imageUrl, colorOpt]);

  // Sizes for the active color
  const sizes = useMemo(() => {
    if (!sizeOpt) return [] as Array<{ value: string; available: boolean; variantId: string | null }>;
    return sizeOpt.values.map((value) => {
      const variant = p.variants.find((v) => {
        const sizeMatch = v.selectedOptions.some((o) => o.name === sizeOpt.name && o.value === value);
        const colorMatch = !colorOpt || !selectedColor
          ? true
          : v.selectedOptions.some((o) => o.name === colorOpt.name && o.value === selectedColor);
        return sizeMatch && colorMatch;
      });
      return {
        value,
        available: Boolean(variant?.available),
        variantId: variant?.id ?? null,
      };
    });
  }, [sizeOpt, colorOpt, selectedColor, p.variants]);

  const handleAdd = async (e: React.MouseEvent, variantId: string | null, sizeLabel: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variantId || !p.price) return;
    const variant = p.variants.find((v) => v.id === variantId);
    const colorLabel = selectedColor ?? "";
    const variantTitle = [colorLabel, sizeLabel].filter(Boolean).join(" / ");
    setAdding(variantId);
    try {
      await addItem({
        variantId,
        productHandle: p.handle,
        productTitle: p.title,
        variantTitle,
        imageUrl: displayImage,
        price: variant?.price ?? p.price,
        quantity: 1,
      });
      open();
    } finally {
      setAdding(null);
    }
  };

  // Fallback: no sizes — single quick add
  const quickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!p.firstVariantId || !p.price) return;
    setAdding(p.firstVariantId);
    try {
      await addItem({
        variantId: p.firstVariantId,
        productHandle: p.handle,
        productTitle: p.title,
        variantTitle: selectedColor ?? "",
        imageUrl: displayImage,
        price: p.price,
        quantity: 1,
      });
      open();
    } finally {
      setAdding(null);
    }
  };

  return (
    <Link
      to="/product/$handle"
      params={{ handle: p.handle }}
      className="zoda-product-card"
      aria-label={p.title}
    >
      <div className="zoda-product-card__media">
        {displayImage ? <img src={displayImage} alt={p.imageAlt ?? p.title} loading="lazy" /> : null}

        {sizes.length > 0 ? (
          <div className="zoda-product-card__sizes" role="group" aria-label="Quick add — choose a size">
            <span className="zoda-product-card__sizes-label">Quick add</span>
            <div className="zoda-product-card__sizes-row">
              {sizes.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  className={`zoda-product-card__size${!s.available ? " is-unavailable" : ""}${adding === s.variantId ? " is-loading" : ""}`}
                  disabled={!s.available || !s.variantId || isLoading}
                  onClick={(e) => handleAdd(e, s.variantId, s.value)}
                  aria-label={`Add ${p.title} — ${selectedColor ?? ""} ${s.value} to cart`}
                >
                  {adding === s.variantId ? <Loader2 className="h-3 w-3 animate-spin" /> : s.value}
                </button>
              ))}
            </div>
          </div>
        ) : p.firstVariantId ? (
          <button
            type="button"
            onClick={quickAdd}
            disabled={isLoading}
            className="zoda-product-card__quick-add"
            aria-label={`Quick add ${p.title} to cart`}
          >
            {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Quick Add"}
          </button>
        ) : null}
      </div>
      <div className="zoda-product-card__body">
        {p.swatches.length > 1 ? (
          <div
            className="zoda-product-card__swatches"
            aria-label={`Colour — ${selectedColor ?? p.swatches[0]?.label ?? ""}`}
          >
            {p.swatches.slice(0, 6).map((sw) => {
              const isActive = sw.value === selectedColor;
              return (
                <button
                  key={sw.value}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedColor(sw.value);
                  }}
                  className={`zoda-product-card__swatch${isActive ? " is-active" : ""}`}
                  title={sw.label}
                  aria-label={sw.label}
                  aria-pressed={isActive}
                  style={{
                    background: sw.color
                      ? sw.color
                      : sw.image
                        ? `center / cover no-repeat url(${sw.image})`
                        : "rgba(0,0,0,0.15)",
                  }}
                >
                  {isActive ? <Check className="zoda-product-card__swatch-check" /> : null}
                </button>
              );
            })}
          </div>
        ) : null}
        <span className="zoda-product-card__title">{p.title}</span>
        {p.price ? (
          <span className="zoda-product-card__price">
            {formatMoney(p.price.amount, p.price.currencyCode)}
          </span>
        ) : null}
      </div>
    </Link>
  );
}
