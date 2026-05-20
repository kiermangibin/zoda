// All 12 ZODA Snap homepage sections, ported from the Liquid theme to React.
// Uses utility classes defined in src/styles.css (zoda-section, zoda-kicker, zoda-heading, zoda-copy, zoda-btn, zoda-btn-secondary).

import { useState } from "react";
import { ChevronRight, Phone, Mail, Instagram, Linkedin, Facebook } from "lucide-react";

const ACCENT = "var(--zoda-accent)";

/* ───────────────────────── HERO ───────────────────────── */
export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-black text-white">
      {/* Background video */}
      <div className="absolute inset-0">
        <iframe
          title="ZODA opener"
          src="https://player.vimeo.com/video/1135229306?autoplay=1&muted=1&loop=0&autopause=1&controls=0&playsinline=1&title=0&byline=0&portrait=0"
          allow="autoplay; fullscreen; picture-in-picture"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[120vh] w-[177.77vh] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.78),rgba(0,0,0,0.18)_44%,rgba(0,0,0,0.7)),linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.3)_48%,rgba(0,0,0,0.88))]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-16 md:px-12 md:pb-20">
        <p className="zoda-kicker mb-4">Our Mission / 01</p>
        <h1 className="zoda-heading max-w-[1100px]" style={{ fontSize: "clamp(48px, 6.2vw, 112px)" }}>
          Changing the way humans experience activewear
        </h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="mailto:hello@zoda.sg?subject=Partnership%20Inquiry" className="zoda-btn">
            Partner With Us
          </a>
          <a href="#collections" className="zoda-btn-secondary">
            Explore Collections
          </a>
        </div>

        {/* Press strip */}
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/15 pt-6 text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">
          <span>You might have seen us at:</span>
          <span className="text-white">The Straits Times</span>
          <span className="text-white/60">·</span>
          <span className="text-white">CNA Lifestyle</span>
          <span className="text-white/60">·</span>
          <span className="text-white">Vulcan Post</span>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── SIGNAL (Products in motion) ───────────────────── */
const SIGNAL_IMAGES = [
  "https://cdn.shopify.com/s/files/1/0893/5224/1442/files/Compression-Tank-Men.png?v=1775894316",
  "https://cdn.shopify.com/s/files/1/0893/5224/1442/files/Compression-Shorts_Men.png?v=1775894246",
  "https://cdn.shopify.com/s/files/1/0893/5224/1442/files/Compression-Shorts_Women.png?v=1775894376",
  "https://cdn.shopify.com/s/files/1/0893/5224/1442/files/Compression-Tank-Women_2c190fd1-1f2a-46a4-a0a9-ddf3db5eaa23.png?v=1775926478",
  "https://cdn.shopify.com/s/files/1/0893/5224/1442/files/Compression-Tights_Women.png?v=1775894417",
];

