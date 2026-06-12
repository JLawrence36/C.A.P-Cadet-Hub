import { useEffect, useState } from "react";

const ACHIEVEMENTS = [
  {
    id: 1,
    name: "Curry Achievement",
    rank: "Cadet Airman",
    abbr: "C/Amn",
    phase: "Phase I — Learning / Followership",
    overview:
      "Your first CAP cadet achievement. Focus on the Cadet Oath, core values, uniform basics, fitness attempt, and basic drill.",
    requirements: [
      "Be a current CAP cadet",
      "Recite the Cadet Oath from memory",
      "Complete the Cadet Welcome Course",
      "Complete Learn to Lead Chapter 1",
      "Attempt the Cadet Physical Fitness Test",
      "Participate in character development"
    ],
    drill: [
      "Fall In",
      "Attention",
      "Parade Rest",
      "Present Arms",
      "Order Arms",
      "Right Face",
      "Left Face",
      "About Face",
      "Dress Right Dress",
      "Ready Front",
      "Forward March",
      "Flight Halt"
    ]
  },
  {
    id: 2,
    name: "Arnold Achievement",
    rank: "Cadet Airman First Class",
    abbr: "C/A1C",
    phase: "Phase I — Learning / Followership",
    overview:
      "Second cadet achievement. Adds aerospace education and continued leadership, fitness, and drill development.",
    requirements: [
      "Minimum 8 weeks after Curry",
      "Wear the CAP uniform properly",
      "Complete Learn to Lead Chapter 2",
      "Complete an Aerospace Dimensions module",
      "Participate in one fitness activity and have attempted CPFT within 180 days",
      "Attend character development"
    ],
    drill: [
      "All Curry drill",
      "Forward March",
      "Flight Halt",
      "Column Right",
      "Column Left",
      "To the Rear March",
      "Change Step March"
    ]
  },
  {
    id: 3,
    name: "Feik Achievement",
    rank: "Cadet Senior Airman",
    abbr: "C/SrA",
    phase: "Phase I — Learning / Followership",
    overview:
      "Third cadet achievement. Cadet begins preparing for more responsibility and the Wright Brothers milestone.",
    requirements: [
      "Minimum 8 weeks after Arnold",
      "Complete Learn to Lead Chapter 3",
      "Complete an Aerospace Dimensions module",
      "Participate in one fitness activity and have attempted CPFT within 180 days",
      "Attend character development"
    ],
    drill: [
      "All previous drill",
      "Open Ranks",
      "Close Ranks",
      "Count Off",
      "Element leader basics"
    ]
  },
  {
    id: 4,
    name: "Wright Brothers Award",
    rank: "Cadet Staff Sergeant",
    abbr: "C/SSgt",
    phase: "Phase I — Milestone",
    overview:
      "The first major cadet milestone. Completing this earns NCO rank and closes Phase I.",
    requirements: [
      "Minimum 8 weeks after Feik",
      "Pass the Wright Brothers leadership exam covering Learn to Lead Chapters 1–3",
      "Complete required aerospace work",
      "Participate in one fitness activity and have attained HFZ within 180 days",
      "Complete comprehensive drill evaluation",
      "Meet general advancement requirements"
    ],
    drill: [
      "Form the flight",
      "Report to commander",
      "Stationary commands",
      "Marching commands",
      "Open and close ranks",
      "Inspection procedures"
    ]
  },
  {
    id: 5,
    name: "Rickenbacker Achievement",
    rank: "Cadet Technical Sergeant",
    abbr: "C/TSgt",
    phase: "Phase II — Leadership",
    overview:
      "The first Phase II achievement. Cadet begins developing as an NCO and starts taking more responsibility in the flight.",
    requirements: [
      "Minimum 8 weeks after Wright Brothers",
      "Complete Learn to Lead Chapter 4",
      "Complete an Aerospace Dimensions module",
      "Participate in one fitness activity and have attained HFZ within 180 days",
      "Attend character development",
      "Complete required drill performance test"
    ],
    drill: [
      "NCO-level drill leadership",
      "Form and align flight",
      "Open Ranks",
      "Close Ranks",
      "Column movements",
      "Command voice and bearing"
    ]
  },
  {
    id: 6,
    name: "Achievement 5",
    rank: "Cadet Master Sergeant",
    abbr: "C/MSgt",
    phase: "Phase II — Leadership",
    overview:
      "Achievement 5 is currently unnamed in the CAP progression. Cadet continues NCO leadership development.",
    requirements: [
      "Minimum 8 weeks after Rickenbacker",
      "Complete Learn to Lead Chapter 5",
      "Complete an Aerospace Dimensions module",
      "Participate in one fitness activity and have attained HFZ within 180 days",
      "Attend character development",
      "Complete required drill performance test"
    ],
    drill: [
      "Lead basic flight drill",
      "Maintain alignment and cover",
      "Stationary commands",
      "Marching commands",
      "Inspection preparation",
      "Mentor junior cadets"
    ]
  },
  {
    id: 7,
    name: "Doolittle Achievement",
    rank: "Cadet Senior Master Sergeant",
    abbr: "C/SMSgt",
    phase: "Phase II — Leadership",
    overview:
      "A senior NCO achievement. Cadet is expected to show stronger leadership, responsibility, and mentorship of junior cadets.",
    requirements: [
      "Minimum 8 weeks after Achievement 5",
      "Complete Learn to Lead Chapter 6",
      "Complete an Aerospace Dimensions module",
      "Participate in one fitness activity and have attained HFZ within 180 days",
      "Attend character development",
      "Complete required drill performance test"
    ],
    drill: [
      "Advanced NCO drill leadership",
      "Flight formation",
      "Column movements",
      "Open and close ranks",
      "Command presence",
      "Correct junior cadet drill errors"
    ]
  },
  {
    id: 8,
    name: "Goddard Achievement",
    rank: "Cadet Chief Master Sergeant",
    abbr: "C/CMSgt",
    phase: "Phase II — Leadership",
    overview:
      "A senior Phase II achievement. Cadet should be capable of helping train, correct, and lead other cadets.",
    requirements: [
      "Minimum 8 weeks after Doolittle",
      "Complete Learn to Lead Chapter 7",
      "Complete an Aerospace Dimensions module",
      "Participate in one fitness activity and have attained HFZ within 180 days",
      "Attend character development",
      "Complete required drill performance test"
    ],
    drill: [
      "Senior NCO drill role",
      "Lead flight-level drill",
      "Inspect formation",
      "Prepare cadets for evaluations",
      "Teach facing movements",
      "Teach marching movements"
    ]
  },
  {
    id: 9,
    name: "Armstrong Achievement",
    rank: "Cadet Chief Master Sergeant",
    abbr: "C/CMSgt",
    phase: "Phase II — Leadership",
    overview:
      "The final NCO achievement before the Mitchell Award. Cadet should be preparing for officer-level responsibility.",
    requirements: [
      "Minimum 8 weeks after Goddard",
      "Complete Learn to Lead Chapter 8",
      "Complete an Aerospace Dimensions module",
      "Participate in one fitness activity and have attained HFZ within 180 days",
      "Attend character development",
      "Complete required drill performance test",
      "Complete required speech and essay work"
    ],
    drill: [
      "High-level NCO drill leadership",
      "Flight sergeant duties",
      "Form the flight",
      "Report to commander",
      "Inspection support",
      "Mentor junior NCOs"
    ]
  },
  {
    id: 10,
    name: "Billy Mitchell Award",
    rank: "Cadet Second Lieutenant",
    abbr: "C/2d Lt",
    phase: "Phase II — Milestone",
    overview:
      "The Mitchell Award is a major milestone. Cadet transitions from NCO to officer and completes Phase II.",
    requirements: [
      "Minimum 8 weeks after Armstrong",
      "Pass comprehensive closed-book leadership exam covering Learn to Lead Chapters 4–8",
      "Pass comprehensive aerospace exam covering Aerospace Dimensions Modules 1–7",
      "Participate in one fitness activity and have attained HFZ within 180 days",
      "Graduate encampment before earning the award",
      "Meet general advancement requirements"
    ],
    drill: [
      "Demonstrate mastery of Phase II drill",
      "Lead flight-level drill confidently",
      "Understand inspection procedures",
      "Use proper command voice",
      "Mentor junior cadets",
      "Prepare for officer leadership role"
    ]
  },
  {
    id: 11,
    name: "Achievement 9",
    rank: "Cadet Second Lieutenant",
    abbr: "C/2d Lt",
    phase: "Phase III — Command",
    overview:
      "The first Phase III achievement. Cadet now operates as a junior officer and begins more formal staff-duty work.",
    requirements: [
      "Minimum 8 weeks after Mitchell",
      "Complete Learn to Lead Chapter 9",
      "Complete SDA service, writing, and presentation requirement",
      "Complete Journey of Flight aerospace block test",
      "Participate in one fitness activity and have attained HFZ within 180 days",
      "Attend character development"
    ],
    drill: [
      "No new drill test in this phase",
      "Maintain mastery of previous drill",
      "Teach junior cadets basic drill",
      "Evaluate command voice",
      "Support flight-level drill training"
    ]
  },
  {
    id: 12,
    name: "Willa Brown Achievement",
    rank: "Cadet First Lieutenant",
    abbr: "C/1st Lt",
    phase: "Phase III — Command",
    overview:
      "Named for Willa Brown. Cadet continues officer development, staff-duty analysis, and command-level responsibility.",
    requirements: [
      "Minimum 8 weeks after Achievement 9",
      "Complete Learn to Lead Chapter 10",
      "Complete SDA service, writing, and presentation requirement",
      "Complete Journey of Flight aerospace block test",
      "Participate in one fitness activity and have attained HFZ within 180 days",
      "Attend character development"
    ],
    drill: [
      "No new drill test in this phase",
      "Supervise cadet drill instruction",
      "Mentor NCOs leading formations",
      "Support inspections and ceremonies",
      "Demonstrate officer bearing"
    ]
  },
  {
    id: 13,
    name: "Achievement 11",
    rank: "Cadet First Lieutenant",
    abbr: "C/1st Lt",
    phase: "Phase III — Command",
    overview:
      "Achievement 11 is currently unnamed. Cadet continues command-phase leadership and staff work before Earhart.",
    requirements: [
      "Minimum 8 weeks after Willa Brown",
      "Complete Learn to Lead Chapter 11",
      "Complete SDA service, writing, and presentation requirement",
      "Complete Journey of Flight aerospace block test",
      "Participate in one fitness activity and have attained HFZ within 180 days",
      "Attend character development"
    ],
    drill: [
      "No new drill test in this phase",
      "Coach junior cadet leaders",
      "Help run formation procedures",
      "Prepare cadets for drill evaluations",
      "Support ceremonies"
    ]
  },
  {
    id: 14,
    name: "Amelia Earhart Award",
    rank: "Cadet Captain",
    abbr: "C/Capt",
    phase: "Phase III — Milestone",
    overview:
      "The Earhart Award is the Phase III milestone. Cadet demonstrates command-level leadership and earns Cadet Captain.",
    requirements: [
      "Minimum 8 weeks after Achievement 11",
      "Pass comprehensive closed-book leadership exam covering Learn to Lead Chapters 9–11",
      "Participate in one fitness activity and have attained HFZ within 180 days",
      "Meet general advancement requirements",
      "No aerospace requirement for this milestone",
      "No character activity requirement for this milestone"
    ],
    drill: [
      "No new drill test",
      "Expected to mentor and evaluate junior cadets",
      "Support unit ceremonies",
      "Supervise drill instruction",
      "Model command presence"
    ]
  },
  {
    id: 15,
    name: "Achievement 12",
    rank: "Cadet Captain",
    abbr: "C/Capt",
    phase: "Phase IV — Executive",
    overview:
      "The first Phase IV achievement. Cadet begins executive-level leadership and more advanced staff work.",
    requirements: [
      "Minimum 8 weeks after Earhart",
      "Complete Learn to Lead Chapter 12",
      "Complete SDA service, writing, and presentation requirement",
      "No aerospace requirement",
      "Participate in one fitness activity and have attained HFZ within 180 days",
      "Attend character development"
    ],
    drill: [
      "No new drill test",
      "Oversee training rather than only executing drill",
      "Help plan inspections and ceremonies",
      "Coach cadet staff",
      "Maintain mastery of prior drill"
    ]
  },
  {
    id: 16,
    name: "Achievement 13",
    rank: "Cadet Captain",
    abbr: "C/Capt",
    phase: "Phase IV — Executive",
    overview:
      "Cadet continues executive-phase growth with staff service, writing, and presentation requirements.",
    requirements: [
      "Minimum 8 weeks after Achievement 12",
      "Complete Learn to Lead Chapter 13",
      "Complete SDA service, writing, and presentation requirement",
      "No aerospace requirement",
      "Participate in one fitness activity and have attained HFZ within 180 days",
      "Attend character development"
    ],
    drill: [
      "No new drill test",
      "Mentor cadet officers and NCOs",
      "Support squadron-level drill standards",
      "Prepare cadets for ceremonies",
      "Maintain command presence"
    ]
  },
  {
    id: 17,
    name: "Boyd Achievement",
    rank: "Cadet Major",
    abbr: "C/Maj",
    phase: "Phase IV — Executive",
    overview:
      "Named for Col. George Boyd. Cadet advances to field-grade officer rank and continues executive leadership development.",
    requirements: [
      "Minimum 8 weeks after Achievement 13",
      "Complete Learn to Lead Chapter 14",
      "Complete SDA service, writing, and presentation requirement",
      "Complete Journey of Flight aerospace block test",
      "Participate in one fitness activity and have attained HFZ within 180 days",
      "Attend character development"
    ],
    drill: [
      "No new drill test",
      "Supervise unit drill training",
      "Support cadet staff development",
      "Lead by example during formations",
      "Coach ceremony preparation"
    ]
  },
  {
    id: 18,
    name: "Sally Ride Achievement",
    rank: "Cadet Major",
    abbr: "C/Maj",
    phase: "Phase IV — Executive",
    overview:
      "Named for Dr. Sally Ride. Cadet continues executive leadership with staff service and aerospace study.",
    requirements: [
      "Minimum 8 weeks after Boyd",
      "Complete Learn to Lead Chapter 15",
      "Complete SDA service, writing, and presentation requirement",
      "Complete Journey of Flight aerospace block test",
      "Participate in one fitness activity and have attained HFZ within 180 days",
      "Attend character development"
    ],
    drill: [
      "No new drill test",
      "Manage and mentor cadet leaders",
      "Support inspections and ceremonies",
      "Maintain drill expertise",
      "Teach standards through subordinate leaders"
    ]
  },
  {
    id: 19,
    name: "Achievement 16",
    rank: "Cadet Major",
    abbr: "C/Maj",
    phase: "Phase IV — Executive",
    overview:
      "The final regular achievement before the Eaker Award. Cadet should be operating as a senior cadet leader.",
    requirements: [
      "Minimum 8 weeks after Sally Ride",
      "Complete Learn to Lead Chapter 16",
      "Complete SDA service, writing, and presentation requirement",
      "Complete Journey of Flight aerospace block test",
      "Participate in one fitness activity and have attained HFZ within 180 days",
      "Attend character development"
    ],
    drill: [
      "No new drill test",
      "Senior-level mentorship of drill and ceremonies",
      "Prepare cadet staff for evaluations",
      "Support unit command team",
      "Model senior cadet leadership"
    ]
  },
  {
    id: 20,
    name: "Ira C. Eaker Award",
    rank: "Cadet Lieutenant Colonel",
    abbr: "C/Lt Col",
    phase: "Phase IV — Milestone",
    overview:
      "The Eaker Award is the Phase IV milestone. Cadet completes executive-phase leadership requirements and becomes a Cadet Lieutenant Colonel.",
    requirements: [
      "Minimum 8 weeks after Achievement 16",
      "Complete required speech and essay",
      "Participate in one fitness activity and have attained HFZ within 180 days",
      "Graduate from a leadership academy before earning the award",
      "Meet general advancement requirements",
      "No aerospace requirement for this milestone",
      "No character activity requirement for this milestone"
    ],
    drill: [
      "No new drill test",
      "Expected to mentor cadets across the unit",
      "Support advanced ceremonies",
      "Guide cadet staff",
      "Maintain mastery of CAP drill and ceremonies"
    ]
  },
  {
    id: 21,
    name: "Carl A. Spaatz Award",
    rank: "Cadet Colonel",
    abbr: "C/Col",
    phase: "Pinnacle Award",
    overview:
      "The Spaatz Award is the highest cadet achievement in Civil Air Patrol. It requires comprehensive exams and exceptional cadet performance.",
    requirements: [
      "Earn the Ira C. Eaker Award",
      "Pass comprehensive leadership exam covering Learn to Lead Chapters 1–16",
      "Pass comprehensive aerospace exam covering Journey of Flight",
      "Pass the USAF Academy Candidate Fitness Assessment",
      "Complete required essay exam",
      "Meet general advancement requirements"
    ],
    drill: [
      "No additional drill test",
      "Expected to demonstrate complete mastery",
      "Teach and mentor cadet leaders",
      "Support unit, group, and wing-level ceremonies",
      "Represent the highest standard of cadet leadership"
    ]
  }
];

