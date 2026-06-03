import { useEffect } from "react";
import { ZODA_CIRCUIT_SCRIPT } from "./circuit-script";
import { ProductMotionGallery } from "./ProductMotionGallery";
import { CartDrawer } from "./CartDrawer";
import { ReviewsRail } from "./ReviewsRail";
import { SiteHeader } from "./SiteHeader";
import { FABRICS } from "@/lib/fabrics";
import moneyFmLogo from "@/assets/moneyfmlogo (1).png";
import straitsTimesLogo from "@/assets/the-straits-times-logo_480x480.png";
import pocketImage from "@/assets/technology-pocket.avif";
import buttonsImage from "@/assets/technology-buttons.avif";
import runnersImage from "@/assets/technology-runners.jpg";
import spotlightImage from "@/assets/tech-on-spotlight-image.webp";
import sustainabilityVideo from "@/assets/sustainability-video.mp4";



export function ZodaCircuit() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.getElementById("zoda-circuit-home");
    if (!root || root.dataset.ready === "true") return;
    const handleFabricCardClick = (event: MouseEvent) => {
      if (!window.matchMedia("(max-width: 760px)").matches) return;
      const target = event.target instanceof Element ? event.target : null;
      const card = target?.closest<HTMLElement>("[data-zoda-fabric-card]");
      if (!card || !root.contains(card)) return;

      const shouldReveal = !card.classList.contains("is-revealed");
      root
        .querySelectorAll<HTMLElement>("[data-zoda-fabric-card].is-revealed")
        .forEach((revealedCard) => {
          if (revealedCard !== card) revealedCard.classList.remove("is-revealed");
        });
      card.classList.toggle("is-revealed", shouldReveal);
      card.setAttribute("aria-pressed", shouldReveal ? "true" : "false");
    };
    const s = document.createElement("script");
    s.id = "zoda-circuit-script";
    s.textContent = ZODA_CIRCUIT_SCRIPT.replace(
      /const loopToStart = \(\) => \{[\s\S]*?\n    \};\n\n    const goTo =/,
      "const loopToStart = () => {\n      window.location.assign('/ikigai');\n    };\n\n    const goTo =",
    ).replace(
      "const mobileHorizontalSelector = '[data-zoda-fabric-viewport], .zoda-circuit__panel--pillars .zoda-circuit__cards, [data-zoda-collection-accordion], [data-zoda-feature-accordion]';",
      "const mobileHorizontalSelector = '[data-zoda-fabric-viewport], .zoda-circuit__panel--pillars .zoda-circuit__cards, [data-zoda-feature-accordion]';",
    ).replace(
      "const stepInternalForPanel = (panelIndex, direction) => {\n      if (!snapEnabled) return false;",
      "const stepInternalForPanel = (panelIndex, direction) => {\n      if (!snapEnabled) return false;\n      if (isMobile() && panelIndex === collectionPanelIndex) return false;",
    ).replace(
      "const clearVerticalSwipe = absY > 56 && absY > absX * 1.65;\n        if (!clearVerticalSwipe || (touchStartedInHorizontal && absX > absY * 0.45)) {\n          touchStartedInHorizontal = false;\n          return;\n        }",
      "touchStartedInHorizontal = false;\n        return;",
    );
    root.addEventListener("click", handleFabricCardClick);
    document.body.appendChild(s);
    return () => {
      root.removeEventListener("click", handleFabricCardClick);
      s.remove();
      // allow re-init if remounted
      delete (root as HTMLElement).dataset.ready;
    };
  }, []);

  return (
    <>
<section
  id="zoda-circuit-home"
  className="zoda-circuit"
  data-zoda-circuit=""
  data-snap-enabled="true"
>
  <SiteHeader menuId="zoda-circuit-home-mobile-menu" variant="dark" embedded />

  
    <nav className="zoda-circuit__dots" aria-label="Training circuit navigation">
      <a className="zoda-circuit__dot is-active" href="#zoda-circuit-home-1" data-zoda-dot="0" aria-label="Hero"></a>
      <a className="zoda-circuit__dot" href="#zoda-circuit-home-2" data-zoda-dot="1" aria-label="What's New"></a>
      <a className="zoda-circuit__dot" href="#zoda-circuit-home-5" data-zoda-dot="2" aria-label="Collection"></a>
      <a className="zoda-circuit__dot" href="#zoda-circuit-home-9" data-zoda-dot="3" aria-label="Reviews"></a>
      <a className="zoda-circuit__dot" href="#zoda-circuit-home-11" data-zoda-dot="4" aria-label="Prepare Your Kit"></a>
      <a className="zoda-circuit__dot" href="#zoda-circuit-home-6" data-zoda-dot="5" aria-label="Fabric"></a>
      <a className="zoda-circuit__dot" href="#zoda-circuit-home-7" data-zoda-dot="6" aria-label="Technology"></a>
      <a className="zoda-circuit__dot" href="#zoda-circuit-home-4" data-zoda-dot="7" aria-label="Pillars"></a>
      <a className="zoda-circuit__dot" href="#zoda-circuit-home-3" data-zoda-dot="8" aria-label="Mindset"></a>
      <a className="zoda-circuit__dot" href="#zoda-circuit-home-8" data-zoda-dot="9" aria-label="What's Coming"></a>
      <a className="zoda-circuit__dot" href="#zoda-circuit-home-12" data-zoda-dot="10" aria-label="Instagram"></a>
      <a className="zoda-circuit__dot" href="#zoda-circuit-home-10" data-zoda-dot="11" aria-label="Contact"></a>
    </nav>
  

  <div className="zoda-circuit__track" data-zoda-track="">
    <article id="zoda-circuit-home-1" className="zoda-circuit__panel zoda-circuit__panel--video is-active" data-zoda-panel="0">
      <div className="zoda-circuit__video-media" aria-hidden="true">
        <iframe className="zoda-circuit__video" src="https://player.vimeo.com/video/1135229306?autoplay=1&muted=1&loop=0&autopause=1&controls=0&playsinline=1&title=0&byline=0&portrait=0" title="ZODA opener video" allow="autoPlay; fullscreen; picture-in-picture" loading="eager"></iframe>
      </div>
      <div className="zoda-circuit__content zoda-circuit__video-content">
        <p className="zoda-circuit__kicker" data-animate="">Our Mission</p>
        <h1 className="zoda-circuit__heading" data-animate="" style={{"--zoda-delay": "90ms"} as React.CSSProperties}>Changing the way humans experience activewear</h1>
        <div className="zoda-circuit__actions" data-animate="" style={{"--zoda-delay": "180ms"} as React.CSSProperties}>
          <a className="zoda-circuit__button" href="mailto:hello@zoda.sg?subject=Partnership%20Inquiry">Partner With Us</a>
          <a className="zoda-circuit__button-secondary" href="/collections/core-performance">Explore Collections</a>
        </div>
        <div className="zoda-circuit__press-strip" data-animate="" style={{"--zoda-delay": "360ms"} as React.CSSProperties} aria-label="ZODA press mentions">
          <span className="zoda-circuit__press-label">YOU MIGHT HAVE SEEN US AT:</span>
          <a className="zoda-circuit__press-logo zoda-circuit__press-logo--straits" href="https://www.straitstimes.com/life/style/the-next-fit-thing-sportswears-glow-up-moment-is-here" target="_blank" rel="noopener" aria-label="Read ZODA in The Straits Times">
            <img src={straitsTimesLogo} alt="The Straits Times" />
          </a>
          <a className="zoda-circuit__press-logo zoda-circuit__press-logo--money" href="https://www.instagram.com/p/DIdbKN5BiQI/" target="_blank" rel="noopener" aria-label="View the Money FM 89.3 feature on Instagram">
            <img src={moneyFmLogo} alt="Money FM 89.3" />
          </a>
        </div>
      </div>
    </article>

    <article id="zoda-circuit-home-2" className="zoda-circuit__panel zoda-circuit__panel--signal" data-zoda-panel="1">
      <div className="zoda-circuit__signal-grid">
        <div>
          <p className="zoda-circuit__kicker" data-animate="">What's New</p>
          <h1 className="zoda-circuit__heading" data-animate="" style={{"--zoda-delay": "90ms"} as React.CSSProperties}>Products in motion.</h1>
        </div>
        <div className="zoda-circuit__signal-meta" data-animate="" style={{"--zoda-delay": "180ms"} as React.CSSProperties}>
          <p className="zoda-circuit__copy">Training, recovery, and every hour between. Step into the circuit and move with intent.</p>
          <div className="zoda-circuit__signal-line">In It To Win It</div>
          <div className="zoda-circuit__actions zoda-circuit__actions--compact">
            <a className="zoda-circuit__button" href="/collections/all">Shop The Drop</a>
            <a className="zoda-circuit__button-secondary" href="/fabrics">See The Fabrics</a>
          </div>
        </div>
      </div>
      <ProductMotionGallery />
    </article>

    <article id="zoda-circuit-home-3" className="zoda-circuit__panel zoda-circuit__panel--pursuit" data-zoda-panel="2">
      <div className="zoda-circuit__content">
        <p className="zoda-circuit__kicker" data-animate="">Mindset</p>
        <h2 className="zoda-circuit__heading" data-animate="" style={{"--zoda-delay": "90ms"} as React.CSSProperties}>Relentless Pursuit</h2>
        <p className="zoda-circuit__copy" data-animate="" style={{"--zoda-delay": "180ms"} as React.CSSProperties}>Early starts. Extra laps. Final reps.</p>
        <div className="zoda-circuit__actions" data-animate="" style={{"--zoda-delay": "260ms"} as React.CSSProperties}>
          <a className="zoda-circuit__button" href="/collections/all">Shop Now</a>
          <a className="zoda-circuit__button-secondary" href="/mission">Read The Mission</a>
        </div>
      </div>
      <div className="zoda-circuit__statements" aria-label="ZODA training cues">
        <div className="zoda-circuit__statement" data-animate="" style={{"--zoda-delay": "220ms"} as React.CSSProperties}><span>01</span>Train harder.</div>
        <div className="zoda-circuit__statement" data-animate="" style={{"--zoda-delay": "320ms"} as React.CSSProperties}><span>02</span>Recover sharper.</div>
        <div className="zoda-circuit__statement" data-animate="" style={{"--zoda-delay": "420ms"} as React.CSSProperties}><span>03</span>Move with intent.</div>
      </div>
    </article>

    <article id="zoda-circuit-home-4" className="zoda-circuit__panel zoda-circuit__panel--pillars" data-zoda-panel="3">
      <div className="zoda-circuit__intro-row">
        <div>
          <p className="zoda-circuit__kicker" data-animate="">Alpha Standard</p>
          <h2 className="zoda-circuit__heading" data-animate="" style={{"--zoda-delay": "90ms"} as React.CSSProperties}>Three standards.</h2>
          <div className="zoda-circuit__actions zoda-circuit__actions--compact" data-animate="" style={{"--zoda-delay": "220ms"} as React.CSSProperties}>
            <a className="zoda-circuit__button" href="/mission">Our Mission</a>
            <a className="zoda-circuit__button-secondary" href="/fabrics">Fabric Standard</a>
          </div>
        </div>
        <p className="zoda-circuit__copy" data-animate="" style={{"--zoda-delay": "180ms"} as React.CSSProperties}>Performance gear should move with the body, respect the planet, and connect athletes who train with purpose.</p>
      </div>
      <div className="zoda-circuit__cards">
        <div className="zoda-circuit__pillar-card" tabIndex={0} data-animate="" style={{"--zoda-delay": "220ms"} as React.CSSProperties}>
          <figure className="zoda-circuit__card-media"><img src={pocketImage} alt="Close-up of ZODA garment pocket construction" loading="lazy" /></figure>
          <span className="zoda-circuit__card-number">01</span>
          <strong className="zoda-circuit__card-title">Technology</strong>
          <p className="zoda-circuit__card-copy">Body-mapped construction helps manage sweat, stretch, chafe, and support.</p>
        </div>
        <div className="zoda-circuit__pillar-card" tabIndex={0} data-animate="" style={{"--zoda-delay": "320ms"} as React.CSSProperties}>
          <figure className="zoda-circuit__card-media"><video src={sustainabilityVideo} muted playsInline loop autoPlay aria-label="ZODA sustainability material motion" /></figure>
          <span className="zoda-circuit__card-number">02</span>
          <strong className="zoda-circuit__card-title">Sustainability</strong>
          <p className="zoda-circuit__card-copy">Responsible fibers support performance with a lighter footprint.</p>
        </div>
        <div className="zoda-circuit__pillar-card" tabIndex={0} data-animate="" style={{"--zoda-delay": "420ms"} as React.CSSProperties}>
          <figure className="zoda-circuit__card-media"><img src={runnersImage} alt="Runners training together in ZODA performance context" loading="lazy" /></figure>
          <span className="zoda-circuit__card-number">03</span>
          <strong className="zoda-circuit__card-title">Community</strong>
          <p className="zoda-circuit__card-copy">Built for athletes who show up, share standards, and keep moving.</p>
        </div>
      </div>
    </article>

    <article id="zoda-circuit-home-5" className="zoda-circuit__panel zoda-circuit__panel--collections" data-zoda-panel="4">
      <div className="zoda-circuit__intro-row">
        <div>
          <p className="zoda-circuit__kicker" data-animate="">Collection</p>
          <h2 className="zoda-circuit__heading" data-animate="" style={{"--zoda-delay": "90ms"} as React.CSSProperties}>Shop by collection.</h2>
        </div>
        <div>
          <p className="zoda-circuit__copy" data-animate="" style={{"--zoda-delay": "180ms"} as React.CSSProperties}>Shop by training mode: performance staples, endurance gear, 24/7 wear, and session accessories.</p>
          <div className="zoda-circuit__actions zoda-circuit__actions--compact" data-animate="" style={{"--zoda-delay": "220ms"} as React.CSSProperties}>
            <a className="zoda-circuit__button-secondary" href="/collections/all">View All Products</a>
          </div>
        </div>
      </div>
      <div className="zoda-circuit__collection-accordion" data-zoda-collection-accordion="" data-animate="" style={{"--zoda-delay": "220ms"} as React.CSSProperties}>
        <article className="zoda-circuit__collection-panel is-open" data-zoda-collection-panel="">
          <div className="zoda-circuit__collection-panel-content" id="zoda-circuit-home-collection-core" role="region" aria-labelledby="zoda-circuit-home-collection-core-tab">
            <span className="zoda-circuit__collection-progress">01 / 04</span>
            <h3 className="zoda-circuit__collection-panel-title">Core Performance</h3>
            <p className="zoda-circuit__collection-panel-copy">Compression, tanks, bras, shorts, and support layers built to stay locked in during high-output training.</p>
            <span className="zoda-circuit__kit-stack" aria-label="Core Performance kit"><span><b>01</b>Compression top<em></em></span><span><b>02</b>Training bra<em></em></span><span><b>03</b>Run short<em></em></span><span><b>04</b>Support layer<em></em></span></span>
            <a className="zoda-circuit__collection-arrow" href="/collections/core-performance">Shop Core</a>
          </div>
          <button className="zoda-circuit__collection-tab" id="zoda-circuit-home-collection-core-tab" type="button" aria-controls="zoda-circuit-home-collection-core" aria-expanded="true" data-zoda-collection-tab="">
            <span className="zoda-circuit__collection-tab-text"><span className="zoda-circuit__collection-tab-kicker">Train</span><span className="zoda-circuit__collection-tab-title">Core Performance</span></span>
          </button>
        </article>
        <article className="zoda-circuit__collection-panel" data-zoda-collection-panel="">
          <div className="zoda-circuit__collection-panel-content" id="zoda-circuit-home-collection-endurance" role="region" aria-labelledby="zoda-circuit-home-collection-endurance-tab">
            <span className="zoda-circuit__collection-progress">02 / 04</span>
            <h3 className="zoda-circuit__collection-panel-title">Endurance</h3>
            <p className="zoda-circuit__collection-panel-copy">Lightweight breathable pieces for heat, humidity, distance, and race-day effort without extra drag.</p>
            <span className="zoda-circuit__kit-stack" aria-label="Endurance kit"><span><b>01</b>Run top<em></em></span><span><b>02</b>Race short<em></em></span><span><b>03</b>Cooling cap<em></em></span><span><b>04</b>Light layer<em></em></span></span>
            <a className="zoda-circuit__collection-arrow" href="/collections/endurance">Shop Endurance</a>
          </div>
          <button className="zoda-circuit__collection-tab" id="zoda-circuit-home-collection-endurance-tab" type="button" aria-controls="zoda-circuit-home-collection-endurance" aria-expanded="false" data-zoda-collection-tab="">
            <span className="zoda-circuit__collection-tab-text"><span className="zoda-circuit__collection-tab-kicker">Go Long</span><span className="zoda-circuit__collection-tab-title">Endurance</span></span>
          </button>
        </article>
        <article className="zoda-circuit__collection-panel" data-zoda-collection-panel="">
          <div className="zoda-circuit__collection-panel-content" id="zoda-circuit-home-collection-wear" role="region" aria-labelledby="zoda-circuit-home-collection-wear-tab">
            <span className="zoda-circuit__collection-progress">03 / 04</span>
            <h3 className="zoda-circuit__collection-panel-title">24/7 Wear</h3>
            <p className="zoda-circuit__collection-panel-copy">Clean everyday performance wear for travel, studio, recovery, and off-duty movement.</p>
            <span className="zoda-circuit__kit-stack" aria-label="24/7 Wear kit"><span><b>01</b>Everyday tee<em></em></span><span><b>02</b>Recovery jogger<em></em></span><span><b>03</b>Soft layer<em></em></span><span><b>04</b>Travel short<em></em></span></span>
            <a className="zoda-circuit__collection-arrow" href="/collections/24-7-wear">Shop 24/7</a>
          </div>
          <button className="zoda-circuit__collection-tab" id="zoda-circuit-home-collection-wear-tab" type="button" aria-controls="zoda-circuit-home-collection-wear" aria-expanded="false" data-zoda-collection-tab="">
            <span className="zoda-circuit__collection-tab-text"><span className="zoda-circuit__collection-tab-kicker">Recover</span><span className="zoda-circuit__collection-tab-title">24/7 Wear</span></span>
          </button>
        </article>
        <article className="zoda-circuit__collection-panel" data-zoda-collection-panel="">
          <div className="zoda-circuit__collection-panel-content" id="zoda-circuit-home-collection-accessories" role="region" aria-labelledby="zoda-circuit-home-collection-accessories-tab">
            <span className="zoda-circuit__collection-progress">04 / 04</span>
            <h3 className="zoda-circuit__collection-panel-title">Accessories</h3>
            <p className="zoda-circuit__collection-panel-copy">Headbands, sweatbands, scrunchies, and small essentials made to finish the session.</p>
            <span className="zoda-circuit__kit-stack" aria-label="Accessories kit"><span><b>01</b>Headband<em></em></span><span><b>02</b>Sweatband<em></em></span><span><b>03</b>Scrunchie<em></em></span><span><b>04</b>Essentials<em></em></span></span>
            <a className="zoda-circuit__collection-arrow" href="/collections/accessories">Shop Accessories</a>
          </div>
          <button className="zoda-circuit__collection-tab" id="zoda-circuit-home-collection-accessories-tab" type="button" aria-controls="zoda-circuit-home-collection-accessories" aria-expanded="false" data-zoda-collection-tab="">
            <span className="zoda-circuit__collection-tab-text"><span className="zoda-circuit__collection-tab-kicker">Finish</span><span className="zoda-circuit__collection-tab-title">Accessories</span></span>
          </button>
        </article>
      </div>
    </article>

    <article id="zoda-circuit-home-6" className="zoda-circuit__panel zoda-circuit__panel--fabric" data-zoda-panel="5">
      <div className="zoda-circuit__fabric-shell" data-zoda-fabric="">
        <div className="zoda-circuit__fabric-head">
          <div>
            <p className="zoda-circuit__kicker" data-animate="">Fabric System</p>
            <h2 className="zoda-circuit__heading" data-animate="" style={{"--zoda-delay": "90ms"} as React.CSSProperties}>Fabric system.</h2>
          </div>
          <div>
            <p className="zoda-circuit__copy" data-animate="" style={{"--zoda-delay": "180ms"} as React.CSSProperties}>Eight fabric systems tuned for sweat control, stretch, breathability, support, and recovery.</p>
            <div className="zoda-circuit__actions zoda-circuit__actions--compact" data-animate="" style={{"--zoda-delay": "240ms"} as React.CSSProperties}>
              <a className="zoda-circuit__button-secondary" href="/fabrics">Compare Fabrics</a>
            </div>
          </div>
        </div>
        <div className="zoda-circuit__fabric-viewport" data-zoda-fabric-viewport="">
          <div className="zoda-circuit__fabric-track" data-zoda-fabric-track="">
            {FABRICS.map((fabric, index) => (
              <button
                key={fabric.handle}
                className={`zoda-circuit__fabric-card zoda-fabrics-card zoda-fabrics-card--flip${
                  index === 0 ? " is-active" : ""
                }`}
                type="button"
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
                    <span className="zoda-fabrics-card__back-cta">Explore →</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="zoda-circuit__fabric-ui" aria-hidden="true">
          <div className="zoda-circuit__fabric-progress"><span data-zoda-fabric-progress=""></span></div>
          <div className="zoda-circuit__fabric-count" data-zoda-fabric-count="">03 / 08</div>
        </div>
      </div>
    </article>

    <article id="zoda-circuit-home-7" className="zoda-circuit__panel zoda-circuit__panel--product" data-zoda-panel="6">
      <div className="zoda-circuit__content">
        <p className="zoda-circuit__kicker" data-animate="">Technology</p>
        <h2 className="zoda-circuit__heading" data-animate="" style={{"--zoda-delay": "90ms"} as React.CSSProperties}>Inside Zenith Tech.</h2>
        <p className="zoda-circuit__copy" data-animate="" style={{"--zoda-delay": "180ms"} as React.CSSProperties}>Advanced fabric technology meets precise construction for comfort, mobility, and focused performance.</p>
        <div className="zoda-circuit__actions zoda-circuit__actions--compact" data-animate="" style={{"--zoda-delay": "240ms"} as React.CSSProperties}>
          <a className="zoda-circuit__button-secondary" href="/fabrics">Explore Zenith Tech</a>
        </div>
        <div className="zoda-circuit__feature-summary" data-animate="" style={{"--zoda-delay": "240ms"} as React.CSSProperties} aria-label="Active Zenith Tech feature summary">
          <article className="zoda-circuit__feature-summary-card is-active" data-zoda-feature-summary="">
            <span>01 / Compression</span><strong>Zenflex™</strong>
            <p>Compression-specific stretch and support engineered for locked-in movement without restricting the body.</p>
          </article>
          <article className="zoda-circuit__feature-summary-card" data-zoda-feature-summary="">
            <span>02 / Cooling</span><strong>ZO-Vent™ + Unbound™</strong>
            <p>Airflow, cooling, and unrestricted mobility for high-intensity work under pressure.</p>
          </article>
          <article className="zoda-circuit__feature-summary-card" data-zoda-feature-summary="">
            <span>03 / Moisture</span><strong>ZO-Dry™ + SwiftWick™</strong>
            <p>Fast sweat movement that keeps athletes dry, cool, and distraction-free.</p>
          </article>
          <article className="zoda-circuit__feature-summary-card" data-zoda-feature-summary="">
            <span>04 / Freshness</span><strong>ZO-Fresh™ + Unconquered™</strong>
            <p>Antimicrobial fabric technology for long-lasting freshness during extended wear.</p>
          </article>
          <article className="zoda-circuit__feature-summary-card" data-zoda-feature-summary="">
            <span>05 / Mobility</span><strong>FluidMotion™</strong>
            <p>Multi-directional stretch that moves naturally with the body for unrestricted performance.</p>
          </article>
        </div>
      </div>
      <div className="zoda-circuit__callouts" data-zoda-feature-accordion="" data-animate="" style={{"--zoda-delay": "260ms"} as React.CSSProperties}>
        <article className="zoda-circuit__feature-item is-open" data-zoda-feature-item="">
          <button className="zoda-circuit__callout is-active" id="zoda-circuit-home-feature-zenflex-tab" type="button" aria-expanded="true" aria-controls="zoda-circuit-home-feature-zenflex" data-zoda-feature-tab=""><span className="zoda-circuit__callout-title">Zenflex™</span><span>Compression support</span><i className="zoda-circuit__toggle-switch" aria-hidden="true"></i></button>
          <div className="zoda-circuit__feature-panel" id="zoda-circuit-home-feature-zenflex" role="region" aria-labelledby="zoda-circuit-home-feature-zenflex-tab">
            <span>Zenith Tech Feature</span>
            <ul><li>Helps the garment contour to the body while maintaining comfort under pressure.</li><li>Built for athletes who need compression that supports effort without restricting motion.</li></ul>
          </div>
        </article>
        <article className="zoda-circuit__feature-item" data-zoda-feature-item="">
          <button className="zoda-circuit__callout" id="zoda-circuit-home-feature-vent-tab" type="button" aria-expanded="false" aria-controls="zoda-circuit-home-feature-vent" data-zoda-feature-tab=""><span className="zoda-circuit__callout-title">ZO-Vent™</span><span>Unbound™</span><i className="zoda-circuit__toggle-switch" aria-hidden="true"></i></button>
          <div className="zoda-circuit__feature-panel" id="zoda-circuit-home-feature-vent" role="region" aria-labelledby="zoda-circuit-home-feature-vent-tab">
            <span>Cooling Fabric</span>
            <ul><li>Breathable performance fabric supports unrestricted mobility and all-day comfort.</li><li>Built to keep athletes light, cool, and focused under pressure.</li></ul>
          </div>
        </article>
        <article className="zoda-circuit__feature-item" data-zoda-feature-item="">
          <button className="zoda-circuit__callout" id="zoda-circuit-home-feature-dry-tab" type="button" aria-expanded="false" aria-controls="zoda-circuit-home-feature-dry" data-zoda-feature-tab=""><span className="zoda-circuit__callout-title">ZO-Dry™</span><span>SwiftWick™</span><i className="zoda-circuit__toggle-switch" aria-hidden="true"></i></button>
          <div className="zoda-circuit__feature-panel" id="zoda-circuit-home-feature-dry" role="region" aria-labelledby="zoda-circuit-home-feature-dry-tab">
            <span>Moisture Fabric</span>
            <ul><li>Keeps you dry, cool, and comfortable through demanding training sessions.</li><li>Designed for distraction-free performance at every level.</li></ul>
          </div>
        </article>
        <article className="zoda-circuit__feature-item" data-zoda-feature-item="">
          <button className="zoda-circuit__callout" id="zoda-circuit-home-feature-fresh-tab" type="button" aria-expanded="false" aria-controls="zoda-circuit-home-feature-fresh" data-zoda-feature-tab=""><span className="zoda-circuit__callout-title">ZO-Fresh™</span><span>Unconquered™</span><i className="zoda-circuit__toggle-switch" aria-hidden="true"></i></button>
          <div className="zoda-circuit__feature-panel" id="zoda-circuit-home-feature-fresh" role="region" aria-labelledby="zoda-circuit-home-feature-fresh-tab">
            <span>Freshness Fabric</span>
            <ul><li>Delivers long-lasting freshness and confidence during extended wear.</li><li>Made to keep athletes focused, fresh, and ready for every challenge.</li></ul>
          </div>
        </article>
        <article className="zoda-circuit__feature-item" data-zoda-feature-item="">
          <button className="zoda-circuit__callout" id="zoda-circuit-home-feature-motion-tab" type="button" aria-expanded="false" aria-controls="zoda-circuit-home-feature-motion" data-zoda-feature-tab=""><span className="zoda-circuit__callout-title">FluidMotion™</span><span>Mobility</span><i className="zoda-circuit__toggle-switch" aria-hidden="true"></i></button>
          <div className="zoda-circuit__feature-panel" id="zoda-circuit-home-feature-motion" role="region" aria-labelledby="zoda-circuit-home-feature-motion-tab">
            <span>Movement Fabric</span>
            <ul><li>Enhances flexibility, mobility, and unrestricted performance in motion.</li><li>Created for comfort-driven movement without limitations.</li></ul>
          </div>
        </article>
      </div>
    </article>

    <article id="zoda-circuit-home-8" className="zoda-circuit__panel zoda-circuit__panel--proof" data-zoda-panel="7">
      <div className="zoda-circuit__intro-row">
        <div>
          <p className="zoda-circuit__kicker" data-animate="">What's Coming</p>
          <h2 className="zoda-circuit__heading" data-animate="" style={{"--zoda-delay": "90ms"} as React.CSSProperties}>Exciting projects.</h2>
          <div className="zoda-circuit__actions zoda-circuit__actions--compact" data-animate="" style={{"--zoda-delay": "220ms"} as React.CSSProperties}>
            <a className="zoda-circuit__button-secondary" href="https://www.instagram.com/zoda.sg/" target="_blank" rel="noopener">Watch Updates</a>
          </div>
        </div>
        <p className="zoda-circuit__copy" data-animate="" style={{"--zoda-delay": "180ms"} as React.CSSProperties}>Upcoming drops, community moments, and access-led projects for athletes moving with purpose.</p>
      </div>
      <div className="zoda-circuit__proof-grid">
        <div className="zoda-circuit__proof-item" data-animate="" style={{"--zoda-delay": "220ms"} as React.CSSProperties}>
          <span>01 / Drops</span>
          <strong>Training releases</strong>
          <p>New kits and fabric updates built around real movement.</p>
        </div>
        <div className="zoda-circuit__proof-item" data-animate="" style={{"--zoda-delay": "320ms"} as React.CSSProperties}>
          <span>02 / Stories</span>
          <strong>Warrior notes</strong>
          <p>Field notes from athletes who stay in it when the work gets hard.</p>
        </div>
        <div className="zoda-circuit__proof-item" data-animate="" style={{"--zoda-delay": "420ms"} as React.CSSProperties}>
          <span>03 / Access</span>
          <strong>Inner circle</strong>
          <p>NFC content, challenges, and race-day moments offline.</p>
        </div>
      </div>
    </article>

    <article id="zoda-circuit-home-9" className="zoda-circuit__panel zoda-circuit__panel--reviews zoda-circuit__panel--command" data-zoda-panel="8">
      <div className="zoda-circuit__content">
        <p className="zoda-circuit__kicker" data-animate="">Reviews</p>
        <h2 className="zoda-circuit__heading" data-animate="" style={{"--zoda-delay": "90ms"} as React.CSSProperties}>What athletes are saying.</h2>
        <p className="zoda-circuit__copy" data-animate="" style={{"--zoda-delay": "180ms"} as React.CSSProperties}>Real ratings pulled from your Shopify products — no dummy text.</p>
        <div className="zoda-circuit__actions zoda-circuit__actions--compact" data-animate="" style={{"--zoda-delay": "220ms"} as React.CSSProperties}>
          <a className="zoda-circuit__button-secondary" href="/collections/all">Shop Rated Gear</a>
        </div>
        <ReviewsRail />
      </div>
    </article>

    <article id="zoda-circuit-home-11" className="zoda-circuit__panel zoda-circuit__panel--prepare zoda-circuit__panel--proof" data-zoda-panel="10">
      <div className="zoda-circuit__intro-row">
        <div>
          <p className="zoda-circuit__kicker" data-animate="">Prepare Your Kit</p>
          <h2 className="zoda-circuit__heading" data-animate="" style={{"--zoda-delay": "90ms"} as React.CSSProperties}>Prepare your kit.</h2>
          <div className="zoda-circuit__actions zoda-circuit__actions--compact" data-animate="" style={{"--zoda-delay": "220ms"} as React.CSSProperties}>
            <a className="zoda-circuit__button" href="/collections/all">Build Your Kit</a>
          </div>
        </div>
        <p className="zoda-circuit__copy" data-animate="" style={{"--zoda-delay": "180ms"} as React.CSSProperties}>A session-ready setup starts with support, airflow, and finishing details.</p>
      </div>
      <div className="zoda-circuit__proof-grid">
        <div className="zoda-circuit__proof-item" data-animate="" style={{"--zoda-delay": "220ms"} as React.CSSProperties}>
          <figure className="zoda-circuit__proof-media"><img src={spotlightImage} alt="ZODA compression piece showing support and fit" loading="lazy" /></figure>
          <span>01 / Base</span>
          <strong>Lock in support</strong>
          <p>Compression that holds shape through heat and sweat.</p>
        </div>
        <div className="zoda-circuit__proof-item" data-animate="" style={{"--zoda-delay": "320ms"} as React.CSSProperties}>
          <figure className="zoda-circuit__proof-media"><img src={buttonsImage} alt="Close-up detail of breathable ZODA garment construction" loading="lazy" /></figure>
          <span>02 / Layer</span>
          <strong>Add breathability</strong>
          <p>Lightweight pieces built for airflow and quick transitions.</p>
        </div>
        <div className="zoda-circuit__proof-item" data-animate="" style={{"--zoda-delay": "420ms"} as React.CSSProperties}>
          <figure className="zoda-circuit__proof-media"><img src={pocketImage} alt="ZODA detail image representing finishing accessories and storage" loading="lazy" /></figure>
          <span>03 / Finish</span>
          <strong>Complete the session</strong>
          <p>Accessories and recovery pieces keep the day moving.</p>
        </div>
      </div>
    </article>

    <article id="zoda-circuit-home-12" className="zoda-circuit__panel zoda-circuit__panel--instagram zoda-circuit__panel--proof" data-zoda-panel="11">
      <div className="zoda-circuit__intro-row">
        <div>
          <p className="zoda-circuit__kicker" data-animate="">Instagram</p>
          <h2 className="zoda-circuit__heading" data-animate="" style={{"--zoda-delay": "90ms"} as React.CSSProperties}>Follow us on Instagram.</h2>
          <div className="zoda-circuit__actions zoda-circuit__actions--compact" data-animate="" style={{"--zoda-delay": "220ms"} as React.CSSProperties}>
            <a className="zoda-circuit__button" href="https://www.instagram.com/zoda.sg/" target="_blank" rel="noopener">Follow @zoda.sg</a>
          </div>
        </div>
        <p className="zoda-circuit__copy" data-animate="" style={{"--zoda-delay": "180ms"} as React.CSSProperties}>Product drops, athlete stories, training notes, and behind-the-scenes progress.</p>
      </div>
      <div className="zoda-circuit__proof-grid">
        <a className="zoda-circuit__proof-item" href="https://www.instagram.com/zoda.sg/" target="_blank" rel="noopener" data-animate="" style={{"--zoda-delay": "220ms"} as React.CSSProperties}>
          <span>01 / Drops</span>
          <strong>@zoda.sg</strong>
          <p>New releases, restocks, and product details from the ZODA team.</p>
        </a>
        <a className="zoda-circuit__proof-item" href="https://www.instagram.com/zoda.sg/" target="_blank" rel="noopener" data-animate="" style={{"--zoda-delay": "320ms"} as React.CSSProperties}>
          <span>02 / Training</span>
          <strong>Session notes</strong>
          <p>How athletes use the kit across strength, endurance, recovery, and travel.</p>
        </a>
        <a className="zoda-circuit__proof-item" href="https://www.instagram.com/zoda.sg/" target="_blank" rel="noopener" data-animate="" style={{"--zoda-delay": "420ms"} as React.CSSProperties}>
          <span>03 / Community</span>
          <strong>Move with us</strong>
          <p>Follow the people, stories, and standards shaping the next ZODA chapter.</p>
        </a>
      </div>
    </article>

    <article id="zoda-circuit-home-10" className="zoda-circuit__panel zoda-circuit__panel--restart" data-zoda-panel="9">
      
      
      
      <div className="zoda-circuit__content">
        <p className="zoda-circuit__kicker" data-animate="">Contact</p>
        <h2 className="zoda-circuit__heading" data-animate="" style={{"--zoda-delay": "90ms"} as React.CSSProperties}>Changing how humans experience activewear.</h2>
        <p className="zoda-circuit__copy" data-animate="" style={{"--zoda-delay": "180ms"} as React.CSSProperties}>Shop the gear, speak with the team, or follow the ZODA circuit as we change how humans experience activewear.</p>
        <div className="zoda-circuit__actions" data-animate="" style={{"--zoda-delay": "260ms"} as React.CSSProperties}>
          <a className="zoda-circuit__button" href="/collections/all">Shop ZODA</a>
          <a className="zoda-circuit__button-secondary" href="mailto:hello@zoda.sg?subject=Partnership%20Inquiry">Partner With Us</a>
        </div>
        <div className="zoda-circuit__contact-grid" data-animate="" style={{"--zoda-delay": "340ms"} as React.CSSProperties}>
          <a className="zoda-circuit__contact-link" href="tel:+6596702034" aria-label="Call ZODA at +65 9670 2034"><span>Phone</span><strong className="zoda-circuit__contact-value">+65 9670 2034</strong></a>
          <a className="zoda-circuit__contact-link" href="mailto:hello@zoda.sg" aria-label="Email ZODA at hello@zoda.sg"><span>Email</span><strong className="zoda-circuit__contact-value">hello@zoda.sg</strong></a>
        </div>
        <div className="zoda-circuit__socials" data-animate="" style={{"--zoda-delay": "420ms"} as React.CSSProperties} aria-label="ZODA social links">
          <a href="#" target="_blank" rel="noopener" aria-label="TikTok">
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M16.8 3c.4 2.7 1.9 4.4 4.2 4.7v3.1a7.4 7.4 0 0 1-4.1-1.3v6.1c0 3.2-2.3 5.4-5.6 5.4-3.1 0-5.3-2.1-5.3-4.9 0-3 2.4-5.1 5.7-5.1.4 0 .7 0 1 .1v3.2a3.4 3.4 0 0 0-1.1-.2c-1.4 0-2.3.8-2.3 1.9s.8 1.9 2 1.9c1.4 0 2.2-.9 2.2-2.5V3h3.3Z"/></svg>
          </a>
          <a href="https://sg.linkedin.com/company/zodaholdings" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M6.8 8.8H3.5V20h3.3V8.8ZM5.2 7.3a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8ZM20.5 13.8c0-3.4-1.8-5.2-4.4-5.2-1.9 0-3 .9-3.5 1.8V8.8H9.4V20h3.3v-5.7c0-1.7.8-2.8 2.3-2.8 1.3 0 2.1.9 2.1 2.7V20h3.4v-6.2Z"/></svg>
          </a>
          <a href="#" target="_blank" rel="noopener" aria-label="Facebook">
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M14 8.2V6.7c0-.8.4-1.2 1.4-1.2h1.8V2.4a23 23 0 0 0-2.7-.1c-2.7 0-4.5 1.6-4.5 4.1v1.8H7v3.5h3V20h4v-8.3h3l.5-3.5H14Z"/></svg>
          </a>
          <a href="#" target="_blank" rel="noopener" aria-label="Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.9"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.5"/><path d="M17.5 6.8h.01"/></svg>
          </a>
        </div>
      </div>
    </article>
  </div>
</section>
    <CartDrawer />
    </>
  );
}
