import { useEffect, useState } from "react";

/*
  Ribbon logic based on the CAP Cadet Super Chart you sent.
  Important:
  - Curry starts as the purple ribbon.
  - Several achievements say "No Ribbon Awarded" on the chart.
  - Those achievements now show a No Ribbon marker instead of fake ribbon bars.
*/

const CADET_RIBBONS = {
  curry: {
    label: "Curry Award Ribbon",
    colors: ["#6f2a86", "#ffffff", "#6f2a86"]
  },
  arnold: {
    label: "Arnold Achievement Ribbon",
    colors: ["#0b5f86", "#ffffff", "#dc2626", "#ffffff", "#0b5f86"]
  },
  feik: {
    label: "Feik Achievement Ribbon",
    colors: ["#facc15", "#0f172a", "#facc15", "#0b5f86", "#dc2626", "#0b5f86", "#16a34a"]
  },
  wrightBrothers: {
    label: "Wright Brothers Award Ribbon",
    colors: ["#16a34a", "#ffffff", "#16a34a", "#16a34a", "#ffffff", "#16a34a"]
  },
  rickenbacker: {
    label: "Rickenbacker Achievement Ribbon",
    colors: ["#ffffff", "#facc15", "#ffffff", "#ffffff", "#facc15", "#ffffff"]
  },
  achievement5: {
    label: "Achievement 5 Ribbon",
    colors: ["#facc15", "#111827", "#facc15", "#facc15", "#111827", "#facc15"]
  },
  doolittle: {
    label: "Doolittle Achievement Ribbon",
    colors: ["#fb923c", "#ffffff", "#fb923c", "#fb923c", "#ffffff", "#fb923c"]
  },
  goddard: {
    label: "Goddard Achievement Ribbon",
    colors: ["#111827", "#ffffff", "#7f1d1d", "#1e3a8a", "#1e3a8a", "#7f1d1d", "#ffffff", "#111827"]
  },
  armstrong: {
    label: "Armstrong Achievement Ribbon",
    colors: ["#111827", "#ffffff", "#7f1d1d", "#111827", "#111827", "#7f1d1d", "#ffffff", "#111827"]
  },
  mitchell: {
    label: "Billy Mitchell Award Ribbon",
    colors: ["#fb923c", "#ffffff", "#fb923c"]
  },
  earhart: {
    label: "Amelia Earhart Award Ribbon",
    colors: ["#ffffff", "#dc2626", "#ffffff", "#2563eb", "#ffffff", "#dc2626", "#ffffff"]
  },
  eaker: {
    label: "Ira C. Eaker Award Ribbon",
    colors: ["#1e3a8a", "#7f1d1d", "#1e3a8a"]
  },
  spaatz: {
    label: "Carl A. Spaatz Award Ribbon",
    colors: ["#ffffff", "#dc2626", "#dc2626", "#ffffff"]
  }
};

function getRibbonForAchievement(index) {
  const map = [
    "curry",          // 1 Curry
    "arnold",         // 2 Arnold
    "feik",           // 3 Feik
    "wrightBrothers", // Wright Brothers Award
    "rickenbacker",   // Achievement 4
    "achievement5",   // Achievement 5
    "doolittle",      // Achievement 6
    "goddard",        // Achievement 7
    "armstrong",      // Achievement 8
    "mitchell",       // Billy Mitchell Award
    null,             // Achievement 9 — No Ribbon Awarded
    null,             // Achievement 10 — No Ribbon Awarded
    null,             // Achievement 11 — No Ribbon Awarded
    "earhart",        // Amelia Earhart Award
    null,             // Achievement 12 — No Ribbon Awarded
    null,             // Achievement 13 — No Ribbon Awarded
    null,             // Achievement 14 / Boyd — No Ribbon Awarded
    null,             // Achievement 15 / Sally Ride — No Ribbon Awarded
    null,             // Achievement 16 — No Ribbon Awarded
    "eaker",          // Ira C. Eaker Award
    "spaatz"          // Carl A. Spaatz Award
  ];

  const key = map[index];
  return key ? CADET_RIBBONS[key] : null;
}