const EVENTS = [
  {
    id: 1,
    title: "Weekly Squadron Meeting",
    date: "June 16",
    time: "1900",
    location: "Squadron HQ",
    type: "Meeting"
  },
  {
    id: 2,
    title: "Aerospace Education Night",
    date: "June 23",
    time: "1830",
    location: "Classroom",
    type: "Education"
  }
];

const FLIGHTS = [
  {
    id: 1,
    aircraft: "Cessna 172",
    date: "May 10",
    duration: "1.2 hrs",
    type: "Orientation Flight"
  },
  {
    id: 2,
    aircraft: "Cessna 172",
    date: "May 28",
    duration: "0.9 hrs",
    type: "Orientation Flight"
  }
];

const DOCS = [
  {
    id: 1,
    name: "Cadet Achievement Requirements",
    category: "Cadet Program",
    url: "https://www.gocivilairpatrol.com/programs/cadets/stripes-to-diamonds"
  },
  {
    id: 2,
    name: "eServices Login",
    category: "Online Learning",
    url: "https://eservices.cap.gov"
  },
  {
    id: 3,
    name: "CAPP 60-33 Drill & Ceremonies",
    category: "Drill",
    url: "https://www.gocivilairpatrol.com/media/cms/CAPP6020_5_AUG_16_07A0C6200BA4C.pdf"
  },
  {
    id: 4,
    name: "CAPP 60-34 Practical Drill Tests",
    category: "Drill",
    url: "https://www.gocivilairpatrol.com/media/cms/CAPP_6034_Sept_24_3e0cc652c818b.pdf"
  }
];

