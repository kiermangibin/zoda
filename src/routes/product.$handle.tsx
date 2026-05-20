import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useRef, useState, useEffect } from "react";
import { Loader2, ShoppingBag, Star, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";

import { storefrontApiRequest } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { CartDrawer } from "@/components/zoda/CartDrawer";
import { SiteHeader } from "@/components/zoda/SiteHeader";
import { Footer } from "@/components/zoda/Footer";
import { deriveSwatches } from "@/lib/swatches";
import {
  type ProductDetailsData,
  type MetaobjectRef,
} from "@/components/zoda/ProductDetailsGrid";

const TECH_TAGS = ["ZoDry™", "ZoFresh™", "FluidMotion™"];

// Static for now — designed to be replaced by Shopify metaobjects/metafields later.
type PdpSpec = {
  label: string;
  value: string;
  description?: string;
  meter?: { steps: string[]; activeLabel: string };
};
const PDP_SPECS: PdpSpec[] = [
  {
    label: "Fabric",
    value: "Peach Prefect",
    description:
      "Firm and matte. A sculpting, medium-weight fabric with a matte appearance and lasting shape retention.",
  },
  {
    label: "Bra Support",
    value: "Super High",
    meter: {
      steps: ["00", "Light", "Light–Med", "Medium", "Med–High", "High", "Super-Hi"],
      activeLabel: "Super-Hi",
    },
  },
];

export const Route = createFileRoute("/product/$handle")({
  head: ({ params }) => ({
    meta: [{ title: `${params.handle} — ZODA` }],
  }),
  component: ProductPage,
});

const META_IDS = `[
  { namespace: "custom", key: "fabric_swatches" },
  { namespace: "custom", key: "sculpt_meter" },
  { namespace: "custom", key: "thickness_meter" },
  { namespace: "custom", key: "fab" },
  { namespace: "custom", key: "features_key" },
  { namespace: "custom", key: "size_guide" },
  { namespace: "custom", key: "instructions_wash" }
]`;

const QUERY = `query Product($handle: String!) {
  product(handle: $handle) {
    id title descriptionHtml description handle
    featuredImage { url altText }
    images(first: 10) { edges { node { url altText } } }
    options { name values }
    variants(first: 100) {
      edges { node {
        id title availableForSale sku
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        selectedOptions { name value }
        image { url altText }
      } }
    }
    metafields(identifiers: ${META_IDS}) {
      key type value
      reference {
        ... on Metaobject {
          handle
          fields {
            key value type
            reference { ... on MediaImage { image { url altText } } }
          }
        }
      }
      references(first: 20) {
        edges { node {
          ... on Metaobject {
            handle
            fields {
              key value type
              reference { ... on MediaImage { image { url altText } } }
            }
          }
        } }
      }
    }
  }
}`;

function fmt(amount: string, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(Number(amount));
  } catch {
    return `${currency} ${Number(amount).toFixed(2)}`;
  }
}

function isColorName(n: string) { return /colou?r/i.test(n); }
function isSizeName(n: string) { return /size/i.test(n); }

function buildDetails(metafields: any[] | null | undefined): ProductDetailsData {
  const byKey = new Map<string, any>();
  for (const m of metafields ?? []) if (m) byKey.set(m.key, m);
  const refsOf = (key: string): MetaobjectRef[] =>
    byKey.get(key)?.references?.edges?.map((e: any) => e.node).filter(Boolean) ?? [];
  const refOf = (key: string): MetaobjectRef | null => byKey.get(key)?.reference ?? null;
  const valueOf = (key: string): string | null => byKey.get(key)?.value ?? null;

  return {
    fabricSwatches: refsOf("fabric_swatches"),
    sculpt: refOf("sculpt_meter"),
    thickness: refOf("thickness_meter"),
    fabricRichText: valueOf("fab"),
    features: valueOf("features_key"),
    sizeGuide: valueOf("size_guide"),
    care: valueOf("instructions_wash"),
  };
}

