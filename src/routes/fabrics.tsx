import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { CartDrawer } from "@/components/zoda/CartDrawer";
import { SiteHeader } from "@/components/zoda/SiteHeader";
import { FABRICS } from "@/lib/fabrics";
import { initSnapController } from "@/components/zoda/snap-controller";

export const Route = createFileRoute("/fabrics")({
  head: () => ({
    meta: [
      { title: "Our Fabrics — ZODA" },
      {
        name: "description",
        content:
          "Explore the fabrics behind ZODA — engineered for performance, comfort and sustainability.",
      },
      { property: "og:title", content: "Our Fabrics — ZODA" },
      {
        property: "og:description",
        content:
          "ZENCOT™, ZOENIX™, RPSTRNG™, AURAFORM™, NYCURV™ and more — meet the technical fabrics behind every ZODA piece.",
      },
    ],
  }),
  component: FabricsPage,
});

function FabricsPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const directoryGridRef = useRef<HTMLDivElement | null>(null);
  const [directoryIndex, setDirectoryIndex] = useState(0);
  const [openAccordions, setOpenAccordions] = useState<Record<string, number | null>>({});

  useEffect(() => {
    if (!rootRef.current) return;
    const cleanup = initSnapController(rootRef.current, {
      previousPath: "/ikigai",
      nextPath: "/",
      onAccordionChange: (panel, index) => {
        const handle = panel.dataset.fabricHandle;
        if (!handle) return;
        setOpenAccordions((current) => ({
          ...current,
          [handle]: index < 0 ? null : index,
        }));
      },
    });
    return cleanup;
  }, []);

  const handleDirectoryClick = (event: React.MouseEvent<HTMLAnchorElement>, handle: string) => {
    event.preventDefault();
    const target = event.currentTarget;
    const coarse = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;
    if (coarse && !target.classList.contains("is-revealed")) {
      rootRef.current
        ?.querySelectorAll(".zoda-fabrics-card.is-revealed")
        .forEach((el) => el.classList.remove("is-revealed"));
      target.classList.add("is-revealed");
      return;
    }
    const root = rootRef.current as (HTMLDivElement & { __snapGoTo?: (id: string) => void }) | null;
    root?.__snapGoTo?.(`fabric-${handle}`);
  };

  const handleDirectoryScroll = () => {
    const grid = directoryGridRef.current;
    const firstCard = grid?.querySelector<HTMLElement>(".zoda-fabrics-card");
    if (!grid || !firstCard) return;

    const style = window.getComputedStyle(grid);
    const gap = Number.parseFloat(style.columnGap || style.gap || "0") || 0;
    const cardStep = firstCard.getBoundingClientRect().width + gap;
    if (cardStep <= 0) return;
    setDirectoryIndex(Math.max(0, Math.min(FABRICS.length - 1, Math.round(grid.scrollLeft / cardStep))));
  };

  return (
    <div ref={rootRef} className="zoda-shell zoda-shell--light zoda-fabrics-page" data-snap-root>
      <SiteHeader menuId="fabrics-mobile-menu" />

      <div className="zoda-circuit zoda-fabrics-dots-host" aria-hidden={false}>
        <nav className="zoda-circuit__dots" aria-label="Fabrics navigation">
          <button
            type="button"
            className="zoda-circuit__dot is-active"
            data-snap-dot
            aria-label="Overview"
          />
          <button
            type="button"
            className="zoda-circuit__dot"
            data-snap-dot
            aria-label="Directory"
          />
          {FABRICS.map((f) => (
            <button
              key={f.handle}
              type="button"
              className="zoda-circuit__dot"
              data-snap-dot
              aria-label={f.name}
            />
          ))}
        </nav>
      </div>

      <main className="zoda-fabrics-snap" aria-label="Our Fabrics" data-snap-track>
        {/* Hero */}
        <section className="zoda-fabrics-snap__section zoda-fabrics-hero" data-snap-panel>
          <img
            className="zoda-fabrics-hero__media"
            src="https://zoda.sg/cdn/shop/files/Home_988c6beb-3796-412b-91e8-2187792c9fb3.png?v=1751556158&width=2000"
            alt="ZODA fabrics swatches"
          />
          <div className="zoda-fabrics-hero__overlay" />
          <div className="zoda-fabrics-hero__content">
            <p className="zoda-fabrics-hero__kicker">Our Fabrics</p>
            <h1 className="zoda-fabrics-hero__title">Explore the Fabrics Behind ZODA</h1>
            <p className="zoda-fabrics-hero__lede">
              Engineered for Performance, Comfort and Sustainability.
            </p>
          </div>
        </section>

        {/* Tile grid */}
        <section className="zoda-fabrics-snap__section zoda-fabrics-directory" data-snap-panel>
          <header className="zoda-fabrics-directory__head">
            <p className="zoda-fabrics-directory__kicker">Directory</p>
            <h2 className="zoda-fabrics-directory__title">Meet every fabric</h2>
          </header>
          <div
            ref={directoryGridRef}
            className="zoda-fabrics-directory__grid"
            onScroll={handleDirectoryScroll}
          >
            {FABRICS.map((f) => (
              <a
                key={f.handle}
                href={`#fabric-${f.handle}`}
                className="zoda-fabrics-card zoda-fabrics-card--flip"
                onClick={(e) => handleDirectoryClick(e, f.handle)}
              >
                <div className="zoda-fabrics-card__flip-inner">
                  <div className="zoda-fabrics-card__face zoda-fabrics-card__face--front">
                    <img
                      className="zoda-fabrics-card__img"
                      src={f.swatchImage}
                      alt={`${f.name} swatch`}
                      loading="lazy"
                    />
                    <div className="zoda-fabrics-card__overlay" />
                    <div className="zoda-fabrics-card__body">
                      <span className="zoda-fabrics-card__name">{f.name}</span>
                      <span className="zoda-fabrics-card__cta">View →</span>
                    </div>
                  </div>
                  <div className="zoda-fabrics-card__face zoda-fabrics-card__face--back">
                    <span className="zoda-fabrics-card__back-eyebrow">{f.name}</span>
                    <p className="zoda-fabrics-card__back-text">{f.tagline}</p>
                    <span className="zoda-fabrics-card__back-cta">Explore →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="zoda-fabrics-directory__mobile-ui" aria-hidden="true">
            <div className="zoda-fabrics-directory__progress">
              <span style={{ transform: `scaleX(${(directoryIndex + 1) / FABRICS.length})` }} />
            </div>
            <div className="zoda-fabrics-directory__count">
              {String(directoryIndex + 1).padStart(2, "0")} / {String(FABRICS.length).padStart(2, "0")}
            </div>
          </div>
        </section>

        {/* One snap section per fabric */}
        {FABRICS.map((f, idx) => {
          return (
            <section
              key={f.handle}
              id={`fabric-${f.handle}`}
              className="zoda-fabrics-snap__section zoda-fabrics-feature"
              data-orientation={idx % 2 === 0 ? "left" : "right"}
              data-fabric-handle={f.handle}
              data-snap-accordion
              data-snap-panel
            >
              <div className="zoda-fabrics-feature__media">
                <img src={f.swatchImage} alt={`${f.name} swatch`} loading="lazy" />
              </div>
              <div className="zoda-fabrics-feature__body">
                <p className="zoda-fabrics-feature__eyebrow">{f.name}</p>
                <h2 className="zoda-fabrics-feature__title">{f.heroTitle}</h2>
                <p className="zoda-fabrics-feature__desc">{f.description}</p>

                <ul className="zoda-fabrics-feature__features" aria-label="Key technologies">
                  {f.features.map((feat) => (
                    <li key={feat.label}>
                      <img src={feat.icon} alt="" loading="lazy" />
                      <span>{feat.label}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className="zoda-fabrics-feature__accordion"
                  aria-label={`${f.name} fabric details`}
                >
                  {[
                    {
                      index: "01",
                      title: "Engineered for performance",
                      label: "Performance",
                      content: f.performance,
                    },
                    {
                      index: "02",
                      title: "Sustainability at its core",
                      label: "Impact",
                      content: f.sustainability,
                    },
                    {
                      index: "03",
                      title: "Built for the community of athletes",
                      label: "Community",
                      content: [f.community],
                    },
                  ].map((item, itemIndex) => {
                    const isOpen = openAccordions[f.handle] === itemIndex;

                    return (
                      <article
                        key={item.title}
                        className={`zoda-fabrics-feature__accordion-item${
                          isOpen ? " is-open" : ""
                        }`}
                        data-snap-accordion-item
                      >
                        <button
                          type="button"
                          className="zoda-fabrics-feature__accordion-trigger"
                          aria-expanded={isOpen}
                          aria-controls={`fabric-${f.handle}-accordion-${itemIndex}`}
                          data-snap-accordion-trigger
                          onClick={() => {
                            setOpenAccordions((current) => ({
                              ...current,
                              [f.handle]: isOpen ? null : itemIndex,
                            }));
                          }}
                        >
                          <span className="zoda-fabrics-feature__accordion-index">
                            {item.index}
                          </span>
                          <strong>{item.title}</strong>
                          <span className="zoda-fabrics-feature__accordion-label">
                            {item.label}
                          </span>
                          <i aria-hidden="true" />
                        </button>
                        {isOpen ? (
                          <div
                            id={`fabric-${f.handle}-accordion-${itemIndex}`}
                            className="zoda-fabrics-feature__accordion-panel"
                          >
                            {item.content.length > 1 ? (
                              <ul className="zoda-fabrics-feature__accordion-list">
                                {item.content.map((text) => (
                                  <li key={text}>{text}</li>
                                ))}
                              </ul>
                            ) : (
                              item.content.map((text) => <p key={text}>{text}</p>)
                            )}
                          </div>
                        ) : null}
                      </article>
                    );
                  })}
                </div>

                <div className="zoda-fabrics-feature__actions">
                  <a className="zoda-fabrics-feature__shop" href={f.shopUrl}>
                    Shop {f.name}
                  </a>
                  <Link to="/collections" className="zoda-fabrics-feature__back">
                    All collections →
                  </Link>
                </div>
              </div>
            </section>
          );
        })}
      </main>

      <CartDrawer />
    </div>
  );
}
