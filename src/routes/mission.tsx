import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Box,
  ChevronLeft,
  ChevronRight,
  Layers3,
  Medal,
  PackageCheck,
  Play,
  Trophy,
} from "lucide-react";

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
  "Earn a badge tier: Initiator, Ascender, Dominance.",
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
    badge: "Dominance",
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
  { name: "Repeat Any", points: "+20", detail: "Repeat any challenge." },
  {
    name: "Beast Mode",
    points: "+60",
    detail:
      "Hit all 4: no sugar, +3L water, 45-min movement, 1.5x B.W. protein hit. Miss one -> fail.",
  },
];

const WEEK_TWO = [
  { name: "Push Session", points: "+25", detail: "30 burpees under control." },
  { name: "Clean Fuel 2.0", points: "+25", detail: "No sugar + 1.75x B.W. protein." },
  { name: "Focus Lock", points: "+20", detail: "Six hours with no social media." },
  { name: "Base Pace", points: "+30", detail: "5km under 6:00." },
  { name: "Bonus", points: "+20", detail: "Player chooses any challenge." },
  { name: "Iron Distance", points: "+25", detail: "Farmers carry 24kg x2 for 100m." },
  {
    name: "Beast Mode",
    points: "+75",
    detail: "50 burpees, 2x B.W. protein hit, 3L water, 6h screen control. Miss one -> fail.",
  },
];