// Pull bullet-list items out of a rich-text or plain string
function parseBullets(input: string | null): string[] {
  if (!input) return [];
  // Try Shopify rich-text JSON
  try {
    const json = JSON.parse(input);
    const out: string[] = [];
    const walk = (n: any) => {
      if (!n) return;
      if (n.type === "list-item" || n.listType === "unordered" && n.type === "list") {
        // dive into children
      }
      if (n.type === "list-item") {
        const text = (n.children ?? []).map((c: any) => c.value ?? "").join(" ").trim();
        if (text) out.push(text);
      }
      (n.children ?? []).forEach(walk);
    };
    walk(json);
    if (out.length) return out;
  } catch { /* not JSON */ }
  // Fallback: split on newlines / bullets
  return input
    .split(/\r?\n|•|·/)
    .map((s) => s.replace(/^[-*\s]+/, "").trim())
    .filter(Boolean)
    .slice(0, 8);
}

function ProductPage() {
  const { handle } = useParams({ from: "/product/$handle" });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", handle],
    queryFn: () => storefrontApiRequest<any>(QUERY, { handle }),
  });
  const product = data?.product;
  const images: { url: string; altText: string | null }[] =
    product?.images?.edges?.map((e: any) => e.node) ?? [];
  const variants: any[] = product?.variants?.edges?.map((e: any) => e.node) ?? [];
  const options: { name: string; values: string[] }[] = product?.options ?? [];

  const swatches = useMemo(() => deriveSwatches(options, variants), [options, variants]);
  const swatchByValue = useMemo(() => {
    const m = new Map<string, { image: string | null; color: string | null }>();
    for (const s of swatches) m.set(s.value, { image: s.image, color: s.color });
    return m;
  }, [swatches]);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const initialOptions = useMemo(() => {
    const first = variants[0];
    if (!first) return {};
    const o: Record<string, string> = {};
    for (const so of first.selectedOptions) o[so.name] = so.value;
    return o;
  }, [variants]);

  const merged = { ...initialOptions, ...selectedOptions };

  const selected = useMemo(() => {
    return variants.find((v) =>
      v.selectedOptions.every((so: any) => merged[so.name] === so.value),
    ) ?? variants[0];
  }, [variants, merged]);

  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);
  const open = useCartStore((s) => s.open);

  const handleAdd = async () => {
    if (!selected || !product) return;
    await addItem({
      variantId: selected.id,
      productHandle: product.handle,
      productTitle: product.title,
      variantTitle: selected.title,
      imageUrl: product.featuredImage?.url ?? null,
      price: selected.price,
      quantity: 1,
    });
    open();
  };

  const isValueAvailable = (optName: string, value: string) => {
    const candidate = { ...merged, [optName]: value };
    return variants.some((v) =>
      v.availableForSale &&
      v.selectedOptions.every((so: any) => candidate[so.name] === so.value),
    );
  };

  const details = useMemo(() => buildDetails(product?.metafields), [product?.metafields]);

  const bullets = useMemo(() => {
    const fromMeta = parseBullets(details.features);
    if (fromMeta.length) return fromMeta;
    return [
      "Soft, lightweight brushed jersey",
      "Sweat-wicking and quick drying",
      "4-way stretch for max movement",
    ];
  }, [details.features]);

  const colorOpt = options.find((o) => isColorName(o.name));
  const sizeOpt = options.find((o) => isSizeName(o.name));
  const otherOpts = options.filter((o) => o !== colorOpt && o !== sizeOpt);

  // Scroll-syncing not required — strip is layout-only
  useEffect(() => { /* placeholder for future variant->image sync */ }, []);

  return (
    <div className="zoda-shell zoda-shell--light">
      <SiteHeader menuId="pdp-mobile-menu" />
      <div className="zoda-pdp">
        {isLoading ? (
          <div className="flex h-[60vh] items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : isError || !product ? (
          <p style={{ marginTop: 48, color: "var(--muted)" }}>Product not found.</p>
        ) : (
          <>
            <ImageStrip
              images={images.length ? images : [product.featuredImage].filter(Boolean)}
              title={product.title}
            />

            {/* Two-column info section */}
            <div className="zoda-pdp__below">
              {/* LEFT — buy controls */}
              <div className="zoda-pdp__col-left">
                <nav className="zoda-pdp__breadcrumbs" aria-label="Breadcrumbs">
                  <Link to="/">Home</Link>
                  <span aria-hidden="true">/</span>
                  <Link to="/collections">Collections</Link>
                  <span aria-hidden="true">/</span>
                  <span>{product.title}</span>
                </nav>

                <div className="zoda-pdp__reviews-stub" aria-label="Reviews">
                  <span className="zoda-pdp__stars" aria-hidden="true">
                    {[0,1,2,3,4].map((i) => <Star key={i} className="h-3.5 w-3.5" />)}
                  </span>
                  <span>No reviews yet</span>
                </div>

                <div className="zoda-pdp__title-block">
                  <h1 className="zoda-pdp__title">{product.title}</h1>
                  {selected ? (
                    <div className="zoda-pdp__price-row">
                      {selected.compareAtPrice &&
                        Number(selected.compareAtPrice.amount) > Number(selected.price.amount) ? (
                        <>
                          <span className="zoda-pdp__price zoda-pdp__price--sale">
                            {fmt(selected.price.amount, selected.price.currencyCode)}
                          </span>
                          <span className="zoda-pdp__price zoda-pdp__price--strike">
                            {fmt(selected.compareAtPrice.amount, selected.compareAtPrice.currencyCode)}
                          </span>
                        </>
                      ) : (
                        <span className="zoda-pdp__price">
                          {fmt(selected.price.amount, selected.price.currencyCode)}
                        </span>
                      )}
                      <span className="zoda-pdp__installments">
                        or 4 payments of {fmt(
                          (Number(selected.price.amount) / 4).toFixed(2),
                          selected.price.currencyCode,
                        )}
                      </span>
                    </div>
                  ) : null}
                </div>

                {colorOpt && colorOpt.values.length > 0 ? (
                  <div className="zoda-pdp__option">
                    <p className="zoda-pdp__option-label">
                      {colorOpt.name}
                      {merged[colorOpt.name] ? (
                        <span className="zoda-pdp__option-selected"> — {merged[colorOpt.name]}</span>
                      ) : null}
                    </p>
                    <div className="zoda-pdp__variants zoda-pdp__variants--colors">
                      {colorOpt.values.map((value) => {
                        const isActive = merged[colorOpt.name] === value;
                        const available = isValueAvailable(colorOpt.name, value);
                        const sw = swatchByValue.get(value);
                        const bg = sw?.image
                          ? `center / cover no-repeat url(${sw.image})`
                          : sw?.color ?? "rgba(255,255,255,0.12)";
                        return (
                          <button
                            key={value}
                            type="button"
                            title={value}
                            aria-label={value}
                            onClick={() => setSelectedOptions((p) => ({ ...p, [colorOpt.name]: value }))}
                            disabled={!available}
                            className={`zoda-pdp__swatch ${isActive ? "zoda-pdp__swatch--active" : ""}`}
                            style={{ background: bg }}
                          />
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {sizeOpt && sizeOpt.values.length > 0 ? (
                  <div className="zoda-pdp__option">
                    <p className="zoda-pdp__option-label">
                      Select a size
                      {merged[sizeOpt.name] ? (
                        <span className="zoda-pdp__option-selected"> — {merged[sizeOpt.name]}</span>
                      ) : null}
                    </p>
                    <div className="zoda-pdp__variants zoda-pdp__variants--sizes">
                      {sizeOpt.values.map((value) => {
                        const isActive = merged[sizeOpt.name] === value;
                        const available = isValueAvailable(sizeOpt.name, value);
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setSelectedOptions((p) => ({ ...p, [sizeOpt.name]: value }))}
                            disabled={!available}
                            className={`zoda-pdp__variant zoda-pdp__variant--size ${isActive ? "zoda-pdp__variant--active" : ""}`}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {otherOpts.map((opt) => (
                  opt.values.length > 1 ? (
                    <div key={opt.name} className="zoda-pdp__option">
                      <p className="zoda-pdp__option-label">{opt.name}</p>
                      <div className="zoda-pdp__variants">
                        {opt.values.map((value) => {
                          const isActive = merged[opt.name] === value;
                          const available = isValueAvailable(opt.name, value);
                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() => setSelectedOptions((p) => ({ ...p, [opt.name]: value }))}
                              disabled={!available}
                              className={`zoda-pdp__variant ${isActive ? "zoda-pdp__variant--active" : ""}`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null
                ))}

                <div className="zoda-pdp__model-info">
                  <p><strong>Model wears size M</strong></p>
                  <p>Height: 185cm · Chest: 102cm · Waist: 76cm</p>
                  <a href="#zoda-size-fit" className="zoda-pdp__size-guide-link">Size Guide →</a>
                </div>

                <div className="zoda-pdp__cta-row">
                  <button
                    type="button"
                    onClick={handleAdd}
                    disabled={!selected?.availableForSale || isAdding}
                    className="zoda-pdp__add"
                  >
                    {isAdding ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <ShoppingBag className="h-4 w-4" /> Add to bag
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="zoda-pdp__find"
                  >
                    Find in store
                  </button>
                </div>

                <div className="zoda-pdp__specs">
                  {PDP_SPECS.map((spec) => (
                    <div key={spec.label} className="zoda-pdp__spec">
                      <p className="zoda-pdp__spec-eyebrow">{spec.label}</p>
                      <p className="zoda-pdp__spec-value">{spec.value}</p>
                      {spec.description ? (
                        <p className="zoda-pdp__spec-desc">{spec.description}</p>
                      ) : null}
                      {spec.meter ? (
                        <div
                          className="zoda-pdp__meter"
                          role="img"
                          aria-label={`${spec.label}: ${spec.meter.activeLabel}`}
                        >
                          <div className="zoda-pdp__meter-track">
                            {spec.meter.steps.map((s, i) => {
                              const pct = (i / (spec.meter!.steps.length - 1)) * 100;
                              const activeIdx = spec.meter!.steps.findIndex(
                                (x) => x === spec.meter!.activeLabel,
                              );
                              const fillPct = (activeIdx / (spec.meter!.steps.length - 1)) * 100;
                              return (
                                <span
                                  key={s + i}
                                  className="zoda-pdp__meter-tick"
                                  style={{ left: `${pct}%` }}
                                  data-fill={i === 0 ? fillPct : undefined}
                                />
                              );
                            })}
                            <span
                              className="zoda-pdp__meter-fill"
                              style={{
                                width: `${
                                  (spec.meter.steps.findIndex((x) => x === spec.meter!.activeLabel) /
                                    (spec.meter.steps.length - 1)) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                          <div className="zoda-pdp__meter-labels">
                            {spec.meter.steps.map((s) => (
                              <span key={s}>{s}</span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — story, toggles */}
              <div className="zoda-pdp__col-right">

                <PdpDescription
                  html={product.descriptionHtml}
                  text={product.description}
                />

              <div className="zoda-pdp__accordions">
                  <PdpAccordion title="Key Features" defaultOpen>
                    {details.features ? (
                      <div dangerouslySetInnerHTML={{ __html: details.features }} />
                    ) : (
                      <ul className="zoda-pdp__bullets">
                        {bullets.map((b) => <li key={b}>{b}</li>)}
                      </ul>
                    )}
                    <div className="zoda-pdp__tech-tags">
                      {TECH_TAGS.map((t) => <span key={t}>{t}</span>)}
                    </div>
                  </PdpAccordion>
                  <PdpAccordion title="Fabric">
                    {details.fabricRichText ? (
                      <div dangerouslySetInnerHTML={{ __html: details.fabricRichText }} />
                    ) : (
                      <p>Soft brushed jersey blended for stretch, recovery, and breathability. Full fabric breakdown coming soon.</p>
                    )}
                  </PdpAccordion>
                  <div id="zoda-size-fit">
                    <PdpAccordion title="Size + Fit">
                      {details.sizeGuide ? (
                        <div dangerouslySetInnerHTML={{ __html: details.sizeGuide }} />
                      ) : (
                        <p>Regular fit, true to size. Model is 185cm wearing size M. Detailed size chart coming soon.</p>
                      )}
                    </PdpAccordion>
                  </div>
                  <PdpAccordion title="Care Instructions">
                    {details.care ? (
                      <div dangerouslySetInnerHTML={{ __html: details.care }} />
                    ) : (
                      <p>Machine wash cold with like colors. Tumble dry low. Do not iron print. Do not bleach.</p>
                    )}
                  </PdpAccordion>
                  <PdpAccordion title="Shipping and Returns">
                    <p>Free shipping on orders over $80. 30-day returns on unworn items with original tags.</p>
                  </PdpAccordion>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <CartDrawer />
      <Footer />
    </div>
  );
}

function ImageStrip({ images, title }: { images: { url: string; altText: string | null }[]; title: string }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const perView = 4;
  const pageCount = Math.max(1, images.length);

  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>(".zoda-pdp__strip-item");
    const step = item?.getBoundingClientRect().width ?? el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>(".zoda-pdp__strip-item");
    const step = item?.getBoundingClientRect().width ?? el.clientWidth;
    setPage(Math.round(el.scrollLeft / step));
  };

  if (!images.length) return null;

  return (
    <div className="zoda-pdp__strip-wrap">
      <div
        ref={trackRef}
        className="zoda-pdp__strip"
        role="list"
        onScroll={onScroll}
        style={{ ["--per-view" as any]: perView }}
      >
        {images.map((img, i) => (
          <div key={(img?.url ?? "") + i} className="zoda-pdp__strip-item" role="listitem">
            {img?.url ? (
              <img src={img.url} alt={img.altText ?? title} loading={i < perView ? "eager" : "lazy"} />
            ) : null}
          </div>
        ))}
      </div>
      {images.length > perView ? (
        <>
          <button
            type="button"
            aria-label="Previous images"
            className="zoda-pdp__strip-nav zoda-pdp__strip-nav--prev"
            onClick={() => scrollByPage(-1)}
            disabled={page === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next images"
            className="zoda-pdp__strip-nav zoda-pdp__strip-nav--next"
            onClick={() => scrollByPage(1)}
            disabled={page >= pageCount - 1}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      ) : null}
    </div>
  );
}

function PdpAccordion({
  title,
  defaultOpen = false,
  children,
}: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="zoda-pdp-acc">
      <button
        type="button"
        className="zoda-pdp-acc__summary"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{title}</span>
        {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </button>
      {open ? <div className="zoda-pdp-acc__content">{children}</div> : null}
    </div>
  );
}

function PdpDescription({ html, text }: { html?: string | null; text?: string | null }) {
  const [expanded, setExpanded] = useState(false);
  const hasContent = !!(html || text);
  return (
    <div className="zoda-pdp__desc-wrap">
      <p className="zoda-pdp__desc-label">Description</p>
      {!hasContent ? (
        <p className="zoda-pdp__blurb">
          Engineered for everyday performance — placeholder description.
        </p>
      ) : (
        <>
          <div className={`zoda-pdp__blurb zoda-pdp__desc ${expanded ? "" : "is-clamped"}`}>
            {html ? <div dangerouslySetInnerHTML={{ __html: html }} /> : <p>{text}</p>}
          </div>
          <button
            type="button"
            className="zoda-pdp__desc-toggle"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "See less" : "See more"}
          </button>
        </>
      )}
    </div>
  );
}