export function Signal() {
  const loop = [...SIGNAL_IMAGES, ...SIGNAL_IMAGES];
  return (
    <section
      className="zoda-section"
      style={{
        background:
          "radial-gradient(ellipse at 18% 18%, rgba(85,205,161,0.32), transparent 22%), radial-gradient(circle at 88% 78%, rgba(85,205,161,0.1), transparent 26%), linear-gradient(136deg,#000,#070908 58%,#000)",
      }}
    >
      <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-[1.16fr_0.62fr] md:items-end">
        <div>
          <p className="zoda-kicker mb-4">What's New / 02</p>
          <h2 className="zoda-heading">Products in motion.</h2>
        </div>
        <div className="grid gap-4 border-l border-white/15 pl-6 md:pl-10">
          <p className="zoda-copy">
            ZODA is built for training, recovery, and every hour between. Step into the circuit and move with intent.
          </p>
          <div className="flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.14em] text-white/80">
            <span className="block h-[2px] w-14" style={{ background: ACCENT }} />
            In It To Win It
          </div>
        </div>
      </div>

      {/* Marquee gallery */}
      <div className="relative mt-12 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
          style={{ background: "linear-gradient(90deg,#000,rgba(0,0,0,0))" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
          style={{ background: "linear-gradient(270deg,#000,rgba(0,0,0,0))" }}
        />
        <div
          className="flex w-max gap-4"
          style={{ animation: "zoda-roll 22s linear infinite" }}
        >
          {loop.map((src, i) => (
            <div
              key={i}
              className="relative h-[260px] w-[230px] flex-none overflow-hidden border border-white/10 bg-white/5"
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── COLLECTIONS ─────────────────── */
const COLLECTIONS = [
  {
    kicker: "Train",
    title: "Core Performance",
    progress: "01 / 04",
    copy: "Compression, tanks, bras, shorts, and support layers built to stay locked in during high-output training.",
    kit: ["Compression top", "Training bra", "Run short", "Support layer"],
    cta: "Shop Core",
  },
  {
    kicker: "Go Long",
    title: "Endurance",
    progress: "02 / 04",
    copy: "Lightweight breathable pieces for heat, humidity, distance, and race-day effort without extra drag.",
    kit: ["Run top", "Race short", "Cooling cap", "Light layer"],
    cta: "Shop Endurance",
  },
  {
    kicker: "Recover",
    title: "24/7 Wear",
    progress: "03 / 04",
    copy: "Clean everyday performance wear for travel, studio, recovery, and off-duty movement.",
    kit: ["Everyday tee", "Recovery jogger", "Soft layer", "Travel short"],
    cta: "Shop 24/7",
  },
  {
    kicker: "Finish",
    title: "Accessories",
    progress: "04 / 04",
    copy: "Headbands, sweatbands, scrunchies, and small essentials made to finish the session.",
    kit: ["Headband", "Sweatband", "Scrunchie", "Essentials"],
    cta: "Shop Accessories",
  },
];

export function Collections() {
  const [open, setOpen] = useState(0);
  return (
    <section id="collections" className="zoda-section">
      <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-2 md:items-end">
        <div>
          <p className="zoda-kicker mb-4">Collection / 03</p>
          <h2 className="zoda-heading">Shop by collection.</h2>
        </div>
        <p className="zoda-copy md:justify-self-end">
          Shop by training mode: performance staples, endurance gear, 24/7 wear, and accessories that finish the session.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-[1500px] gap-2 md:grid-cols-4">
        {COLLECTIONS.map((c, i) => {
          const isOpen = i === open;
          return (
            <article
              key={c.title}
              className="group relative overflow-hidden border border-white/10 bg-[#0a0c0b] transition-all"
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="flex h-20 w-full items-center justify-between px-5 text-left"
              >
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>
                    {c.kicker}
                  </span>
                  <span className="font-display text-lg uppercase tracking-tight">{c.title}</span>
                </div>
                <ChevronRight
                  className={`h-5 w-5 transition-transform ${isOpen ? "rotate-90" : ""}`}
                  style={{ color: ACCENT }}
                />
              </button>
              <div
                className={`grid overflow-hidden transition-all duration-500 ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="min-h-0">
                  <div className="border-t border-white/10 p-5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                      {c.progress}
                    </span>
                    <h3 className="mt-2 font-display text-2xl uppercase">{c.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">{c.copy}</p>
                    <ul className="mt-5 grid grid-cols-2 gap-2 text-[11px] uppercase tracking-[0.12em]">
                      {c.kit.map((k, idx) => (
                        <li key={k} className="flex items-baseline gap-2 text-white/80">
                          <b className="font-display text-[10px]" style={{ color: ACCENT }}>
                            0{idx + 1}
                          </b>
                          {k}
                        </li>
                      ))}
                    </ul>
                    <a href="#" className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: ACCENT }}>
                      {c.cta} <ChevronRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ─────────────────── REVIEWS ─────────────────── */
const REVIEWS = [
  { tag: "01 / Fit", body: "The compression feels locked in without getting restrictive. It moves through intervals, lifts, and recovery work.", name: "Alicia Tan", role: "Run Club Athlete", product: "on compression tank", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80" },
  { tag: "02 / Sweat", body: "The fabric dries fast after humid runs, then still looks sharp enough to wear after training.", name: "Marcus Lee", role: "Hybrid Training", product: "on compression shorts", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80" },
  { tag: "03 / Support", body: "Supportive, clean, and easy to layer. The kit feels built for athletes who train daily.", name: "Priya Nair", role: "Daily Movement", product: "on compression tights", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&q=80" },
  { tag: "04 / Heat", body: "Lightweight pieces stay breathable during outdoor sessions and humid race-day efforts.", name: "Daniel Koh", role: "Race Day Prep", product: "on endurance run top", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80" },
  { tag: "05 / Recovery", body: "The fabric holds its shape after repeated wear, washing, and long movement blocks.", name: "Daniel K.", role: "Daily Athlete", product: "on recovery jogger", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80" },
];

export function Reviews() {
  return (
    <section className="zoda-section">
      <div className="mx-auto max-w-[1500px]">
        <p className="zoda-kicker mb-4">Reviews / 09</p>
        <h2 className="zoda-heading">What athletes are saying.</h2>
        <p className="zoda-copy mt-5">
          Fit, support, and recovery feedback from the people putting ZODA through real sessions.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <article key={r.name} className="flex flex-col gap-5 border border-white/10 bg-[#0a0c0b] p-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: ACCENT }}>
                {r.tag}
              </span>
              <p className="text-base leading-relaxed text-white/85">{r.body}</p>
              <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-4">
                <img src={r.img} alt="" loading="lazy" className="h-11 w-11 rounded-full object-cover" />
                <div className="flex flex-col">
                  <strong className="text-sm">{r.name}</strong>
                  <em className="not-italic text-xs text-white/60">{r.role}</em>
                  <small className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/40">{r.product}</small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── PREPARE KIT ─────────────────── */
const KIT = [
  { tag: "01 / Base", title: "Lock in support", copy: "Start with compression that holds shape through heat, sweat, and repeated movement." },
  { tag: "02 / Layer", title: "Add breathability", copy: "Choose lightweight tops and shorts built for airflow, comfort, and quick transitions." },
  { tag: "03 / Finish", title: "Complete the session", copy: "Round out the kit with accessories and recovery pieces that keep the day moving." },
];

export function PrepareKit() {
  return (
    <section className="zoda-section">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <p className="zoda-kicker mb-4">Prepare Your Kit / 05</p>
            <h2 className="zoda-heading">Prepare your kit.</h2>
          </div>
          <p className="zoda-copy md:justify-self-end">
            Build a session-ready setup around compression, breathability, recovery, and the finishing details.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {KIT.map((k) => (
            <div key={k.title} className="border border-white/10 bg-[#0a0c0b] p-7">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: ACCENT }}>
                {k.tag}
              </span>
              <strong className="mt-4 block font-display text-2xl uppercase">{k.title}</strong>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{k.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── FABRIC SYSTEM ─────────────────── */
const FABRICS = [
  { idx: "01", name: "ZENCOT™", copy: "BCI cotton and elastane for soft, breathable performance.", tags: ["FluidMotion™", "ZO-Fresh™", "Breathable"] },
  { idx: "02", name: "Zoenix™", copy: "Recycled polyester engineered for humidity and sweat movement.", tags: ["ZO-Dry™", "ZO-Fresh™", "RPET"] },
  { idx: "03", name: "ZoenixLite™", copy: "Lightweight stretch for fast, breathable movement.", tags: ["ZO-Vent™", "4-way stretch", "Lightweight"] },
  { idx: "04", name: "RPSTRNG™", copy: "Regenerated nylon blend built for durable training.", tags: ["Durability", "ZO-Dry™", "Protection"] },
  { idx: "05", name: "AuraForm™", copy: "Premium support, sculpted fit, and recovery stretch.", tags: ["Zenith Tech™", "Recovery", "Support"] },
  { idx: "06", name: "NyCurv™", copy: "High-denier nylon for durability and shape recovery.", tags: ["High-denier", "Stretch", "Shape hold"] },
  { idx: "07", name: "NyX™", copy: "Lightweight support for demanding workouts.", tags: ["Support", "Lightweight", "Training"] },
  { idx: "08", name: "NyXlite™", copy: "Breathable recycled stretch for everyday movement.", tags: ["Breathable", "Anti-odour", "4-way stretch"] },
];

export function FabricSystem() {
  const [active, setActive] = useState(0);
  return (
    <section className="zoda-section">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <p className="zoda-kicker mb-4">Fabric System / 06</p>
            <h2 className="zoda-heading">Fabric system.</h2>
          </div>
          <p className="zoda-copy md:justify-self-end">
            Eight fabric systems tuned for sweat control, stretch, breathability, support, and recovery.
          </p>
        </div>

        <div className="mt-12 -mx-5 overflow-x-auto px-5 pb-3">
          <div className="flex gap-3 min-w-max">
            {FABRICS.map((f, i) => {
              const isActive = i === active;
              return (
                <button
                  key={f.name}
                  onClick={() => setActive(i)}
                  className={`flex w-[280px] flex-none flex-col gap-3 border p-6 text-left transition-all ${
                    isActive ? "border-[var(--zoda-accent)] bg-[#0e1411]" : "border-white/10 bg-[#0a0c0b] hover:border-white/30"
                  }`}
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: ACCENT }}>
                    {f.idx} / ZODA FABRIC
                  </span>
                  <strong className="font-display text-2xl uppercase">{f.name}</strong>
                  <p className="text-sm text-white/70">{f.copy}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                    {f.tags.map((t) => (
                      <span key={t} className="border border-white/15 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-white/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <div className="h-[2px] flex-1 bg-white/10">
            <div
              className="h-full transition-all"
              style={{ width: `${((active + 1) / FABRICS.length) * 100}%`, background: ACCENT }}
            />
          </div>
          <div className="font-display text-sm tracking-[0.14em]">
            {String(active + 1).padStart(2, "0")} / {String(FABRICS.length).padStart(2, "0")}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── TECHNOLOGY ─────────────────── */
const TECH = [
  { tag: "01 / Compression", name: "Zenflex™", copy: "Compression-specific stretch and support engineered for locked-in movement without restricting the body." },
  { tag: "02 / Cooling", name: "ZO-Vent™ + Unbound™", copy: "Airflow, cooling, and unrestricted mobility for high-intensity work under pressure." },
  { tag: "03 / Moisture", name: "ZO-Dry™ + SwiftWick™", copy: "Fast sweat movement that keeps athletes dry, cool, and distraction-free." },
  { tag: "04 / Freshness", name: "ZO-Fresh™ + Unconquered™", copy: "Antimicrobial fabric technology for long-lasting freshness during extended wear." },
  { tag: "05 / Mobility", name: "FluidMotion™", copy: "Multi-directional stretch designed to flow with the body through every plane of movement." },
];

export function Technology() {
  const [active, setActive] = useState(0);
  return (
    <section className="zoda-section">
      <div className="mx-auto max-w-[1500px]">
        <p className="zoda-kicker mb-4">Technology / 07</p>
        <h2 className="zoda-heading">Inside Zenith Tech.</h2>
        <p className="zoda-copy mt-5">
          ZODA's precision-engineered innovation platform combines advanced fabric technology with meticulous design to push boundaries, elevate comfort, and unlock peak potential.
        </p>

        <div className="mt-12 grid gap-3 md:grid-cols-5">
          {TECH.map((t, i) => {
            const isActive = i === active;
            return (
              <button
                key={t.name}
                onClick={() => setActive(i)}
                className={`flex flex-col items-start gap-3 border p-5 text-left transition-all ${
                  isActive ? "border-[var(--zoda-accent)] bg-[#0e1411]" : "border-white/10 bg-[#0a0c0b]"
                }`}
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: ACCENT }}>
                  {t.tag}
                </span>
                <strong className="font-display text-lg uppercase">{t.name}</strong>
                <p className="text-xs leading-relaxed text-white/65">{t.copy}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── ALPHA STANDARDS ─────────────────── */
const PILLARS = [
  { n: "01", title: "Technology", copy: "Engineered fabrics, body-mapped fit, and strategic construction help manage sweat, stretch, chafe, and support when training intensity rises." },
  { n: "02", title: "Sustainability", copy: "We prioritize responsible fibers such as recycled polyester, regenerated nylon, and certified cotton so performance does not come at the planet's expense." },
  { n: "03", title: "Community", copy: "ZODA is built for athletes who show up, share standards, and push each other past the easy rep, the safe pace, and the old limit." },
];

export function AlphaStandards() {
  return (
    <section className="zoda-section">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <p className="zoda-kicker mb-4">Alpha Standard / 04</p>
            <h2 className="zoda-heading">Three standards.</h2>
          </div>
          <p className="zoda-copy md:justify-self-end">
            Performance gear should work harder than ordinary activewear: move with the body, respect the planet, and connect athletes who train with purpose.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {PILLARS.map((p) => (
            <article key={p.title} className="relative border border-white/10 bg-[#0a0c0b] p-8">
              <span className="font-display text-6xl text-white/10">{p.n}</span>
              <strong className="mt-4 block font-display text-3xl uppercase">{p.title}</strong>
              <p className="mt-4 text-sm leading-relaxed text-white/70">{p.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── PURSUIT ─────────────────── */
export function Pursuit() {
  return (
    <section
      className="zoda-section"
      style={{
        background:
          "radial-gradient(circle at 80% 20%, rgba(85,205,161,0.18), transparent 30%), #000",
      }}
    >
      <div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-2 md:items-center">
        <div>
          <p className="zoda-kicker mb-4">Mindset / 03</p>
          <h2 className="zoda-heading">Relentless Pursuit</h2>
          <p className="zoda-copy mt-5">Early starts. Extra laps. Final reps.</p>
          <div className="mt-8">
            <a href="#" className="zoda-btn">Shop Now</a>
          </div>
        </div>
        <ul className="grid gap-5 md:gap-7">
          {["Train harder.", "Recover sharper.", "Move with intent."].map((line, i) => (
            <li key={line} className="flex items-baseline gap-5">
              <span className="font-display text-3xl md:text-5xl" style={{ color: ACCENT }}>
                0{i + 1}
              </span>
              <strong className="font-display text-3xl md:text-5xl uppercase">{line}</strong>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─────────────────── COMMUNITY ─────────────────── */
const COMMUNITY = [
  { tag: "01 / Drops", title: "Training releases", copy: "New kits, fabric updates, and session-ready pieces built around how athletes actually move." },
  { tag: "02 / Stories", title: "Warrior notes", copy: "Field notes from runners, lifters, and everyday competitors who stay in it when the work gets hard." },
  { tag: "03 / Access", title: "Inner circle", copy: "NFC content, community challenges, and race-day moments that bring the ZODA circuit offline." },
];

export function Community() {
  return (
    <section className="zoda-section">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <p className="zoda-kicker mb-4">What's Coming / 10</p>
            <h2 className="zoda-heading">Exciting projects.</h2>
          </div>
          <p className="zoda-copy md:justify-self-end">
            Upcoming drops, community moments, and access-led projects built for athletes moving with purpose.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {COMMUNITY.map((c) => (
            <div key={c.title} className="border border-white/10 bg-[#0a0c0b] p-7">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: ACCENT }}>
                {c.tag}
              </span>
              <strong className="mt-4 block font-display text-2xl uppercase">{c.title}</strong>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{c.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── INSTAGRAM ─────────────────── */
const IG = [
  { tag: "01 / Drops", title: "@zoda.sg", copy: "New releases, restocks, and product details from the ZODA team." },
  { tag: "02 / Training", title: "Session notes", copy: "How athletes use the kit across strength, endurance, recovery, and travel." },
  { tag: "03 / Community", title: "Move with us", copy: "Follow the people, stories, and standards shaping the next ZODA chapter." },
];

export function InstagramSection() {
  return (
    <section className="zoda-section">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <p className="zoda-kicker mb-4">Instagram / 11</p>
            <h2 className="zoda-heading">Follow us on Instagram.</h2>
          </div>
          <p className="zoda-copy md:justify-self-end">
            Catch product drops, athlete stories, training notes, and behind-the-scenes progress from the ZODA circuit.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {IG.map((c) => (
            <a
              key={c.title}
              href="https://www.instagram.com/zoda.sg/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-white/10 bg-[#0a0c0b] p-7 transition-colors hover:border-[var(--zoda-accent)]"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: ACCENT }}>
                {c.tag}
              </span>
              <strong className="mt-4 block font-display text-2xl uppercase">{c.title}</strong>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{c.copy}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: ACCENT }}>
                Follow <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── FINAL CTA ─────────────────── */
export function FinalCTA() {
  const phone = "+65 9670 2034";
  const email = "hello@zoda.sg";
  return (
    <section
      className="zoda-section"
      style={{
        background:
          "radial-gradient(circle at 20% 30%, rgba(85,205,161,0.18), transparent 35%), #000",
      }}
    >
      <div className="mx-auto max-w-[1200px] text-center md:text-left">
        <p className="zoda-kicker mb-4">Contact / 12</p>
        <h2 className="zoda-heading">Changing how humans experience activewear.</h2>
        <p className="zoda-copy mt-5 md:max-w-2xl">
          Shop the gear, speak with the team, or follow the ZODA circuit as we change how humans experience activewear.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
          <a href="#" className="zoda-btn">Shop ZODA</a>
          <a href={`mailto:${email}?subject=Partnership%20Inquiry`} className="zoda-btn-secondary">Partner With Us</a>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-4 border border-white/10 bg-[#0a0c0b] p-5 transition-colors hover:border-[var(--zoda-accent)]">
            <Phone className="h-5 w-5" style={{ color: ACCENT }} />
            <div className="flex flex-col text-left">
              <span className="text-[11px] uppercase tracking-[0.16em] text-white/50">Phone</span>
              <strong className="font-display text-lg">{phone}</strong>
            </div>
          </a>
          <a href={`mailto:${email}`} className="flex items-center gap-4 border border-white/10 bg-[#0a0c0b] p-5 transition-colors hover:border-[var(--zoda-accent)]">
            <Mail className="h-5 w-5" style={{ color: ACCENT }} />
            <div className="flex flex-col text-left">
              <span className="text-[11px] uppercase tracking-[0.16em] text-white/50">Email</span>
              <strong className="font-display text-lg">{email}</strong>
            </div>
          </a>
        </div>

        <div className="mt-10 flex justify-center gap-3 md:justify-start">
          {[
            { Icon: Instagram, href: "https://www.instagram.com/zoda.sg/", label: "Instagram" },
            { Icon: Linkedin, href: "https://sg.linkedin.com/company/zodaholdings", label: "LinkedIn" },
            { Icon: Facebook, href: "#", label: "Facebook" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-11 w-11 place-items-center border border-white/15 transition-colors hover:border-[var(--zoda-accent)] hover:text-[var(--zoda-accent)]"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
