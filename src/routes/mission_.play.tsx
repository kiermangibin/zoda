import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Check, Dice5, RotateCcw, Trophy } from "lucide-react";

import { CartDrawer } from "@/components/zoda/CartDrawer";
import { SiteHeader } from "@/components/zoda/SiteHeader";
import ascenderTrophy from "@/assets/ascender-trophy.png";
import beastTrophy from "@/assets/finisher-trophy.png";
import finalMissionIcon from "@/assets/Final Mission.png";
import initiatorTrophy from "@/assets/Initiator-trophy.png";
import zodaZLogo from "@/assets/zoda-Z.png";

export const Route = createFileRoute("/mission_/play")({
  head: () => ({
    meta: [
      { title: "Mission Play - ZODA" },
      {
        name: "description",
        content:
          "Play ZODA's Mission game with a virtual dice challenge picker, board, scoreboard and local saved progress.",
      },
      { property: "og:title", content: "Mission Play - ZODA" },
      {
        property: "og:description",
        content: "A game-centered Mission board for rolling, picking challenges and tracking score.",
      },
    ],
  }),
  component: MissionPlayPage,
});

type MissionTask = {
  name: string;
  points: string;
  detail: string;
};

type MissionChallenge = MissionTask & {
  badge: string;
  id: string;
  tone: "green" | "orange" | "mint";
  weekIndex: number;
};

type ScoreNotice = {
  id: number;
  challengeName: string;
  points: string;
  totalPoints: number;
};

type LockedWeekNotice = {
  id: number;
  remainingTasks: number;
  requiredWeek: string;
  week: string;
};

