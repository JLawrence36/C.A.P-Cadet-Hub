import { useState } from "react";

const ACHIEVEMENTS = [
  {
    id: 1,
    name: "Curry Achievement",
    rank: "Cadet Airman",
    abbr: "C/Amn",
    phase: "Phase I — Followership",
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
    phase: "Phase I — Followership",
    overview:
      "Second cadet achievement. Adds aerospace education and continued leadership, fitness, and drill development.",
    requirements: [
      "Minimum 8 weeks after Curry",
      "Wear the CAP uniform properly",
      "Complete Learn to Lead Chapter 2",
      "Complete Aerospace Dimensions Module 1",
      "Continue CPFT progress",
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
    phase: "Phase I — Followership",
    overview:
      "Third cadet achievement. Cadet begins preparing for more responsibility and the Wright Brothers milestone.",
    requirements: [
      "Minimum 8 weeks after Arnold",
      "Complete Learn to Lead Chapter 3",
      "Complete Aerospace Dimensions Module 2",
      "Continue CPFT progress",
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
      "Pass the Wright Brothers leadership exam",
      "Meet required fitness standard",
      "Complete required aerospace work",
      "Participate in character development",
      "Complete required drill evaluation"
    ],
    drill: [
      "Form the flight",
      "Report to commander",
      "Stationary commands",
      "Marching commands",
      "Open and close ranks",
      "Inspection procedures"
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

export default function App() {
  const [activeTab, setActiveTab] = useState("rank");
  const [selected, setSelected] = useState(null);
  const [detailTab, setDetailTab] = useState("requirements");

  function openAchievement(achievement) {
    setSelected(achievement);
    setDetailTab("requirements");
  }

  function goHomeTab(tab) {
    setActiveTab(tab);
    setSelected(null);
  }

  return (
    <div style={page}>
      <div style={container}>
        {selected ? (
          <AchievementDetail
            selected={selected}
            detailTab={detailTab}
            setDetailTab={setDetailTab}
            onBack={() => setSelected(null)}
          />
        ) : (
          <>
            {activeTab === "rank" && <RankTab onSelect={openAchievement} />}
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

function RankTab({ onSelect }) {
  return (
    <>
      <div style={hero}>
        <p style={eyebrow}>Civil Air Patrol Companion</p>
        <h1 style={title}>CAP Cadet Hub</h1>
        <p style={subtitle}>Track ranks, requirements, and drill.</p>
      </div>

      <h2 style={sectionTitle}>Rank Tracker</h2>

      {ACHIEVEMENTS.map((achievement) => (
        <button
          key={achievement.id}
          style={card}
          onClick={() => onSelect(achievement)}
        >
          <div>
            <strong style={blueText}>{achievement.name}</strong>
            <p style={cardText}>
              {achievement.rank} · {achievement.abbr}
            </p>
            <p style={phaseText}>{achievement.phase}</p>
          </div>
          <span style={arrow}>›</span>
        </button>
      ))}
    </>
  );
}

function AchievementDetail({ selected, detailTab, setDetailTab, onBack }) {
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
      </div>

      <p style={overview}>{selected.overview}</p>

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
        selected.requirements.map((item, index) => (
          <div key={index} style={listItem}>
            ✅ {item}
          </div>
        ))}

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
        <div key={event.id} style={card}>
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
        <div key={flight.id} style={card}>
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

const page = {
  minHeight: "100vh",
  background: "#f9fafb",
  padding: "24px 24px 110px"
};

const container = {
  maxWidth: "430px",
  margin: "0 auto"
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

const sectionTitle = {
  color: "#111827",
  marginBottom: "12px"
};

const card = {
  width: "100%",
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "18px",
  padding: "16px",
  marginBottom: "12px",
  textAlign: "left",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 6px 16px rgba(0,0,0,0.05)",
  color: "#111827"
};

const docCard = {
  width: "100%",
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "18px",
  padding: "16px",
  marginBottom: "12px",
  textAlign: "left",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 6px 16px rgba(0,0,0,0.05)",
  color: "#111827",
  textDecoration: "none"
};

const blueText = {
  color: "#0b82f0"
};

const cardText = {
  margin: "6px 0 0",
  color: "#6b7280",
  fontSize: "14px"
};

const phaseText = {
  margin: "8px 0 0",
  color: "#2563eb",
  fontSize: "12px",
  fontWeight: "bold"
};

const arrow = {
  fontSize: "32px",
  color: "#9ca3af"
};

const backButton = {
  border: "none",
  background: "transparent",
  color: "#2563eb",
  fontWeight: "bold",
  marginBottom: "12px",
  fontSize: "16px"
};

const overview = {
  color: "#374151",
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
  background: "#e5e7eb",
  color: "#374151",
  fontWeight: "bold"
};

const listItem = {
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  padding: "14px",
  marginBottom: "10px",
  color: "#111827",
  boxShadow: "0 4px 10px rgba(0,0,0,0.04)"
};

const bottomNav = {
  position: "fixed",
  left: "50%",
  bottom: "18px",
  transform: "translateX(-50%)",
  width: "calc(100% - 32px)",
  maxWidth: "430px",
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "24px",
  padding: "8px",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "6px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
  zIndex: 10
};

const navButton = {
  border: "none",
  background: "transparent",
  color: "#6b7280",
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
  background: "#dbeafe",
  color: "#1d4ed8"
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
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "18px",
  padding: "16px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.05)"
};

const statLabel = {
  margin: 0,
  color: "#6b7280",
  fontSize: "12px",
  fontWeight: "bold",
  textTransform: "uppercase"
};

const statNumber = {
  margin: "6px 0 0",
  color: "#1e3a8a",
  fontSize: "34px"
};