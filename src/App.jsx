import { useEffect, useState } from "react";

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
  overview: `${a[0]} requirement tracker for ${a[1]}.`,
  requirements: a[4],
  drill: a[5]
}));

const DEFAULT_EVENTS = [
  { id: 1, title: "Weekly Squadron Meeting", date: "2026-06-16", time: "19:00", location: "Squadron HQ", type: "Meeting" },
  { id: 2, title: "Aerospace Education Night", date: "2026-06-23", time: "18:30", location: "Classroom", type: "Education" }
];

const DEFAULT_FLIGHTS = [
  { id: 1, aircraft: "Cessna 172", date: "2026-05-10", duration: "1.2", type: "Orientation Flight" },
  { id: 2, aircraft: "Cessna 172", date: "2026-05-28", duration: "0.9", type: "Orientation Flight" }
];

const DEFAULT_PROFILE = {
  name: "Cadet Lawrence",
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
    return saved ? JSON.parse(saved) : fallback;
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

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selected, setSelected] = useState(null);
  const [detailTab, setDetailTab] = useState("requirements");

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

  function toggleCompleted(id) {
    setCompletedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }

  function toggleRequirement(achievementId, index) {
    const key = `${achievementId}-${index}`;

    setRequirementChecks((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);

      if (achievement) {
        const allChecked = achievement.requirements.every((_, i) => next[`${achievementId}-${i}`]);

        setCompletedIds((current) => {
          if (allChecked) return current.includes(achievementId) ? current : [...current, achievementId];
          return current.filter((id) => id !== achievementId);
        });
      }

      return next;
    });
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
            detailTab={detailTab}
            setDetailTab={setDetailTab}
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
                setProfile={setProfile}
                onSelect={(a) => {
                  setSelected(a);
                  setDetailTab("requirements");
                }}
                completedIds={validCompletedIds}
                toggleCompleted={toggleCompleted}
                progress={progress}
                currentAchievement={currentAchievement}
                completedCount={completedCount}
              />
            )}

            {activeTab === "calendar" && <CalendarTab events={events} setEvents={setEvents} />}
            {activeTab === "flights" && <FlightsTab flights={flights} setFlights={setFlights} />}
            {activeTab === "docs" && <DocsTab />}
          </>
        )}
      </div>

      {!selected && (
        <nav style={bottomNav}>
          {[
            ["dashboard", "🏠", "Home"],
            ["rank", "⭐", "Rank"],
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

function DashboardTab({ profile, progress, currentAchievement, completedCount, events, flights, setActiveTab }) {
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
        <h2 style={profileName}>{profile.name}</h2>
        {profile.capId ? <p style={phaseText}>CAP ID: {profile.capId}</p> : <p style={cardText}>CAP ID: Not entered</p>}
        <p style={cardText}>{profile.squadron}</p>
        <p style={goalText}>Goal: {profile.goal}</p>
      </div>

      <div style={dashboardGrid}>
        <div style={miniCard}>
          <p style={statLabel}>Target</p>
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
        <button style={quickButton} onClick={() => setActiveTab("calendar")}>📅 Add Event</button>
        <button style={quickButton} onClick={() => setActiveTab("flights")}>✈️ Log Flight</button>
        <button style={quickButton} onClick={() => setActiveTab("docs")}>🔐 eServices</button>
      </div>
    </>
  );
}

function RankTab({ profile, setProfile, onSelect, completedIds, toggleCompleted, progress, currentAchievement, completedCount }) {
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
        <h1 style={title}>CAP Cadet Hub</h1>
        <p style={subtitle}>Track ranks, requirements, and drill.</p>

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
            <h2 style={profileName}>{profile.name}</h2>
            {profile.capId ? <p style={phaseText}>CAP ID: {profile.capId}</p> : <p style={cardText}>CAP ID: Not entered</p>}
            <p style={cardText}>{profile.squadron}</p>
            <p style={phaseText}>Joined: {profile.joined}</p>
            <p style={goalText}>Goal: {profile.goal}</p>
            <p style={{ ...cardText, marginTop: "12px", fontSize: "12px" }}>
              CAP ID is stored only on this device. Do not enter or store your CAP password in this app.
            </p>
            <button style={smallActionButton} onClick={() => { setForm(profile); setEditing(true); }}>Edit Profile</button>
          </>
        ) : (
          <>
            <p style={smallLabel}>Edit Profile</p>
            <input style={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Cadet name" />
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
        <strong>{currentAchievement.name}</strong>
        <p style={cardText}>{currentAchievement.rank} · {currentAchievement.abbr}</p>
      </div>

      <h2 style={sectionTitle}>Rank Tracker</h2>

      {ACHIEVEMENTS.map((achievement) => {
        const done = completedIds.includes(achievement.id);
        const isCurrent = currentAchievement.id === achievement.id && !done;

        return (
          <div key={achievement.id} style={{ ...card, border: isCurrent ? "2px solid #2563eb" : done ? "2px solid #22c55e" : "1px solid var(--card-border)" }}>
            <button style={checkButton(done)} onClick={() => toggleCompleted(achievement.id)}>
              {done ? "✓" : ""}
            </button>

            <button style={cardMainButton} onClick={() => onSelect(achievement)}>
              <div>
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

function AchievementDetail({ selected, detailTab, setDetailTab, onBack, completedIds, toggleCompleted, requirementChecks, toggleRequirement }) {
  const done = completedIds.includes(selected.id);
  const checkedCount = selected.requirements.filter((_, i) => requirementChecks[`${selected.id}-${i}`]).length;
  const reqProgress = Math.round((checkedCount / selected.requirements.length) * 100);

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
          <span>Requirement Progress</span>
          <strong>{reqProgress}%</strong>
        </div>
        <div style={progressBarLight}>
          <div style={{ ...progressFillBlue, width: `${reqProgress}%` }} />
        </div>
        <p style={requirementProgressText}>{checkedCount} of {selected.requirements.length} requirements checked</p>
      </div>

      <div style={tabRow}>
        <button style={detailTab === "requirements" ? activeTabStyle : inactiveTabStyle} onClick={() => setDetailTab("requirements")}>Requirements</button>
        <button style={detailTab === "drill" ? activeTabStyle : inactiveTabStyle} onClick={() => setDetailTab("drill")}>Drill</button>
      </div>

      {detailTab === "requirements" && selected.requirements.map((item, index) => {
        const checked = requirementChecks[`${selected.id}-${index}`];

        return (
          <button key={index} style={requirementItem(checked)} onClick={() => toggleRequirement(selected.id, index)}>
            <span style={requirementCircle(checked)}>{checked ? "✓" : ""}</span>
            <span style={requirementText(checked)}>{item}</span>
          </button>
        );
      })}

      {detailTab === "drill" && selected.drill.map((item, index) => (
        <div key={index} style={listItem}>🪖 {item}</div>
      ))}
    </>
  );
}

function CalendarTab({ events, setEvents }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", date: "", time: "", location: "", type: "Meeting" });

  function saveEvent() {
    if (!form.title || !form.date) return;

    if (editingId) {
      setEvents(events.map((event) => event.id === editingId ? { ...form, id: editingId } : event));
    } else {
      setEvents([...events, { ...form, id: Date.now() }]);
    }

    setForm({ title: "", date: "", time: "", location: "", type: "Meeting" });
    setEditingId(null);
    setShowForm(false);
  }

  function editEvent(event) {
    setForm({
      title: event.title || "",
      date: event.date || "",
      time: event.time || "",
      location: event.location || "",
      type: event.type || "Meeting"
    });
    setEditingId(event.id);
    setShowForm(true);
  }

  function deleteEvent(id) {
    setEvents(events.filter((event) => event.id !== id));
  }

  function cancelForm() {
    setForm({ title: "", date: "", time: "", location: "", type: "Meeting" });
    setEditingId(null);
    setShowForm(false);
  }

  return (
    <>
      <div style={hero}>
        <p style={eyebrow}>Upcoming Events</p>
        <h1 style={title}>Calendar</h1>
        <p style={subtitle}>Track meetings, activities, and training.</p>
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

function DocsTab() {
  return (
    <>
      <div style={hero}>
        <p style={eyebrow}>Official CAP Resources</p>
        <h1 style={title}>Docs</h1>
        <p style={subtitle}>Quick links for cadets and parents.</p>
      </div>

      <div style={simpleCard}>
        <div>
          <strong style={blueText}>Legal / Safety Note</strong>
          <p style={cardText}>
            This app is an unofficial tracker. It does not connect to CAP eServices, does not collect passwords, and does not store CAP login credentials.
          </p>
          <p style={phaseText}>
            Use the official eServices link below for real CAP records, tests, and account access.
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
const sectionTitle = { color: "var(--text)", marginBottom: "12px" };
const card = { width: "100%", background: "var(--card-bg)", borderRadius: "18px", padding: "14px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "var(--shadow)", color: "var(--text)" };
const simpleCard = { width: "100%", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "18px", padding: "16px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "var(--shadow)", color: "var(--text)" };
const cardMainButton = { flex: 1, border: "none", background: "transparent", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--text)", padding: 0 };

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

const docCard = { width: "100%", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "18px", padding: "16px", marginBottom: "12px", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "var(--shadow)", color: "var(--text)", textDecoration: "none" };
const blueText = { color: "#0b82f0" };
const cardText = { margin: "6px 0 0", color: "var(--muted)", fontSize: "14px" };
const phaseText = { margin: "8px 0 0", color: "#2563eb", fontSize: "12px", fontWeight: "bold" };
const currentTag = { margin: "8px 0 0", color: "#ffffff", background: "#2563eb", display: "inline-block", padding: "4px 8px", borderRadius: "999px", fontSize: "11px", fontWeight: "bold" };
const doneTag = { margin: "8px 0 0", color: "#ffffff", background: "#22c55e", display: "inline-block", padding: "4px 8px", borderRadius: "999px", fontSize: "11px", fontWeight: "bold" };
const arrow = { fontSize: "32px", color: "#9ca3af" };
const backButton = { border: "none", background: "transparent", color: "#60a5fa", fontWeight: "bold", marginBottom: "12px", fontSize: "16px" };
const overview = { color: "var(--muted)", lineHeight: 1.5, marginBottom: "16px" };
const tabRow = { display: "flex", gap: "8px", marginBottom: "16px" };
const activeTabStyle = { flex: 1, padding: "12px", borderRadius: "12px", border: "none", background: "#111827", color: "white", fontWeight: "bold" };
const inactiveTabStyle = { flex: 1, padding: "12px", borderRadius: "12px", border: "none", background: "var(--soft-bg)", color: "var(--soft-text)", fontWeight: "bold" };
const listItem = { background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "14px", padding: "14px", marginBottom: "10px", color: "var(--text)", boxShadow: "var(--shadow)" };
const bottomNav = { position: "fixed", left: "50%", bottom: "18px", transform: "translateX(-50%)", width: "calc(100% - 32px)", maxWidth: "430px", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "24px", padding: "8px", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "6px", boxShadow: "0 12px 30px rgba(0,0,0,0.25)", zIndex: 10 };
const navButton = { border: "none", background: "transparent", color: "var(--muted)", borderRadius: "16px", padding: "10px 2px", fontWeight: "bold", fontSize: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" };
const activeNavButton = { ...navButton, background: "rgba(37, 99, 235, 0.18)", color: "#60a5fa" };
const navIcon = { fontSize: "18px" };
const statsRow = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" };
const statCard = { background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "18px", padding: "16px", boxShadow: "var(--shadow)" };
const statLabel = { margin: 0, color: "var(--muted)", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase" };
const statNumber = { margin: "6px 0 0", color: "#60a5fa", fontSize: "34px" };
const input = { width: "100%", border: "1px solid var(--card-border)", background: "var(--app-bg)", color: "var(--text)", borderRadius: "12px", padding: "12px", marginBottom: "10px", fontSize: "15px" };
const formCard = { background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "18px", padding: "16px", marginBottom: "16px", boxShadow: "var(--shadow)" };
const primaryButton = { width: "100%", border: "none", background: "#2563eb", color: "white", borderRadius: "14px", padding: "13px", fontWeight: "bold", marginBottom: "14px", fontSize: "15px" };
const secondaryButton = { width: "100%", border: "1px solid var(--card-border)", background: "var(--soft-bg)", color: "var(--soft-text)", borderRadius: "14px", padding: "13px", fontWeight: "bold", marginBottom: "4px", fontSize: "15px" };
const smallActionButton = { border: "none", background: "#2563eb", color: "white", borderRadius: "12px", padding: "10px 12px", fontWeight: "bold", marginTop: "12px" };
const actionRow = { display: "flex", gap: "8px", marginTop: "12px" };
const editButton = { border: "none", background: "#2563eb", color: "white", borderRadius: "10px", padding: "8px 12px", fontWeight: "bold", fontSize: "13px" };
const deleteButton = { border: "none", background: "#dc2626", color: "white", borderRadius: "10px", padding: "8px 12px", fontWeight: "bold", fontSize: "13px" };

const dashboardProfileCard = {
  background: "var(--card-bg)",
  border: "1px solid var(--card-border)",
  borderRadius: "18px",
  padding: "16px",
  marginBottom: "14px",
  boxShadow: "var(--shadow)",
  color: "var(--text)"
};

const dashboardGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
  marginBottom: "14px"
};

const miniCard = {
  background: "var(--card-bg)",
  border: "1px solid var(--card-border)",
  borderRadius: "18px",
  padding: "16px",
  boxShadow: "var(--shadow)",
  color: "var(--text)"
};

const miniTitle = {
  margin: "8px 0 0",
  color: "#60a5fa",
  fontSize: "16px",
  lineHeight: 1.2
};

const miniNumber = {
  margin: "8px 0 0",
  color: "#60a5fa",
  fontSize: "34px"
};

const quickButtonGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
  marginTop: "14px"
};

const quickButton = {
  border: "none",
  background: "#2563eb",
  color: "white",
  borderRadius: "16px",
  padding: "14px 10px",
  fontWeight: "bold",
  fontSize: "14px",
  boxShadow: "var(--shadow)"
};