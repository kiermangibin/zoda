import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { getFeaturedCollection } from "@/lib/featured-collection";
import { ProductCard } from "./ProductCard";

export function ProductMotionGallery() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["featured-collection"],
    queryFn: getFeaturedCollection,
    staleTime: 60_000,
  });
  const railRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const distance = Math.min(600, el.clientWidth * 0.85);
    el.scrollTo({ left: el.scrollLeft + dir * distance, behavior: "smooth" });
  };

  const handleNav = (event: React.MouseEvent<HTMLButtonElement>, dir: 1 | -1) => {
    event.preventDefault();
    event.stopPropagation();
    scrollBy(dir);
  };

  if (isLoading) {
    return (
      <div className="zoda-pim" data-animate="" style={{ "--zoda-delay": "260ms" } as React.CSSProperties}>
        <div className="zoda-pim__rail">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="zoda-pim-card zoda-pim-card--skeleton" aria-hidden />
          ))}
        </div>
      </div>
    );
  }

  const products = data?.products ?? [];

  if (isError || products.length === 0) {
    return (
      <div className="zoda-pim" data-animate="" style={{ "--zoda-delay": "260ms" } as React.CSSProperties}>
        <p style={{ padding: "24px 0", color: "rgba(255,255,255,0.7)", fontSize: 14 }}>
          No products yet — add one in Shopify to populate this section.
        </p>
      </div>
    );
  }

  return (
    <div className="zoda-pim" data-animate="" style={{ "--zoda-delay": "260ms" } as React.CSSProperties}>
      <div className="zoda-pim__rail" ref={railRef}>
        {products.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
      <div className="zoda-pim__controls">
        <button type="button" aria-label="Scroll left" onClick={(event) => handleNav(event, -1)} className="zoda-pim__nav">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Scroll right" onClick={(event) => handleNav(event, 1)} className="zoda-pim__nav">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
