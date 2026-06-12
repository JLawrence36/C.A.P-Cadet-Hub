import { useEffect, useMemo, useState } from "react";

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
  overview: `${a[0]} tracker for ${a[1]}.`,
  requirements: a[4],
  drill: a[5]
}));

const DRILL_LIBRARY = [
  {
    category: "Stationary Movements",
    items: [
      ["Attention", "Flight, ATTENTION", "Basic position of military bearing."],
      ["Parade Rest", "Parade, REST", "Disciplined rest position."],
      ["Present Arms", "Present, ARMS", "Render a salute."],
      ["Order Arms", "Order, ARMS", "Return from salute."],
      ["Right Face", "Right, FACE", "Turn 90 degrees right."],
      ["Left Face", "Left, FACE", "Turn 90 degrees left."],
      ["About Face", "About, FACE", "Turn 180 degrees."]
    ]
  },
  {
    category: "Marching Movements",
    items: [
      ["Forward March", "Forward, MARCH", "Move the flight forward in step."],
      ["Flight Halt", "Flight, HALT", "Stop the flight while marching."],
      ["Column Right", "Column Right, MARCH", "Turn the flight right while marching."],
      ["Column Left", "Column Left, MARCH", "Turn the flight left while marching."],
      ["To the Rear March", "To the Rear, MARCH", "Reverse direction of march."],
      ["Change Step March", "Change Step, MARCH", "Correct cadence without stopping."]
    ]
  },
  {
    category: "Flight Formation",
    items: [
      ["Fall In", "FALL IN", "Form the flight."],
      ["Dress Right Dress", "Dress Right, DRESS", "Align the flight."],
      ["Ready Front", "Ready, FRONT", "Return from alignment."],
      ["Open Ranks", "Open Ranks, MARCH", "Open formation for inspection."],
      ["Close Ranks", "Close Ranks, MARCH", "Return to normal formation."],
      ["Count Off", "Count, OFF", "Number cadets in formation."]
    ]
  },
  {
    category: "Drill Leadership",
    items: [
      ["Form the Flight", "FALL IN", "Take control and organize the flight."],
      ["Report to Commander", "Sir/Ma’am, flight is prepared for inspection", "Report flight status."],
      ["Give Commands", "Preparatory command + command of execution", "Lead cadets through movements."],
      ["Teach Junior Cadets", "Demonstrate, explain, practice, correct", "Train newer cadets."]
    ]
  }
];

const DEFAULT_PROFILE = {
  name: "Lawrence",
  capId: "",
  squadron: "CAP Squadron",
  joined: "2026-06-01",
  goal: "Earn Wright Brothers Award"
};

const CHECKLISTS = {
  uniform: [
    "Blues shirt",
    "Blues pants",
    "Belt and buckle",
    "Black dress shoes",
    "Black socks",
    "Nameplate",
    "Grade insignia",
    "Flight cap",
    "Undershirt",
    "Uniform is clean and pressed"
  ],
  field: [
    "Field uniform top",
    "Field uniform pants",
    "Boots",
    "Boot socks",
    "Belt",
    "Cover / cap",
    "Name tapes",
    "CAP tapes",
    "Grade insignia",
    "Water bottle"
  ],
  gear: [
    "Name tapes ordered",
    "Grade insignia ordered",
    "Blues items purchased",
    "Field uniform items purchased",
    "Shoes / boots ready",
    "PT gear ready",
    "Notebook and pen",
    "Haircut / grooming squared away",
    "Extra socks",
    "Laundry plan"
  ],
  encampment: [
    "Encampment application complete",
    "Parent forms complete",
    "Medical forms complete",
    "Packing list reviewed",
    "Uniforms inspected",
    "Boots broken in",
    "PT clothes packed",
    "Toiletries packed",
    "Water bottle packed",
    "Travel plan confirmed",
    "Emergency contact info ready",
    "Cadet understands expectations"
  ]
};