const WEEK_ONE: MissionTask[] = [
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

const WEEK_TWO: MissionTask[] = [
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

const WEEK_THREE: MissionTask[] = [
  { name: "Overdrive", points: "+25", detail: "Burn 750 cals + 2.0x B.W. protein." },
  { name: "Pressure Stack", points: "+25", detail: "25 diamond and 25 standard pushups." },
  { name: "Burpee War", points: "+30", detail: "75 burpees. Hit: under 15 min." },
  { name: "Cold Control", points: "+20", detail: "Ice bath (4-5 min)." },
  { name: "Pull Dominance", points: "+30", detail: "30 pullups or 10 muscle ups." },
  { name: "Recovery Stack", points: "+20", detail: "Ice bath (5 min) + 7h sleep." },
];

const MISSION_WEEKS = [
  { badge: "Week 1", title: "Foundation", tier: "Initiator", icon: initiatorTrophy, items: WEEK_ONE },
  { badge: "Week 2", title: "Ascend", tier: "Ascender", icon: ascenderTrophy, items: WEEK_TWO },
  { badge: "Week 3", title: "Dominance", tier: "Beast", icon: beastTrophy, items: WEEK_THREE },
];

const MISSION_PLAYBOOK_STORAGE_KEY = "zoda-mission-playbook-checks";
const MISSION_DICE_STORAGE_KEY = "zoda-mission-dice-roll";
const MISSION_PLAY_WEEK_STORAGE_KEY = "zoda-mission-play-active-week";
const MISSION_PLAY_PICK_STORAGE_KEY = "zoda-mission-play-active-challenge";
const SCOREBOARD_TARGET_POINTS = 450;
const FINAL_MISSION_ID = "final-mission";

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getPointValue(points: string) {
  const match = points.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function getChallengeItemId(challenge: Pick<MissionChallenge, "badge" | "name">) {
  return `${challenge.badge}-${challenge.name}`;
}

const ALL_CHALLENGES: MissionChallenge[] = MISSION_WEEKS.flatMap((week, weekIndex) =>
  week.items.map((item) => ({
    ...item,
    badge: week.badge,
    id: `${toSlug(week.badge)}-${toSlug(item.name)}`,
    tone:
      item.name === "Beast Mode"
        ? "orange"
        : item.name === "Repeat Any" || item.name === "Bonus"
          ? "mint"
          : "green",
    weekIndex,
  })),
);

function getScoreboard(checkedItems: string[]) {
  const completedChallenges = ALL_CHALLENGES.filter((challenge) =>
    checkedItems.includes(getChallengeItemId(challenge)),
  );
  const completedPoints = completedChallenges.reduce(
    (total, item) => total + getPointValue(item.points),
    0,
  );
  const weekCounts = MISSION_WEEKS.map((week, weekIndex) => {
    const total = ALL_CHALLENGES.filter((challenge) => challenge.weekIndex === weekIndex).length;
    const completed = completedChallenges.filter(
      (challenge) => challenge.weekIndex === weekIndex,
    ).length;
    return { week: week.badge, completed, total };
  });
  const badgeTier =
    completedPoints >= SCOREBOARD_TARGET_POINTS
      ? "Beast"
      : completedPoints >= 300
        ? "Ascender"
        : completedPoints > 0
          ? "Initiator"
          : "Pending";

  return {
    badgeTier,
    beastSaves: Math.floor(completedChallenges.length / 12),
    completedPoints,
    completedTasks: completedChallenges.length,
    targetPoints: SCOREBOARD_TARGET_POINTS,
    totalTasks: ALL_CHALLENGES.length,
    weekCounts,
  };
}

function MissionPlayPage() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);
  const [activeChallengeId, setActiveChallengeId] = useState<string | null>(null);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [diceRollCount, setDiceRollCount] = useState(0);
  const [scoreNotice, setScoreNotice] = useState<ScoreNotice | null>(null);
  const [lockedWeekNotice, setLockedWeekNotice] = useState<LockedWeekNotice | null>(null);

  useEffect(() => {
    try {
      const savedChecks = window.localStorage.getItem(MISSION_PLAYBOOK_STORAGE_KEY);
      setCheckedItems(savedChecks ? JSON.parse(savedChecks) : []);
    } catch {
      setCheckedItems([]);
    }

    const savedWeek = Number(window.localStorage.getItem(MISSION_PLAY_WEEK_STORAGE_KEY) ?? "0");
    setActiveWeekIndex(Math.min(Math.max(savedWeek, 0), MISSION_WEEKS.length - 1));
    setActiveChallengeId(window.localStorage.getItem(MISSION_PLAY_PICK_STORAGE_KEY));

    try {
      const savedDiceRoll = window.localStorage.getItem(MISSION_DICE_STORAGE_KEY);
      if (savedDiceRoll) {
        const savedDice = JSON.parse(savedDiceRoll) as { value?: number; count?: number };
        setDiceValue(savedDice.value ?? null);
        setDiceRollCount(savedDice.count ?? 0);
      }
    } catch {
      setDiceValue(null);
      setDiceRollCount(0);
    }
  }, []);

  const scoreboard = useMemo(() => getScoreboard(checkedItems), [checkedItems]);
  const activeWeek = MISSION_WEEKS[activeWeekIndex];
  const activeWeekChallenges = useMemo(
    () => ALL_CHALLENGES.filter((challenge) => challenge.weekIndex === activeWeekIndex),
    [activeWeekIndex],
  );
  const incompleteActiveWeekChallenges = activeWeekChallenges.filter(
    (challenge) => !checkedItems.includes(getChallengeItemId(challenge)),
  );
  const activeChallenge = ALL_CHALLENGES.find((challenge) => challenge.id === activeChallengeId);
  const isFinalMissionSelected = activeChallengeId === FINAL_MISSION_ID;
  const activeChallengeIsComplete = activeChallenge
    ? checkedItems.includes(getChallengeItemId(activeChallenge))
    : false;
  const isCurrentWeekComplete = incompleteActiveWeekChallenges.length === 0;
  const allTasksComplete = scoreboard.completedTasks === scoreboard.totalTasks;
  const unlockedWeekIndex = scoreboard.weekCounts.reduce(
    (highestUnlocked, week, index, weeks) =>
      index === 0 || weeks[index - 1].completed === weeks[index - 1].total
        ? index
        : highestUnlocked,
    0,
  );
  const progressPercent = Math.round(
    (scoreboard.completedTasks / Math.max(scoreboard.totalTasks, 1)) * 100,
  );

  useEffect(() => {
    if (activeWeekIndex <= unlockedWeekIndex) return;

    setActiveWeekIndex(unlockedWeekIndex);
    setActiveChallengeId(null);
    window.localStorage.setItem(MISSION_PLAY_WEEK_STORAGE_KEY, String(unlockedWeekIndex));
    window.localStorage.removeItem(MISSION_PLAY_PICK_STORAGE_KEY);
  }, [activeWeekIndex, unlockedWeekIndex]);

  useEffect(() => {
    if (!scoreNotice) return;

    const timeoutId = window.setTimeout(() => setScoreNotice(null), 3200);
    return () => window.clearTimeout(timeoutId);
  }, [scoreNotice]);

  useEffect(() => {
    if (!lockedWeekNotice) return;

    const timeoutId = window.setTimeout(() => setLockedWeekNotice(null), 3200);
    return () => window.clearTimeout(timeoutId);
  }, [lockedWeekNotice]);

  const saveActiveWeek = (weekIndex: number) => {
    if (weekIndex > unlockedWeekIndex) return;

    setLockedWeekNotice(null);
    setActiveWeekIndex(weekIndex);
    setActiveChallengeId(null);
    window.localStorage.setItem(MISSION_PLAY_WEEK_STORAGE_KEY, String(weekIndex));
    window.localStorage.removeItem(MISSION_PLAY_PICK_STORAGE_KEY);
  };

  const showLockedWeekNotice = (weekIndex: number) => {
    const requiredWeek = scoreboard.weekCounts[weekIndex - 1];
    if (!requiredWeek) return;

    setScoreNotice(null);
    setLockedWeekNotice({
      id: Date.now(),
      remainingTasks: Math.max(requiredWeek.total - requiredWeek.completed, 0),
      requiredWeek: requiredWeek.week,
      week: MISSION_WEEKS[weekIndex].badge,
    });
  };

  const rollChallenge = () => {
    if (incompleteActiveWeekChallenges.length === 0) return;

    const nextValue = Math.floor(Math.random() * 6) + 1;
    const pickedChallenge =
      incompleteActiveWeekChallenges[(nextValue - 1) % incompleteActiveWeekChallenges.length];
    const nextCount = diceRollCount + 1;

    setDiceValue(nextValue);
    setDiceRollCount(nextCount);
    setActiveChallengeId(pickedChallenge.id);
    window.localStorage.setItem(
      MISSION_DICE_STORAGE_KEY,
      JSON.stringify({ value: nextValue, count: nextCount }),
    );
    window.localStorage.setItem(MISSION_PLAY_PICK_STORAGE_KEY, pickedChallenge.id);
  };

  const markActiveChallengeComplete = () => {
    if (!activeChallenge || activeChallengeIsComplete) return;
    const itemId = getChallengeItemId(activeChallenge);
    const nextItems = [...checkedItems, itemId];
    const nextScoreboard = getScoreboard(nextItems);
    setCheckedItems(nextItems);
    setScoreNotice({
      id: Date.now(),
      challengeName: activeChallenge.name,
      points: activeChallenge.points,
      totalPoints: nextScoreboard.completedPoints,
    });
    window.localStorage.setItem(MISSION_PLAYBOOK_STORAGE_KEY, JSON.stringify(nextItems));
  };

  return (
    <div className="zoda-shell zoda-shell--light zoda-mission-play-page">
      <SiteHeader menuId="mission-play-mobile-menu" />

      <main className="zoda-mission-play" aria-label="Mission play board">
        <section className="zoda-mission-play__header">
          <a className="zoda-mission-play__back" href="/mission">
            <ArrowLeft size={15} aria-hidden="true" />
            Mission
          </a>
          <div>
            <span>Mission Play</span>
            <h1>Roll. Pick. Complete.</h1>
          </div>
          <p>
            Dice picks your current-week challenge. Complete it, stack points, and clear the board.
          </p>
        </section>

        <div className="zoda-mission-play__mobile-status" aria-label="Current score">
          <span>{scoreboard.completedPoints} pts</span>
          <strong>
            {scoreboard.completedTasks}/{scoreboard.totalTasks} complete
          </strong>
        </div>

        {lockedWeekNotice ? (
          <div
            key={lockedWeekNotice.id}
            className="zoda-mission-play__notice zoda-mission-play__notice--lock"
            role="status"
            aria-live="polite"
          >
            <strong>{lockedWeekNotice.week} locked</strong>
            <span>Clear {lockedWeekNotice.requiredWeek} first.</span>
            <em>
              {lockedWeekNotice.remainingTasks} task
              {lockedWeekNotice.remainingTasks === 1 ? "" : "s"} remaining
            </em>
          </div>
        ) : scoreNotice ? (
          <div
            key={scoreNotice.id}
            className="zoda-mission-play__notice"
            role="status"
            aria-live="polite"
          >
            <strong>{scoreNotice.points} points</strong>
            <span>{scoreNotice.challengeName} complete</span>
            <em>Score: {scoreNotice.totalPoints} / {scoreboard.targetPoints}</em>
          </div>
        ) : null}

        <section className="zoda-mission-play__layout">
          <aside className="zoda-mission-play__score" aria-live="polite">
            <div className="zoda-mission-play__score-head">
              <span>
                <Trophy size={15} aria-hidden="true" />
                Scoreboard
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
                <dt>Progress</dt>
                <dd>{progressPercent}%</dd>
              </div>
              <div>
                <dt>Saves</dt>
                <dd>{scoreboard.beastSaves}</dd>
              </div>
            </dl>
            <div className="zoda-mission-play__meter" aria-label={`${progressPercent}% complete`}>
              <i style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="zoda-mission-play__weeks" aria-label="Week progress">
              {scoreboard.weekCounts.map((week, index) => {
                const isLocked = index > unlockedWeekIndex;

                return (
                  <button
                    key={week.week}
                    type="button"
                    className={index === activeWeekIndex ? "is-active" : undefined}
                    aria-label={
                      isLocked
                        ? `${week.week} locked. Clear ${scoreboard.weekCounts[index - 1]?.week} first.`
                        : `Open ${week.week}`
                    }
                    data-locked={isLocked ? "true" : undefined}
                    onClick={() => (isLocked ? showLockedWeekNotice(index) : saveActiveWeek(index))}
                  >
                    <span>{week.week.replace("Week ", "W")}</span>
                    <strong>{isLocked ? "Locked" : `${week.completed}/${week.total}`}</strong>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="zoda-mission-play__board-wrap" aria-label="Mission game board">
            <div className="zoda-mission-play__board-head">
              <div>
                <span>{activeWeek.badge}</span>
                <strong>{activeWeek.title}</strong>
              </div>
              <img src={activeWeek.icon} alt="" aria-hidden="true" />
            </div>
            <div className="zoda-mission-play__board">
              <button className="zoda-mission-play__start" type="button" onClick={rollChallenge}>
                <img src={zodaZLogo} alt="" aria-hidden="true" />
                Roll
              </button>
              {activeWeekChallenges.map((challenge, index) => {
                const itemId = getChallengeItemId(challenge);
                const isComplete = checkedItems.includes(itemId);
                const isActive = activeChallenge?.id === challenge.id;

                return (
                  <button
                    key={challenge.id}
                    type="button"
                    className={isComplete ? "is-complete" : isActive ? "is-active" : undefined}
                    data-tone={challenge.tone}
                    aria-pressed={isActive}
                    onClick={() => {
                      setActiveChallengeId(challenge.id);
                      window.localStorage.setItem(MISSION_PLAY_PICK_STORAGE_KEY, challenge.id);
                    }}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{challenge.name}</strong>
                    <em>{challenge.points}</em>
                    {isComplete ? <Check size={13} aria-hidden="true" /> : null}
                  </button>
                );
              })}
              {activeWeekIndex === MISSION_WEEKS.length - 1 ? (
                <button
                  type="button"
                  className={[
                    "zoda-mission-play__final-tile",
                    isFinalMissionSelected ? "is-active" : "",
                    allTasksComplete ? "is-unlocked" : "is-locked",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-pressed={isFinalMissionSelected}
                  onClick={() => {
                    setActiveChallengeId(FINAL_MISSION_ID);
                    window.localStorage.setItem(MISSION_PLAY_PICK_STORAGE_KEY, FINAL_MISSION_ID);
                  }}
                >
                  <span>{allTasksComplete ? "Unlocked" : "Locked"}</span>
                  <img src={finalMissionIcon} alt="" aria-hidden="true" />
                  <strong>Final Mission</strong>
                  <em>20/20</em>
                </button>
              ) : null}
            </div>
          </section>

          <aside className="zoda-mission-play__control" aria-live="polite">
            <div className="zoda-mission-play__dice">
              <button
                type="button"
                onClick={rollChallenge}
                disabled={isCurrentWeekComplete}
                aria-label="Roll dice to pick challenge"
              >
                <Dice5 size={16} aria-hidden="true" />
                Roll Challenge
              </button>
              <div className="zoda-mission-play__die" data-value={diceValue ?? 0}>
                {Array.from({ length: 7 }, (_, index) => (
                  <i key={index} aria-hidden="true" />
                ))}
                <span className="sr-only">
                  {diceValue ? `Rolled ${diceValue}` : "Dice not rolled"}
                </span>
              </div>
              <small>{diceValue ? `Roll ${diceRollCount}: ${diceValue}` : "Ready to pick"}</small>
            </div>

            <div className="zoda-mission-play__challenge">
              {isFinalMissionSelected ? (
                <>
                  <span>{allTasksComplete ? "Final Mission unlocked" : "Final Mission locked"}</span>
                  <h2>Final Mission</h2>
                  {allTasksComplete ? (
                    <p>
                      100 burpees. Hydrate. Wear ZODA Mission Bag. Post & tag @ZODA_FIT +
                      #ZODAMISSION.
                    </p>
                  ) : (
                    <p>
                      Complete all 20 weekly tasks first. The dice will keep picking only active
                      weekly challenges until the board is cleared.
                    </p>
                  )}
                  <dl>
                    <div>
                      <dt>Tasks</dt>
                      <dd>
                        {scoreboard.completedTasks}/{scoreboard.totalTasks}
                      </dd>
                    </div>
                    <div>
                      <dt>Status</dt>
                      <dd>{allTasksComplete ? "Ready" : "Locked"}</dd>
                    </div>
                  </dl>
                  {allTasksComplete ? <a href="/mission">View Playbook</a> : null}
                </>
              ) : isCurrentWeekComplete ? (
                <>
                  <span>{activeWeek.badge} complete</span>
                  <h2>{activeWeek.tier} cleared.</h2>
                  <p>
                    Every challenge in this week is complete. Move to the next week when you are
                    ready.
                  </p>
                  {activeWeekIndex < MISSION_WEEKS.length - 1 ? (
                    <button type="button" onClick={() => saveActiveWeek(activeWeekIndex + 1)}>
                      Enter {MISSION_WEEKS[activeWeekIndex + 1].badge}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveChallengeId(FINAL_MISSION_ID);
                        window.localStorage.setItem(MISSION_PLAY_PICK_STORAGE_KEY, FINAL_MISSION_ID);
                      }}
                    >
                      Final Mission Ready
                    </button>
                  )}
                </>
              ) : activeChallenge ? (
                <>
                  <span>{activeChallenge.badge}</span>
                  <h2>{activeChallenge.name}</h2>
                  <p>{activeChallenge.detail}</p>
                  <dl>
                    <div>
                      <dt>Points</dt>
                      <dd>{activeChallenge.points}</dd>
                    </div>
                    <div>
                      <dt>Status</dt>
                      <dd>{activeChallengeIsComplete ? "Complete" : "Active"}</dd>
                    </div>
                  </dl>
                  <button
                    type="button"
                    disabled={activeChallengeIsComplete}
                    onClick={markActiveChallengeComplete}
                  >
                    {activeChallengeIsComplete ? "Completed" : "Mark Complete"}
                  </button>
                </>
              ) : (
                <>
                  <span>{activeWeek.badge}</span>
                  <h2>Roll for your challenge.</h2>
                  <p>
                    The dice will choose from the incomplete challenges in {activeWeek.title}. Clear
                    the week to unlock the next tier.
                  </p>
                  <button type="button" onClick={rollChallenge}>
                    <RotateCcw size={15} aria-hidden="true" />
                    Pick Challenge
                  </button>
                </>
              )}
            </div>
          </aside>
        </section>
      </main>

      <CartDrawer />
    </div>
  );
}