const ACHIEVEMENTS = [
  ["Curry Achievement", "Cadet Airman", "C/Amn", "Phase I", ["Be a current CAP cadet", "Recite the Cadet Oath", "Complete Cadet Welcome Course", "Complete Learn to Lead Chapter 1", "Attempt CPFT", "Participate in character development"], ["Fall In", "Attention", "Parade Rest", "Present Arms", "Order Arms", "Right Face", "Left Face", "About Face", "Forward March", "Flight Halt"]],
  ["Arnold Achievement", "Cadet Airman First Class", "C/A1C", "Phase I", ["Minimum 8 weeks after Curry", "Wear uniform properly", "Complete Learn to Lead Chapter 2", "Complete aerospace module", "Continue CPFT progress", "Attend character development"], ["All Curry drill", "Column Right", "Column Left", "To the Rear March", "Change Step March"]],
  ["Feik Achievement", "Cadet Senior Airman", "C/SrA", "Phase I", ["Minimum 8 weeks after Arnold", "Complete Learn to Lead Chapter 3", "Complete aerospace module", "Continue CPFT progress", "Attend character development"], ["All previous drill", "Open Ranks", "Close Ranks", "Count Off"]],
  ["Wright Brothers Award", "Cadet Staff Sergeant", "C/SSgt", "Phase I Milestone", ["Minimum 8 weeks after Feik", "Pass Wright Brothers exam", "Complete aerospace work", "Meet fitness requirement", "Complete drill evaluation"], ["Form the Flight", "Report to Commander", "Stationary commands", "Marching commands"]],
  ["Rickenbacker Achievement", "Cadet Technical Sergeant", "C/TSgt", "Phase II", ["Minimum 8 weeks after Wright Brothers", "Complete Learn to Lead Chapter 4", "Complete aerospace module", "Meet HFZ", "Attend character development"], ["NCO drill leadership", "Form and align flight"]],
  ["Achievement 5", "Cadet Master Sergeant", "C/MSgt", "Phase II", ["Minimum 8 weeks after Rickenbacker", "Complete Learn to Lead Chapter 5", "Complete aerospace module", "Meet HFZ", "Attend character development"], ["Lead basic flight drill", "Mentor junior cadets"]],
  ["Doolittle Achievement", "Cadet Senior Master Sergeant", "C/SMSgt", "Phase II", ["Minimum 8 weeks after Achievement 5", "Complete Learn to Lead Chapter 6", "Complete aerospace module", "Meet HFZ", "Attend character development"], ["Advanced NCO drill", "Correct junior cadet drill errors"]],
  ["Goddard Achievement", "Cadet Chief Master Sergeant", "C/CMSgt", "Phase II", ["Minimum 8 weeks after Doolittle", "Complete Learn to Lead Chapter 7", "Complete aerospace module", "Meet HFZ", "Attend character development"], ["Senior NCO drill", "Teach facing and marching movements"]],
  ["Armstrong Achievement", "Cadet Chief Master Sergeant", "C/CMSgt", "Phase II", ["Minimum 8 weeks after Goddard", "Complete Learn to Lead Chapter 8", "Complete aerospace module", "Meet HFZ", "Complete speech and essay"], ["Flight sergeant duties", "Mentor junior NCOs"]],
  ["Billy Mitchell Award", "Cadet Second Lieutenant", "C/2d Lt", "Phase II Milestone", ["Minimum 8 weeks after Armstrong", "Pass Mitchell leadership exam", "Pass aerospace exam", "Meet HFZ", "Graduate encampment"], ["Master Phase II drill", "Prepare for officer leadership"]],
  ["Achievement 9", "Cadet Second Lieutenant", "C/2d Lt", "Phase III", ["Minimum 8 weeks after Mitchell", "Complete Learn to Lead Chapter 9", "Complete SDA requirement", "Complete aerospace block test", "Meet HFZ"], ["No new drill test", "Teach junior cadets"]],
  ["Willa Brown Achievement", "Cadet First Lieutenant", "C/1st Lt", "Phase III", ["Minimum 8 weeks after Achievement 9", "Complete Learn to Lead Chapter 10", "Complete SDA requirement", "Complete aerospace block test", "Meet HFZ"], ["No new drill test", "Supervise drill instruction"]],
  ["Achievement 11", "Cadet First Lieutenant", "C/1st Lt", "Phase III", ["Minimum 8 weeks after Willa Brown", "Complete Learn to Lead Chapter 11", "Complete SDA requirement", "Complete aerospace block test", "Meet HFZ"], ["No new drill test", "Support ceremonies"]],
  ["Amelia Earhart Award", "Cadet Captain", "C/Capt", "Phase III Milestone", ["Minimum 8 weeks after Achievement 11", "Pass Earhart leadership exam", "Meet HFZ", "Meet general advancement requirements"], ["No new drill test", "Mentor junior cadets"]],
  ["Achievement 12", "Cadet Captain", "C/Capt", "Phase IV", ["Minimum 8 weeks after Earhart", "Complete Learn to Lead Chapter 12", "Complete SDA requirement", "Meet HFZ", "Attend character development"], ["No new drill test", "Oversee training"]],
  ["Achievement 13", "Cadet Captain", "C/Capt", "Phase IV", ["Minimum 8 weeks after Achievement 12", "Complete Learn to Lead Chapter 13", "Complete SDA requirement", "Meet HFZ", "Attend character development"], ["No new drill test", "Mentor cadet officers and NCOs"]],
  ["Boyd Achievement", "Cadet Major", "C/Maj", "Phase IV", ["Minimum 8 weeks after Achievement 13", "Complete Learn to Lead Chapter 14", "Complete SDA requirement", "Complete aerospace block test", "Meet HFZ"], ["No new drill test", "Supervise unit drill training"]],
  ["Sally Ride Achievement", "Cadet Major", "C/Maj", "Phase IV", ["Minimum 8 weeks after Boyd", "Complete Learn to Lead Chapter 15", "Complete SDA requirement", "Complete aerospace block test", "Meet HFZ"], ["No new drill test", "Manage and mentor cadet leaders"]],
  ["Achievement 16", "Cadet Major", "C/Maj", "Phase IV", ["Minimum 8 weeks after Sally Ride", "Complete Learn to Lead Chapter 16", "Complete SDA requirement", "Complete aerospace block test", "Meet HFZ"], ["No new drill test", "Model senior cadet leadership"]],
  ["Ira C. Eaker Award", "Cadet Lieutenant Colonel", "C/Lt Col", "Phase IV Milestone", ["Minimum 8 weeks after Achievement 16", "Complete required speech and essay", "Meet HFZ", "Graduate leadership academy", "Meet general advancement requirements"], ["No new drill test", "Guide cadet staff"]],
  ["Carl A. Spaatz Award", "Cadet Colonel", "C/Col", "Pinnacle Award", ["Earn Eaker Award", "Pass comprehensive leadership exam", "Pass comprehensive aerospace exam", "Pass fitness assessment", "Complete essay exam"], ["No additional drill test", "Represent highest cadet standard"]]
].map((a, i) => ({
  id: i + 1,
  name: a[0],
  rank: a[1],
  abbr: a[2],
  phase: a[3],
  overview: `${a[0]} promotion tracker for ${a[1]}.`,
  requirements: a[4],
  drill: a[5],
  ribbon: getRibbonForAchievement(i)
}));

const DRILL_LIBRARY = [
  {
    category: "Stationary Movements",
    items: [
      { name: "Attention", command: "Flight, ATTENTION", purpose: "Move cadets to the basic position of military bearing.", notes: ["Heels together", "Body straight", "Arms pinned naturally", "Eyes forward", "No talking or movement"] },
      { name: "Parade Rest", command: "Parade, REST", purpose: "Place cadets in a disciplined rest position.", notes: ["Move left foot about shoulder width", "Hands behind back", "Right hand inside left", "Remain silent", "Eyes forward"] },
      { name: "Present Arms", command: "Present, ARMS", purpose: "Render a salute while stationary.", notes: ["Raise right hand sharply", "Tip of forefinger near eyebrow or glasses", "Upper arm parallel to ground", "Hold until ordered"] },
      { name: "Order Arms", command: "Order, ARMS", purpose: "Return from salute to attention.", notes: ["Lower hand sharply", "Return to attention", "Do not drop posture"] },
      { name: "Right Face", command: "Right, FACE", purpose: "Turn 90 degrees to the right.", notes: ["Pivot on right heel and left toe", "Keep arms pinned", "Snap heels together", "Finish at attention"] },
      { name: "Left Face", command: "Left, FACE", purpose: "Turn 90 degrees to the left.", notes: ["Pivot on left heel and right toe", "Keep body upright", "Snap heels together", "Finish at attention"] },
      { name: "About Face", command: "About, FACE", purpose: "Turn 180 degrees to the rear.", notes: ["Place right toe behind left heel", "Pivot over right shoulder", "Keep arms pinned", "Finish at attention"] }
    ]
  },
  {
    category: "Marching Movements",
    items: [
      { name: "Forward March", command: "Forward, MARCH", purpose: "Move the flight forward in step.", notes: ["Step off with left foot", "Use 24-inch steps", "Swing arms naturally", "Maintain interval and distance"] },
      { name: "Flight Halt", command: "Flight, HALT", purpose: "Stop the flight while marching.", notes: ["Command called on either foot", "Take one more step", "Bring trailing foot alongside", "End at attention"] },
      { name: "Column Right", command: "Column Right, MARCH", purpose: "Turn the flight to the right while marching.", notes: ["Base element pivots right", "Others continue until proper point", "Maintain dress and cover"] },
      { name: "Column Left", command: "Column Left, MARCH", purpose: "Turn the flight to the left while marching.", notes: ["Base element pivots left", "Keep spacing", "Do not drift", "Maintain cadence"] },
      { name: "To the Rear March", command: "To the Rear, MARCH", purpose: "Reverse the direction of march.", notes: ["Given as right foot strikes", "Take one more step", "Pivot on balls of feet", "Step off with left foot"] },
      { name: "Change Step March", command: "Change Step, MARCH", purpose: "Correct cadence without stopping.", notes: ["Given as right foot strikes", "Take one more step", "Bring right foot alongside left", "Step off again with left"] }
    ]
  },
  {
    category: "Flight Formation",
    items: [
      { name: "Fall In", command: "FALL IN", purpose: "Form the flight in proper formation.", notes: ["Cadets move quickly", "Form at attention", "Maintain interval", "Dress and cover"] },
      { name: "Dress Right Dress", command: "Dress Right, DRESS", purpose: "Align the flight.", notes: ["Raise left arm except right flank", "Turn head and eyes right", "Adjust alignment", "Hold until Ready Front"] },
      { name: "Ready Front", command: "Ready, FRONT", purpose: "Return from alignment to attention.", notes: ["Drop arm sharply", "Head and eyes front", "Remain at attention"] },
      { name: "Open Ranks", command: "Open Ranks, MARCH", purpose: "Open formation for inspection.", notes: ["Front rank steps forward", "Other ranks adjust spacing", "Maintain alignment"] },
      { name: "Close Ranks", command: "Close Ranks, MARCH", purpose: "Return to normal formation.", notes: ["Ranks close distance", "Maintain interval", "End at attention"] },
      { name: "Count Off", command: "Count, OFF", purpose: "Number cadets in formation.", notes: ["Cadets count in sequence", "Turn head when required", "Speak clearly", "Return forward"] }
    ]
  },
  {
    category: "Drill Leadership",
    items: [
      { name: "Form the Flight", command: "FALL IN", purpose: "Take control and organize the flight.", notes: ["Use command voice", "Position yourself correctly", "Check alignment", "Correct spacing"] },
      { name: "Report to Commander", command: "Sir/Ma’am, flight is prepared for inspection", purpose: "Report flight status to a commander or evaluator.", notes: ["Salute properly", "Speak clearly", "Maintain bearing", "Wait for return salute"] },
      { name: "Give Commands", command: "Preparatory command + command of execution", purpose: "Lead cadets through movements.", notes: ["Use strong command voice", "Pause correctly", "Be confident", "Do not mumble"] },
      { name: "Inspect Basic Alignment", command: "Dress Right, DRESS / Ready, FRONT", purpose: "Check whether cadets are properly aligned.", notes: ["Check dress", "Check cover", "Correct errors calmly", "Reset if needed"] },
      { name: "Teach Junior Cadets", command: "Demonstrate, explain, practice, correct", purpose: "Train newer cadets in basic drill.", notes: ["Show the movement", "Explain simply", "Let them practice", "Give clear corrections"] }
    ]
  }
];