function loadSaved(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState("rank");
  const [selected, setSelected] = useState(null);
  const [detailTab, setDetailTab] = useState("requirements");

  const [completedIds, setCompletedIds] = useState(() =>
    loadSaved("cap_completed_ids", [])
  );

  const [requirementChecks, setRequirementChecks] = useState(() =>
    loadSaved("cap_requirement_checks", {})
  );

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("cap_theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("cap_completed_ids", JSON.stringify(completedIds));
  }, [completedIds]);

  useEffect(() => {
    localStorage.setItem(
      "cap_requirement_checks",
      JSON.stringify(requirementChecks)
    );
  }, [requirementChecks]);

  useEffect(() => {
    localStorage.setItem("cap_theme", theme);
  }, [theme]);

  const validCompletedIds = completedIds.filter((id) =>
    ACHIEVEMENTS.some((a) => a.id === id)
  );

  const completedCount = validCompletedIds.length;
  const progress = Math.round((completedCount / ACHIEVEMENTS.length) * 100);

  const isDark = theme === "dark";
  const themeVars = getThemeVars(isDark);

  const currentAchievement =
    ACHIEVEMENTS.find((a) => !validCompletedIds.includes(a.id)) ||
    ACHIEVEMENTS[ACHIEVEMENTS.length - 1];

  function toggleCompleted(id) {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function toggleRequirement(achievementId, index) {
    const key = `${achievementId}-${index}`;

    setRequirementChecks((prev) => {
      const next = {
        ...prev,
        [key]: !prev[key]
      };

      const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);

      if (achievement) {
        const allRequirementsChecked = achievement.requirements.every(
          (_, reqIndex) => next[`${achievementId}-${reqIndex}`]
        );

        setCompletedIds((current) => {
          if (allRequirementsChecked) {
            return current.includes(achievementId)
              ? current
              : [...current, achievementId];
          }

          return current.filter((id) => id !== achievementId);
        });
      }

      return next;
    });
  }

  function toggleTheme() {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  }

  function openAchievement(achievement) {
    setSelected(achievement);
    setDetailTab("requirements");
  }

  function goHomeTab(tab) {
    setActiveTab(tab);
    setSelected(null);
  }

  return (
    <div style={{ ...page, ...themeVars }}>
      <button style={themeButton} onClick={toggleTheme}>
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
            {activeTab === "rank" && (
              <RankTab
                onSelect={openAchievement}
                completedIds={validCompletedIds}
                toggleCompleted={toggleCompleted}
                progress={progress}
                currentAchievement={currentAchievement}
                completedCount={completedCount}
              />
            )}
            {activeTab === "calendar" && <CalendarTab />}
            {activeTab === "flights" && <FlightsTab />}
            {activeTab === "docs" && <DocsTab />}
          </>
        )}
      </div>

      {!selected && (
        <nav style={bottomNav}>
          <button
            style={activeTab === "rank" ? activeNavButton : navButton}
            onClick={() => goHomeTab("rank")}
          >
            <span style={navIcon}>⭐</span>
            <span>Rank</span>
          </button>

          <button
            style={activeTab === "calendar" ? activeNavButton : navButton}
            onClick={() => goHomeTab("calendar")}
          >
            <span style={navIcon}>📅</span>
            <span>Calendar</span>
          </button>

          <button
            style={activeTab === "flights" ? activeNavButton : navButton}
            onClick={() => goHomeTab("flights")}
          >
            <span style={navIcon}>✈️</span>
            <span>Flights</span>
          </button>

          <button
            style={activeTab === "docs" ? activeNavButton : navButton}
            onClick={() => goHomeTab("docs")}
          >
            <span style={navIcon}>📁</span>
            <span>Docs</span>
          </button>
        </nav>
      )}
    </div>
  );
}

