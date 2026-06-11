import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { getJudgemeReviews, type JudgemeReview } from "@/lib/judgeme-reviews.functions";

function VerifiedBadgeIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      <rect x="0" y="0" width="16" height="16" fill="currentColor" />
      <path
        d="M3.5 8.2 L6.6 11.2 L12.5 5.2"
        fill="none"
        stroke="#0b1410"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

function ReviewCardInner({ r }: { r: JudgemeReview }) {
  const imageUrl = r.productImageUrl ?? r.imageUrl;
  const imageAlt = r.productImageAlt ?? r.productTitle ?? "";

  return (
    <>
      {imageUrl ? (
        <div className="zoda-circuit__review-image">
          <img src={imageUrl} alt={imageAlt} loading="lazy" />
        </div>
      ) : null}
      {r.productTitle ? (
        <span className="zoda-circuit__review-product-title">{r.productTitle}</span>
      ) : null}
      <p className="zoda-circuit__review-copy">{r.body}</p>
      <div className="zoda-circuit__review-stars" aria-label={`${r.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            fill={i < Math.round(r.rating) ? "currentColor" : "none"}
            strokeWidth={1.5}
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
        ))}
      </div>
      <hr className="zoda-circuit__review-divider" />
      <div className="zoda-circuit__review-person">
        <span className="zoda-circuit__review-info">
          <strong>{r.reviewerName}</strong>
          {r.verified ? (
            <span className="zoda-circuit__review-verified">
              <VerifiedBadgeIcon /> Verified
            </span>
          ) : null}
        </span>
      </div>
    </>
  );
}

export function ReviewsRail() {
  const fetchReviews = useServerFn(getJudgemeReviews);
  const { data, isLoading } = useQuery<JudgemeReview[]>({
    queryKey: ["judgeme-reviews"],
    queryFn: () => fetchReviews(),
    staleTime: 5 * 60_000,
  });
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateOverflowState = () => {
      track.querySelectorAll<HTMLParagraphElement>(".zoda-circuit__review-copy").forEach((copy) => {
        copy.classList.toggle(
          "zoda-circuit__review-copy--overflowing",
          copy.scrollHeight > copy.clientHeight + 1,
        );
      });
    };

    updateOverflowState();
    const frame = window.requestAnimationFrame(updateOverflowState);
    const observer = new ResizeObserver(updateOverflowState);
    observer.observe(track);
    track.querySelectorAll(".zoda-circuit__review-copy").forEach((copy) => observer.observe(copy));
    window.addEventListener("resize", updateOverflowState);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", updateOverflowState);
    };
  }, [data]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: el.scrollLeft + dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const handleNav = (event: React.MouseEvent<HTMLButtonElement>, dir: 1 | -1) => {
    event.preventDefault();
    event.stopPropagation();
    scrollBy(dir);
  };

  if (isLoading) {
    return (
      <div className="zoda-circuit__reviews-grid" data-animate="" style={{ "--zoda-delay": "260ms" } as React.CSSProperties}>
        <div className="zoda-circuit__reviews-track">
          {Array.from({ length: 4 }).map((_, i) => (
            <article key={i} className="zoda-circuit__review-card" aria-hidden />
          ))}
        </div>
      </div>
    );
  }

  const items = data ?? [];

  if (items.length === 0) {
    return (
      <div className="zoda-circuit__reviews-empty" data-animate="" style={{ "--zoda-delay": "260ms" } as React.CSSProperties}>
        <p>No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="zoda-circuit__reviews-grid" data-animate="" style={{ "--zoda-delay": "260ms" } as React.CSSProperties}>
      <div className="zoda-circuit__reviews-track" ref={trackRef}>
        {items.map((r) =>
          r.productHandle ? (
            <Link
              key={r.id}
              to="/product/$handle"
              params={{ handle: r.productHandle }}
              className="zoda-circuit__review-card"
            >
              <ReviewCardInner r={r} />
            </Link>
          ) : (
            <article key={r.id} className="zoda-circuit__review-card">
              <ReviewCardInner r={r} />
            </article>
          ),
        )}
      </div>
      <div className="zoda-circuit__rail-nav" aria-hidden="true">
        <button type="button" className="zoda-circuit__rail-arrow" onClick={(event) => handleNav(event, -1)} aria-label="Previous review">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button type="button" className="zoda-circuit__rail-arrow" onClick={(event) => handleNav(event, 1)} aria-label="Next review">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
