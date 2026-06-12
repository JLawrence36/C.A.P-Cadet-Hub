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

export default function App() {
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("requirements");

  if (selected) {
    return (
      <div style={page}>
        <div style={container}>
          <button style={backButton} onClick={() => setSelected(null)}>
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
              style={tab === "requirements" ? activeTab : inactiveTab}
              onClick={() => setTab("requirements")}
            >
              Requirements
            </button>
            <button
              style={tab === "drill" ? activeTab : inactiveTab}
              onClick={() => setTab("drill")}
            >
              Drill
            </button>
          </div>

          {tab === "requirements" &&
            selected.requirements.map((item, index) => (
              <div key={index} style={listItem}>
                ✅ {item}
              </div>
            ))}

          {tab === "drill" &&
            selected.drill.map((item, index) => (
              <div key={index} style={listItem}>
                🪖 {item}
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div style={page}>
      <div style={container}>
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
            onClick={() => {
              setSelected(achievement);
              setTab("requirements");
            }}
          >
            <div>
              <strong>{achievement.name}</strong>
              <p style={cardText}>
                {achievement.rank} · {achievement.abbr}
              </p>
              <p style={phaseText}>{achievement.phase}</p>
            </div>
            <span style={arrow}>›</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "#f9fafb",
  padding: "24px"
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
  boxShadow: "0 6px 16px rgba(0,0,0,0.05)"
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

const activeTab = {
  flex: 1,
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: "#111827",
  color: "white",
  fontWeight: "bold"
};

const inactiveTab = {
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