import { useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { CartDrawer } from "@/components/zoda/CartDrawer";
import { SiteHeader } from "@/components/zoda/SiteHeader";
import { initSnapController } from "@/components/zoda/snap-controller";
import sustainabilityVideo from "@/assets/sustainability-video.mp4";
import technologyButtons from "@/assets/technology-buttons.avif";
import technologyPocket from "@/assets/technology-pocket.avif";
import technologyRunners from "@/assets/technology-runners.jpg";

export const Route = createFileRoute("/ikigai")({
  head: () => ({
    meta: [
      { title: "Our Ikigai — ZODA" },
      {
        name: "description",
        content:
          "ZODA's Ikigai: empowering the inner Alpha through innovation, sustainability and community. Discover our vision, mission, pillars and AuraForm™ technology.",
      },
      { property: "og:title", content: "Our Ikigai — ZODA" },
      {
        property: "og:description",
        content:
          "The Absolute Alpha Standard in Activewear — performance, sustainability and community woven into every piece.",
      },
      {
        property: "og:image",
        content: "https://zoda.sg/cdn/shop/files/pulsecollection-57.jpg?v=1753854949&width=1200",
      },
    ],
  }),
  component: IkigaiPage,
});

type Panel = {
  id: string;
  label: string;
};

const PILLARS = [
  {
    title: "Technology",
    desc: "ZODA is driven by an unwavering commitment to innovation, continuously pushing the boundaries of activewear technology to empower athletes and elevate their performance.",
    image:
      "https://zoda.sg/cdn/shop/files/gempages_542466511441232900-bd1d5513-cafd-40d4-af2c-ef99b816a1e2.jpg?v=1732868912&width=768",
  },
  {
    title: "Sustainability",
    desc: "We meticulously select organic cotton (OCS and GOTS certified), recycled polyester (GRS certified) and innovative fibres like Repreve® made from recycled plastic bottles.",
    image:
      "https://zoda.sg/cdn/shop/files/gempages_542466511441232900-f579801d-526a-4215-9b31-482d5b39c21d.jpg?v=1732869375&width=768",
  },
  {
    title: "Community",
    desc: "Forge unbreakable bonds with a diverse network of athletes who share the same drive and determination.",
    image: "https://zoda.sg/cdn/shop/files/Zoda_Community_of_Athletes.jpg?v=1758045516&width=768",
  },
];

const TECH_POINTS = [
  {
    title: "High-Quality Fabrics",
    desc: "We utilize only the finest fabrics, meticulously chosen for their exceptional performance, durability and sustainable sourcing.",
  },
  {
    title: "Body Mapping Technology",
    desc: "Designed for precision, our garments use advanced body mapping to enhance comfort, movement, and performance.",
  },
  {
    title: "Ergonomic Patterns",
    desc: "Engineered for a natural fit, our patterns follow the body's contours to ensure seamless functionality.",
  },
  {
    title: "Strategic Seam Placement",
    desc: "Optimized seams reduce friction and enhance flexibility, keeping you focused on every move.",
  },
  {
    title: "Reinforced Construction",
    desc: "Built to endure, our garments feature reinforced stitching for unmatched durability and lasting performance.",
  },
];

const COMMUNITY_VALUES = [
  "Collective Strength",
  "Open and Honest",
  "Mutual Motivation",
  "Milestone Moments",
  "Unyielding Passion",
  "Nurturing Connections",
  "Inclusive Mindset",
  "Together Achieving Greatness",
  "You Are The Inspiration",
];

const PANELS: Panel[] = [
  { id: "ikigai-hero", label: "Hero" },
  { id: "ikigai-intro", label: "Our Ikigai" },
  { id: "ikigai-pillars", label: "Pillars" },
  { id: "ikigai-technology", label: "Technology" },
  { id: "ikigai-auraform", label: "AuraForm" },
  { id: "ikigai-sustainability", label: "Sustainability" },
  { id: "ikigai-community", label: "Community" },
];

function IkigaiPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const cleanup = initSnapController(rootRef.current, {
      nextPath: "/fabrics",
    });
    return cleanup;
  }, []);

  return (
    <div
      ref={rootRef}
      className="zoda-shell zoda-shell--light zoda-fabrics-page zoda-ikigai-page"
      data-snap-root
    >
      <SiteHeader menuId="ikigai-mobile-menu" />

      <div className="zoda-circuit zoda-fabrics-dots-host" aria-hidden={false}>
        <nav className="zoda-circuit__dots" aria-label="Ikigai navigation">
          {PANELS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={`zoda-circuit__dot${i === 0 ? " is-active" : ""}`}
              data-snap-dot
              aria-label={p.label}
            />
          ))}
        </nav>
      </div>

      <main className="zoda-fabrics-snap" aria-label="Our Ikigai" data-snap-track>
        {/* Hero */}
        <section
          id="ikigai-hero"
          className="zoda-fabrics-snap__section zoda-fabrics-hero"
          data-snap-panel
        >
          <img
            className="zoda-fabrics-hero__media"
            src="https://zoda.sg/cdn/shop/files/pulsecollection-57.jpg?v=1753854949&width=2000"
            alt="ZODA athletes in motion"
          />
          <div className="zoda-fabrics-hero__overlay" />
          <div className="zoda-fabrics-hero__content">
            <p className="zoda-fabrics-hero__kicker">Our Ikigai</p>
            <h1 className="zoda-fabrics-hero__title">Empowering The Inner Alpha</h1>
            <p className="zoda-fabrics-hero__lede">
              The Absolute Alpha Standard in Activewear — performance, innovation and sustainability
              woven into every piece.
            </p>
          </div>
        </section>

        {/* Ikigai + Vision & Mission */}
        <section
          id="ikigai-intro"
          className="zoda-fabrics-snap__section zoda-ikigai-purpose"
          data-snap-panel
        >
          <div className="zoda-ikigai-purpose__copy">
            <h2 className="zoda-fabrics-feature__title">Our Ikigai</h2>
            <p className="zoda-fabrics-feature__desc">
              ZODA® is inspired by the Ikigai of empowering the inner Alpha. We champion the
              relentless pursuit of personal excellence, the unwavering determination to overcome
              challenges and the indomitable spirit that fuels true champions. ZODA® is not just a
              brand. It is a mindset.
            </p>
            <p className="zoda-fabrics-feature__desc">
              Hence we are building The Absolute Alpha Standard in Activewear. Performance Sports
              clothing that comes to life with deep innovation in fabric, game changing technology
              in the construction and precision in design that defines our true purpose - to equip
              athletes with the tools and inspiration to ascend beyond their perceived limits,
              forging a path of continuous growth and self-discovery.
            </p>
            <div className="zoda-fabrics-feature__actions">
              <Link to="/fabrics" className="zoda-fabrics-feature__shop">
                Learn More
              </Link>
              <Link to="/collections" className="zoda-fabrics-feature__back">
                Shop the collection →
              </Link>
            </div>
          </div>

          <div className="zoda-ikigai-purpose__cards" aria-label="Vision and mission">
            <article className="zoda-ikigai-purpose__card">
              <span className="zoda-ikigai-purpose__label">Our Vision</span>
              <p className="zoda-ikigai-duo__body">
                To create activewear that redefines the athlete's experience, pushing the boundaries
                of innovation and inspiring a global community.
              </p>
            </article>

            <article className="zoda-ikigai-purpose__card">
              <span className="zoda-ikigai-purpose__label">Our Mission</span>
              <p className="zoda-ikigai-duo__body">
                To deliver exceptional products and services that exceed customer expectations while
                fostering a culture of innovation and integrity. To revolutionize the activewear
                industry by building a global community of 1 million athletes who experience the
                transformative power of interactive activewear, fueled by cutting-edge technology
                and sustainable practices.
              </p>
            </article>
          </div>
        </section>

        {/* Vision & Mission */}
        <section
          id="ikigai-vision"
          className="zoda-fabrics-snap__section zoda-ikigai-duo zoda-ikigai-duo--legacy"
          hidden
        >
          <header className="zoda-fabrics-directory__head zoda-ikigai-duo__head">
            <p className="zoda-fabrics-directory__kicker">Compass</p>
            <h2 className="zoda-fabrics-directory__title">Vision & Mission</h2>
          </header>
          <div className="zoda-ikigai-duo__grid">
            <article className="zoda-ikigai-duo__card">
              <span className="zoda-ikigai-duo__index">01 / Vision</span>
              <h3 className="zoda-ikigai-duo__title">The Future We Build</h3>
              <p className="zoda-ikigai-duo__body">
                To create activewear that redefines the athlete's experience — pushing the
                boundaries of innovation and inspiring a global community.
              </p>
            </article>

            <article className="zoda-ikigai-duo__card">
              <span className="zoda-ikigai-duo__index">02 / Mission</span>
              <h3 className="zoda-ikigai-duo__title">The Path We Take</h3>
              <p className="zoda-ikigai-duo__body">
                To deliver exceptional products and services that exceed customer expectations while
                fostering a culture of innovation and integrity. To revolutionize the activewear
                industry by building a global community of 1 million athletes who experience the
                transformative power of interactive activewear, fueled by cutting-edge technology
                and sustainable practices.
              </p>
            </article>
          </div>
        </section>

        {/* Pillars of Excellence */}
        <section
          id="ikigai-pillars"
          className="zoda-fabrics-snap__section zoda-ikigai-pillars"
          data-snap-panel
        >
          <header className="zoda-fabrics-directory__head">
            <p className="zoda-fabrics-directory__kicker">Foundations</p>
            <h2 className="zoda-fabrics-directory__title">Our Pillars of Excellence</h2>
            <p className="zoda-ikigai-pillars__lede">
              Built for those who rise, conquer, and push limits, we create high-performance,
              sustainable activewear that fuels a global movement of champions.
            </p>
          </header>
          <div className="zoda-ikigai-pillars__grid">
            {PILLARS.map((p) => (
              <article key={p.title} className="zoda-ikigai-pillars__card">
                <div className="zoda-ikigai-pillars__media">
                  <img src={p.image} alt={p.title} loading="lazy" />
                </div>
                <h3 className="zoda-ikigai-pillars__title">{p.title}</h3>
                <p className="zoda-ikigai-pillars__desc">{p.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Technology */}
        <section
          id="ikigai-technology"
          className="zoda-fabrics-snap__section zoda-fabrics-feature"
          data-orientation="right"
          data-snap-panel
          data-snap-accordion
        >
          <div
            className="zoda-fabrics-feature__media zoda-ikigai-technology-media-grid"
            aria-label="ZODA technology imagery"
          >
            <img
              className="zoda-ikigai-technology-media-grid__hero"
              src={technologyRunners}
              alt="Three runners on a wooden pathway with a city skyline in the background"
              loading="lazy"
            />
            <img
              src={technologyPocket}
              alt="Close-up of a teal performance wear pocket"
              loading="lazy"
            />
            <img
              src={technologyButtons}
              alt="Close-up of ZODA logo buttons on technical fabric"
              loading="lazy"
            />
          </div>
          <div className="zoda-fabrics-feature__body">
            <p className="zoda-fabrics-feature__eyebrow">Technology</p>
            <h2 className="zoda-fabrics-feature__title">Engineered to outperform.</h2>
            <p className="zoda-fabrics-feature__desc">
              We lead in activewear innovation, crafting high-performance garments with cutting-edge
              fabrics like regenerated nylons and recycled cotton, certified by GRS and BCI.
              Engineered for breathability, moisture-wicking, and durability, our materials ensure
              peak performance.
            </p>
            <div
              className="zoda-fabrics-craft__accordion zoda-ikigai-tech__accordion"
              aria-label="ZODA technology principles"
            >
              {TECH_POINTS.map((t, index) => (
                <details
                  key={t.title}
                  className={`zoda-fabrics-craft__item${index === 0 ? " is-open" : ""}`}
                  data-snap-accordion-item
                  open={index === 0}
                  name="zoda-ikigai-technology"
                >
                  <summary className="zoda-fabrics-craft__trigger" data-snap-accordion-trigger>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{t.title}</strong>
                  </summary>
                  <div className="zoda-fabrics-craft__panel" data-snap-accordion-panel>
                    <p>{t.desc}</p>
                  </div>
                </details>
              ))}
            </div>
            <div className="zoda-fabrics-feature__actions">
              <Link to="/fabrics" className="zoda-fabrics-feature__shop">
                See behind the force
              </Link>
            </div>
          </div>
        </section>

        {/* AuraForm */}
        <section
          id="ikigai-auraform"
          className="zoda-fabrics-snap__section zoda-fabrics-feature"
          data-orientation="left"
          data-snap-panel
        >
          <div className="zoda-fabrics-feature__media">
            <img
              src="https://zoda.sg/cdn/shop/files/g3_sports_bra_-_04.jpg?v=1750146954&width=1280"
              alt="AuraForm by ZODA"
              loading="lazy"
            />
          </div>
          <div className="zoda-fabrics-feature__body">
            <p className="zoda-fabrics-feature__eyebrow">Tech on Spotlight</p>
            <h2 className="zoda-fabrics-feature__title">AuraForm™</h2>
            <p className="zoda-fabrics-feature__desc">
              Experience the pinnacle of performance and comfort with ZODA's AuraForm™. This
              technically advanced blend is meticulously engineered using Zenith Tech™ exclusively
              for Sports Bra! We focused on providing right support in the construction of the
              fabric along with exceptional durability, empowering you to push your limits with
              confidence.
            </p>
            <div className="zoda-fabrics-feature__actions">
              <Link to="/fabrics" className="zoda-fabrics-feature__shop">
                Meet the fabric
              </Link>
              <a
                className="zoda-fabrics-feature__back"
                href="https://zoda.sg/collections/auraform%E2%84%A2"
                target="_blank"
                rel="noreferrer"
              >
                See in action →
              </a>
            </div>
          </div>
        </section>

        {/* Sustainability */}
        <section
          id="ikigai-sustainability"
          className="zoda-fabrics-snap__section zoda-fabrics-feature"
          data-orientation="right"
          data-snap-panel
        >
          <div className="zoda-fabrics-feature__media">
            <video
              src={sustainabilityVideo}
              aria-label="ZODA sustainability"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          <div className="zoda-fabrics-feature__body">
            <p className="zoda-fabrics-feature__eyebrow">Sustainability</p>
            <h2 className="zoda-fabrics-feature__title">Made with the planet in mind.</h2>
            <p className="zoda-fabrics-feature__desc">
              ZODA is dedicated to protecting our planet through responsible practices at every
              stage of production. We source eco-friendly materials, including OCS and
              GOTS-certified organic cotton and GRS-certified recycled polyester. Our partners meet
              high social and environmental standards, ensuring safe, fair working conditions and
              reduced impacts. Committed to continuous improvement, ZODA actively works towards
              waste reduction, water conservation, and a circular economy for sustainable future.
            </p>
            <div className="zoda-fabrics-feature__actions">
              <Link to="/collections" className="zoda-fabrics-feature__shop">
                Shop now
              </Link>
            </div>
          </div>
        </section>

        {/* Community */}
        <section
          id="ikigai-community"
          className="zoda-fabrics-snap__section zoda-ikigai-community"
          data-snap-panel
        >
          <div className="zoda-ikigai-community__content">
            <p className="zoda-fabrics-hero__kicker">Community</p>
            <h2 className="zoda-fabrics-hero__title">Together we achieve more.</h2>
            <p className="zoda-ikigai-community__lede">
              ZODA is more than a brand; it's a community of champions united by a passion for
              pushing limits. Whether you're a pro or just starting out, ZODA welcomes you - because
              together, we achieve more.
            </p>
            <ul className="zoda-ikigai-community__values">
              {COMMUNITY_VALUES.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
            <div className="zoda-fabrics-feature__actions">
              <Link to="/collections" className="zoda-fabrics-feature__shop">
                Join the movement
              </Link>
            </div>
          </div>
          <div className="zoda-ikigai-community__images" aria-label="ZODA community imagery">
            <div className="zoda-ikigai-community__image-column">
              <img
                src="https://zoda.sg/cdn/shop/files/pulsecollection-35.jpg?v=1753996919&width=800"
                alt="Two women stretching outdoors on a sunny day"
                loading="lazy"
              />
              <img
                src="https://zoda.sg/cdn/shop/files/zoda_sweatband_-_05.jpg?v=1750215838&width=800"
                alt="Two people wearing ZODA compression sleeves"
                loading="lazy"
              />
            </div>
            <img
              className="zoda-ikigai-community__image-tall"
              src="https://zoda.sg/cdn/shop/files/Technology_-_ZODA.jpg?v=1761731724&width=800"
              alt="Athlete in ZODA activewear posing against a light background"
              loading="lazy"
            />
          </div>
        </section>
      </main>

      <CartDrawer />
    </div>
  );
}