const DEFAULT_EVENTS = [];
const DEFAULT_FLIGHTS = [];

const DEFAULT_PROFILE = {
  name: "Lawrence",
  capId: "",
  squadron: "CAP Squadron",
  joined: "2026",
  goal: "Earn Wright Brothers Award"
};

const DOCS = [
  { id: 1, name: "eServices Login", category: "Official Login", url: "https://www.capnhq.gov/" },
  { id: 2, name: "Parent / Guardian Portal", category: "Official Parent Portal", url: "https://www.gocivilairpatrol.com/programs/cadets/parents/parent-guardian-portal" },
  { id: 3, name: "Cadet Achievement Requirements", category: "Cadet Program", url: "https://www.gocivilairpatrol.com/programs/cadets/stripes-to-diamonds" },
  { id: 4, name: "Cadet Tests & Exams", category: "Testing", url: "https://www.gocivilairpatrol.com/programs/cadets/stripes-to-diamonds/cadet-tests--exams" },
  { id: 5, name: "Drill & Ceremonies Library", category: "Drill", url: "https://www.gocivilairpatrol.com/programs/cadets/library/drill" },
  { id: 6, name: "CAPP 60-33 Drill & Ceremonies", category: "Drill PDF", url: "https://www.gocivilairpatrol.com/media/cms/CAPP6020_5_AUG_16_07A0C6200BA4C.pdf" },
  { id: 7, name: "CAPP 60-34 Practical Drill Tests", category: "Drill Tests PDF", url: "https://www.gocivilairpatrol.com/media/cms/CAPP_6034_Sept_24_3e0cc652c818b.pdf" }
];

function loadSaved(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    if (saved === null || saved === undefined) return fallback;
    return JSON.parse(saved);
  } catch {
    return fallback;
  }
}

