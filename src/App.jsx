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
].map((item, index) => ({
  id: index + 1,
  name: item[0],
  rank: item[1],
  abbr: item[2],
  phase: item[3],
  requirements: item[4],
  drill: item[5],
  overview: `${item[0]} tracker for ${item[1]}.`
}));

const DRILL_GROUPS = [
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
      ["To the Rear March", "To the Rear, MARCH", "Reverse direction."],
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
    category: "Leadership",
    items: [
      ["Form the Flight", "FALL IN", "Take control and organize the flight."],
      ["Report to Commander", "Sir/Ma’am, flight is prepared for inspection", "Report flight status."],
      ["Give Commands", "Preparatory command + command of execution", "Lead cadets through movements."],
      ["Teach Junior Cadets", "Demonstrate, explain, practice, correct", "Train newer cadets."]
    ]
  }
];

const CHECKLISTS = {
  blues: ["Blues shirt", "Blues pants", "Belt and buckle", "Black dress shoes", "Black socks", "Nameplate", "Grade insignia", "Flight cap", "Undershirt", "Uniform clean and pressed"],
  field: ["Field uniform top", "Field uniform pants", "Boots", "Boot socks", "Belt", "Cover / cap", "Name tapes", "CAP tapes", "Grade insignia", "Water bottle"],
  gear: ["Name tapes ordered", "Grade insignia ordered", "Blues items purchased", "Field uniform items purchased", "Shoes or boots ready", "PT gear ready", "Notebook and pen", "Haircut / grooming squared away", "Laundry plan"],
  encampment: ["Application complete", "Parent forms complete", "Medical forms complete", "Packing list reviewed", "Uniforms inspected", "Boots broken in", "PT clothes packed", "Toiletries packed", "Water bottle packed", "Travel plan confirmed", "Emergency contact info ready"]
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

const DEFAULT_PROFILE = {
  name: "Lawrence",
  capId: "",
  squadron: "CAP Squadron",
  joined: "2026-06-01",
  goal: "Earn Wright Brothers Award"
};

function loadSaved(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null || raw === undefined) return fallback;
    return JSON.parse(raw);
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

function addWeeks(dateValue, weeks) {
  const base = dateValue ? new Date(dateValue) : new Date();
  if (Number.isNaN(base.getTime())) return "";
  base.setDate(base.getDate() + weeks * 7);
  return base.toISOString().slice(0, 10);
}

function getCurrentCadetRank(completedIds) {
  if (!completedIds || completedIds.length === 0) return { rank: "Cadet Recruit", abbr: "C/Rec" };
  const highest = Math.max(...completedIds);
  const achievement = ACHIEVEMENTS.find((item) => item.id === highest);
  return achievement ? { rank: achievement.rank, abbr: achievement.abbr } : { rank: "Cadet Recruit", abbr: "C/Rec" };
}

function formatCadetName(name, rank) {
  const clean = String(name || "Cadet")
    .replace(/^cadet\s+/i, "")
    .replace(/^c\/[a-z0-9]+\s+/i, "")
    .trim();

  return `${rank.abbr} ${clean || "Cadet"}`;
}

function getNextStep(achievement, checks) {
  if (!achievement) return "All achievements complete.";

  for (let i = 0; i < achievement.requirements.length; i++) {
    if (!checks[`${achievement.id}-req-${i}`]) return `Complete: ${achievement.requirements[i]}`;
  }

  for (let i = 0; i < achievement.drill.length; i++) {
    if (!checks[`${achievement.id}-drill-${i}`]) return `Drill: ${achievement.drill[i]}`;
  }

  return "Ready to mark complete.";
}

function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function App() {
  const [tab, setTab] = useState("home");
  const [selected, setSelected] = useState(null);
  const [dark, setDark] = useState(() => loadSaved("cap_dark", false));
  const [profile, setProfile] = useState(() => loadSaved("cap_profile", DEFAULT_PROFILE));
  const [completedIds, setCompletedIds] = useState(() => loadSaved("cap_completed_ids", []));
  const [checks, setChecks] = useState(() => loadSaved("cap_checks", {}));
  const [events, setEvents] = useState(() => loadSaved("cap_events", []));
  const [flights, setFlights] = useState(() => loadSaved("cap_flights", []));
  const [attendance, setAttendance] = useState(() => loadSaved("cap_attendance", []));
  const [fitness, setFitness] = useState(() => loadSaved("cap_fitness", []));
  const [notes, setNotes] = useState(() => loadSaved("cap_notes", {}));
  const [listChecks, setListChecks] = useState(() => loadSaved("cap_list_checks", {}));
  const [search, setSearch] = useState("");

  useEffect(() => localStorage.setItem("cap_dark", JSON.stringify(dark)), [dark]);
  useEffect(() => localStorage.setItem("cap_profile", JSON.stringify(profile)), [profile]);
  useEffect(() => localStorage.setItem("cap_completed_ids", JSON.stringify(completedIds)), [completedIds]);
  useEffect(() => localStorage.setItem("cap_checks", JSON.stringify(checks)), [checks]);
  useEffect(() => localStorage.setItem("cap_events", JSON.stringify(events)), [events]);
  useEffect(() => localStorage.setItem("cap_flights", JSON.stringify(flights)), [flights]);
  useEffect(() => localStorage.setItem("cap_attendance", JSON.stringify(attendance)), [attendance]);
  useEffect(() => localStorage.setItem("cap_fitness", JSON.stringify(fitness)), [fitness]);
  useEffect(() => localStorage.setItem("cap_notes", JSON.stringify(notes)), [notes]);
  useEffect(() => localStorage.setItem("cap_list_checks", JSON.stringify(listChecks)), [listChecks]);

  const validCompleted = completedIds.filter((id) => ACHIEVEMENTS.some((item) => item.id === id));
  const currentRank = getCurrentCadetRank(validCompleted);
  const currentAchievement = ACHIEVEMENTS.find((item) => !validCompleted.includes(item.id)) || ACHIEVEMENTS[ACHIEVEMENTS.length - 1];
  const progress = Math.round((validCompleted.length / ACHIEVEMENTS.length) * 100);
  const nextStep = getNextStep(currentAchievement, checks);

  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];

    const rankResults = ACHIEVEMENTS.filter((item) =>
      [item.name, item.rank, item.abbr, item.phase, ...item.requirements, ...item.drill].join(" ").toLowerCase().includes(q)
    ).map((item) => ({ kind: "Rank", title: item.name, sub: `${item.rank} · ${item.phase}`, item }));

    const drillResults = DRILL_GROUPS.flatMap((group) =>
      group.items
        .filter((item) => item.join(" ").toLowerCase().includes(q))
        .map((item) => ({ kind: "Drill", title: item[0], sub: `${group.category} · ${item[1]}` }))
    );

    const docResults = DOCS.filter((doc) =>
      [doc.name, doc.category].join(" ").toLowerCase().includes(q)
    ).map((doc) => ({ kind: "Doc", title: doc.name, sub: doc.category, url: doc.url }));

    return [...rankResults, ...drillResults, ...docResults].slice(0, 10);
  }, [search]);

  function toggleComplete(id) {
    setCompletedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }

  function toggleCheck(achievementId, type, index) {
    const key = `${achievementId}-${type}-${index}`;

    setChecks((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      const achievement = ACHIEVEMENTS.find((item) => item.id === achievementId);

      if (achievement) {
        const reqDone = achievement.requirements.every((_, i) => next[`${achievementId}-req-${i}`]);
        const drillDone = achievement.drill.every((_, i) => next[`${achievementId}-drill-${i}`]);

        setCompletedIds((current) => {
          if (reqDone && drillDone) return current.includes(achievementId) ? current : [...current, achievementId];
          return current.filter((id) => id !== achievementId);
        });
      }

      return next;
    });
  }

  function toggleListCheck(category, item) {
    const key = `${category}-${item}`;
    setListChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function resetAll() {
    if (!window.confirm("Reset all app data on this device?")) return;

    [
      "cap_dark",
      "cap_profile",
      "cap_completed_ids",
      "cap_checks",
      "cap_events",
      "cap_flights",
      "cap_attendance",
      "cap_fitness",
      "cap_notes",
      "cap_list_checks"
    ].forEach((key) => localStorage.removeItem(key));

    setDark(false);
    setProfile(DEFAULT_PROFILE);
    setCompletedIds([]);
    setChecks({});
    setEvents([]);
    setFlights([]);
    setAttendance([]);
    setFitness([]);
    setNotes({});
    setListChecks({});
    setSelected(null);
    setTab("home");
  }

  function restoreBackup(data) {
    if (!data || typeof data !== "object") return;

    setProfile(data.profile && typeof data.profile === "object" ? { ...DEFAULT_PROFILE, ...data.profile } : DEFAULT_PROFILE);
    setCompletedIds(Array.isArray(data.completedIds) ? data.completedIds : []);
    setChecks(data.checks && typeof data.checks === "object" ? data.checks : {});
    setEvents(Array.isArray(data.events) ? data.events : []);
    setFlights(Array.isArray(data.flights) ? data.flights : []);
    setAttendance(Array.isArray(data.attendance) ? data.attendance : []);
    setFitness(Array.isArray(data.fitness) ? data.fitness : []);
    setNotes(data.notes && typeof data.notes === "object" ? data.notes : {});
    setListChecks(data.listChecks && typeof data.listChecks === "object" ? data.listChecks : {});
    setSelected(null);
    setTab("home");
  }

  function exportReport() {
    const report = buildReport({
      profile,
      currentRank,
      currentAchievement,
      progress,
      completedCount: validCompleted.length,
      nextStep,
      events,
      attendance,
      fitness,
      notes
    });

    downloadText("cap-cadet-report.txt", report);
  }

  const appStyle = {
    ...styles.page,
    ...(dark ? styles.darkVars : styles.lightVars)
  };

  return (
    <div style={appStyle}>
      <button style={styles.themeButton} onClick={() => setDark(!dark)}>
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      <main style={styles.container}>
        {selected ? (
          <AchievementDetail
            achievement={selected}
            completedIds={validCompleted}
            checks={checks}
            notes={notes}
            setNotes={setNotes}
            onBack={() => setSelected(null)}
            toggleComplete={toggleComplete}
            toggleCheck={toggleCheck}
          />
        ) : (
          <>
            <SearchBar search={search} setSearch={setSearch} results={searchResults} setSelected={setSelected} />

            {tab === "home" && (
              <HomeTab
                profile={profile}
                currentRank={currentRank}
                currentAchievement={currentAchievement}
                progress={progress}
                completedCount={validCompleted.length}
                nextStep={nextStep}
                events={events}
                flights={flights}
                setTab={setTab}
                exportReport={exportReport}
              />
            )}

            {tab === "rank" && (
              <RankTab
                profile={profile}
                setProfile={setProfile}
                currentRank={currentRank}
                currentAchievement={currentAchievement}
                completedIds={validCompleted}
                progress={progress}
                checks={checks}
                setSelected={setSelected}
                toggleComplete={toggleComplete}
              />
            )}

            {tab === "drill" && <DrillTab />}
            {tab === "events" && <EventsTab events={events} setEvents={setEvents} />}
            {tab === "tools" && (
              <ToolsTab
                profile={profile}
                completedCount={validCompleted.length}
                flights={flights}
                setFlights={setFlights}
                attendance={attendance}
                setAttendance={setAttendance}
                fitness={fitness}
                setFitness={setFitness}
                listChecks={listChecks}
                toggleListCheck={toggleListCheck}
              />
            )}

            {tab === "docs" && (
              <DocsTab
                profile={profile}
                completedIds={validCompleted}
                checks={checks}
                events={events}
                flights={flights}
                attendance={attendance}
                fitness={fitness}
                notes={notes}
                listChecks={listChecks}
                restoreBackup={restoreBackup}
                resetAll={resetAll}
                exportReport={exportReport}
              />
            )}
          </>
        )}
      </main>

      {!selected && (
        <nav style={styles.bottomNav}>
          {[
            ["home", "🏠", "Home"],
            ["rank", "⭐", "Rank"],
            ["drill", "🪖", "Drill"],
            ["events", "📅", "Events"],
            ["tools", "🧰", "Tools"],
            ["docs", "📁", "Docs"]
          ].map(([id, icon, label]) => (
            <button key={id} style={tab === id ? styles.activeNavButton : styles.navButton} onClick={() => setTab(id)}>
              <span style={styles.navIcon}>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

function SearchBar({ search, setSearch, results, setSelected }) {
  return (
    <div style={styles.searchWrap}>
      <input
        style={styles.searchInput}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search ranks, drill, docs..."
      />

      {results.length > 0 && (
        <div style={styles.searchResults}>
          {results.map((result, index) => (
            <button
              key={index}
              style={styles.searchResult}
              onClick={() => {
                if (result.item) setSelected(result.item);
                if (result.url) window.open(result.url, "_blank", "noreferrer");
                setSearch("");
              }}
            >
              <strong>{result.title}</strong>
              <span>{result.kind} · {result.sub}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function HomeTab({ profile, currentRank, currentAchievement, progress, completedCount, nextStep, events, flights, setTab, exportReport }) {
  const nextEvent = [...events].sort((a, b) => String(a.date).localeCompare(String(b.date)))[0];
  const totalHours = flights.reduce((sum, item) => sum + (parseFloat(item.duration) || 0), 0).toFixed(1);

  return (
    <>
      <Hero title="CAP Cadet Hub" eyebrow="Cadet Dashboard" subtitle="Progress, meetings, checklists, and parent tools." progress={progress} progressText={`${completedCount} of ${ACHIEVEMENTS.length} achievements completed`} />

      <Card>
        <p style={styles.label}>Cadet</p>
        <h2 style={styles.profileName}>{formatCadetName(profile.name, currentRank)}</h2>
        <p style={styles.cardText}>CAP ID: {profile.capId || "Not entered"}</p>
        <p style={styles.cardText}>{profile.squadron}</p>
        <p style={styles.phaseText}>Goal: {profile.goal}</p>
      </Card>

      <Card>
        <p style={styles.label}>Next Step</p>
        <strong style={styles.blueText}>{currentAchievement.name}</strong>
        <p style={styles.cardText}>{nextStep}</p>
      </Card>

      <div style={styles.grid2}>
        <MiniCard label="Target" value={currentAchievement.rank} sub={currentAchievement.abbr} />
        <MiniCard label="Flights" value={flights.length} sub={`${totalHours} total hrs`} />
      </div>

      <Card>
        <p style={styles.label}>Next Event</p>
        {nextEvent ? (
          <>
            <strong style={styles.blueText}>{nextEvent.title}</strong>
            <p style={styles.cardText}>{formatDate(nextEvent.date)} · {nextEvent.time || "No time"}</p>
            <p style={styles.phaseText}>{nextEvent.type} · {nextEvent.location || "No location"}</p>
          </>
        ) : (
          <>
            <strong style={styles.blueText}>No events added</strong>
            <p style={styles.cardText}>Add the next squadron meeting or activity.</p>
          </>
        )}
      </Card>

      <TimelineCard profile={profile} completedCount={completedCount} />

      <div style={styles.quickGrid}>
        <button style={styles.quickButton} onClick={() => setTab("rank")}>⭐ View Ranks</button>
        <button style={styles.quickButton} onClick={() => setTab("tools")}>🧰 Checklists</button>
        <button style={styles.quickButton} onClick={() => setTab("events")}>📅 Add Event</button>
        <button style={styles.quickButton} onClick={exportReport}>📝 Export Report</button>
      </div>
    </>
  );
}

function RankTab({ profile, setProfile, currentRank, currentAchievement, completedIds, progress, checks, setSelected, toggleComplete }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);

  function save() {
    setProfile(form);
    setEditing(false);
  }

  return (
    <>
      <Hero title="Rank Tracker" eyebrow="Civil Air Patrol" subtitle="Track requirements, drill, and parent notes." progress={progress} progressText={`${completedIds.length} of ${ACHIEVEMENTS.length} completed`} />

      <Card>
        {!editing ? (
          <>
            <p style={styles.label}>Cadet Profile</p>
            <h2 style={styles.profileName}>{formatCadetName(profile.name, currentRank)}</h2>
            <p style={styles.cardText}>CAP ID: {profile.capId || "Not entered"}</p>
            <p style={styles.cardText}>{profile.squadron}</p>
            <p style={styles.phaseText}>Joined: {formatDate(profile.joined)}</p>
            <p style={styles.phaseText}>Goal: {profile.goal}</p>
            <button style={styles.smallButton} onClick={() => { setForm(profile); setEditing(true); }}>Edit Profile</button>
          </>
        ) : (
          <>
            <p style={styles.label}>Edit Profile</p>
            <input style={styles.input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Cadet last name" />
            <input style={styles.input} value={form.capId} onChange={(e) => setForm({ ...form, capId: e.target.value })} placeholder="CAP ID only" />
            <input style={styles.input} value={form.squadron} onChange={(e) => setForm({ ...form, squadron: e.target.value })} placeholder="Squadron" />
            <input style={styles.input} type="date" value={form.joined} onChange={(e) => setForm({ ...form, joined: e.target.value })} />
            <input style={styles.input} value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} placeholder="Goal" />
            <button style={styles.primaryButton} onClick={save}>Save Profile</button>
          </>
        )}
      </Card>

      <Card>
        <p style={styles.label}>Current Target</p>
        <strong style={styles.blueText}>{currentAchievement.name}</strong>
        <p style={styles.cardText}>{currentAchievement.rank} · {currentAchievement.abbr}</p>
        <p style={styles.phaseText}>{getNextStep(currentAchievement, checks)}</p>
      </Card>

      <h2 style={styles.sectionTitle}>Achievement Path</h2>

      {ACHIEVEMENTS.map((item) => {
        const done = completedIds.includes(item.id);
        const isCurrent = currentAchievement.id === item.id && !done;

        return (
          <div key={item.id} style={{ ...styles.rankCard, border: isCurrent ? "2px solid #2563eb" : done ? "2px solid #22c55e" : "1px solid var(--card-border)" }}>
            <button style={circleButton(done)} onClick={() => toggleComplete(item.id)}>{done ? "✓" : ""}</button>
            <button style={styles.cardMainButton} onClick={() => setSelected(item)}>
              <div>
                <strong style={styles.blueText}>{item.name}</strong>
                <p style={styles.cardText}>{item.rank} · {item.abbr}</p>
                <p style={styles.phaseText}>{item.phase}</p>
                {isCurrent && <span style={styles.currentTag}>Current Target</span>}
                {done && <span style={styles.doneTag}>Completed</span>}
              </div>
              <span style={styles.arrow}>›</span>
            </button>
          </div>
        );
      })}
    </>
  );
}

function AchievementDetail({ achievement, completedIds, checks, notes, setNotes, onBack, toggleComplete, toggleCheck }) {
  const done = completedIds.includes(achievement.id);
  const reqDone = achievement.requirements.filter((_, i) => checks[`${achievement.id}-req-${i}`]).length;
  const drillDone = achievement.drill.filter((_, i) => checks[`${achievement.id}-drill-${i}`]).length;
  const total = achievement.requirements.length + achievement.drill.length;
  const percent = Math.round(((reqDone + drillDone) / total) * 100);
  const note = notes[achievement.id] || "";

  return (
    <>
      <button style={styles.backButton} onClick={onBack}>← Back</button>

      <Hero title={achievement.name} eyebrow={achievement.phase} subtitle={`${achievement.rank} · ${achievement.abbr}`} />

      <button style={completeButton(done)} onClick={() => toggleComplete(achievement.id)}>
        {done ? "✓ Marked Complete" : "Mark Achievement Complete"}
      </button>

      <Card>
        <p style={styles.label}>Promotion Progress</p>
        <Progress percent={percent} />
        <p style={styles.cardText}>{reqDone + drillDone} of {total} items checked</p>
        <p style={styles.phaseText}>Requirements: {reqDone} of {achievement.requirements.length} · Drill: {drillDone} of {achievement.drill.length}</p>
      </Card>

      <h2 style={styles.sectionTitle}>Requirements</h2>
      {achievement.requirements.map((item, index) => (
        <CheckRow key={item} checked={!!checks[`${achievement.id}-req-${index}`]} onClick={() => toggleCheck(achievement.id, "req", index)} text={item} />
      ))}

      <h2 style={styles.sectionTitle}>Drill</h2>
      {achievement.drill.map((item, index) => (
        <CheckRow key={item} checked={!!checks[`${achievement.id}-drill-${index}`]} onClick={() => toggleCheck(achievement.id, "drill", index)} text={`🪖 ${item}`} />
      ))}

      <Card>
        <p style={styles.label}>Parent Notes</p>
        <textarea
          style={styles.textArea}
          value={note}
          onChange={(e) => setNotes({ ...notes, [achievement.id]: e.target.value })}
          placeholder="Notes, reminders, questions for the squadron, what to practice..."
        />
      </Card>
    </>
  );
}

function DrillTab() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Hero title="Drill Library" eyebrow="Drill Training" subtitle="Commands, movements, and cadet leadership." />

      {selected ? (
        <Card>
          <button style={styles.closeButton} onClick={() => setSelected(null)}>Close</button>
          <p style={styles.label}>{selected.category}</p>
          <h2 style={styles.profileName}>{selected.name}</h2>
          <div style={styles.commandBox}>
            <p style={styles.label}>Command</p>
            <strong>{selected.command}</strong>
          </div>
          <p style={styles.cardText}>{selected.purpose}</p>
        </Card>
      ) : (
        DRILL_GROUPS.map((group) => (
          <div key={group.category}>
            <h2 style={styles.sectionTitle}>{group.category}</h2>
            {group.items.map((item) => (
              <button key={item[0]} style={styles.listButton} onClick={() => setSelected({ category: group.category, name: item[0], command: item[1], purpose: item[2] })}>
                <div>
                  <strong style={styles.blueText}>{item[0]}</strong>
                  <p style={styles.cardText}>{item[1]}</p>
                </div>
                <span style={styles.arrow}>›</span>
              </button>
            ))}
          </div>
        ))
      )}
    </>
  );
}

function EventsTab({ events, setEvents }) {
  const [form, setForm] = useState({ title: "", date: "", time: "", location: "", type: "Meeting", notes: "" });

  function addEvent() {
    if (!form.title || !form.date) return;
    setEvents([{ ...form, id: Date.now() }, ...events]);
    setForm({ title: "", date: "", time: "", location: "", type: "Meeting", notes: "" });
  }

  return (
    <>
      <Hero title="Events" eyebrow="Calendar" subtitle="Track meetings, activities, training, and notes." />

      <Card>
        <p style={styles.label}>Add Event</p>
        <input style={styles.input} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Event title" />
        <input style={styles.input} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <input style={styles.input} type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
        <input style={styles.input} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Location" />
        <select style={styles.input} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option>Meeting</option>
          <option>Education</option>
          <option>Activity</option>
          <option>PT</option>
          <option>Encampment</option>
          <option>Other</option>
        </select>
        <textarea style={styles.textArea} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Notes..." />
        <button style={styles.primaryButton} onClick={addEvent}>Save Event</button>
      </Card>

      {events.map((event) => (
        <Card key={event.id}>
          <strong style={styles.blueText}>{event.title}</strong>
          <p style={styles.cardText}>{formatDate(event.date)} · {event.time || "No time"}</p>
          <p style={styles.phaseText}>{event.type} · {event.location || "No location"}</p>
          {event.notes && <p style={styles.notesText}>{event.notes}</p>}
          <button style={styles.deleteButton} onClick={() => setEvents(events.filter((item) => item.id !== event.id))}>Delete</button>
        </Card>
      ))}
    </>
  );
}

function ToolsTab({ profile, completedCount, flights, setFlights, attendance, setAttendance, fitness, setFitness, listChecks, toggleListCheck }) {
  return (
    <>
      <Hero title="Tools" eyebrow="Parent Tools" subtitle="Uniforms, gear, encampment, attendance, fitness, and flights." />

      <ChecklistCard title="Blues Uniform Checklist" category="blues" items={CHECKLISTS.blues} checks={listChecks} toggle={toggleListCheck} />
      <ChecklistCard title="Field Uniform Checklist" category="field" items={CHECKLISTS.field} checks={listChecks} toggle={toggleListCheck} />
      <ChecklistCard title="Gear / Buy List" category="gear" items={CHECKLISTS.gear} checks={listChecks} toggle={toggleListCheck} />
      <ChecklistCard title="Encampment Prep Checklist" category="encampment" items={CHECKLISTS.encampment} checks={listChecks} toggle={toggleListCheck} />

      <AttendanceLog attendance={attendance} setAttendance={setAttendance} />
      <FitnessLog fitness={fitness} setFitness={setFitness} />
      <FlightLog flights={flights} setFlights={setFlights} />
      <TimelineCard profile={profile} completedCount={completedCount} />
    </>
  );
}

function ChecklistCard({ title, category, items, checks, toggle }) {
  const done = items.filter((item) => checks[`${category}-${item}`]).length;
  const percent = Math.round((done / items.length) * 100);

  return (
    <Card>
      <p style={styles.label}>{title}</p>
      <Progress percent={percent} />
      <p style={styles.cardText}>{done} of {items.length} complete</p>
      {items.map((item) => (
        <CheckRow key={item} checked={!!checks[`${category}-${item}`]} onClick={() => toggle(category, item)} text={item} />
      ))}
    </Card>
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
    <Card>
      <p style={styles.label}>Attendance Log</p>
      <input style={styles.input} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
      <select style={styles.input} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
        <option>Meeting</option>
        <option>PT</option>
        <option>Activity</option>
        <option>Training</option>
        <option>Other</option>
      </select>
      <select style={styles.input} value={form.attended} onChange={(e) => setForm({ ...form, attended: e.target.value })}>
        <option>Yes</option>
        <option>No</option>
      </select>
      <textarea style={styles.textArea} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Notes..." />
      <button style={styles.primaryButton} onClick={add}>Add Attendance</button>

      {attendance.slice(0, 6).map((item) => (
        <div key={item.id} style={styles.inlineItem}>
          <strong>{formatDate(item.date)} · {item.attended}</strong>
          <p style={styles.cardText}>{item.type}</p>
          {item.notes && <p style={styles.notesText}>{item.notes}</p>}
          <button style={styles.deleteButton} onClick={() => setAttendance(attendance.filter((x) => x.id !== item.id))}>Delete</button>
        </div>
      ))}
    </Card>
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
    <Card>
      <p style={styles.label}>CPFT / Fitness Tracker</p>
      <input style={styles.input} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
      <input style={styles.input} value={form.run} onChange={(e) => setForm({ ...form, run: e.target.value })} placeholder="Run time" />
      <input style={styles.input} value={form.pushups} onChange={(e) => setForm({ ...form, pushups: e.target.value })} placeholder="Pushups" />
      <input style={styles.input} value={form.curlups} onChange={(e) => setForm({ ...form, curlups: e.target.value })} placeholder="Curl-ups / sit-ups" />
      <input style={styles.input} value={form.sitReach} onChange={(e) => setForm({ ...form, sitReach: e.target.value })} placeholder="Sit and reach" />
      <select style={styles.input} value={form.hfz} onChange={(e) => setForm({ ...form, hfz: e.target.value })}>
        <option>Unknown</option>
        <option>HFZ Met</option>
        <option>Needs Work</option>
      </select>
      <textarea style={styles.textArea} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Notes..." />
      <button style={styles.primaryButton} onClick={add}>Add Fitness Entry</button>

      {fitness.slice(0, 6).map((item) => (
        <div key={item.id} style={styles.inlineItem}>
          <strong>{formatDate(item.date)} · {item.hfz}</strong>
          <p style={styles.cardText}>Run: {item.run || "—"} · Pushups: {item.pushups || "—"} · Curl-ups: {item.curlups || "—"}</p>
          {item.notes && <p style={styles.notesText}>{item.notes}</p>}
          <button style={styles.deleteButton} onClick={() => setFitness(fitness.filter((x) => x.id !== item.id))}>Delete</button>
        </div>
      ))}
    </Card>
  );
}

function FlightLog({ flights, setFlights }) {
  const [form, setForm] = useState({ aircraft: "", date: "", duration: "", type: "Orientation Flight" });
  const hours = flights.reduce((sum, item) => sum + (parseFloat(item.duration) || 0), 0).toFixed(1);

  function add() {
    if (!form.aircraft || !form.date) return;
    setFlights([{ ...form, id: Date.now() }, ...flights]);
    setForm({ aircraft: "", date: "", duration: "", type: "Orientation Flight" });
  }

  return (
    <Card>
      <p style={styles.label}>Flight Log</p>
      <p style={styles.cardText}>{flights.length} flights · {hours} total hours</p>
      <input style={styles.input} value={form.aircraft} onChange={(e) => setForm({ ...form, aircraft: e.target.value })} placeholder="Aircraft" />
      <input style={styles.input} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
      <input style={styles.input} value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="Duration hours" />
      <select style={styles.input} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
        <option>Orientation Flight</option>
        <option>Glider Flight</option>
        <option>Powered Flight</option>
        <option>Simulator</option>
        <option>Other</option>
      </select>
      <button style={styles.primaryButton} onClick={add}>Log Flight</button>

      {flights.slice(0, 6).map((flight) => (
        <div key={flight.id} style={styles.inlineItem}>
          <strong>{flight.aircraft}</strong>
          <p style={styles.cardText}>{formatDate(flight.date)} · {flight.type} · {flight.duration || "0"} hrs</p>
          <button style={styles.deleteButton} onClick={() => setFlights(flights.filter((x) => x.id !== flight.id))}>Delete</button>
        </div>
      ))}
    </Card>
  );
}

function TimelineCard({ profile, completedCount }) {
  const startDate = profile.joined || new Date().toISOString().slice(0, 10);
  const upcoming = ACHIEVEMENTS.slice(completedCount, completedCount + 5);

  return (
    <Card>
      <p style={styles.label}>Promotion Timeline</p>
      <p style={styles.cardText}>Estimated using 8-week minimum windows. Actual timing depends on squadron approval and completed requirements.</p>
      {upcoming.map((item, index) => (
        <div key={item.id} style={styles.timelineItem}>
          <strong>{item.name}</strong>
          <span>{formatDate(addWeeks(startDate, (completedCount + index) * 8))} · {item.rank}</span>
        </div>
      ))}
    </Card>
  );
}

function DocsTab({ profile, completedIds, checks, events, flights, attendance, fitness, notes, listChecks, restoreBackup, resetAll, exportReport }) {
  const [backupText, setBackupText] = useState("");

  function exportBackup() {
    const data = {
      app: "CAP Cadet Hub",
      version: 7,
      exportedAt: new Date().toISOString(),
      profile,
      completedIds,
      checks,
      events,
      flights,
      attendance,
      fitness,
      notes,
      listChecks
    };

    const text = JSON.stringify(data, null, 2);
    setBackupText(text);
    navigator.clipboard?.writeText(text).catch(() => {});
  }

  function importBackup() {
    try {
      restoreBackup(JSON.parse(backupText));
      alert("Backup restored.");
    } catch {
      alert("Backup text is not valid JSON.");
    }
  }

  return (
    <>
      <Hero title="Docs" eyebrow="Official CAP Resources" subtitle="Links, reports, backup, and data safety." />

      <Card>
        <p style={styles.label}>Reports & Backup</p>
        <button style={styles.primaryButton} onClick={exportReport}>Export Parent Report</button>
        <button style={styles.primaryButton} onClick={exportBackup}>Export Backup / Copy Data</button>
        <textarea style={styles.textArea} value={backupText} onChange={(e) => setBackupText(e.target.value)} placeholder="Backup data appears here. Paste backup data here to restore." />
        <button style={styles.primaryButton} onClick={importBackup}>Import / Restore Backup</button>
        <button style={styles.dangerButton} onClick={resetAll}>Reset App Data</button>
      </Card>

      <Card>
        <strong style={styles.blueText}>Safety Note</strong>
        <p style={styles.cardText}>This is an unofficial parent/cadet tracker. It does not connect to eServices and does not store CAP passwords.</p>
        <p style={styles.phaseText}>Use official CAP resources for real records, tests, regulations, uniforms, and account access.</p>
      </Card>

      {DOCS.map((doc) => (
        <a key={doc.id} href={doc.url} target="_blank" rel="noreferrer" style={styles.docCard}>
          <div>
            <strong style={styles.blueText}>{doc.name}</strong>
            <p style={styles.phaseText}>{doc.category}</p>
          </div>
          <span style={styles.arrow}>↗</span>
        </a>
      ))}
    </>
  );
}

function Hero({ title, eyebrow, subtitle, progress, progressText }) {
  return (
    <section style={styles.hero}>
      <p style={styles.eyebrow}>{eyebrow}</p>
      <h1 style={styles.title}>{title}</h1>
      <p style={styles.subtitle}>{subtitle}</p>

      {typeof progress === "number" && (
        <div style={styles.progressBox}>
          <div style={styles.progressHeader}>
            <span>Progress</span>
            <strong>{progress}%</strong>
          </div>
          <Progress percent={progress} light />
          <p style={styles.progressText}>{progressText}</p>
        </div>
      )}
    </section>
  );
}

function Card({ children }) {
  return <div style={styles.card}>{children}</div>;
}

function MiniCard({ label, value, sub }) {
  return (
    <div style={styles.miniCard}>
      <p style={styles.statLabel}>{label}</p>
      <h3 style={styles.miniTitle}>{value}</h3>
      <p style={styles.cardText}>{sub}</p>
    </div>
  );
}

function Progress({ percent, light = false }) {
  return (
    <div style={light ? styles.progressBarLightHero : styles.progressBarLight}>
      <div style={{ ...styles.progressFillBlue, width: `${percent}%` }} />
    </div>
  );
}

function CheckRow({ checked, onClick, text }) {
  return (
    <button style={checkRowStyle(checked)} onClick={onClick}>
      <span style={checkCircleStyle(checked)}>{checked ? "✓" : ""}</span>
      <span style={checkTextStyle(checked)}>{text}</span>
    </button>
  );
}

function buildReport({ profile, currentRank, currentAchievement, progress, completedCount, nextStep, events, attendance, fitness, notes }) {
  const eventText = events.slice(0, 5).map((e) => `- ${formatDate(e.date)}: ${e.title} (${e.type})`).join("\n") || "- No events logged";
  const attendanceText = attendance.slice(0, 5).map((a) => `- ${formatDate(a.date)}: ${a.type} · Attended: ${a.attended}`).join("\n") || "- No attendance logged";
  const fitnessText = fitness.slice(0, 5).map((f) => `- ${formatDate(f.date)}: ${f.hfz} · Run: ${f.run || "—"} · Pushups: ${f.pushups || "—"}`).join("\n") || "- No fitness entries logged";

  const notesText = Object.entries(notes)
    .filter(([, value]) => value && String(value).trim())
    .map(([id, value]) => {
      const achievement = ACHIEVEMENTS.find((item) => item.id === Number(id));
      return `- ${achievement?.name || "Achievement"}: ${value}`;
    })
    .join("\n") || "- No parent notes";

  return `CAP Cadet Parent Report

Cadet: ${formatCadetName(profile.name, currentRank)}
CAP ID: ${profile.capId || "Not entered"}
Squadron: ${profile.squadron}
Goal: ${profile.goal}

Progress:
- Completed: ${completedCount} of ${ACHIEVEMENTS.length}
- Overall: ${progress}%
- Current target: ${currentAchievement.name}
- Next step: ${nextStep}

Events:
${eventText}

Attendance:
${attendanceText}

Fitness:
${fitnessText}

Parent Notes:
${notesText}

Generated: ${new Date().toLocaleString()}
`;
}

function circleButton(done) {
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

function completeButton(done) {
  return {
    width: "100%",
    border: "none",
    borderRadius: "14px",
    padding: "13px",
    background: done ? "#22c55e" : "#2563eb",
    color: "white",
    fontWeight: "bold",
    marginBottom: "14px"
  };
}

function checkRowStyle(checked) {
  return {
    width: "100%",
    background: checked ? "rgba(37,99,235,0.14)" : "var(--card-bg)",
    border: checked ? "2px solid #2563eb" : "1px solid var(--card-border)",
    borderRadius: "14px",
    padding: "12px",
    marginTop: "10px",
    color: "var(--text)",
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    textAlign: "left"
  };
}

function checkCircleStyle(checked) {
  return {
    width: "24px",
    height: "24px",
    borderRadius: "999px",
    border: checked ? "2px solid #2563eb" : "2px solid #94a3b8",
    background: checked ? "#2563eb" : "var(--card-bg)",
    color: "white",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  };
}

function checkTextStyle(checked) {
  return {
    color: checked ? "#60a5fa" : "var(--text)",
    textDecoration: checked ? "line-through" : "none",
    lineHeight: 1.4
  };
}

const styles = {
  lightVars: {
    "--app-bg": "#f9fafb",
    "--card-bg": "#ffffff",
    "--card-border": "#e5e7eb",
    "--text": "#111827",
    "--muted": "#6b7280",
    "--soft-bg": "#e5e7eb",
    "--soft-text": "#374151",
    "--shadow": "0 6px 16px rgba(0,0,0,0.06)"
  },
  darkVars: {
    "--app-bg": "#020617",
    "--card-bg": "#0f172a",
    "--card-border": "#1e293b",
    "--text": "#f8fafc",
    "--muted": "#94a3b8",
    "--soft-bg": "#1e293b",
    "--soft-text": "#cbd5e1",
    "--shadow": "0 8px 22px rgba(0,0,0,0.35)"
  },
  page: {
    minHeight: "100vh",
    background: "var(--app-bg)",
    color: "var(--text)",
    padding: "24px 24px 110px"
  },
  container: {
    maxWidth: "430px",
    margin: "0 auto"
  },
  themeButton: {
    position: "fixed",
    top: "14px",
    right: "14px",
    zIndex: 20,
    border: "1px solid var(--card-border)",
    background: "var(--card-bg)",
    color: "var(--text)",
    borderRadius: "999px",
    padding: "9px 12px",
    fontWeight: "bold",
    fontSize: "13px",
    boxShadow: "var(--shadow)"
  },
  hero: {
    background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
    color: "white",
    borderRadius: "24px",
    padding: "24px",
    marginBottom: "18px",
    boxShadow: "0 12px 30px rgba(37,99,235,0.25)"
  },
  eyebrow: {
    margin: 0,
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#bfdbfe",
    fontWeight: "bold"
  },
  title: {
    margin: "8px 0 4px",
    fontSize: "30px"
  },
  subtitle: {
    margin: 0,
    color: "#dbeafe"
  },
  progressBox: {
    marginTop: "18px",
    background: "rgba(255,255,255,0.14)",
    borderRadius: "16px",
    padding: "14px"
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    marginBottom: "8px"
  },
  progressText: {
    margin: "8px 0 0",
    fontSize: "12px",
    color: "#dbeafe"
  },
  progressBarLightHero: {
    height: "10px",
    background: "rgba(255,255,255,0.25)",
    borderRadius: "999px",
    overflow: "hidden"
  },
  progressBarLight: {
    height: "10px",
    background: "var(--soft-bg)",
    borderRadius: "999px",
    overflow: "hidden",
    marginTop: "8px"
  },
  progressFillBlue: {
    height: "100%",
    background: "#2563eb",
    borderRadius: "999px"
  },
  card: {
    width: "100%",
    background: "var(--card-bg)",
    border: "1px solid var(--card-border)",
    borderRadius: "18px",
    padding: "16px",
    marginBottom: "12px",
    boxShadow: "var(--shadow)",
    color: "var(--text)"
  },
  rankCard: {
    width: "100%",
    background: "var(--card-bg)",
    borderRadius: "18px",
    padding: "14px",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    boxShadow: "var(--shadow)",
    color: "var(--text)"
  },
  cardMainButton: {
    flex: 1,
    border: "none",
    background: "transparent",
    textAlign: "left",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "var(--text)",
    padding: 0
  },
  blueText: {
    color: "#0b82f0"
  },
  cardText: {
    margin: "6px 0 0",
    color: "var(--muted)",
    fontSize: "14px",
    lineHeight: 1.45
  },
  phaseText: {
    margin: "8px 0 0",
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "bold"
  },
  label: {
    margin: "0 0 6px",
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  profileName: {
    margin: "4px 0",
    color: "var(--text)"
  },
  sectionTitle: {
    color: "var(--text)",
    margin: "18px 0 12px"
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "12px"
  },
  miniCard: {
    background: "var(--card-bg)",
    border: "1px solid var(--card-border)",
    borderRadius: "18px",
    padding: "16px",
    boxShadow: "var(--shadow)"
  },
  statLabel: {
    margin: 0,
    color: "var(--muted)",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  miniTitle: {
    margin: "8px 0 0",
    color: "#60a5fa",
    fontSize: "18px",
    lineHeight: 1.2
  },
  quickGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginTop: "14px"
  },
  quickButton: {
    border: "none",
    background: "#2563eb",
    color: "white",
    borderRadius: "16px",
    padding: "14px 10px",
    fontWeight: "bold",
    fontSize: "14px",
    boxShadow: "var(--shadow)"
  },
  input: {
    width: "100%",
    border: "1px solid var(--card-border)",
    background: "var(--app-bg)",
    color: "var(--text)",
    borderRadius: "12px",
    padding: "12px",
    marginBottom: "10px",
    fontSize: "15px"
  },
  textArea: {
    width: "100%",
    minHeight: "95px",
    border: "1px solid var(--card-border)",
    background: "var(--app-bg)",
    color: "var(--text)",
    borderRadius: "12px",
    padding: "12px",
    marginBottom: "10px",
    fontSize: "15px",
    resize: "vertical"
  },
  primaryButton: {
    width: "100%",
    border: "none",
    background: "#2563eb",
    color: "white",
    borderRadius: "14px",
    padding: "13px",
    fontWeight: "bold",
    marginBottom: "10px",
    fontSize: "15px"
  },
  dangerButton: {
    width: "100%",
    border: "none",
    background: "#dc2626",
    color: "white",
    borderRadius: "14px",
    padding: "13px",
    fontWeight: "bold",
    fontSize: "15px"
  },
  deleteButton: {
    border: "none",
    background: "#dc2626",
    color: "white",
    borderRadius: "10px",
    padding: "8px 12px",
    fontWeight: "bold",
    fontSize: "13px",
    marginTop: "10px"
  },
  smallButton: {
    border: "none",
    background: "#2563eb",
    color: "white",
    borderRadius: "12px",
    padding: "10px 12px",
    fontWeight: "bold",
    marginTop: "12px"
  },
  backButton: {
    border: "none",
    background: "transparent",
    color: "#60a5fa",
    fontWeight: "bold",
    marginBottom: "12px",
    fontSize: "16px"
  },
  closeButton: {
    border: "none",
    background: "var(--soft-bg)",
    color: "var(--soft-text)",
    borderRadius: "999px",
    padding: "8px 12px",
    fontWeight: "bold",
    float: "right"
  },
  commandBox: {
    background: "var(--soft-bg)",
    borderRadius: "16px",
    padding: "14px",
    margin: "12px 0",
    color: "var(--text)"
  },
  listButton: {
    width: "100%",
    background: "var(--card-bg)",
    border: "1px solid var(--card-border)",
    borderRadius: "18px",
    padding: "14px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    boxShadow: "var(--shadow)",
    color: "var(--text)",
    textAlign: "left"
  },
  inlineItem: {
    background: "var(--soft-bg)",
    borderRadius: "14px",
    padding: "12px",
    marginTop: "10px",
    color: "var(--text)"
  },
  notesText: {
    margin: "8px 0 0",
    color: "var(--text)",
    fontSize: "14px",
    lineHeight: 1.45,
    whiteSpace: "pre-wrap"
  },
  timelineItem: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    marginTop: "12px",
    padding: "10px",
    borderRadius: "12px",
    background: "var(--soft-bg)",
    color: "var(--text)"
  },
  docCard: {
    width: "100%",
    background: "var(--card-bg)",
    border: "1px solid var(--card-border)",
    borderRadius: "18px",
    padding: "16px",
    marginBottom: "12px",
    textAlign: "left",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "var(--shadow)",
    color: "var(--text)",
    textDecoration: "none"
  },
  arrow: {
    fontSize: "32px",
    color: "#9ca3af"
  },
  currentTag: {
    margin: "8px 6px 0 0",
    color: "#ffffff",
    background: "#2563eb",
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: "bold"
  },
  doneTag: {
    margin: "8px 6px 0 0",
    color: "#ffffff",
    background: "#22c55e",
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: "bold"
  },
  searchWrap: {
    position: "relative",
    marginBottom: "14px"
  },
  searchInput: {
    width: "100%",
    border: "1px solid var(--card-border)",
    background: "var(--card-bg)",
    color: "var(--text)",
    borderRadius: "16px",
    padding: "13px",
    fontSize: "15px",
    boxShadow: "var(--shadow)"
  },
  searchResults: {
    position: "absolute",
    zIndex: 30,
    top: "52px",
    left: 0,
    right: 0,
    background: "var(--card-bg)",
    border: "1px solid var(--card-border)",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "var(--shadow)"
  },
  searchResult: {
    width: "100%",
    border: "none",
    background: "transparent",
    color: "var(--text)",
    padding: "12px",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: "3px"
  },
  bottomNav: {
    position: "fixed",
    left: "50%",
    bottom: "18px",
    transform: "translateX(-50%)",
    width: "calc(100% - 32px)",
    maxWidth: "430px",
    background: "var(--card-bg)",
    border: "1px solid var(--card-border)",
    borderRadius: "24px",
    padding: "8px",
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "4px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
    zIndex: 10
  },
  navButton: {
    border: "none",
    background: "transparent",
    color: "var(--muted)",
    borderRadius: "16px",
    padding: "9px 1px",
    fontWeight: "bold",
    fontSize: "9px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "3px"
  },
  activeNavButton: {
    border: "none",
    background: "rgba(37,99,235,0.18)",
    color: "#60a5fa",
    borderRadius: "16px",
    padding: "9px 1px",
    fontWeight: "bold",
    fontSize: "9px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "3px"
  },
  navIcon: {
    fontSize: "17px"
  }
};