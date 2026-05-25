import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Box, Layers3, Medal, PackageCheck, Play, ShieldCheck } from "lucide-react";

import { CartDrawer } from "@/components/zoda/CartDrawer";
import { SiteHeader } from "@/components/zoda/SiteHeader";
import { initSnapController } from "@/components/zoda/snap-controller";
import ascenderTrophy from "@/assets/ascender-trophy.png";
import finalMissionIcon from "@/assets/Final Mission.png";
import beastTrophy from "@/assets/finisher-trophy.png";
import initiatorTrophy from "@/assets/Initiator-trophy.png";
import sustainabilityVideo from "@/assets/sustainability-video.mp4";

export const Route = createFileRoute("/mission")({
  head: () => ({
    meta: [
      { title: "The Mission - ZODA" },
      {
        name: "description",
        content:
          "Play The Mission: ZODA's 21-day build-a-habit challenge, official mission playbook, bag inclusions and materials.",
      },
      { property: "og:title", content: "The Mission - ZODA" },
      {
        property: "og:description",
        content:
          "A digital version of The Mission game, mechanics, playbook and Mission Bag blueprint.",
      },
    ],
  }),
  component: MissionPage,
});

type Panel = {
  id: string;
  label: string;
};

const PANELS: Panel[] = [
  { id: "mission-intro", label: "Intro" },
  { id: "mission-game", label: "Game" },
  { id: "mission-playbook", label: "Playbook" },
  { id: "mission-inclusions", label: "Inclusions" },
  { id: "mission-materials", label: "Materials" },
];

const MISSION_RULES = [
  "Complete 21 days with no misses.",
  "Miss? 12 hits earns one Beast Save.",
  "Hit 450+ points to qualify.",
  "Earn a badge tier: Initiator, Ascender, Beast.",
  "Step into the arena and win.",
];

const FINISHER_TIERS = [
  {
    week: "Week 1 Finisher",
    badge: "Initiator",
    tone: "gold",
    icon: initiatorTrophy,
  },
  {
    week: "Week 2 Finisher",
    badge: "Ascender",
    tone: "coral",
    icon: ascenderTrophy,
  },
  {
    week: "Week 3 Finisher",
    badge: "Beast",
    tone: "green",
    icon: beastTrophy,
  },
];

const WEEK_ONE = [
  { name: "Clean Fuel", points: "+30", detail: "No sugar and no processed food for 48h." },
  { name: "Move Daily", points: "+20", detail: "45-minute walk, no phone except music." },
  { name: "Focus Discipline", points: "+20", detail: "Four-hour screen-free block." },
  { name: "Protein Standard", points: "+20", detail: "1.5x bodyweight protein minimum." },
  { name: "Sleep Lock", points: "+20", detail: "Seven hours strict." },
  {
    name: "Beast Mode",
    points: "+60",
    detail: "Hit all four: no sugar, 3L water, 45-minute movement and protein target.",
  },
];

const WEEK_TWO = [
  { name: "Base Pace", points: "+30", detail: "5km under 6:00 pace." },
  { name: "Push Session", points: "+25", detail: "30 burpees under control." },
  { name: "Clean Fuel 2.0", points: "+25", detail: "No sugar and 1.75x bodyweight protein." },
  { name: "Focus Lock", points: "+20", detail: "Six hours with no social media." },
  { name: "Repeat Any", points: "+20", detail: "Player chooses any challenge." },
  { name: "Iron Distance", points: "+25", detail: "Farmers carry 24kg x2 for 100m." },
  {
    name: "Beast Mode",
    points: "+75",
    detail: "50 burpees, 2x bodyweight protein, 3L water and six-hour screen control.",
  },
];

const WEEK_THREE = [
  { name: "Pressure Stack", points: "+25", detail: "25 diamond and 25 standard pushups." },
  { name: "Burpee War", points: "+30", detail: "75 burpees under 15 minutes." },
  { name: "Cold Control", points: "+20", detail: "Ice bath for four to five minutes." },
  { name: "Pull Dominance", points: "+30", detail: "30 pullups or 10 muscle ups." },
  {
    name: "Recovery Stack",
    points: "+20",
    detail: "Ice bath for five minutes and seven hours sleep.",
  },
  {
    name: "Overdrive",
    points: "+25",
    detail: "Burn 750 calories and hit 2.0x bodyweight protein.",
  },
];