const DOCS = [
  { id: 1, name: "eServices Login", category: "Official Login", url: "https://www.capnhq.gov/" },
  { id: 2, name: "Parent / Guardian Portal", category: "Official Parent Portal", url: "https://www.gocivilairpatrol.com/programs/cadets/parents/parent-guardian-portal" },
  { id: 3, name: "Cadet Achievement Requirements", category: "Cadet Program", url: "https://www.gocivilairpatrol.com/programs/cadets/stripes-to-diamonds" },
  { id: 4, name: "Cadet Tests & Exams", category: "Testing", url: "https://www.gocivilairpatrol.com/programs/cadets/stripes-to-diamonds/cadet-tests--exams" },
  { id: 5, name: "Drill & Ceremonies Library", category: "Drill", url: "https://www.gocivilairpatrol.com/programs/cadets/library/drill" },
  { id: 6, name: "CAPP 60-33 Drill & Ceremonies", category: "Drill PDF", url: "https://www.gocivilairpatrol.com/media/cms/CAPP6020_5_AUG_16_07A0C6200BA4C.pdf" },
  { id: 7, name: "CAPP 60-34 Practical Drill Tests", category: "Drill Tests PDF", url: "https://www.gocivilairpatrol.com/media/cms/CAPP_6034_Sept_24_3e0cc652c818b.pdf" },
  { id: 8, name: "Vanguard Civil Air Patrol Store", category: "Uniforms / Insignia / CAP Gear", url: "https://www.vanguardmil.com/pages/cap-landing-page-insignia" }
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

function saveTextFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
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

function addWeeks(date, weeks) {
  const d = new Date(date);
  d.setDate(d.getDate() + weeks * 7);
  return d.toISOString().slice(0, 10);
}

function getCurrentCadetRank(completedIds) {
  if (!completedIds || completedIds.length === 0) return { rank: "Cadet Recruit", abbr: "C/Rec" };
  const highestCompletedId = Math.max(...completedIds);
  const achievement = ACHIEVEMENTS.find((a) => a.id === highestCompletedId);
  return achievement ? { rank: achievement.rank, abbr: achievement.abbr } : { rank: "Cadet Recruit", abbr: "C/Rec" };
}

function formatCadetDisplayName(name, currentCadetRank) {
  const cleanedName = String(name || "Cadet")
    .replace(/^cadet\s+/i, "")
    .replace(/^c\/[a-z0-9]+\s+/i, "")
    .trim();

  return `${currentCadetRank.abbr} ${cleanedName || "Cadet"}`;
}

function getNextStep(currentAchievement, requirementChecks) {
  if (!currentAchievement) return "All achievements are complete.";

  for (let i = 0; i < currentAchievement.requirements.length; i++) {
    if (!requirementChecks[`${currentAchievement.id}-${i}`]) {
      return `Complete: ${currentAchievement.requirements[i]}`;
    }
  }

  for (let i = 0; i < currentAchievement.drill.length; i++) {
    if (!requirementChecks[`drill-${currentAchievement.id}-${i}`]) {
      return `Drill: ${currentAchievement.drill[i]}`;
    }
  }

  return "Mark this achievement complete.";
}

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selected, setSelected] = useState(null);
  const [completedIds, setCompletedIds] = useState(() => loadSaved("cap_completed_ids", []));
  const [requirementChecks, setRequirementChecks] = useState(() => loadSaved("cap_requirement_checks", {}));
  const [theme, setTheme] = useState(() => localStorage.getItem("cap_theme") || "light");
  const [events, setEvents] = useState(() => loadSaved("cap_events", []));
  const [flights, setFlights] = useState(() => loadSaved("cap_flights", []));
  const [profile, setProfile] = useState(() => loadSaved("cap_profile", DEFAULT_PROFILE));
  const [parentNotes, setParentNotes] = useState(() => loadSaved("cap_parent_notes", {}));
  const [attendance, setAttendance] = useState(() => loadSaved("cap_attendance", []));
  const [fitness, setFitness] = useState(() => loadSaved("cap_fitness", []));
  const [checklists, setChecklists] = useState(() => loadSaved("cap_checklists", {}));
  const [search, setSearch] = useState("");

  useEffect(() => localStorage.setItem("cap_completed_ids", JSON.stringify(completedIds)), [completedIds]);
  useEffect(() => localStorage.setItem("cap_requirement_checks", JSON.stringify(requirementChecks)), [requirementChecks]);
  useEffect(() => localStorage.setItem("cap_theme", theme), [theme]);
  useEffect(() => localStorage.setItem("cap_events", JSON.stringify(events)), [events]);
  useEffect(() => localStorage.setItem("cap_flights", JSON.stringify(flights)), [flights]);
  useEffect(() => localStorage.setItem("cap_profile", JSON.stringify(profile)), [profile]);
  useEffect(() => localStorage.setItem("cap_parent_notes", JSON.stringify(parentNotes)), [parentNotes]);
  useEffect(() => localStorage.setItem("cap_attendance", JSON.stringify(attendance)), [attendance]);
  useEffect(() => localStorage.setItem("cap_fitness", JSON.stringify(fitness)), [fitness]);
  useEffect(() => localStorage.setItem("cap_checklists", JSON.stringify(checklists)), [checklists]);

  const validCompletedIds = completedIds.filter((id) => ACHIEVEMENTS.some((a) => a.id === id));
  const completedCount = validCompletedIds.length;
  const progress = Math.round((completedCount / ACHIEVEMENTS.length) * 100);
  const isDark = theme === "dark";
  const currentAchievement = ACHIEVEMENTS.find((a) => !validCompletedIds.includes(a.id)) || ACHIEVEMENTS[ACHIEVEMENTS.length - 1];
  const currentCadetRank = getCurrentCadetRank(validCompletedIds);
  const nextStep = getNextStep(currentAchievement, requirementChecks);

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();

    const achievementHits = ACHIEVEMENTS.filter((a) =>
      [a.name, a.rank, a.abbr, a.phase, ...a.requirements, ...a.drill].join(" ").toLowerCase().includes(q)
    ).map((a) => ({ type: "Achievement", title: a.name, subtitle: `${a.rank} · ${a.phase}`, item: a }));

    const drillHits = DRILL_LIBRARY.flatMap((group) =>
      group.items
        .filter((item) => item.join(" ").toLowerCase().includes(q))
        .map((item) => ({ type: "Drill", title: item[0], subtitle: `${group.category} · ${item[1]}` }))
    );

    const docHits = DOCS.filter((doc) =>
      [doc.name, doc.category].join(" ").toLowerCase().includes(q)
    ).map((doc) => ({ type: "Doc", title: doc.name, subtitle: doc.category, url: doc.url }));

    return [...achievementHits, ...drillHits, ...docHits].slice(0, 12);
  }, [search]);

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

  function toggleChecklist(category, item) {
    const key = `${category}-${item}`;
    setChecklists((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function resetAppData() {
    const confirmed = window.confirm("Reset all saved cadet data on this device?");
    if (!confirmed) return;

    [
      "cap_completed_ids",
      "cap_requirement_checks",
      "cap_events",
      "cap_flights",
      "cap_profile",
      "cap_parent_notes",
      "cap_attendance",
      "cap_fitness",
      "cap_checklists"
    ].forEach((key) => localStorage.removeItem(key));

    setCompletedIds([]);
    setRequirementChecks({});
    setEvents([]);
    setFlights([]);
    setProfile(DEFAULT_PROFILE);
    setParentNotes({});
    setAttendance([]);
    setFitness([]);
    setChecklists({});
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
    setParentNotes(data.parentNotes && typeof data.parentNotes === "object" ? data.parentNotes : {});
    setAttendance(Array.isArray(data.attendance) ? data.attendance : []);
    setFitness(Array.isArray(data.fitness) ? data.fitness : []);
    setChecklists(data.checklists && typeof data.checklists === "object" ? data.checklists : {});
    setSelected(null);
    setActiveTab("dashboard");
  }

  function exportParentReport() {
    const report = buildParentReport({
      profile,
      currentCadetRank,
      currentAchievement,
      nextStep,
      completedCount,
      progress,
      events,
      attendance,
      fitness,
      parentNotes
    });

    saveTextFile("cap-cadet-parent-report.txt", report);
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
            parentNotes={parentNotes}
            setParentNotes={setParentNotes}
          />
        ) : (
          <>
            <SearchBox search={search} setSearch={setSearch} results={searchResults} setSelected={setSelected} />

            {activeTab === "dashboard" && (
              <DashboardTab
                profile={profile}
                currentCadetRank={currentCadetRank}
                progress={progress}
                currentAchievement={currentAchievement}
                completedCount={completedCount}
                events={events}
                flights={flights}
                nextStep={nextStep}
                setActiveTab={setActiveTab}
                exportParentReport={exportParentReport}
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
                requirementChecks={requirementChecks}
              />
            )}

            {activeTab === "drill" && <DrillTab />}
            {activeTab === "events" && <EventsTab events={events} setEvents={setEvents} />}
            {activeTab === "tools" && (
              <ToolsTab
                flights={flights}
                setFlights={setFlights}
                attendance={attendance}
                setAttendance={setAttendance}
                fitness={fitness}
                setFitness={setFitness}
                checklists={checklists}
                toggleChecklist={toggleChecklist}
                profile={profile}
                completedCount={completedCount}
              />
            )}
            {activeTab === "docs" && (
              <DocsTab
                completedIds={validCompletedIds}
                requirementChecks={requirementChecks}
                events={events}
                flights={flights}
                profile={profile}
                parentNotes={parentNotes}
                attendance={attendance}
                fitness={fitness}
                checklists={checklists}
                restoreBackup={restoreBackup}
                resetAppData={resetAppData}
                exportParentReport={exportParentReport}
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
            ["events", "📅", "Events"],
            ["tools", "🧰", "Tools"],
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

function SearchBox({ search, setSearch, results, setSelected }) {
  return (
    <div style={searchWrap}>
      <input
        style={searchInput}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search ranks, drill, docs..."
      />

      {results.length > 0 && (
        <div style={searchResultsBox}>
          {results.map((result, index) => (
            <button
              key={index}
              style={searchResult}
              onClick={() => {
                if (result.item) setSelected(result.item);
                if (result.url) window.open(result.url, "_blank");
                setSearch("");
              }}
            >
              <strong>{result.title}</strong>
              <span>{result.type} · {result.subtitle}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function DashboardTab({ profile, currentCadetRank, progress, currentAchievement, completedCount, events, flights, nextStep, setActiveTab, exportParentReport }) {
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

      <div style={simpleCard}>
        <div>
          <p style={smallLabel}>Next Step</p>
          <strong style={blueText}>{currentAchievement.name}</strong>
          <p style={cardText}>{nextStep}</p>
        </div>
      </div>

      <div style={dashboardGrid}>
        <div style={miniCard}>
          <p style={statLabel}>Target</p>
          <h3 style={miniTitle}>{currentAchievement.rank}</h3>
          <p style={cardText}>{currentAchievement.abbr}</p>
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
            </>
          ) : (
            <>
              <strong style={blueText}>No events added</strong>
              <p style={cardText}>Add the next squadron meeting or activity.</p>
            </>
          )}
        </div>
      </div>

      <TimelineCard profile={profile} completedCount={completedCount} />

      <div style={quickButtonGrid}>
        <button style={quickButton} onClick={() => setActiveTab("rank")}>⭐ View Ranks</button>
        <button style={quickButton} onClick={() => setActiveTab("tools")}>🧰 Checklists</button>
        <button style={quickButton} onClick={() => setActiveTab("events")}>📅 Add Event</button>
        <button style={quickButton} onClick={exportParentReport}>📝 Export Report</button>
      </div>
    </>
  );
}

function TimelineCard({ profile, completedCount }) {
  const startDate = profile.joined && profile.joined.includes("-") ? profile.joined : new Date().toISOString().slice(0, 10);
  const timeline = ACHIEVEMENTS.slice(completedCount, completedCount + 5).map((a, index) => ({
    name: a.name,
    rank: a.rank,
    date: addWeeks(new Date(), index * 8)
  }));

  return (
    <div style={simpleCard}>
      <div style={{ flex: 1 }}>
        <p style={smallLabel}>Promotion Timeline</p>
        <p style={cardText}>Estimated using 8-week minimum windows. Actual timing depends on CAP requirements and squadron approval.</p>
        <p style={phaseText}>Joined: {formatDate(startDate)}</p>

        {timeline.map((item) => (
          <div key={item.name} style={timelineItem}>
            <strong>{item.name}</strong>
            <span>{formatDate(item.date)} · {item.rank}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RankTab({ profile, currentCadetRank, setProfile, onSelect, completedIds, toggleCompleted, progress, currentAchievement, completedCount, requirementChecks }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);
  const nextStep = getNextStep(currentAchievement, requirementChecks);

  function saveProfile() {
    setProfile(form);
    setEditing(false);
  }

  return (
    <>
      <div style={hero}>
        <p style={eyebrow}>Civil Air Patrol Companion</p>
        <h1 style={title}>Rank Tracker</h1>
        <p style={subtitle}>Track requirements, drill, notes, and promotion progress.</p>

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
            <p style={phaseText}>Joined: {formatDate(profile.joined)}</p>
            <p style={goalText}>Goal: {profile.goal}</p>
            <button style={smallActionButton} onClick={() => { setForm(profile); setEditing(true); }}>Edit Profile</button>
          </>
        ) : (
          <>
            <p style={smallLabel}>Edit Profile</p>
            <input style={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Last name only, example: Lawrence" />
            <input style={input} value={form.capId || ""} onChange={(e) => setForm({ ...form, capId: e.target.value })} placeholder="CAP ID only — never password" />
            <input style={input} value={form.squadron} onChange={(e) => setForm({ ...form, squadron: e.target.value })} placeholder="Squadron" />
            <input style={input} type="date" value={form.joined} onChange={(e) => setForm({ ...form, joined: e.target.value })} />
            <input style={input} value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} placeholder="Goal" />
            <button style={smallActionButton} onClick={saveProfile}>Save</button>
          </>
        )}
      </div>

      <div style={currentBox}>
        <p style={smallLabel}>Current Target</p>
        <strong>{currentAchievement.name}</strong>
        <p style={cardText}>{currentAchievement.rank} · {currentAchievement.abbr}</p>
        <p style={phaseText}>{nextStep}</p>
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
                <strong style={blueText}>{achievement.name}</strong>
                <p style={cardText}>{achievement.rank} · {achievement.abbr}</p>
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

function AchievementDetail({ selected, onBack, completedIds, toggleCompleted, requirementChecks, toggleRequirement, parentNotes, setParentNotes }) {
  const done = completedIds.includes(selected.id);
  const checkedRequirements = selected.requirements.filter((_, i) => requirementChecks[`${selected.id}-${i}`]).length;
  const checkedDrill = selected.drill.filter((_, i) => requirementChecks[`drill-${selected.id}-${i}`]).length;
  const totalItems = selected.requirements.length + selected.drill.length;
  const checkedTotal = checkedRequirements + checkedDrill;
  const awardProgress = Math.round((checkedTotal / totalItems) * 100);
  const note = parentNotes[selected.id] || "";

  return (
    <>
      <button style={backButton} onClick={onBack}>← Back</button>

      <div style={hero}>
        <p style={eyebrow}>{selected.phase}</p>
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

      <div style={formCard}>
        <p style={smallLabel}>Parent Notes</p>
        <textarea
          style={textArea}
          value={note}
          onChange={(e) => setParentNotes({ ...parentNotes, [selected.id]: e.target.value })}
          placeholder="Example: Needs help with oath, ask senior cadet about drill test, needs uniform item..."
        />
      </div>
    </>
  );
}

function DrillTab() {
  const [selectedMovement, setSelectedMovement] = useState(null);

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
        </div>
      ) : (
        <>
          {DRILL_LIBRARY.map((group) => (
            <div key={group.category} style={drillGroup}>
              <h2 style={sectionTitle}>{group.category}</h2>

              {group.items.map((item) => (
                <button
                  key={`${group.category}-${item[0]}`}
                  style={drillReferenceCard}
                  onClick={() => setSelectedMovement({ category: group.category, name: item[0], command: item[1], purpose: item[2] })}
                >
                  <div>
                    <strong style={blueText}>{item[0]}</strong>
                    <p style={cardText}>{item[1]}</p>
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

function EventsTab({ events, setEvents }) {
  return (
    <>
      <div style={hero}>
        <p style={eyebrow}>Calendar</p>
        <h1 style={title}>Events</h1>
        <p style={subtitle}>Track meetings, activities, training, and notes.</p>
      </div>

      <EventForm events={events} setEvents={setEvents} />

      {[...events].sort((a, b) => String(a.date).localeCompare(String(b.date))).map((event) => (
        <div key={event.id} style={simpleCard}>
          <div style={{ flex: 1 }}>
            <strong style={blueText}>{event.title}</strong>
            <p style={cardText}>{formatDate(event.date)} · {event.time || "No time"}</p>
            <p style={phaseText}>{event.type} · {event.location || "No location"}</p>
            {event.notes && <p style={notesText}>{event.notes}</p>}
            <button style={deleteButton} onClick={() => setEvents(events.filter((e) => e.id !== event.id))}>Delete</button>
          </div>
        </div>
      ))}
    </>
  );
}

function EventForm({ events, setEvents }) {
  const [form, setForm] = useState({ title: "", date: "", time: "", location: "", type: "Meeting", notes: "" });

  function saveEvent() {
    if (!form.title || !form.date) return;
    setEvents([...events, { ...form, id: Date.now() }]);
    setForm({ title: "", date: "", time: "", location: "", type: "Meeting", notes: "" });
  }

  return (
    <div style={formCard}>
      <p style={smallLabel}>Add Event</p>
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
      <textarea style={textArea} placeholder="Notes..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      <button style={primaryButton} onClick={saveEvent}>Save Event</button>
    </div>
  );
}

function ToolsTab({ flights, setFlights, attendance, setAttendance, fitness, setFitness, checklists, toggleChecklist, profile, completedCount }) {
  return (
    <>
      <div style={hero}>
        <p style={eyebrow}>Parent Tools</p>
        <h1 style={title}>Tools</h1>
        <p style={subtitle}>Uniforms, gear, encampment, attendance, fitness, and flights.</p>
      </div>

      <ChecklistCard title="Blues Uniform Checklist" category="uniform" items={CHECKLISTS.uniform} checklists={checklists} toggleChecklist={toggleChecklist} />
      <ChecklistCard title="Field Uniform Checklist" category="field" items={CHECKLISTS.field} checklists={checklists} toggleChecklist={toggleChecklist} />
      <ChecklistCard title="Gear / Buy List" category="gear" items={CHECKLISTS.gear} checklists={checklists} toggleChecklist={toggleChecklist} />
      <ChecklistCard title="Encampment Prep Checklist" category="encampment" items={CHECKLISTS.encampment} checklists={checklists} toggleChecklist={toggleChecklist} />

      <AttendanceLog attendance={attendance} setAttendance={setAttendance} />
      <FitnessLog fitness={fitness} setFitness={setFitness} />
      <FlightLog flights={flights} setFlights={setFlights} />
      <TimelineCard profile={profile} completedCount={completedCount} />
    </>
  );
}

function ChecklistCard({ title, category, items, checklists, toggleChecklist }) {
  const done = items.filter((item) => checklists[`${category}-${item}`]).length;
  const percent = Math.round((done / items.length) * 100);

  return (
    <div style={formCard}>
      <p style={smallLabel}>{title}</p>
      <div style={progressBarLight}>
        <div style={{ ...progressFillBlue, width: `${percent}%` }} />
      </div>
      <p style={cardText}>{done} of {items.length} complete</p>

      {items.map((item) => {
        const checked = !!checklists[`${category}-${item}`];

        return (
          <button key={item} style={requirementItem(checked)} onClick={() => toggleChecklist(category, item)}>
            <span style={requirementCircle(checked)}>{checked ? "✓" : ""}</span>
            <span style={requirementText(checked)}>{item}</span>
          </button>
        );
      })}
    </div>
  );
}

function AttendanceLog({ attendance, setAttendance }) {
  const [form, setForm] = useState({ date: "", type: "Meeting", attended: "Yes", notes: "" });

  function add() {
    if (!form.date) return;
    setAttendance([{ ...form, id: Date.now() }, ...attendance]);
    setForm({ date: "", type: "Meeting", attended: "Yes", notes: "" });
  }

  return (
    <div style={formCard}>
      <p style={smallLabel}>Attendance Log</p>
      <input style={input} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
      <select style={input} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
        <option>Meeting</option>
        <option>PT</option>
        <option>Activity</option>
        <option>Training</option>
        <option>Other</option>
      </select>
      <select style={input} value={form.attended} onChange={(e) => setForm({ ...form, attended: e.target.value })}>
        <option>Yes</option>
        <option>No</option>
      </select>
      <textarea style={textArea} placeholder="Notes..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      <button style={primaryButton} onClick={add}>Add Attendance</button>

      {attendance.slice(0, 8).map((item) => (
        <div key={item.id} style={listItem}>
          <strong>{formatDate(item.date)} · {item.attended}</strong>
          <p style={cardText}>{item.type}</p>
          {item.notes && <p style={notesText}>{item.notes}</p>}
          <button style={deleteButton} onClick={() => setAttendance(attendance.filter((x) => x.id !== item.id))}>Delete</button>
        </div>
      ))}
    </div>
  );
}

function FitnessLog({ fitness, setFitness }) {
  const [form, setForm] = useState({ date: "", run: "", pushups: "", curlups: "", sitReach: "", hfz: "Unknown", notes: "" });

  function add() {
    if (!form.date) return;
    setFitness([{ ...form, id: Date.now() }, ...fitness]);
    setForm({ date: "", run: "", pushups: "", curlups: "", sitReach: "", hfz: "Unknown", notes: "" });
  }

  return (
    <div style={formCard}>
      <p style={smallLabel}>CPFT / Fitness Tracker</p>
      <input style={input} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
      <input style={input} placeholder="Mile run / shuttle / event time" value={form.run} onChange={(e) => setForm({ ...form, run: e.target.value })} />
      <input style={input} placeholder="Pushups" value={form.pushups} onChange={(e) => setForm({ ...form, pushups: e.target.value })} />
      <input style={input} placeholder="Curl-ups / sit-ups" value={form.curlups} onChange={(e) => setForm({ ...form, curlups: e.target.value })} />
      <input style={input} placeholder="Sit and reach" value={form.sitReach} onChange={(e) => setForm({ ...form, sitReach: e.target.value })} />
      <select style={input} value={form.hfz} onChange={(e) => setForm({ ...form, hfz: e.target.value })}>
        <option>Unknown</option>
        <option>HFZ Met</option>
        <option>Needs Work</option>
      </select>
      <textarea style={textArea} placeholder="Notes..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      <button style={primaryButton} onClick={add}>Add Fitness Entry</button>

      {fitness.slice(0, 8).map((item) => (
        <div key={item.id} style={listItem}>
          <strong>{formatDate(item.date)} · {item.hfz}</strong>
          <p style={cardText}>Run: {item.run || "—"} · Pushups: {item.pushups || "—"} · Curl-ups: {item.curlups || "—"}</p>
          {item.notes && <p style={notesText}>{item.notes}</p>}
          <button style={deleteButton} onClick={() => setFitness(fitness.filter((x) => x.id !== item.id))}>Delete</button>
        </div>
      ))}
    </div>
  );
}

function FlightLog({ flights, setFlights }) {
  const [form, setForm] = useState({ aircraft: "", date: "", duration: "", type: "Orientation Flight" });
  const totalHours = flights.reduce((sum, f) => sum + (parseFloat(f.duration) || 0), 0).toFixed(1);

  function add() {
    if (!form.aircraft || !form.date) return;
    setFlights([{ ...form, id: Date.now() }, ...flights]);
    setForm({ aircraft: "", date: "", duration: "", type: "Orientation Flight" });
  }

  return (
    <div style={formCard}>
      <p style={smallLabel}>Flight Log</p>
      <p style={cardText}>{flights.length} flights · {totalHours} total hours</p>
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
      <button style={primaryButton} onClick={add}>Log Flight</button>

      {flights.slice(0, 8).map((flight) => (
        <div key={flight.id} style={listItem}>
          <strong>{flight.aircraft}</strong>
          <p style={cardText}>{formatDate(flight.date)} · {flight.type} · {flight.duration || "0"} hrs</p>
          <button style={deleteButton} onClick={() => setFlights(flights.filter((x) => x.id !== flight.id))}>Delete</button>
        </div>
      ))}
    </div>
  );
}

function DocsTab({ completedIds, requirementChecks, events, flights, profile, parentNotes, attendance, fitness, checklists, restoreBackup, resetAppData, exportParentReport }) {
  const [backupText, setBackupText] = useState("");

  function exportBackup() {
    const backup = {
      app: "CAP Cadet Hub",
      version: 6,
      exportedAt: new Date().toISOString(),
      completedIds,
      requirementChecks,
      events,
      flights,
      profile,
      parentNotes,
      attendance,
      fitness,
      checklists
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
        <p style={subtitle}>Links, backup, reports, and data safety.</p>
      </div>

      <div style={simpleCard}>
        <div>
          <strong style={blueText}>Reports & Backup</strong>
          <p style={cardText}>Export a parent report or save all app data as backup text.</p>
          <button style={primaryButton} onClick={exportParentReport}>Export Parent Report</button>
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
            This app is an unofficial parent/cadet tracker. It does not connect to CAP eServices and does not store login credentials.
          </p>
          <p style={phaseText}>
            Use official CAP resources for real records, testing, regulations, awards, uniforms, and account access.
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

function buildParentReport({ profile, currentCadetRank, currentAchievement, nextStep, completedCount, progress, events, attendance, fitness, parentNotes }) {
  const recentEvents = events.slice(0, 5).map((e) => `- ${formatDate(e.date)}: ${e.title} (${e.type})`).join("\n") || "- No events logged";
  const recentAttendance = attendance.slice(0, 5).map((a) => `- ${formatDate(a.date)}: ${a.type} · Attended: ${a.attended}`).join("\n") || "- No attendance logged";
  const recentFitness = fitness.slice(0, 5).map((f) => `- ${formatDate(f.date)}: ${f.hfz} · Run: ${f.run || "—"} · Pushups: ${f.pushups || "—"}`).join("\n") || "- No fitness entries logged";

  const notes = Object.entries(parentNotes)
    .filter(([, value]) => value && value.trim())
    .map(([id, value]) => {
      const achievement = ACHIEVEMENTS.find((a) => a.id === Number(id));
      return `- ${achievement?.name || "Achievement"}: ${value}`;
    }).join("\n") || "- No parent notes";

  return `CAP Cadet Parent Report

Cadet: ${formatCadetDisplayName(profile.name, currentCadetRank)}
CAP ID: ${profile.capId || "Not entered"}
Squadron: ${profile.squadron}
Goal: ${profile.goal}

Progress:
- Completed: ${completedCount} of ${ACHIEVEMENTS.length}
- Overall: ${progress}%
- Current target: ${currentAchievement.name}
- Next step: ${nextStep}

Upcoming / Recent Events:
${recentEvents}

Attendance:
${recentAttendance}

Fitness:
${recentFitness}

Parent Notes:
${notes}

Generated: ${new Date().toLocaleString()}
`;
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
const searchWrap = { position: "relative", marginBottom: "14px" };
const searchInput = { width: "100%", border: "1px solid var(--card-border)", background: "var(--card-bg)", color: "var(--text)", borderRadius: "16px", padding: "13px", fontSize: "15px", boxShadow: "var(--shadow)" };
const searchResultsBox = { position: "absolute", zIndex: 30, top: "52px", left: 0, right: 0, background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "16px", overflow: "hidden", boxShadow: "var(--shadow)" };
const searchResult = { width: "100%", border: "none", background: "transparent", color: "var(--text)", padding: "12px", textAlign: "left", display: "flex", flexDirection: "column", gap: "3px" };
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
const requirementProgressBox = { background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "18px", padding: "16px", marginBottom: "16px", boxShadow: "var(--shadow)", color: "var(--text)" };
const progressBarLight = { height: "10px", background: "var(--soft-bg)", borderRadius: "999px", overflow: "hidden" };
const progressFillBlue = { height: "100%", background: "#2563eb", borderRadius: "999px" };
const requirementProgressText = { margin: "8px 0 0", fontSize: "12px", color: "var(--muted)" };
const bottomNav = { position: "fixed", left: "50%", bottom: "18px", transform: "translateX(-50%)", width: "calc(100% - 32px)", maxWidth: "430px", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "24px", padding: "8px", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "4px", boxShadow: "0 12px 30px rgba(0,0,0,0.25)", zIndex: 10 };
const navButton = { border: "none", background: "transparent", color: "var(--muted)", borderRadius: "16px", padding: "9px 1px", fontWeight: "bold", fontSize: "9px", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" };
const activeNavButton = { ...navButton, background: "rgba(37, 99, 235, 0.18)", color: "#60a5fa" };
const navIcon = { fontSize: "17px" };
const input = { width: "100%", border: "1px solid var(--card-border)", background: "var(--app-bg)", color: "var(--text)", borderRadius: "12px", padding: "12px", marginBottom: "10px", fontSize: "15px" };
const textArea = { width: "100%", minHeight: "100px", border: "1px solid var(--card-border)", background: "var(--app-bg)", color: "var(--text)", borderRadius: "12px", padding: "12px", marginBottom: "10px", fontSize: "15px", resize: "vertical" };
const formCard = { background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "18px", padding: "16px", marginBottom: "16px", boxShadow: "var(--shadow)" };
const primaryButton = { width: "100%", border: "none", background: "#2563eb", color: "white", borderRadius: "14px", padding: "13px", fontWeight: "bold", marginBottom: "14px", fontSize: "15px" };
const secondaryButton = { width: "100%", border: "1px solid var(--card-border)", background: "var(--soft-bg)", color: "var(--soft-text)", borderRadius: "14px", padding: "13px", fontWeight: "bold", marginBottom: "4px", fontSize: "15px" };
const smallActionButton = { border: "none", background: "#2563eb", color: "white", borderRadius: "12px", padding: "10px 12px", fontWeight: "bold", marginTop: "12px" };
const deleteButton = { border: "none", background: "#dc2626", color: "white", borderRadius: "10px", padding: "8px 12px", fontWeight: "bold", fontSize: "13px", marginTop: "10px" };
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
const notesText = { margin: "8px 0 0", color: "var(--text)", fontSize: "14px", lineHeight: 1.45, whiteSpace: "pre-wrap" };
const listItem = { background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "14px", padding: "14px", marginBottom: "10px", color: "var(--text)", boxShadow: "var(--shadow)" };
const docCard = { width: "100%", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "18px", padding: "16px", marginBottom: "12px", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "var(--shadow)", color: "var(--text)", textDecoration: "none" };
const timelineItem = { display: "flex", flexDirection: "column", gap: "3px", marginTop: "12px", padding: "10px", borderRadius: "12px", background: "var(--soft-bg)", color: "var(--text)" };

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