function RankTab({
  onSelect,
  completedIds,
  toggleCompleted,
  progress,
  currentAchievement,
  completedCount
}) {
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
          <p style={progressText}>
            {completedCount} of {ACHIEVEMENTS.length} completed
          </p>
        </div>
      </div>

      <div style={currentBox}>
        <p style={smallLabel}>Current Target</p>
        <strong>{currentAchievement.name}</strong>
        <p style={cardText}>
          {currentAchievement.rank} · {currentAchievement.abbr}
        </p>
      </div>

      <h2 style={sectionTitle}>Rank Tracker</h2>

      {ACHIEVEMENTS.map((achievement) => {
        const done = completedIds.includes(achievement.id);
        const isCurrent = currentAchievement.id === achievement.id && !done;

        return (
          <div
            key={achievement.id}
            style={{
              ...card,
              border: isCurrent
                ? "2px solid #2563eb"
                : done
                ? "2px solid #22c55e"
                : "1px solid var(--card-border)"
            }}
          >
            <button
              style={checkButton(done)}
              onClick={() => toggleCompleted(achievement.id)}
            >
              {done ? "✓" : ""}
            </button>

            <button style={cardMainButton} onClick={() => onSelect(achievement)}>
              <div>
                <strong style={blueText}>{achievement.name}</strong>
                <p style={cardText}>
                  {achievement.rank} · {achievement.abbr}
                </p>
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

function AchievementDetail({
  selected,
  detailTab,
  setDetailTab,
  onBack,
  completedIds,
  toggleCompleted,
  requirementChecks,
  toggleRequirement
}) {
  const done = completedIds.includes(selected.id);

  const checkedRequirements = selected.requirements.filter((_, index) => {
    return requirementChecks[`${selected.id}-${index}`];
  }).length;

  const requirementProgress = Math.round(
    (checkedRequirements / selected.requirements.length) * 100
  );

  return (
    <>
      <button style={backButton} onClick={onBack}>
        ← Back
      </button>

      <div style={hero}>
        <p style={eyebrow}>{selected.phase}</p>
        <h1 style={title}>{selected.name}</h1>
        <p style={subtitle}>
          {selected.rank} · {selected.abbr}
        </p>

        <button
          style={detailCompleteButton(done)}
          onClick={() => toggleCompleted(selected.id)}
        >
          {done ? "✓ Marked Complete" : "Mark Achievement Complete"}
        </button>
      </div>

      <p style={overview}>{selected.overview}</p>

      <div style={requirementProgressBox}>
        <div style={progressHeaderDark}>
          <span>Requirement Progress</span>
          <strong>{requirementProgress}%</strong>
        </div>

        <div style={progressBarLight}>
          <div style={{ ...progressFillBlue, width: `${requirementProgress}%` }} />
        </div>

        <p style={requirementProgressText}>
          {checkedRequirements} of {selected.requirements.length} requirements
          checked
        </p>
      </div>

      <div style={tabRow}>
        <button
          style={detailTab === "requirements" ? activeTabStyle : inactiveTabStyle}
          onClick={() => setDetailTab("requirements")}
        >
          Requirements
        </button>
        <button
          style={detailTab === "drill" ? activeTabStyle : inactiveTabStyle}
          onClick={() => setDetailTab("drill")}
        >
          Drill
        </button>
      </div>

      {detailTab === "requirements" &&
        selected.requirements.map((item, index) => {
          const checked = requirementChecks[`${selected.id}-${index}`];

          return (
            <button
              key={index}
              style={requirementItem(checked)}
              onClick={() => toggleRequirement(selected.id, index)}
            >
              <span style={requirementCircle(checked)}>
                {checked ? "✓" : ""}
              </span>

              <span style={requirementText(checked)}>{item}</span>
            </button>
          );
        })}

      {detailTab === "drill" &&
        selected.drill.map((item, index) => (
          <div key={index} style={listItem}>
            🪖 {item}
          </div>
        ))}
    </>
  );
}

function CalendarTab() {
  return (
    <>
      <div style={hero}>
        <p style={eyebrow}>Upcoming Events</p>
        <h1 style={title}>Calendar</h1>
        <p style={subtitle}>Track meetings, activities, and training.</p>
      </div>

      {EVENTS.map((event) => (
        <div key={event.id} style={simpleCard}>
          <div>
            <strong style={blueText}>{event.title}</strong>
            <p style={cardText}>
              {event.date} · {event.time}
            </p>
            <p style={phaseText}>
              {event.type} · {event.location}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

function FlightsTab() {
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
          <h2 style={statNumber}>{FLIGHTS.length}</h2>
        </div>
        <div style={statCard}>
          <p style={statLabel}>Hours</p>
          <h2 style={statNumber}>2.1</h2>
        </div>
      </div>

      {FLIGHTS.map((flight) => (
        <div key={flight.id} style={simpleCard}>
          <div>
            <strong style={blueText}>{flight.aircraft}</strong>
            <p style={cardText}>
              {flight.date} · {flight.type}
            </p>
            <p style={phaseText}>{flight.duration}</p>
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
        <p style={eyebrow}>Resources</p>
        <h1 style={title}>Docs</h1>
        <p style={subtitle}>Quick links for cadets and parents.</p>
      </div>

      {DOCS.map((doc) => (
        <a
          key={doc.id}
          href={doc.url}
          target="_blank"
          rel="noreferrer"
          style={docCard}
        >
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

const page = {
  minHeight: "100vh",
  background: "var(--app-bg)",
  padding: "24px 24px 110px",
  color: "var(--text)",
  transition: "background 0.2s ease, color 0.2s ease"
};

const container = {
  maxWidth: "430px",
  margin: "0 auto"
};

const themeButton = {
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
};

const hero = {
  background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
  color: "white",
  borderRadius: "24px",
  padding: "24px",
  marginBottom: "20px",
  boxShadow: "0 12px 30px rgba(37, 99, 235, 0.25)"
};

const eyebrow = {
  margin: 0,
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "1px",
  color: "#bfdbfe",
  fontWeight: "bold"
};

const title = {
  margin: "8px 0 4px",
  fontSize: "30px"
};

const subtitle = {
  margin: 0,
  color: "#dbeafe"
};

const progressBox = {
  marginTop: "18px",
  background: "rgba(255,255,255,0.14)",
  borderRadius: "16px",
  padding: "14px"
};

const progressHeader = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "14px",
  marginBottom: "8px"
};

const progressHeaderDark = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "14px",
  marginBottom: "8px",
  color: "var(--text)"
};

const progressBar = {
  height: "10px",
  background: "rgba(255,255,255,0.25)",
  borderRadius: "999px",
  overflow: "hidden"
};

const progressFill = {
  height: "100%",
  background: "#facc15",
  borderRadius: "999px"
};

const progressText = {
  margin: "8px 0 0",
  fontSize: "12px",
  color: "#dbeafe"
};

const currentBox = {
  background: "var(--card-bg)",
  border: "1px solid var(--card-border)",
  borderRadius: "18px",
  padding: "16px",
  marginBottom: "20px",
  boxShadow: "var(--shadow)",
  color: "var(--text)"
};

const smallLabel = {
  margin: "0 0 6px",
  color: "#2563eb",
  fontSize: "12px",
  fontWeight: "bold",
  textTransform: "uppercase"
};

const sectionTitle = {
  color: "var(--text)",
  marginBottom: "12px"
};

const card = {
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
};

const simpleCard = {
  width: "100%",
  background: "var(--card-bg)",
  border: "1px solid var(--card-border)",
  borderRadius: "18px",
  padding: "16px",
  marginBottom: "12px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  boxShadow: "var(--shadow)",
  color: "var(--text)"
};

const cardMainButton = {
  flex: 1,
  border: "none",
  background: "transparent",
  textAlign: "left",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "var(--text)",
  padding: 0
};

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

const requirementProgressBox = {
  background: "var(--card-bg)",
  border: "1px solid var(--card-border)",
  borderRadius: "18px",
  padding: "16px",
  marginBottom: "16px",
  boxShadow: "var(--shadow)",
  color: "var(--text)"
};

const progressBarLight = {
  height: "10px",
  background: "var(--soft-bg)",
  borderRadius: "999px",
  overflow: "hidden"
};

const progressFillBlue = {
  height: "100%",
  background: "#2563eb",
  borderRadius: "999px"
};

const requirementProgressText = {
  margin: "8px 0 0",
  fontSize: "12px",
  color: "var(--muted)"
};

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

const docCard = {
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
};

const blueText = {
  color: "#0b82f0"
};

const cardText = {
  margin: "6px 0 0",
  color: "var(--muted)",
  fontSize: "14px"
};

const phaseText = {
  margin: "8px 0 0",
  color: "#2563eb",
  fontSize: "12px",
  fontWeight: "bold"
};

const currentTag = {
  margin: "8px 0 0",
  color: "#ffffff",
  background: "#2563eb",
  display: "inline-block",
  padding: "4px 8px",
  borderRadius: "999px",
  fontSize: "11px",
  fontWeight: "bold"
};

const doneTag = {
  margin: "8px 0 0",
  color: "#ffffff",
  background: "#22c55e",
  display: "inline-block",
  padding: "4px 8px",
  borderRadius: "999px",
  fontSize: "11px",
  fontWeight: "bold"
};

const arrow = {
  fontSize: "32px",
  color: "#9ca3af"
};

const backButton = {
  border: "none",
  background: "transparent",
  color: "#60a5fa",
  fontWeight: "bold",
  marginBottom: "12px",
  fontSize: "16px"
};

const overview = {
  color: "var(--muted)",
  lineHeight: 1.5,
  marginBottom: "16px"
};

const tabRow = {
  display: "flex",
  gap: "8px",
  marginBottom: "16px"
};

const activeTabStyle = {
  flex: 1,
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: "#111827",
  color: "white",
  fontWeight: "bold"
};

const inactiveTabStyle = {
  flex: 1,
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: "var(--soft-bg)",
  color: "var(--soft-text)",
  fontWeight: "bold"
};

const listItem = {
  background: "var(--card-bg)",
  border: "1px solid var(--card-border)",
  borderRadius: "14px",
  padding: "14px",
  marginBottom: "10px",
  color: "var(--text)",
  boxShadow: "var(--shadow)"
};

const bottomNav = {
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
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "6px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
  zIndex: 10
};

const navButton = {
  border: "none",
  background: "transparent",
  color: "var(--muted)",
  borderRadius: "16px",
  padding: "10px 4px",
  fontWeight: "bold",
  fontSize: "11px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "3px"
};

const activeNavButton = {
  ...navButton,
  background: "rgba(37, 99, 235, 0.18)",
  color: "#60a5fa"
};

const navIcon = {
  fontSize: "18px"
};

const statsRow = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
  marginBottom: "14px"
};

const statCard = {
  background: "var(--card-bg)",
  border: "1px solid var(--card-border)",
  borderRadius: "18px",
  padding: "16px",
  boxShadow: "var(--shadow)"
};

const statLabel = {
  margin: 0,
  color: "var(--muted)",
  fontSize: "12px",
  fontWeight: "bold",
  textTransform: "uppercase"
};

const statNumber = {
  margin: "6px 0 0",
  color: "#60a5fa",
  fontSize: "34px"
};