type MissionSpace = {
  id: string;
  label: string;
  type: "start" | "challenge" | "bonus" | "repeat" | "beast" | "badge" | "final";
  week: string;
  points: string;
  detail: string;
  tone?: "green" | "orange" | "gold" | "coral" | "mint" | "black";
  icon?: string;
};

const MISSION_SPACES: MissionSpace[] = [
  {
    id: "start",
    label: "Start",
    type: "start",
    week: "Entry",
    points: "Ready",
    detail: "Begin the 21-day mission. Complete spaces, protect the streak and build toward Beast.",
    tone: "black",
  },
  ...WEEK_ONE.slice(0, 4).map((item) => ({
    id: `week-1-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    label: item.name,
    type: item.name === "Beast Mode" ? "beast" : "challenge",
    week: "Week 1 / Initiator",
    points: item.points,
    detail: item.detail,
    tone: item.name === "Beast Mode" ? "orange" : "green",
  })),
  {
    id: "week-1-bonus",
    label: "Bonus",
    type: "bonus",
    week: "Week 1 / Initiator",
    points: "+10",
    detail: "Optional boost space. Use it to add momentum before the Week 1 finisher.",
    tone: "mint",
  },
  {
    id: "badge-initiator",
    label: "Initiator",
    type: "badge",
    week: "Week 1 Finisher",
    points: "Tier 1",
    detail: "Finish Week 1 with the streak intact to unlock the Initiator badge tier.",
    tone: "gold",
    icon: initiatorTrophy,
  },
  ...WEEK_TWO.map((item) => ({
    id: `week-2-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    label: item.name,
    type:
      item.name === "Beast Mode" ? "beast" : item.name === "Repeat Any" ? "repeat" : "challenge",
    week: "Week 2 / Ascender",
    points: item.points,
    detail: item.detail,
    tone: item.name === "Beast Mode" ? "orange" : item.name === "Repeat Any" ? "mint" : "green",
  })),
  {
    id: "badge-ascender",
    label: "Ascender",
    type: "badge",
    week: "Week 2 Finisher",
    points: "Tier 2",
    detail: "Complete Week 2 to move from control into load, pace and pressure.",
    tone: "coral",
    icon: ascenderTrophy,
  },
  ...WEEK_THREE.map((item) => ({
    id: `week-3-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    label: item.name,
    type: "challenge",
    week: "Week 3 / Beast",
    points: item.points,
    detail: item.detail,
    tone: "green",
  })),
  {
    id: "final-mission",
    label: "Final Mission",
    type: "final",
    week: "Arena Proof",
    points: "Win",
    detail: "100 burpees, hydrate, wear the bag, post and tag @ZODA_FIT to complete the mission.",
    tone: "orange",
    icon: finalMissionIcon,
  },
];

const INCLUSIONS = [
  "Official 21-day mission board",
  "Mission Playbook challenge cards",
  "Badge tier path: Initiator, Ascender, Beast",
  "Mission Bag blueprint",
  "Care and mission-ready tag system",
  "ZODA arena prompts for post-and-tag completion",
];

const BLUEPRINT = [
  "VentVault shoe garage",
  "ShadeVault hardshell",
  "LaptopVault compartment",
  "ShieldPocket passport pocket",
  "QuickDraw phone pocket",
  "HeatLock meal sleeve",
  "Side pockets for bottle and umbrella",
  "AirRidge cool-back panel",
  "StackBack luggage pass through",
  "TriFit shoulder adjustment system",
];

const MATERIALS = [
  {
    label: "Main fabric",
    value: "Ultra premium military grade DWR Cordura",
  },
  {
    label: "Lining / sealed system",
    value: "LIBO sealed system for protected internal organization",
  },
  {
    label: "Structure",
    value: "Hardshell shade vault, thermal meal sleeve and load-tested pocket system",
  },
  {
    label: "Validation",
    value: "17 rounds of load testing, 4 revision cycles and 96 prototype adjustments",
  },
];

function MissionPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [selectedSpaceId, setSelectedSpaceId] = useState("start");
  const selectedSpace = useMemo(
    () => MISSION_SPACES.find((space) => space.id === selectedSpaceId) ?? MISSION_SPACES[0],
    [selectedSpaceId],
  );

  useEffect(() => {
    if (!rootRef.current) return;
    const cleanup = initSnapController(rootRef.current, { nextPath: "/" });
    return cleanup;
  }, []);

  return (
    <div
      ref={rootRef}
      className="zoda-shell zoda-shell--light zoda-fabrics-page zoda-mission-page"
      data-snap-root
    >
      <SiteHeader menuId="mission-mobile-menu" />

      <div className="zoda-circuit zoda-fabrics-dots-host" aria-hidden={false}>
        <nav className="zoda-circuit__dots" aria-label="Mission navigation">
          {PANELS.map((panel, index) => (
            <button
              key={panel.id}
              type="button"
              className={`zoda-circuit__dot${index === 0 ? " is-active" : ""}`}
              data-snap-dot
              aria-label={panel.label}
            />
          ))}
        </nav>
      </div>

      <main
        className="zoda-fabrics-snap zoda-mission-snap"
        aria-label="The Mission"
        data-snap-track
      >
        <section
          id="mission-intro"
          className="zoda-fabrics-snap__section zoda-mission-hero"
          data-snap-panel
        >
          <video
            className="zoda-mission-hero__video"
            src={sustainabilityVideo}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="zoda-mission-hero__wash" />
          <div className="zoda-mission-hero__content">
            <p className="zoda-mission-kicker">
              <Play size={14} aria-hidden="true" /> The Final Mission
            </p>
            <h1>21-day build a habit mission.</h1>
            <p>
              A digital copy of the board game, rules, official playbook and Mission Bag blueprint.
              Built for athletes who move with intent and live with purpose.
            </p>
            <div className="zoda-mission-hero__stats" aria-label="Mission summary">
              <span>21 days</span>
              <span>450+ points</span>
              <span>3 badge tiers</span>
            </div>
          </div>
          <div className="zoda-mission-hero__card" aria-label="Mission summary card">
            <span>Play & Win</span>
            <strong>The Final Mission</strong>
            <p>Start clean. Build the streak. Finish Beast.</p>
          </div>
        </section>

        <section
          id="mission-game"
          className="zoda-fabrics-snap__section zoda-mission-section zoda-mission-game"
          data-snap-panel
        >
          <div className="zoda-mission-copy zoda-mission-game__intro">
            <div className="zoda-mission-game__rules" aria-label="Play and win rules">
              <span>Play & Win</span>
              <h3>21-day build a habit mission</h3>
              <ul>
                {MISSION_RULES.map((rule) => (
                  <li key={rule}>
                    <i aria-hidden="true" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="zoda-mission-finishers" aria-label="Mission finisher tiers">
              {FINISHER_TIERS.map((tier) => (
                <article key={tier.badge} className="zoda-mission-finisher" data-tone={tier.tone}>
                  <div>
                    <span>{tier.week}</span>
                    <strong>{tier.badge}</strong>
                  </div>
                  <img src={tier.icon} alt="" />
                </article>
              ))}
            </div>
          </div>
          <div className="zoda-mission-game__stage">
            <div className="zoda-mission-path" aria-label="Interactive mission game path">
              <div className="zoda-mission-path__header">
                <span>21-day path</span>
                <strong>{MISSION_SPACES.length} spaces</strong>
              </div>
              <div className="zoda-mission-path__track">
                {MISSION_SPACES.map((space, index) => (
                  <button
                    key={space.id}
                    type="button"
                    className="zoda-mission-path__space"
                    data-type={space.type}
                    data-tone={space.tone}
                    aria-pressed={selectedSpace.id === space.id}
                    onClick={() => setSelectedSpaceId(space.id)}
                  >
                    {space.type === "final" && space.icon ? (
                      <>
                        <img className="zoda-mission-path__icon" src={space.icon} alt="" />
                        <strong>{space.label}</strong>
                      </>
                    ) : (
                      <>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <strong>{space.label}</strong>
                        <em>{space.points}</em>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <aside
              className="zoda-mission-game__detail"
              data-tone={selectedSpace.tone}
              aria-live="polite"
            >
              {selectedSpace.icon ? (
                <img className="zoda-mission-game__detail-icon" src={selectedSpace.icon} alt="" />
              ) : null}
              <span>{selectedSpace.week}</span>
              <h3>{selectedSpace.label}</h3>
              <p>{selectedSpace.detail}</p>
              <dl>
                <div>
                  <dt>Points</dt>
                  <dd>{selectedSpace.points}</dd>
                </div>
                <div>
                  <dt>Space</dt>
                  <dd>{selectedSpace.type}</dd>
                </div>
              </dl>
              <div className="zoda-mission-game__meter" aria-hidden="true">
                {MISSION_SPACES.map((space) => (
                  <span
                    key={`meter-${space.id}`}
                    className={selectedSpace.id === space.id ? "is-active" : ""}
                  />
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section
          id="mission-playbook"
          className="zoda-fabrics-snap__section zoda-mission-section zoda-mission-playbook"
          data-snap-panel
        >
          <div className="zoda-mission-copy">
            <p className="zoda-mission-kicker">
              <Medal size={15} aria-hidden="true" /> Official Mission Playbook
            </p>
            <h2>Three weeks. Three tiers.</h2>
            <p>
              Foundation builds control, Ascend raises the load, Dominance finishes with pressure,
              cold control, pull work and the final public proof.
            </p>
          </div>
          <div className="zoda-mission-playbook__cards" data-snap-accordion>
            <MissionWeek title="Week 1 Foundation" badge="Initiator" items={WEEK_ONE} />
            <MissionWeek title="Week 2 Ascend" badge="Ascender" items={WEEK_TWO} />
            <MissionWeek title="Week 3 Dominance" badge="Beast" items={WEEK_THREE} />
          </div>
        </section>

        <section
          id="mission-inclusions"
          className="zoda-fabrics-snap__section zoda-mission-section zoda-mission-inclusions"
          data-snap-panel
        >
          <div className="zoda-mission-copy">
            <p className="zoda-mission-kicker">
              <PackageCheck size={15} aria-hidden="true" /> Mission Bag Inclusions
            </p>
            <h2>Everything loaded for the arena.</h2>
            <p>
              The bag is the physical anchor for the mission: organized, protected, ready and built
              to carry the standard outside the board.
            </p>
          </div>
          <div className="zoda-mission-inclusions__grid">
            <ul>
              {INCLUSIONS.map((item) => (
                <li key={item}>
                  <Box size={16} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="mission-materials"
          className="zoda-fabrics-snap__section zoda-mission-section zoda-mission-materials"
          data-snap-panel
        >
          <div className="zoda-mission-copy">
            <p className="zoda-mission-kicker">
              <Layers3 size={15} aria-hidden="true" /> Bag Materials
            </p>
            <h2>The Mission blueprint.</h2>
            <p>
              Material notes and compartment language are adapted from the supplied hangtag,
              packaging and blueprint reference.
            </p>
          </div>
          <div className="zoda-mission-materials__layout">
            <div className="zoda-mission-materials__cards">
              {MATERIALS.map((material) => (
                <article key={material.label}>
                  <ShieldCheck size={18} aria-hidden="true" />
                  <span>{material.label}</span>
                  <p>{material.value}</p>
                </article>
              ))}
            </div>
            <div
              className="zoda-mission-blueprint-list"
              aria-label="Mission Bag blueprint compartments"
            >
              {BLUEPRINT.map((item, index) => (
                <span key={item}>
                  {String(index + 1).padStart(2, "0")} {item}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <CartDrawer />
    </div>
  );
}

function MissionWeek({
  title,
  badge,
  items,
}: {
  title: string;
  badge: string;
  items: Array<{ name: string; points: string; detail: string }>;
}) {
  return (
    <article className="zoda-mission-week">
      <div className="zoda-mission-week__head">
        <span>{badge}</span>
        <h3>{title}</h3>
      </div>
      <div className="zoda-mission-week__body">
        <ul>
          {items.map((item) => (
            <li key={`${title}-${item.name}`}>
              <strong>{item.points}</strong>
              <span>
                <b>{item.name}</b>
                {item.detail}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