function formatDate(value) {
  if (!value) return "No date";
  if (!String(value).includes("-")) return value;
  return new Date(value + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function getCurrentCadetRank(completedIds) {
  if (!completedIds || completedIds.length === 0) {
    return { rank: "Cadet Recruit", abbr: "C/Rec" };
  }

  const highestCompletedId = Math.max(...completedIds);
  const achievement = ACHIEVEMENTS.find((a) => a.id === highestCompletedId);

  return achievement
    ? { rank: achievement.rank, abbr: achievement.abbr }
    : { rank: "Cadet Recruit", abbr: "C/Rec" };
}

function formatCadetDisplayName(name, currentCadetRank) {
  const cleanedName = String(name || "Cadet")
    .replace(/^cadet\s+/i, "")
    .replace(/^c\/[a-z0-9]+\s+/i, "")
    .trim();

  return `${currentCadetRank.abbr} ${cleanedName || "Cadet"}`;
}

function RibbonBar({ ribbon, size = "small" }) {
  const height = size === "large" ? 46 : 28;
  const width = size === "large" ? 150 : 82;

  if (!ribbon) {
    return (
      <div>
        <div style={{ ...noRibbonBox, width, height }}>
          No Ribbon
        </div>

        {size === "large" && <p style={ribbonLabel}>No Ribbon Awarded</p>}
      </div>
    );
  }

  return (
    <div>
      <div style={{ ...ribbonShell, width, height }}>
        {ribbon.colors.map((color, index) => (
          <div key={index} style={{ flex: 1, background: color }} />
        ))}
      </div>

      {size === "large" && <p style={ribbonLabel}>{ribbon.label}</p>}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selected, setSelected] = useState(null);
  const [completedIds, setCompletedIds] = useState(() => loadSaved("cap_completed_ids", []));
  const [requirementChecks, setRequirementChecks] = useState(() => loadSaved("cap_requirement_checks", {}));
  const [theme, setTheme] = useState(() => localStorage.getItem("cap_theme") || "light");
  const [events, setEvents] = useState(() => loadSaved("cap_events", DEFAULT_EVENTS));
  const [flights, setFlights] = useState(() => loadSaved("cap_flights", DEFAULT_FLIGHTS));
  const [profile, setProfile] = useState(() => loadSaved("cap_profile", DEFAULT_PROFILE));

  useEffect(() => localStorage.setItem("cap_completed_ids", JSON.stringify(completedIds)), [completedIds]);
  useEffect(() => localStorage.setItem("cap_requirement_checks", JSON.stringify(requirementChecks)), [requirementChecks]);
  useEffect(() => localStorage.setItem("cap_theme", theme), [theme]);
  useEffect(() => localStorage.setItem("cap_events", JSON.stringify(events)), [events]);
  useEffect(() => localStorage.setItem("cap_flights", JSON.stringify(flights)), [flights]);
  useEffect(() => localStorage.setItem("cap_profile", JSON.stringify(profile)), [profile]);

  const validCompletedIds = completedIds.filter((id) => ACHIEVEMENTS.some((a) => a.id === id));
  const completedCount = validCompletedIds.length;
  const progress = Math.round((completedCount / ACHIEVEMENTS.length) * 100);
  const isDark = theme === "dark";
  const currentAchievement = ACHIEVEMENTS.find((a) => !validCompletedIds.includes(a.id)) || ACHIEVEMENTS[ACHIEVEMENTS.length - 1];
  const currentCadetRank = getCurrentCadetRank(validCompletedIds);

  function toggleCompleted(id) {
    setCompletedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }

  function toggleRequirement(achievementId, index, type = "requirement") {
    const key = type === "drill" ? `drill-${achievementId}-${index}` : `${achievementId}-${index}`;

    setRequirementChecks((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);

      if (achievement) {
        const allRequirementsChecked = achievement.requirements.every((_, i) => next[`${achievementId}-${i}`]);
        const allDrillChecked = achievement.drill.every((_, i) => next[`drill-${achievementId}-${i}`]);

        setCompletedIds((current) => {
          if (allRequirementsChecked && allDrillChecked) {
            return current.includes(achievementId) ? current : [...current, achievementId];
          }

          return current.filter((id) => id !== achievementId);
        });
      }

      return next;
    });
  }

  function resetAppData() {
    const confirmed = window.confirm("Reset all saved cadet data on this device?");
    if (!confirmed) return;

    localStorage.removeItem("cap_completed_ids");
    localStorage.removeItem("cap_requirement_checks");
    localStorage.removeItem("cap_events");
    localStorage.removeItem("cap_flights");
    localStorage.removeItem("cap_profile");

    setCompletedIds([]);
    setRequirementChecks({});
    setEvents([]);
    setFlights([]);
    setProfile(DEFAULT_PROFILE);
    setSelected(null);
    setActiveTab("dashboard");
  }

  function restoreBackup(data) {
    if (!data || typeof data !== "object") return;

    setCompletedIds(Array.isArray(data.completedIds) ? data.completedIds : []);
    setRequirementChecks(data.requirementChecks && typeof data.requirementChecks === "object" ? data.requirementChecks : {});
    setEvents(Array.isArray(data.events) ? data.events : []);
    setFlights(Array.isArray(data.flights) ? data.flights : []);
    setProfile(data.profile && typeof data.profile === "object" ? { ...DEFAULT_PROFILE, ...data.profile } : DEFAULT_PROFILE);
    setSelected(null);
    setActiveTab("dashboard");
  }

  return (
    <div style={{ ...page, ...getThemeVars(isDark) }}>
      <button style={themeButton} onClick={() => setTheme(isDark ? "light" : "dark")}>
        {isDark ? "☀️ Light" : "🌙 Dark"}
      </button>

      <div style={container}>
        {selected ? (
          <AchievementDetail
            selected={selected}
            onBack={() => setSelected(null)}
            completedIds={validCompletedIds}
            toggleCompleted={toggleCompleted}
            requirementChecks={requirementChecks}
            toggleRequirement={toggleRequirement}
          />
        ) : (
          <>
            {activeTab === "dashboard" && (
              <DashboardTab
                profile={profile}
                currentCadetRank={currentCadetRank}
                progress={progress}
                currentAchievement={currentAchievement}
                completedCount={completedCount}
                events={events}
                flights={flights}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === "rank" && (
              <RankTab
                profile={profile}
                currentCadetRank={currentCadetRank}
                setProfile={setProfile}
                onSelect={setSelected}
                completedIds={validCompletedIds}
                toggleCompleted={toggleCompleted}
                progress={progress}
                currentAchievement={currentAchievement}
                completedCount={completedCount}
              />
            )}

            {activeTab === "drill" && <DrillTab />}
            {activeTab === "calendar" && <CalendarTab events={events} setEvents={setEvents} />}
            {activeTab === "flights" && <FlightsTab flights={flights} setFlights={setFlights} />}
            {activeTab === "docs" && (
              <DocsTab
                completedIds={validCompletedIds}
                requirementChecks={requirementChecks}
                events={events}
                flights={flights}
                profile={profile}
                restoreBackup={restoreBackup}
                resetAppData={resetAppData}
              />
            )}
          </>
        )}
      </div>

      {!selected && (
        <nav style={bottomNav}>
          {[
            ["dashboard", "🏠", "Home"],
            ["rank", "⭐", "Rank"],
            ["drill", "🪖", "Drill"],
            ["calendar", "📅", "Events"],
            ["flights", "✈️", "Flights"],
            ["docs", "📁", "Docs"]
          ].map(([id, icon, label]) => (
            <button key={id} style={activeTab === id ? activeNavButton : navButton} onClick={() => setActiveTab(id)}>
              <span style={navIcon}>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

function DashboardTab({ profile, currentCadetRank, progress, currentAchievement, completedCount, events, flights, setActiveTab }) {
  const sortedEvents = [...events].sort((a, b) => String(a.date).localeCompare(String(b.date)));
  const nextEvent = sortedEvents[0];
  const totalHours = flights.reduce((sum, f) => sum + (parseFloat(f.duration) || 0), 0).toFixed(1);

  return (
    <>
      <div style={hero}>
        <p style={eyebrow}>Cadet Dashboard</p>
        <h1 style={title}>CAP Cadet Hub</h1>
        <p style={subtitle}>Your cadet’s progress at a glance.</p>

        <div style={progressBox}>
          <div style={progressHeader}>
            <span>Overall Progress</span>
            <strong>{progress}%</strong>
          </div>
          <div style={progressBar}>
            <div style={{ ...progressFill, width: `${progress}%` }} />
          </div>
          <p style={progressText}>{completedCount} of {ACHIEVEMENTS.length} achievements completed</p>
        </div>
      </div>

      <div style={dashboardProfileCard}>
        <p style={smallLabel}>Cadet</p>
        <h2 style={profileName}>{formatCadetDisplayName(profile.name, currentCadetRank)}</h2>
        {profile.capId ? <p style={phaseText}>CAP ID: {profile.capId}</p> : <p style={cardText}>CAP ID: Not entered</p>}
        <p style={cardText}>{profile.squadron}</p>
        <p style={goalText}>Goal: {profile.goal}</p>
      </div>

      <div style={dashboardGrid}>
        <div style={miniCard}>
          <p style={statLabel}>Target</p>
          <RibbonBar ribbon={currentAchievement.ribbon} />
          <h3 style={miniTitle}>{currentAchievement.name}</h3>
          <p style={cardText}>{currentAchievement.rank}</p>
        </div>

        <div style={miniCard}>
          <p style={statLabel}>Flights</p>
          <h3 style={miniNumber}>{flights.length}</h3>
          <p style={cardText}>{totalHours} total hrs</p>
        </div>
      </div>

      <div style={simpleCard}>
        <div style={{ flex: 1 }}>
          <p style={smallLabel}>Next Event</p>

          {nextEvent ? (
            <>
              <strong style={blueText}>{nextEvent.title}</strong>
              <p style={cardText}>{formatDate(nextEvent.date)} · {nextEvent.time || "No time"}</p>
              <p style={phaseText}>{nextEvent.type} · {nextEvent.location || "No location"}</p>

              {nextEvent.notes && (
                <div style={notesBox}>
                  <p style={smallLabel}>Notes</p>
                  <p style={notesText}>{nextEvent.notes}</p>
                </div>
              )}
            </>
          ) : (
            <>
              <strong style={blueText}>No events added</strong>
              <p style={cardText}>Add the next squadron meeting or activity.</p>
            </>
          )}
        </div>
      </div>

      <div style={quickButtonGrid}>
        <button style={quickButton} onClick={() => setActiveTab("rank")}>⭐ View Ranks</button>
        <button style={quickButton} onClick={() => setActiveTab("drill")}>🪖 Drill Library</button>
        <button style={quickButton} onClick={() => setActiveTab("calendar")}>📅 Add Event</button>
        <button style={quickButton} onClick={() => setActiveTab("flights")}>✈️ Log Flight</button>
        <button style={quickButton} onClick={() => setActiveTab("docs")}>💾 Backup</button>
      </div>
    </>
  );
}

function RankTab({ profile, currentCadetRank, setProfile, onSelect, completedIds, toggleCompleted, progress, currentAchievement, completedCount }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);

  function saveProfile() {
    setProfile(form);
    setEditing(false);
  }

  return (
    <>
      <div style={hero}>
        <p style={eyebrow}>Civil Air Patrol Companion</p>
        <h1 style={title}>Rank Tracker</h1>
        <p style={subtitle}>Track requirements, drill, and ribbons toward each promotion.</p>

        <div style={progressBox}>
          <div style={progressHeader}>
            <span>Progress</span>
            <strong>{progress}%</strong>
          </div>
          <div style={progressBar}>
            <div style={{ ...progressFill, width: `${progress}%` }} />
          </div>
          <p style={progressText}>{completedCount} of {ACHIEVEMENTS.length} completed</p>
        </div>
      </div>

      <div style={profileCard}>
        {!editing ? (
          <>
            <p style={smallLabel}>Cadet Profile</p>
            <h2 style={profileName}>{formatCadetDisplayName(profile.name, currentCadetRank)}</h2>
            {profile.capId ? <p style={phaseText}>CAP ID: {profile.capId}</p> : <p style={cardText}>CAP ID: Not entered</p>}
            <p style={cardText}>{profile.squadron}</p>
            <p style={phaseText}>Joined: {profile.joined}</p>
            <p style={goalText}>Goal: {profile.goal}</p>
            <p style={{ ...cardText, marginTop: "12px", fontSize: "12px" }}>
              Enter only the cadet’s name, like Lawrence. The app adds the current rank automatically.
            </p>
            <button style={smallActionButton} onClick={() => { setForm(profile); setEditing(true); }}>Edit Profile</button>
          </>
        ) : (
          <>
            <p style={smallLabel}>Edit Profile</p>
            <input style={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Last name only, example: Lawrence" />
            <input style={input} value={form.capId || ""} onChange={(e) => setForm({ ...form, capId: e.target.value })} placeholder="CAP ID only — never password" />
            <input style={input} value={form.squadron} onChange={(e) => setForm({ ...form, squadron: e.target.value })} placeholder="Squadron" />
            <input style={input} value={form.joined} onChange={(e) => setForm({ ...form, joined: e.target.value })} placeholder="Joined" />
            <input style={input} value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} placeholder="Goal" />
            <p style={{ ...cardText, fontSize: "12px" }}>
              This app is not affiliated with Civil Air Patrol. It does not connect to eServices and does not store login credentials.
            </p>
            <button style={smallActionButton} onClick={saveProfile}>Save</button>
          </>
        )}
      </div>

      <div style={currentBox}>
        <p style={smallLabel}>Current Target</p>
        <RibbonBar ribbon={currentAchievement.ribbon} />
        <strong>{currentAchievement.name}</strong>
        <p style={cardText}>{currentAchievement.rank} · {currentAchievement.abbr}</p>
        <p style={phaseText}>{currentAchievement.ribbon?.label || "No Ribbon Awarded"}</p>
      </div>

      <h2 style={sectionTitle}>Achievement Path</h2>

      {ACHIEVEMENTS.map((achievement) => {
        const done = completedIds.includes(achievement.id);
        const isCurrent = currentAchievement.id === achievement.id && !done;

        return (
          <div key={achievement.id} style={{ ...card, border: isCurrent ? "2px solid #2563eb" : done ? "2px solid #22c55e" : "1px solid var(--card-border)" }}>
            <button style={checkButton(done)} onClick={() => toggleCompleted(achievement.id)}>
              {done ? "✓" : ""}
            </button>

            <button style={cardMainButton} onClick={() => onSelect(achievement)}>
              <div style={{ flex: 1 }}>
                <RibbonBar ribbon={achievement.ribbon} />
                <strong style={blueText}>{achievement.name}</strong>
                <p style={cardText}>{achievement.rank} · {achievement.abbr}</p>
                <p style={phaseText}>{achievement.ribbon?.label || "No Ribbon Awarded"}</p>
                <p style={phaseText}>{achievement.phase}</p>
                {isCurrent && <p style={currentTag}>Current Target</p>}
                {done && <p style={doneTag}>Completed</p>}
              </div>
              <span style={arrow}>›</span>
            </button>
          </div>
        );
      })}
    </>
  );
}

function AchievementDetail({ selected, onBack, completedIds, toggleCompleted, requirementChecks, toggleRequirement }) {
  const done = completedIds.includes(selected.id);
  const checkedRequirements = selected.requirements.filter((_, i) => requirementChecks[`${selected.id}-${i}`]).length;
  const checkedDrill = selected.drill.filter((_, i) => requirementChecks[`drill-${selected.id}-${i}`]).length;
  const totalItems = selected.requirements.length + selected.drill.length;
  const checkedTotal = checkedRequirements + checkedDrill;
  const awardProgress = Math.round((checkedTotal / totalItems) * 100);

  return (
    <>
      <button style={backButton} onClick={onBack}>← Back</button>

      <div style={hero}>
        <p style={eyebrow}>{selected.phase}</p>
        <RibbonBar ribbon={selected.ribbon} size="large" />
        <h1 style={title}>{selected.name}</h1>
        <p style={subtitle}>{selected.rank} · {selected.abbr}</p>

        <button style={detailCompleteButton(done)} onClick={() => toggleCompleted(selected.id)}>
          {done ? "✓ Marked Complete" : "Mark Achievement Complete"}
        </button>
      </div>

      <p style={overview}>{selected.overview}</p>

      <div style={requirementProgressBox}>
        <div style={progressHeaderDark}>
          <span>Promotion Progress</span>
          <strong>{awardProgress}%</strong>
        </div>

        <div style={progressBarLight}>
          <div style={{ ...progressFillBlue, width: `${awardProgress}%` }} />
        </div>

        <p style={requirementProgressText}>{checkedTotal} of {totalItems} promotion items checked</p>
        <p style={requirementProgressText}>Requirements: {checkedRequirements} of {selected.requirements.length} · Drill: {checkedDrill} of {selected.drill.length}</p>
      </div>

      <h2 style={sectionTitle}>Promotion Requirements</h2>

      {selected.requirements.map((item, index) => {
        const checked = requirementChecks[`${selected.id}-${index}`];

        return (
          <button key={index} style={requirementItem(checked)} onClick={() => toggleRequirement(selected.id, index, "requirement")}>
            <span style={requirementCircle(checked)}>{checked ? "✓" : ""}</span>
            <span style={requirementText(checked)}>{item}</span>
          </button>
        );
      })}

      <h2 style={sectionTitle}>Drill Required for Promotion</h2>

      {selected.drill.map((item, index) => {
        const checked = requirementChecks[`drill-${selected.id}-${index}`];

        return (
          <button key={index} style={requirementItem(checked)} onClick={() => toggleRequirement(selected.id, index, "drill")}>
            <span style={requirementCircle(checked)}>{checked ? "✓" : ""}</span>
            <span style={requirementText(checked)}>🪖 {item}</span>
          </button>
        );
      })}
    </>
  );
}

function DrillTab() {
  const [selectedMovement, setSelectedMovement] = useState(null);

  function openMovement(item, category) {
    setSelectedMovement({
      name: item.name || "Drill Movement",
      command: item.command || "Command not listed",
      purpose: item.purpose || "Purpose not listed.",
      notes: Array.isArray(item.notes) ? item.notes : [],
      category: category || "Drill"
    });
  }

  return (
    <>
      <div style={hero}>
        <p style={eyebrow}>Drill Training</p>
        <h1 style={title}>Drill Library</h1>
        <p style={subtitle}>Study commands, movements, and cadet leadership.</p>
      </div>

      {selectedMovement ? (
        <div style={commandCard}>
          <button style={closeButton} onClick={() => setSelectedMovement(null)}>Close</button>

          <p style={smallLabel}>{selectedMovement.category}</p>
          <h2 style={profileName}>{selectedMovement.name}</h2>

          <div style={commandBox}>
            <p style={smallLabel}>Command</p>
            <strong>{selectedMovement.command}</strong>
          </div>

          <p style={cardText}>{selectedMovement.purpose}</p>

          <p style={smallLabel}>Quick Notes</p>

          {selectedMovement.notes.length > 0 ? (
            selectedMovement.notes.map((note, index) => (
              <div key={index} style={listItem}>• {note}</div>
            ))
          ) : (
            <div style={listItem}>No notes listed for this movement.</div>
          )}
        </div>
      ) : (
        <>
          <div style={simpleCard}>
            <div>
              <strong style={blueText}>Drill Reference</strong>
              <p style={cardText}>
                Use this tab to study drill movements. Promotion drill checkoffs are inside each rank’s promotion checklist.
              </p>
              <p style={phaseText}>Tap a movement to open the command card.</p>
            </div>
          </div>

          {DRILL_LIBRARY.map((group) => (
            <div key={group.category} style={drillGroup}>
              <h2 style={sectionTitle}>{group.category}</h2>

              {group.items.map((item) => (
                <button key={`${group.category}-${item.name}`} style={drillReferenceCard} onClick={() => openMovement(item, group.category)}>
                  <div>
                    <strong style={blueText}>{item.name}</strong>
                    <p style={cardText}>{item.command}</p>
                    <p style={phaseText}>Open command card</p>
                  </div>

                  <span style={arrow}>›</span>
                </button>
              ))}
            </div>
          ))}
        </>
      )}
    </>
  );
}

function CalendarTab({ events, setEvents }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", date: "", time: "", location: "", type: "Meeting", notes: "" });

  function saveEvent() {
    if (!form.title || !form.date) return;

    if (editingId) {
      setEvents(events.map((event) => event.id === editingId ? { ...form, id: editingId } : event));
    } else {
      setEvents([...events, { ...form, id: Date.now() }]);
    }

    setForm({ title: "", date: "", time: "", location: "", type: "Meeting", notes: "" });
    setEditingId(null);
    setShowForm(false);
  }

  function editEvent(event) {
    setForm({
      title: event.title || "",
      date: event.date || "",
      time: event.time || "",
      location: event.location || "",
      type: event.type || "Meeting",
      notes: event.notes || ""
    });

    setEditingId(event.id);
    setShowForm(true);
  }

  function deleteEvent(id) {
    setEvents(events.filter((event) => event.id !== id));
  }

  function cancelForm() {
    setForm({ title: "", date: "", time: "", location: "", type: "Meeting", notes: "" });
    setEditingId(null);
    setShowForm(false);
  }

  return (
    <>
      <div style={hero}>
        <p style={eyebrow}>Upcoming Events</p>
        <h1 style={title}>Calendar</h1>
        <p style={subtitle}>Track meetings, activities, training, and meeting notes.</p>
      </div>

      {!showForm && <button style={primaryButton} onClick={() => setShowForm(true)}>+ Add Event</button>}

      {showForm && (
        <div style={formCard}>
          <p style={smallLabel}>{editingId ? "Edit Event" : "Add Event"}</p>

          <input style={input} placeholder="Event title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input style={input} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <input style={input} type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
          <input style={input} placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />

          <select style={input} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option>Meeting</option>
            <option>Education</option>
            <option>Activity</option>
            <option>PT</option>
            <option>Encampment</option>
            <option>Other</option>
          </select>

          <textarea style={textArea} placeholder="Meeting notes, uniform, what to bring, announcements, reminders..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />

          <button style={primaryButton} onClick={saveEvent}>{editingId ? "Save Changes" : "Save Event"}</button>
          <button style={secondaryButton} onClick={cancelForm}>Cancel</button>
        </div>
      )}

      {[...events].sort((a, b) => String(a.date).localeCompare(String(b.date))).map((event) => (
        <div key={event.id} style={simpleCard}>
          <div style={{ flex: 1 }}>
            <strong style={blueText}>{event.title}</strong>
            <p style={cardText}>{formatDate(event.date)} · {event.time || "No time"}</p>
            <p style={phaseText}>{event.type} · {event.location || "No location"}</p>

            {event.notes && (
              <div style={notesBox}>
                <p style={smallLabel}>Notes</p>
                <p style={notesText}>{event.notes}</p>
              </div>
            )}

            <div style={actionRow}>
              <button style={editButton} onClick={() => editEvent(event)}>Edit</button>
              <button style={deleteButton} onClick={() => deleteEvent(event.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function FlightsTab({ flights, setFlights }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ aircraft: "", date: "", duration: "", type: "Orientation Flight" });
  const totalHours = flights.reduce((sum, f) => sum + (parseFloat(f.duration) || 0), 0).toFixed(1);

  function saveFlight() {
    if (!form.aircraft || !form.date) return;

    if (editingId) {
      setFlights(flights.map((flight) => flight.id === editingId ? { ...form, id: editingId } : flight));
    } else {
      setFlights([...flights, { ...form, id: Date.now() }]);
    }

    setForm({ aircraft: "", date: "", duration: "", type: "Orientation Flight" });
    setEditingId(null);
    setShowForm(false);
  }

  function editFlight(flight) {
    setForm({
      aircraft: flight.aircraft || "",
      date: flight.date || "",
      duration: flight.duration || "",
      type: flight.type || "Orientation Flight"
    });

    setEditingId(flight.id);
    setShowForm(true);
  }

  function deleteFlight(id) {
    setFlights(flights.filter((flight) => flight.id !== id));
  }

  function cancelForm() {
    setForm({ aircraft: "", date: "", duration: "", type: "Orientation Flight" });
    setEditingId(null);
    setShowForm(false);
  }

  return (
    <>
      <div style={hero}>
        <p style={eyebrow}>Orientation Flights</p>
        <h1 style={title}>Flight Log</h1>
        <p style={subtitle}>Track aircraft, dates, and flight hours.</p>
      </div>

      <div style={statsRow}>
        <div style={statCard}>
          <p style={statLabel}>Flights</p>
          <h2 style={statNumber}>{flights.length}</h2>
        </div>

        <div style={statCard}>
          <p style={statLabel}>Hours</p>
          <h2 style={statNumber}>{totalHours}</h2>
        </div>
      </div>

      {!showForm && <button style={primaryButton} onClick={() => setShowForm(true)}>+ Log Flight</button>}

      {showForm && (
        <div style={formCard}>
          <p style={smallLabel}>{editingId ? "Edit Flight" : "Log Flight"}</p>
          <input style={input} placeholder="Aircraft" value={form.aircraft} onChange={(e) => setForm({ ...form, aircraft: e.target.value })} />
          <input style={input} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <input style={input} type="number" step="0.1" placeholder="Duration hours" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />

          <select style={input} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option>Orientation Flight</option>
            <option>Glider Flight</option>
            <option>Powered Flight</option>
            <option>Simulator</option>
            <option>Other</option>
          </select>

          <button style={primaryButton} onClick={saveFlight}>{editingId ? "Save Changes" : "Save Flight"}</button>
          <button style={secondaryButton} onClick={cancelForm}>Cancel</button>
        </div>
      )}

      {[...flights].sort((a, b) => String(b.date).localeCompare(String(a.date))).map((flight) => (
        <div key={flight.id} style={simpleCard}>
          <div style={{ flex: 1 }}>
            <strong style={blueText}>{flight.aircraft}</strong>
            <p style={cardText}>{formatDate(flight.date)} · {flight.type}</p>
            <p style={phaseText}>{flight.duration || "0"} hrs</p>

            <div style={actionRow}>
              <button style={editButton} onClick={() => editFlight(flight)}>Edit</button>
              <button style={deleteButton} onClick={() => deleteFlight(flight.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function DocsTab({ completedIds, requirementChecks, events, flights, profile, restoreBackup, resetAppData }) {
  const [backupText, setBackupText] = useState("");

  function exportBackup() {
    const backup = {
      app: "CAP Cadet Hub",
      version: 3,
      exportedAt: new Date().toISOString(),
      completedIds,
      requirementChecks,
      events,
      flights,
      profile
    };

    const text = JSON.stringify(backup, null, 2);
    setBackupText(text);

    navigator.clipboard?.writeText(text).catch(() => {});
  }

  function importBackupFromText() {
    try {
      const parsed = JSON.parse(backupText);
      restoreBackup(parsed);
      alert("Backup restored.");
    } catch {
      alert("Could not read backup. Make sure the backup text is valid JSON.");
    }
  }

  return (
    <>
      <div style={hero}>
        <p style={eyebrow}>Official CAP Resources</p>
        <h1 style={title}>Docs</h1>
        <p style={subtitle}>Quick links, backup tools, and data safety.</p>
      </div>

      <div style={simpleCard}>
        <div>
          <strong style={blueText}>Data Backup</strong>
          <p style={cardText}>
            This app saves on this device using browser storage. Clearing Safari website data, deleting the home-screen app, or clearing cache can erase saved info.
          </p>
          <p style={phaseText}>Use Export Backup before clearing anything.</p>

          <button style={primaryButton} onClick={exportBackup}>Export Backup / Copy Data</button>

          <textarea
            style={textArea}
            placeholder="Backup data will appear here. Paste backup data here to restore."
            value={backupText}
            onChange={(e) => setBackupText(e.target.value)}
          />

          <button style={primaryButton} onClick={importBackupFromText}>Import / Restore Backup</button>
          <button style={dangerWideButton} onClick={resetAppData}>Reset App Data</button>
        </div>
      </div>

      <div style={simpleCard}>
        <div>
          <strong style={blueText}>Legal / Safety Note</strong>
          <p style={cardText}>
            This app is an unofficial tracker. Ribbon bars are simplified visual references based on the Cadet Super Chart image you provided.
          </p>
          <p style={phaseText}>
            Use official CAP resources for real records, tests, regulations, and award verification.
          </p>
        </div>
      </div>

      {DOCS.map((doc) => (
        <a key={doc.id} href={doc.url} target="_blank" rel="noreferrer" style={docCard}>
          <div>
            <strong style={blueText}>{doc.name}</strong>
            <p style={phaseText}>{doc.category}</p>
          </div>
          <span style={arrow}>↗</span>
        </a>
      ))}
    </>
  );
}

function getThemeVars(isDark) {
  return isDark
    ? {
        "--app-bg": "#020617",
        "--card-bg": "#0f172a",
        "--card-border": "#1e293b",
        "--text": "#f8fafc",
        "--muted": "#94a3b8",
        "--soft-bg": "#1e293b",
        "--soft-text": "#cbd5e1",
        "--shadow": "0 8px 22px rgba(0,0,0,0.35)"
      }
    : {
        "--app-bg": "#f9fafb",
        "--card-bg": "#ffffff",
        "--card-border": "#e5e7eb",
        "--text": "#111827",
        "--muted": "#6b7280",
        "--soft-bg": "#e5e7eb",
        "--soft-text": "#374151",
        "--shadow": "0 6px 16px rgba(0,0,0,0.05)"
      };
}

const page = { minHeight: "100vh", background: "var(--app-bg)", padding: "24px 24px 110px", color: "var(--text)" };
const container = { maxWidth: "430px", margin: "0 auto" };
const themeButton = { position: "fixed", top: "14px", right: "14px", zIndex: 20, border: "1px solid var(--card-border)", background: "var(--card-bg)", color: "var(--text)", borderRadius: "999px", padding: "9px 12px", fontWeight: "bold", fontSize: "13px", boxShadow: "var(--shadow)" };
const hero = { background: "linear-gradient(135deg, #1e3a8a, #2563eb)", color: "white", borderRadius: "24px", padding: "24px", marginBottom: "20px", boxShadow: "0 12px 30px rgba(37, 99, 235, 0.25)" };
const eyebrow = { margin: 0, fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", color: "#bfdbfe", fontWeight: "bold" };
const title = { margin: "8px 0 4px", fontSize: "30px" };
const subtitle = { margin: 0, color: "#dbeafe" };
const progressBox = { marginTop: "18px", background: "rgba(255,255,255,0.14)", borderRadius: "16px", padding: "14px" };
const progressHeader = { display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "8px" };
const progressHeaderDark = { display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "8px", color: "var(--text)" };
const progressBar = { height: "10px", background: "rgba(255,255,255,0.25)", borderRadius: "999px", overflow: "hidden" };
const progressFill = { height: "100%", background: "#facc15", borderRadius: "999px" };
const progressText = { margin: "8px 0 0", fontSize: "12px", color: "#dbeafe" };
const currentBox = { background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "18px", padding: "16px", marginBottom: "20px", boxShadow: "var(--shadow)", color: "var(--text)" };
const profileCard = { ...currentBox };
const profileName = { margin: "4px 0", color: "var(--text)" };
const goalText = { margin: "10px 0 0", color: "var(--muted)", fontSize: "14px", lineHeight: 1.4 };
const smallLabel = { margin: "0 0 6px", color: "#2563eb", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase" };
const sectionTitle = { color: "var(--text)", margin: "18px 0 12px" };
const card = { width: "100%", background: "var(--card-bg)", borderRadius: "18px", padding: "14px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "var(--shadow)", color: "var(--text)" };
const simpleCard = { width: "100%", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "18px", padding: "16px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "var(--shadow)", color: "var(--text)" };
const cardMainButton = { flex: 1, border: "none", background: "transparent", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--text)", padding: 0 };
const blueText = { color: "#0b82f0" };
const cardText = { margin: "6px 0 0", color: "var(--muted)", fontSize: "14px" };
const phaseText = { margin: "8px 0 0", color: "#2563eb", fontSize: "12px", fontWeight: "bold" };
const currentTag = { margin: "8px 0 0", color: "#ffffff", background: "#2563eb", display: "inline-block", padding: "4px 8px", borderRadius: "999px", fontSize: "11px", fontWeight: "bold" };
const doneTag = { margin: "8px 0 0", color: "#ffffff", background: "#22c55e", display: "inline-block", padding: "4px 8px", borderRadius: "999px", fontSize: "11px", fontWeight: "bold" };
const arrow = { fontSize: "32px", color: "#9ca3af" };
const backButton = { border: "none", background: "transparent", color: "#60a5fa", fontWeight: "bold", marginBottom: "12px", fontSize: "16px" };
const overview = { color: "var(--muted)", lineHeight: 1.5, marginBottom: "16px" };

const ribbonShell = {
  display: "flex",
  overflow: "hidden",
  border: "2px solid #d1d5db",
  borderRadius: "3px",
  margin: "0 0 10px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.22)",
  background: "#fff"
};

const noRibbonBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  border: "2px dashed #9ca3af",
  borderRadius: "3px",
  margin: "0 0 10px",
  background: "var(--soft-bg)",
  color: "var(--muted)",
  fontSize: "10px",
  fontWeight: "bold",
  textTransform: "uppercase"
};

const ribbonLabel = { margin: "0 0 8px", fontSize: "12px", fontWeight: "bold", color: "#dbeafe" };

function checkButton(done) {
  return {
    width: "34px",
    height: "34px",
    borderRadius: "999px",
    border: done ? "2px solid #22c55e" : "2px solid #94a3b8",
    background: done ? "#22c55e" : "var(--card-bg)",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    flexShrink: 0
  };
}

function detailCompleteButton(done) {
  return {
    marginTop: "16px",
    width: "100%",
    border: "none",
    borderRadius: "14px",
    padding: "12px",
    background: done ? "#22c55e" : "white",
    color: done ? "white" : "#1e3a8a",
    fontWeight: "bold"
  };
}

const requirementProgressBox = { background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "18px", padding: "16px", marginBottom: "16px", boxShadow: "var(--shadow)", color: "var(--text)" };
const progressBarLight = { height: "10px", background: "var(--soft-bg)", borderRadius: "999px", overflow: "hidden" };
const progressFillBlue = { height: "100%", background: "#2563eb", borderRadius: "999px" };
const requirementProgressText = { margin: "8px 0 0", fontSize: "12px", color: "var(--muted)" };

function requirementItem(checked) {
  return {
    width: "100%",
    background: checked ? "rgba(37, 99, 235, 0.14)" : "var(--card-bg)",
    border: checked ? "2px solid #2563eb" : "1px solid var(--card-border)",
    borderRadius: "14px",
    padding: "14px",
    marginBottom: "10px",
    color: "var(--text)",
    boxShadow: "var(--shadow)",
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    textAlign: "left"
  };
}

function requirementCircle(checked) {
  return {
    width: "26px",
    height: "26px",
    borderRadius: "999px",
    border: checked ? "2px solid #2563eb" : "2px solid #94a3b8",
    background: checked ? "#2563eb" : "var(--card-bg)",
    color: "white",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: "1px"
  };
}

function requirementText(checked) {
  return {
    color: checked ? "#60a5fa" : "var(--text)",
    textDecoration: checked ? "line-through" : "none",
    lineHeight: 1.4
  };
}

const bottomNav = { position: "fixed", left: "50%", bottom: "18px", transform: "translateX(-50%)", width: "calc(100% - 32px)", maxWidth: "430px", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "24px", padding: "8px", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "4px", boxShadow: "0 12px 30px rgba(0,0,0,0.25)", zIndex: 10 };
const navButton = { border: "none", background: "transparent", color: "var(--muted)", borderRadius: "16px", padding: "9px 1px", fontWeight: "bold", fontSize: "9px", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" };
const activeNavButton = { ...navButton, background: "rgba(37, 99, 235, 0.18)", color: "#60a5fa" };
const navIcon = { fontSize: "17px" };
const statsRow = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" };
const statCard = { background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "18px", padding: "16px", boxShadow: "var(--shadow)" };
const statLabel = { margin: 0, color: "var(--muted)", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase" };
const statNumber = { margin: "6px 0 0", color: "#60a5fa", fontSize: "34px" };
const input = { width: "100%", border: "1px solid var(--card-border)", background: "var(--app-bg)", color: "var(--text)", borderRadius: "12px", padding: "12px", marginBottom: "10px", fontSize: "15px" };
const textArea = { width: "100%", minHeight: "100px", border: "1px solid var(--card-border)", background: "var(--app-bg)", color: "var(--text)", borderRadius: "12px", padding: "12px", marginBottom: "10px", fontSize: "15px", resize: "vertical" };
const formCard = { background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "18px", padding: "16px", marginBottom: "16px", boxShadow: "var(--shadow)" };
const primaryButton = { width: "100%", border: "none", background: "#2563eb", color: "white", borderRadius: "14px", padding: "13px", fontWeight: "bold", marginBottom: "14px", fontSize: "15px" };
const secondaryButton = { width: "100%", border: "1px solid var(--card-border)", background: "var(--soft-bg)", color: "var(--soft-text)", borderRadius: "14px", padding: "13px", fontWeight: "bold", marginBottom: "4px", fontSize: "15px" };
const smallActionButton = { border: "none", background: "#2563eb", color: "white", borderRadius: "12px", padding: "10px 12px", fontWeight: "bold", marginTop: "12px" };
const actionRow = { display: "flex", gap: "8px", marginTop: "12px" };
const editButton = { border: "none", background: "#2563eb", color: "white", borderRadius: "10px", padding: "8px 12px", fontWeight: "bold", fontSize: "13px" };
const deleteButton = { border: "none", background: "#dc2626", color: "white", borderRadius: "10px", padding: "8px 12px", fontWeight: "bold", fontSize: "13px" };
const dangerWideButton = { width: "100%", border: "none", background: "#dc2626", color: "white", borderRadius: "14px", padding: "13px", fontWeight: "bold", marginBottom: "4px", fontSize: "15px" };
const dashboardProfileCard = { background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "18px", padding: "16px", marginBottom: "14px", boxShadow: "var(--shadow)", color: "var(--text)" };
const dashboardGrid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" };
const miniCard = { background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "18px", padding: "16px", boxShadow: "var(--shadow)", color: "var(--text)" };
const miniTitle = { margin: "8px 0 0", color: "#60a5fa", fontSize: "16px", lineHeight: 1.2 };
const miniNumber = { margin: "8px 0 0", color: "#60a5fa", fontSize: "34px" };
const quickButtonGrid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "14px" };
const quickButton = { border: "none", background: "#2563eb", color: "white", borderRadius: "16px", padding: "14px 10px", fontWeight: "bold", fontSize: "14px", boxShadow: "var(--shadow)" };
const drillGroup = { marginBottom: "20px" };
const commandCard = { background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "22px", padding: "18px", marginBottom: "16px", boxShadow: "var(--shadow)", color: "var(--text)" };
const commandBox = { background: "var(--soft-bg)", borderRadius: "16px", padding: "14px", margin: "12px 0", color: "var(--text)" };
const closeButton = { border: "none", background: "var(--soft-bg)", color: "var(--soft-text)", borderRadius: "999px", padding: "8px 12px", fontWeight: "bold", float: "right" };
const drillReferenceCard = { width: "100%", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "18px", padding: "14px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", boxShadow: "var(--shadow)", color: "var(--text)", textAlign: "left" };
const notesBox = { background: "var(--soft-bg)", borderRadius: "14px", padding: "12px", marginTop: "12px" };
const notesText = { margin: "4px 0 0", color: "var(--text)", fontSize: "14px", lineHeight: 1.45, whiteSpace: "pre-wrap" };
const listItem = { background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "14px", padding: "14px", marginBottom: "10px", color: "var(--text)", boxShadow: "var(--shadow)" };
const docCard = { width: "100%", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "18px", padding: "16px", marginBottom: "12px", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "var(--shadow)", color: "var(--text)", textDecoration: "none" };