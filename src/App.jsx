export default function App() {
  return (
    <div style={{ minHeight: "100vh", padding: "24px", background: "#f9fafb" }}>
      <div
        style={{
          maxWidth: "420px",
          margin: "0 auto",
          background: "white",
          borderRadius: "20px",
          padding: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
        }}
      >
        <h1 style={{ marginTop: 0, color: "#1e3a8a" }}>CAP Cadet Hub</h1>
        <p>The app is loading correctly.</p>
        <button
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 16px",
            borderRadius: "12px",
            fontWeight: "bold"
          }}
        >
          Test Button
        </button>
      </div>
    </div>
  );
}
