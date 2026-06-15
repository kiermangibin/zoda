import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { CartDrawer } from "@/components/zoda/CartDrawer";
import { SiteHeader } from "@/components/zoda/SiteHeader";
import { FABRICS } from "@/lib/fabrics";
import { initSnapController } from "@/components/zoda/snap-controller";
import "@/styles/fabrics-page.css";

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
  const fabricViewportRef = useRef<HTMLDivElement | null>(null);
  const fabricTrackRef = useRef<HTMLDivElement | null>(null);
  const [activeFabricIndex, setActiveFabricIndex] = useState(0);
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

  useEffect(() => {
    const viewport = fabricViewportRef.current;
    const track = fabricTrackRef.current;
    if (!viewport || !track) return;

    const cardNodes = () =>
      Array.from(track.querySelectorAll<HTMLElement>(".zoda-circuit__fabric-card"));
    const updateActiveCard = () => {
      const cards = cardNodes();
      if (!cards.length) return;

      const rect = viewport.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      let nextIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(cardCenter - center);

        if (distance < bestDistance) {
          bestDistance = distance;
          nextIndex = index;
        }
      });

      setActiveFabricIndex((current) => (current === nextIndex ? current : nextIndex));
      cards.forEach((card, index) => {
        card.classList.toggle("is-active", index === nextIndex);
      });
    };

    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateActiveCard();
      });
    };

    const handleResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateActiveCard();
      });
    };

    updateActiveCard();
    viewport.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      viewport.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const handleFabricCardTap = (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    index: number,
  ) => {
    const isTouch = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;
    const track = fabricTrackRef.current;
    if (!track) return;
    if ((event.target as HTMLElement | null)?.closest(".zoda-fabrics-card__back-cta")) return;

    const target = event.currentTarget as HTMLElement;
    if (isTouch) {
      event.preventDefault();
      if (!target.classList.contains("is-revealed")) {
        track.querySelectorAll(".zoda-fabrics-card.is-revealed").forEach((el) => {
          el.classList.remove("is-revealed");
        });
        target.classList.add("is-revealed");
      } else {
        target.classList.remove("is-revealed");
      }
      setActiveFabricIndex(index);
      return;
    }

    const targetCard = track.querySelector<HTMLElement>(`[data-zoda-fabric-card][data-index='${index}']`);
    if (!targetCard) return;
    targetCard.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setActiveFabricIndex(index);
  };

  const handleExploreClick = (event: React.MouseEvent<HTMLAnchorElement>, handle: string) => {
    event.preventDefault();
    const root = rootRef.current as (HTMLDivElement & { __snapGoTo?: (id: string) => void }) | null;
    if (!root?.__snapGoTo) {
      window.location.hash = `#fabric-${handle}`;
      return;
    }
    root.__snapGoTo(`fabric-${handle}`);
  };

  const fabricProgress = `${(activeFabricIndex + 1) / FABRICS.length}`;
  const fabricCounter = `${String(activeFabricIndex + 1).padStart(2, "0")} / ${String(
    FABRICS.length,
  ).padStart(2, "0")}`;

  return (
    <div
      ref={rootRef}
      className="zoda-shell zoda-shell--light zoda-fabrics-page zoda-circuit"
      data-snap-root
    >
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

        {/* Fabric system (replacing the directory section only) */}
        <section
          id="zoda-circuit-home-6"
          className="zoda-fabrics-snap__section zoda-circuit__panel zoda-circuit__panel--fabric"
          data-snap-panel
        >
          <div className="zoda-circuit__fabric-shell" data-zoda-fabric="">
            <div className="zoda-circuit__fabric-head">
              <div>
                <p className="zoda-circuit__kicker">Fabric System</p>
                <h2 className="zoda-circuit__heading">Fabric system.</h2>
              </div>
              <div>
                <p className="zoda-circuit__copy">
                  Eight fabric systems tuned for sweat control, stretch, breathability, support, and
                  recovery.
                </p>
                <div className="zoda-circuit__actions zoda-circuit__actions--compact">
                  <a className="zoda-circuit__button-secondary" href="/collections">
                    Compare Fabrics
                  </a>
                </div>
              </div>
            </div>
            <div
              className="zoda-circuit__fabric-viewport"
              ref={fabricViewportRef}
              data-zoda-fabric-viewport
            >
              <div className="zoda-circuit__fabric-track" ref={fabricTrackRef} data-zoda-fabric-track>
                {FABRICS.map((fabric, index) => (
                  <article
                    key={fabric.handle}
                    className={`zoda-circuit__fabric-card zoda-fabrics-card zoda-fabrics-card--flip${
                      index === activeFabricIndex ? " is-active" : ""
                    }`}
                    role="button"
                    tabIndex={0}
                    aria-pressed={index === activeFabricIndex}
                    data-index={index}
                    onClick={(event) => handleFabricCardTap(event, index)}
                    onKeyDown={(event) => {
                      if (event.key !== "Enter" && event.key !== " ") return;
                      event.preventDefault();
                      handleFabricCardTap(event, index);
                    }}
                    data-zoda-fabric-card=""
                  >
                    <div className="zoda-fabrics-card__flip-inner">
                      <div className="zoda-fabrics-card__face zoda-fabrics-card__face--front">
                        <img
                          className="zoda-fabrics-card__img"
                          src={fabric.swatchImage}
                          alt={`${fabric.name} swatch`}
                          loading="lazy"
                        />
                        <div className="zoda-fabrics-card__overlay" />
                        <div className="zoda-fabrics-card__body">
                          <span className="zoda-fabrics-card__name">{fabric.name}</span>
                          <span className="zoda-fabrics-card__cta">View →</span>
                        </div>
                      </div>
                      <div className="zoda-fabrics-card__face zoda-fabrics-card__face--back">
                        <span className="zoda-fabrics-card__back-eyebrow">{fabric.name}</span>
                        <p className="zoda-fabrics-card__back-text">{fabric.tagline}</p>
                        <a
                          className="zoda-fabrics-card__back-cta"
                          href={`#fabric-${fabric.handle}`}
                          onClick={(event) => handleExploreClick(event, fabric.handle)}
                        >
                          Explore →
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="zoda-circuit__fabric-ui" aria-hidden="true">
              <div className="zoda-circuit__fabric-progress">
                <span data-zoda-fabric-progress style={{ transform: `scaleX(${fabricProgress})` }} />
              </div>
              <div className="zoda-circuit__fabric-count" data-zoda-fabric-count>
                {fabricCounter}
              </div>
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
                        className={`zoda-fabrics-feature__accordion-item${isOpen ? " is-open" : ""}`}
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
