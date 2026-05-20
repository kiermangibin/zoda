import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export interface MetaobjectField {
  key: string;
  value: string | null;
  type: string;
  reference?: { image?: { url: string; altText: string | null } | null } | null;
}

export interface MetaobjectRef {
  handle: string;
  fields: MetaobjectField[];
}

export interface ProductDetailsData {
  fabricSwatches: MetaobjectRef[];
  sculpt: MetaobjectRef | null;
  thickness: MetaobjectRef | null;
  fabricRichText: string | null;
  features: string | null;
  sizeGuide: string | null;
  care: string | null;
}

const LABEL_KEYS = ["label", "name", "title", "text", "heading", "fabric_name"];
const IMAGE_KEYS = ["image", "swatch_image", "photo", "badge", "meter_image", "graphic", "visual"];

function fieldByKeys(obj: MetaobjectRef | null, keys: string[]) {
  if (!obj) return null;
  for (const k of keys) {
    const f = obj.fields.find((x) => x.key === k);
    if (f && (f.value || f.reference?.image?.url)) return f;
  }
  return null;
}

function labelOf(obj: MetaobjectRef | null) {
  return fieldByKeys(obj, LABEL_KEYS)?.value ?? null;
}
function imageOf(obj: MetaobjectRef | null) {
  return fieldByKeys(obj, IMAGE_KEYS)?.reference?.image?.url ?? null;
}

const TECH_TAGS = ["ZoDry™", "ZoFresh™", "FluidMotion™"];

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="zoda-pi-acc">
      <button type="button" className="zoda-pi-acc__summary" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span>{title}</span>
        {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </button>
      {open ? <div className="zoda-pi-acc__content">{children}</div> : null}
    </div>
  );
}

function renderHtml(html: string | null) {
  if (!html) return null;
  return <div className="zoda-pi-rte" dangerouslySetInnerHTML={{ __html: html }} />;
}

export function ProductDetailsGrid({ data }: { data: ProductDetailsData }) {
  const hasLeft =
    data.fabricSwatches.length > 0 || data.sculpt || data.thickness;
  const hasRight =
    data.fabricRichText || data.features || data.sizeGuide || data.care;
  if (!hasLeft && !hasRight) return null;

  return (
    <section className="zoda-pi">
      <div className="zoda-pi__inner">
        {hasLeft ? (
          <div className="zoda-pi__left">
            {data.fabricSwatches.length > 0 ? (
              <div className="zoda-pi__block">
                <p className="zoda-pi__eyebrow">The Fabric Inside</p>
                <h3 className="zoda-pi__title">Engineered for movement using</h3>
                <div className="zoda-pi__fabrics">
                  {data.fabricSwatches.map((sw, i) => {
                    const img = imageOf(sw);
                    const label = labelOf(sw) ?? sw.handle;
                    return (
                      <div className="zoda-pi__fabric" key={i}>
                        {img ? <img src={img} alt={label ?? ""} loading="lazy" /> : null}
                        <span>{label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {data.sculpt ? (
              <div className="zoda-pi__block">
                <p className="zoda-pi__eyebrow">Sculpt Level</p>
                <h3 className="zoda-pi__title">{labelOf(data.sculpt) ?? "The Sweet-Spot Sculpt"}</h3>
                {imageOf(data.sculpt) ? (
                  <div className="zoda-pi__meter-media">
                    <img src={imageOf(data.sculpt)!} alt="" loading="lazy" />
                  </div>
                ) : null}
              </div>
            ) : null}

            {data.thickness ? (
              <div className="zoda-pi__block">
                <p className="zoda-pi__eyebrow">Fabric Weight</p>
                <h3 className="zoda-pi__title">{labelOf(data.thickness) ?? "Thoughtfully Thick"}</h3>
                {imageOf(data.thickness) ? (
                  <div className="zoda-pi__meter-media">
                    <img src={imageOf(data.thickness)!} alt="" loading="lazy" />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}

        {hasRight ? (
          <div className="zoda-pi__right">
            {data.features ? (
              <Accordion title="Key Features" defaultOpen>
                {renderHtml(data.features)}
                <div className="zoda-pi__tags">
                  {TECH_TAGS.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </Accordion>
            ) : null}
            {data.fabricRichText ? (
              <Accordion title="Fabric">{renderHtml(data.fabricRichText)}</Accordion>
            ) : null}
            {data.sizeGuide ? (
              <Accordion title="Size + Fit">{renderHtml(data.sizeGuide)}</Accordion>
            ) : null}
            {data.care ? (
              <Accordion title="Care Instructions">{renderHtml(data.care)}</Accordion>
            ) : null}
            <Accordion title="Shipping and Returns">
              <p>Free shipping on orders over $100. 30-day returns on unworn items.</p>
            </Accordion>
          </div>
        ) : null}
      </div>
    </section>
  );
}
