import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Box, ChevronLeft, ChevronRight, Layers3, Medal, PackageCheck, Play } from "lucide-react";

import { CartDrawer } from "@/components/zoda/CartDrawer";
import { SiteHeader } from "@/components/zoda/SiteHeader";
import { initSnapController } from "@/components/zoda/snap-controller";
import ascenderTrophy from "@/assets/ascender-trophy.png";
import finalMissionIcon from "@/assets/Final Mission.png";
import beastTrophy from "@/assets/finisher-trophy.png";
import initiatorTrophy from "@/assets/Initiator-trophy.png";
import sustainabilityVideo from "@/assets/sustainability-video.mp4";
import zodaZLogo from "@/assets/zoda-Z.png";

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
  { name: "Clean Fuel", points: "+30", detail: "No sugar + no processed food (48h)." },
  { name: "Move Daily", points: "+20", detail: "45-minute walk (no phone except music)." },
  { name: "Focus Discipline", points: "+20", detail: "4 hours screen-free block." },
  { name: "Protein Standard", points: "+20", detail: "1.5x B.W. protein minimum." },
  { name: "Sleep Lock", points: "+20", detail: "7 hours strict." },
  {
    name: "Beast Mode",
    points: "+60",
    detail:
      "Hit all 4: no sugar, +3L water, 45-min movement, 1.5x B.W. protein hit. Miss one -> fail.",
  },
];

const WEEK_TWO = [
  { name: "Repeat Any", points: "+20", detail: "Repeat any challenge." },
  { name: "Base Pace", points: "+30", detail: "5km under 6:00." },
  { name: "Push Session", points: "+25", detail: "30 burpees under control." },
  { name: "Clean Fuel 2.0", points: "+25", detail: "No sugar + 1.75x B.W. protein." },
  { name: "Focus Lock", points: "+20", detail: "Six hours with no social media." },
  { name: "Bonus", points: "+20", detail: "Player chooses any challenge." },
  { name: "Iron Distance", points: "+25", detail: "Farmers carry 24kg x2 for 100m." },
  {
    name: "Beast Mode",
    points: "+75",
    detail: "50 burpees, 2x B.W. protein hit, 3L water, 6h screen control. Miss one -> fail.",
  },
];

const WEEK_THREE = [
  { name: "Pressure Stack", points: "+25", detail: "25 diamond and 25 standard pushups." },
  { name: "Burpee War", points: "+30", detail: "75 burpees. Hit: under 15 min." },
  { name: "Cold Control", points: "+20", detail: "Ice bath (4-5 min)." },
  { name: "Pull Dominance", points: "+30", detail: "30 pullups or 10 muscle ups." },
  {
    name: "Recovery Stack",
    points: "+20",
    detail: "Ice bath (5 min) + 7h sleep.",
  },
  {
    name: "Overdrive",
    points: "+25",
    detail: "Burn 750 cals + 2.0x B.W. protein.",
  },
];

const RULEBOOK = [
  "Every hit adds +1 to your streak.",
  "One fail resets it.",
  "3 / 5 / 7 hits = +10 / +20 / +30 points.",
  "12 hits = +50 bonus + 1 Beast Save.",
  "Hit = full points. Fail = half points.",
  "No points if you didn't attempt.",
];

const FINAL_MISSION_STEPS = [
  "100 burpees.",
  "Hydrate.",
  "Wear ZODA Mission Bag.",
  "Post & tag @ZODA_FIT + #ZODAMISSION.",
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
      item.name === "Beast Mode"
        ? "beast"
        : item.name === "Repeat Any"
          ? "repeat"
          : item.name === "Bonus"
            ? "bonus"
            : "challenge",
    week: "Week 2 / Ascender",
    points: item.points,
    detail: item.detail,
    tone:
      item.name === "Beast Mode"
        ? "orange"
        : item.name === "Repeat Any" || item.name === "Bonus"
          ? "mint"
          : "green",
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
  "VentVault shoe garage",
  "ShadeVault hardshell",
  "LaptopVault compartment",
  "ShieldPocket passport",
  "QuickDraw phone pocket",
  "HeatLock meal sleeve",
  "Side pockets for bottle & umbrella",
  "AirRidge cool-back panel",
  "StackBack luggage pass through",
  "TriFit shoulder adjustment system",
];

const MATERIAL_FACTS = [
  { label: "Load stability rating", value: "11 / 10" },
  { label: "Impact tolerance", value: "High" },
  { label: "Ventilation isolation", value: "Active" },
  { label: "Thermal control", value: "100%" },
  { label: "Access speed", value: '0.8"' },
  { label: "Style compromise", value: "Not found" },
];

const PLAYBOOK_CARDS = [
  { type: "week" as const, title: "Foundation", badge: "Week 1", items: WEEK_ONE },
  { type: "week" as const, title: "Ascend", badge: "Week 2", items: WEEK_TWO },
  { type: "week" as const, title: "Dominance", badge: "Week 3", items: WEEK_THREE },
  {
    type: "note" as const,
    title: "Final Mission",
    badge: "Arena Proof",
    items: FINAL_MISSION_STEPS,
  },
  { type: "note" as const, title: "Streak Hit Rulebook", badge: "Rulebook", items: RULEBOOK },
];

function MissionPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [selectedSpaceId, setSelectedSpaceId] = useState("start");
  const [selectedPlaybookIndex, setSelectedPlaybookIndex] = useState(0);
  const selectedSpace = useMemo(
    () => MISSION_SPACES.find((space) => space.id === selectedSpaceId) ?? MISSION_SPACES[0],
    [selectedSpaceId],
  );
  const selectedPlaybookCard = PLAYBOOK_CARDS[selectedPlaybookIndex];

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
          </div>
          <div className="zoda-mission-playbook__cards" aria-label="Official mission playbook">
            <button
              type="button"
              className="zoda-mission-playbook__nav"
              aria-label="Previous playbook card"
              onClick={() =>
                setSelectedPlaybookIndex((index) =>
                  index === 0 ? PLAYBOOK_CARDS.length - 1 : index - 1,
                )
              }
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <div className="zoda-mission-playbook__sheet">
              {selectedPlaybookCard.type === "week" ? (
                <MissionWeek
                  key={selectedPlaybookCard.badge}
                  title={selectedPlaybookCard.title}
                  badge={selectedPlaybookCard.badge}
                  items={selectedPlaybookCard.items}
                />
              ) : (
                <MissionPlaybookCard
                  key={selectedPlaybookCard.badge}
                  title={selectedPlaybookCard.title}
                  badge={selectedPlaybookCard.badge}
                  items={selectedPlaybookCard.items}
                />
              )}
            </div>
            <button
              type="button"
              className="zoda-mission-playbook__nav"
              aria-label="Next playbook card"
              onClick={() =>
                setSelectedPlaybookIndex((index) =>
                  index === PLAYBOOK_CARDS.length - 1 ? 0 : index + 1,
                )
              }
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>
            <div className="zoda-mission-playbook__count" aria-live="polite">
              {String(selectedPlaybookIndex + 1).padStart(2, "0")} /{" "}
              {String(PLAYBOOK_CARDS.length).padStart(2, "0")}
            </div>
            <div className="zoda-mission-playbook__dots" aria-label="Playbook pages">
              {PLAYBOOK_CARDS.map((card, index) => (
                <button
                  key={card.badge}
                  type="button"
                  className={
                    index === selectedPlaybookIndex
                      ? "zoda-mission-playbook__dot is-active"
                      : "zoda-mission-playbook__dot"
                  }
                  aria-label={`Show ${card.badge}: ${card.title}`}
                  aria-pressed={index === selectedPlaybookIndex}
                  onClick={() => setSelectedPlaybookIndex(index)}
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
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
          </div>
          <div className="zoda-mission-inclusions__grid">
            <ul>
              {INCLUSIONS.map((item, index) => (
                <li key={item}>
                  <Box size={16} aria-hidden="true" />
                  <span>
                    {String(index + 1).padStart(2, "0")} {item}
                  </span>
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
          <div className="zoda-mission-materials__statement">
            <p className="zoda-mission-kicker">
              <Layers3 size={15} aria-hidden="true" /> Bag Materials
            </p>
            <h2>Leave the mess. Carry your mission.</h2>
            <p>This bag is built for athletes who move with intent and live with a purpose.</p>
            <p>Organized. Protected. Ready. Because your standards don't switch off.</p>
            <strong>Warrior's Base</strong>
          </div>
          <div className="zoda-mission-materials__facts" aria-label="Mission bag material facts">
            <div className="zoda-mission-materials__facts-head">
              <span>Serving size</span>
              <strong>1 Mission Bag</strong>
            </div>
            <i aria-hidden="true" />
            <small>% Daily Value*</small>
            <dl>
              {MATERIAL_FACTS.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            <i aria-hidden="true" />
            <p>
              *Calculated from champion energy. Built to perform even better with a complete ZODA
              set.
            </p>
            <div className="zoda-mission-materials__ingredients">
              <span>Ingredients:</span>
              <p>
                Ultra premium military grade DWR Cordura, LIBO sealed system, seventeen (17) rounds
                of load testing, four (4) revision cycles, ninety six (96) prototype adjustments,
                one (1) relentless standard.
              </p>
              <strong>Sleep: optional</strong>
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
              <i aria-hidden="true" />
              <b>{item.name}</b>
              <span>{item.detail}</span>
              <strong>{item.points}</strong>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function MissionPlaybookCard({
  title,
  badge,
  items,
}: {
  title: string;
  badge: string;
  items: string[];
}) {
  if (title === "Final Mission") {
    return (
      <article className="zoda-mission-week zoda-mission-week--note zoda-mission-week--final">
        <img src={finalMissionIcon} alt="" aria-hidden="true" />
        <div className="zoda-mission-week__final-title">
          <img src={zodaZLogo} alt="" aria-hidden="true" />
          <h3>{title}</h3>
        </div>
        <p>
          100 burpees. Hydrate.
          <br />
          Wear ZODA Mission Bag. Post & tag
          <br />
          @ZODA_FIT + #ZODAMISSION.
        </p>
      </article>
    );
  }

  return (
    <article className="zoda-mission-week zoda-mission-week--note">
      <div className="zoda-mission-week__head">
        <span>{badge}</span>
        <h3>{title}</h3>
      </div>
      <div className="zoda-mission-week__body">
        <ul>
          {items.map((item, index) => (
            <li key={`${title}-${item}`}>
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