const WEEK_THREE = [
  {
    name: "Overdrive",
    points: "+25",
    detail: "Burn 750 cals + 2.0x B.W. protein.",
  },
  { name: "Pressure Stack", points: "+25", detail: "25 diamond and 25 standard pushups." },
  { name: "Burpee War", points: "+30", detail: "75 burpees. Hit: under 15 min." },
  { name: "Cold Control", points: "+20", detail: "Ice bath (4-5 min)." },
  { name: "Pull Dominance", points: "+30", detail: "30 pullups or 10 muscle ups." },
  {
    name: "Recovery Stack",
    points: "+20",
    detail: "Ice bath (5 min) + 7h sleep.",
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
  day?: number;
  tone?: "green" | "orange" | "gold" | "coral" | "mint" | "black";
  icon?: string;
};

const MISSION_PLAYBOOK_STORAGE_KEY = "zoda-mission-playbook-checks";

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function createDailyMissionSpace(
  item: { name: string; points: string; detail: string },
  day: number,
  week: string,
): MissionSpace {
  return {
    id: `day-${String(day).padStart(2, "0")}-${toSlug(item.name)}`,
    label: item.name,
    type:
      item.name === "Beast Mode"
        ? "beast"
        : item.name === "Repeat Any"
          ? "repeat"
          : item.name === "Bonus"
            ? "bonus"
            : "challenge",
    week,
    points: item.points,
    day,
    tone:
      item.name === "Beast Mode"
        ? "orange"
        : item.name === "Repeat Any" || item.name === "Bonus"
          ? "mint"
          : "green",
  };
}

const DAILY_MISSION_CHALLENGES: MissionSpace[] = [
  ...WEEK_ONE.map((item, index) => createDailyMissionSpace(item, index + 1, "Week 1 / Foundation")),
  ...WEEK_TWO.map((item, index) =>
    createDailyMissionSpace(item, WEEK_ONE.length + index + 1, "Week 2 / Ascend"),
  ),
  ...WEEK_THREE.map((item, index) =>
    createDailyMissionSpace(
      item,
      WEEK_ONE.length + WEEK_TWO.length + index + 1,
      "Week 3 / Dominance",
    ),
  ),
  {
    id: "day-21-final-mission",
    label: "Final Mission",
    type: "final",
    week: "Day 21 / Arena Proof",
    points: "Win",
    day: 21,
    tone: "orange",
    icon: finalMissionIcon,
  },
];

const MISSION_SPACES: MissionSpace[] = [
  {
    id: "start",
    label: "Start",
    type: "start",
    week: "Entry",
    points: "Ready",
    tone: "black",
  },
  ...WEEK_ONE.map(
    (item): MissionSpace => ({
      id: `week-1-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      label: item.name,
      type:
        item.name === "Beast Mode" ? "beast" : item.name === "Repeat Any" ? "repeat" : "challenge",
      week: "Week 1 / Initiator",
      points: item.points,
      tone: item.name === "Beast Mode" ? "orange" : item.name === "Repeat Any" ? "mint" : "green",
    }),
  ),
  {
    id: "badge-initiator",
    label: "Initiator",
    type: "badge",
    week: "Week 1 Finisher",
    points: "Tier 1",
    tone: "gold",
    icon: initiatorTrophy,
  },
  ...WEEK_TWO.map(
    (item): MissionSpace => ({
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
      tone:
        item.name === "Beast Mode"
          ? "orange"
          : item.name === "Repeat Any" || item.name === "Bonus"
            ? "mint"
            : "green",
    }),
  ),
  {
    id: "badge-ascender",
    label: "Ascender",
    type: "badge",
    week: "Week 2 Finisher",
    points: "Tier 2",
    tone: "coral",
    icon: ascenderTrophy,
  },
  ...WEEK_THREE.map(
    (item): MissionSpace => ({
      id: `week-3-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      label: item.name,
      type: "challenge",
      week: "Week 3 / Dominance",
      points: item.points,
      tone: "green",
    }),
  ),
  {
    id: "final-mission",
    label: "Final Mission",
    type: "final",
    week: "Arena Proof",
    points: "Win",
    tone: "orange",
    icon: finalMissionIcon,
  },
];

function getMissionSpaceDay(space: MissionSpace) {
  if (space.type === "start" || space.type === "badge" || space.type === "final") return null;

  const numberedSpaces = MISSION_SPACES.filter(
    (missionSpace) =>
      missionSpace.type !== "start" &&
      missionSpace.type !== "badge" &&
      missionSpace.type !== "final",
  );
  const dayIndex = numberedSpaces.findIndex((missionSpace) => missionSpace.id === space.id);
  return dayIndex === -1 ? null : dayIndex + 1;
}

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

const SCOREBOARD_TASKS = [
  ...WEEK_ONE.map((item) => ({ ...item, badge: "Week 1" })),
  ...WEEK_TWO.map((item) => ({ ...item, badge: "Week 2" })),
  ...WEEK_THREE.map((item) => ({ ...item, badge: "Week 3" })),
];

const SCOREBOARD_TOTAL_POINTS = SCOREBOARD_TASKS.reduce(
  (total, item) => total + getPointValue(item.points),
  0,
);

const SCOREBOARD_TARGET_POINTS = 450;

function getPointValue(points: string) {
  const match = points.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function getScoreboard(checkedItems: string[]) {
  const completedTasks = SCOREBOARD_TASKS.filter((item) =>
    checkedItems.includes(`${item.badge}-${item.name}`),
  );
  const completedPoints = completedTasks.reduce(
    (total, item) => total + getPointValue(item.points),
    0,
  );
  const completedFinalSteps = FINAL_MISSION_STEPS.filter((item) =>
    checkedItems.includes(`Arena Proof-${item}`),
  ).length;
  const weekCounts = ["Week 1", "Week 2", "Week 3"].map((week) => ({
    week,
    completed: completedTasks.filter((item) => item.badge === week).length,
    total: SCOREBOARD_TASKS.filter((item) => item.badge === week).length,
  }));
  const badgeTier =
    completedPoints >= SCOREBOARD_TARGET_POINTS
      ? "Dominance"
      : completedPoints >= 300
        ? "Ascender"
        : completedPoints > 0
          ? "Initiator"
          : "Pending";

  return {
    badgeTier,
    beastSaves: Math.floor(completedTasks.length / 12),
    completedFinalSteps,
    completedPoints,
    completedTasks: completedTasks.length,
    isVisible: completedTasks.length > 0 || completedFinalSteps > 0,
    targetPoints: SCOREBOARD_TARGET_POINTS,
    totalFinalSteps: FINAL_MISSION_STEPS.length,
    totalPoints: SCOREBOARD_TOTAL_POINTS,
    totalTasks: SCOREBOARD_TASKS.length,
    weekCounts,
  };
}

function MissionPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [selectedPlaybookIndex, setSelectedPlaybookIndex] = useState(0);
  const [checkedPlaybookItems, setCheckedPlaybookItems] = useState<string[]>([]);
  const selectedPlaybookCard = PLAYBOOK_CARDS[selectedPlaybookIndex];
  const scoreboard = useMemo(() => getScoreboard(checkedPlaybookItems), [checkedPlaybookItems]);

  useEffect(() => {
    if (!rootRef.current) return;
    const cleanup = initSnapController(rootRef.current, { loopToStart: true });
    return cleanup;
  }, []);

  useEffect(() => {
    try {
      const savedChecks = window.localStorage.getItem(MISSION_PLAYBOOK_STORAGE_KEY);
      setCheckedPlaybookItems(savedChecks ? JSON.parse(savedChecks) : []);
    } catch {
      setCheckedPlaybookItems([]);
    }
  }, []);

  const togglePlaybookItem = (itemId: string) => {
    setCheckedPlaybookItems((currentItems) => {
      const nextItems = currentItems.includes(itemId)
        ? currentItems.filter((currentItem) => currentItem !== itemId)
        : [...currentItems, itemId];
      window.localStorage.setItem(MISSION_PLAYBOOK_STORAGE_KEY, JSON.stringify(nextItems));
      return nextItems;
    });
  };

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
            <a className="zoda-mission-hero__play" href="/mission/play">
              Play Mission
            </a>
          </div>
          <div className="zoda-mission-hero__card" aria-label="Mission summary card">
            <span>Play & Win</span>
            <strong>The Final Mission</strong>
            <p>Start clean. Build the streak. Finish Dominance.</p>
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
            <a className="zoda-mission-hero__play" href="/mission/play">
              Play Mission
            </a>
          </div>
          <div className="zoda-mission-game__stage">
            <div className="zoda-mission-path" aria-label="Interactive mission game path">
              <div className="zoda-mission-path__header">
                <span>21-day path</span>
                <strong>{DAILY_MISSION_CHALLENGES.length} days</strong>
              </div>
              <div className="zoda-mission-path__track">
                {MISSION_SPACES.map((space) => {
                  const spaceDay = getMissionSpaceDay(space);

                  return (
                    <div
                      key={space.id}
                      className="zoda-mission-path__space"
                      data-type={space.type}
                      data-tone={space.tone}
                    >
                      {space.type === "start" ? (
                        <>
                          <img className="zoda-mission-path__start-logo" src={zodaZLogo} alt="" />
                          <strong>{space.label}</strong>
                          <em>{space.points}</em>
                        </>
                      ) : space.type === "final" && space.icon ? (
                        <>
                          <img className="zoda-mission-path__icon" src={space.icon} alt="" />
                          <strong>{space.label}</strong>
                        </>
                      ) : (
                        <>
                          {spaceDay ? <span>{String(spaceDay).padStart(2, "0")}</span> : null}
                          <strong>{space.label}</strong>
                          <em>{space.points}</em>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
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
            <MissionScoreboard scoreboard={scoreboard} />
            <a className="zoda-mission-hero__play" href="/mission/play">
              Play Mission
            </a>
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
                  checkedItems={checkedPlaybookItems}
                  onToggleItem={togglePlaybookItem}
                />
              ) : (
                <MissionPlaybookCard
                  key={selectedPlaybookCard.badge}
                  title={selectedPlaybookCard.title}
                  badge={selectedPlaybookCard.badge}
                  items={selectedPlaybookCard.items}
                  checkedItems={checkedPlaybookItems}
                  onToggleItem={togglePlaybookItem}
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

function MissionScoreboard({ scoreboard }: { scoreboard: ReturnType<typeof getScoreboard> }) {
  if (!scoreboard.isVisible) return null;

  const pointPercent = Math.min(
    100,
    Math.round((scoreboard.completedPoints / scoreboard.targetPoints) * 100),
  );

  return (
    <aside className="zoda-mission-scoreboard" aria-live="polite">
      <div className="zoda-mission-scoreboard__head">
        <span>
          <Trophy size={14} aria-hidden="true" /> Scoreboard
        </span>
        <strong>{scoreboard.badgeTier}</strong>
      </div>
      <dl>
        <div>
          <dt>Score</dt>
          <dd>
            {scoreboard.completedPoints} / {scoreboard.targetPoints}
          </dd>
        </div>
        <div>
          <dt>Tasks</dt>
          <dd>
            {scoreboard.completedTasks} / {scoreboard.totalTasks}
          </dd>
        </div>
        <div>
          <dt>Final</dt>
          <dd>
            {scoreboard.completedFinalSteps} / {scoreboard.totalFinalSteps}
          </dd>
        </div>
        <div>
          <dt>Saves</dt>
          <dd>{scoreboard.beastSaves}</dd>
        </div>
      </dl>
      <div className="zoda-mission-scoreboard__bar" aria-label={`${pointPercent}% to qualifier`}>
        <i style={{ width: `${pointPercent}%` }} />
      </div>
      <div className="zoda-mission-scoreboard__weeks">
        {scoreboard.weekCounts.map((week) => (
          <span key={week.week}>
            {week.week.replace("Week ", "W")}
            <b>
              {week.completed}/{week.total}
            </b>
          </span>
        ))}
      </div>
    </aside>
  );
}

function MissionWeek({
  title,
  badge,
  items,
  checkedItems,
  onToggleItem,
}: {
  title: string;
  badge: string;
  items: Array<{ name: string; points: string; detail: string }>;
  checkedItems: string[];
  onToggleItem: (itemId: string) => void;
}) {
  return (
    <article className="zoda-mission-week">
      <div className="zoda-mission-week__head">
        <span>{badge}</span>
        <h3>{title}</h3>
      </div>
      <div className="zoda-mission-week__body">
        <ul>
          {items.map((item) => {
            const itemId = `${badge}-${item.name}`;
            const isChecked = checkedItems.includes(itemId);

            return (
              <li key={itemId} className={isChecked ? "is-checked" : undefined}>
                <button
                  type="button"
                  className="zoda-mission-week__check"
                  aria-pressed={isChecked}
                  onClick={() => onToggleItem(itemId)}
                >
                  <i aria-hidden="true" />
                  <b>{item.name}</b>
                  <span>{item.detail}</span>
                  <strong>{item.points}</strong>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}

function MissionPlaybookCard({
  title,
  badge,
  items,
  checkedItems,
  onToggleItem,
}: {
  title: string;
  badge: string;
  items: string[];
  checkedItems: string[];
  onToggleItem: (itemId: string) => void;
}) {
  if (title === "Final Mission") {
    return (
      <article className="zoda-mission-week zoda-mission-week--note zoda-mission-week--final">
        <img src={finalMissionIcon} alt="" aria-hidden="true" />
        <div className="zoda-mission-week__final-title">
          <img src={zodaZLogo} alt="" aria-hidden="true" />
          <h3>{title}</h3>
        </div>
        <p>100 burpees. Hydrate. Wear ZODA Mission Bag. Post & tag @ZODA_FIT + #ZODAMISSION.</p>
      </article>
    );
  }

  if (title === "Streak Hit Rulebook") {
    return (
      <article className="zoda-mission-week zoda-mission-week--note zoda-mission-week--rulebook">
        <h3>{title}</h3>
        <ul>
          {items.map((item) => (
            <li key={`${badge}-${item}`}>
              <i aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
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
          {items.map((item, index) => {
            const itemId = `${badge}-${item}`;
            const isChecked = checkedItems.includes(itemId);

            return (
              <li key={itemId} className={isChecked ? "is-checked" : undefined}>
                <button
                  type="button"
                  className="zoda-mission-week__check"
                  aria-pressed={isChecked}
                  onClick={() => onToggleItem(itemId)}
                >
                  <i aria-hidden="true" />
                  <strong>{String(index + 1).padStart(2, "0")}</strong>
                  <span>{item}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
