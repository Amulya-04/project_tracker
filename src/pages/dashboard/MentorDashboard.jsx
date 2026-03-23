import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function MentorDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser || loggedInUser.role !== "mentor") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/", { replace: true });
  };

  const styles = {
    container: {
      padding: "30px",
      fontFamily: "Arial",
      backgroundColor: "#f4f6f9",
      minHeight: "100vh",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "40px",
    },
    title: {
      margin: 0,
      fontSize: "26px",
    },
    cardContainer: {
      display: "flex",
      gap: "20px",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    card: {
      background: "white",
      padding: "24px 20px",
      width: "220px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    icon: {
      fontSize: "32px",
      marginBottom: "10px",
    },
    cardTitle: {
      margin: "0 0 8px",
      fontSize: "16px",
    },
    cardDesc: {
      fontSize: "13px",
      color: "#666",
      marginBottom: "14px",
    },
    button: {
      padding: "8px 16px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#4CAF50",
      color: "white",
      cursor: "pointer",
      fontSize: "14px",
    },
    logoutButton: {
      padding: "8px 16px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#f44336",
      color: "white",
      cursor: "pointer",
    },
  };

  const cards = [
    {
      icon: "📦",
      title: "Create Batch",
      desc: "Create a new student batch",
      label: "Create Batch",
      path: "/create-batch",
    },
    {
      icon: "🗂️",
      title: "Manage Batches",
      desc: "View and manage all batches",
      label: "Manage Batches",
      path: "/batches",
    },
    {
      icon: "📊",
      title: "Projects Progress",
      desc: "Track project completion",
      label: "View Projects",
      path: "/projects",
    },
    {
      icon: "👥",
      title: "All Students",
      desc: "View all enrolled students",
      label: "View Students",
      path: "/students",
    },
    {
      icon: "➕",
      title: "Add Student",
      desc: "Add a student to a batch",
      label: "Add Student",
      path: "/add-student",
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Mentor Dashboard</h1>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div style={styles.cardContainer}>
        {cards.map((card, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.icon}>{card.icon}</div>
            <h3 style={styles.cardTitle}>{card.title}</h3>
            <p style={styles.cardDesc}>{card.desc}</p>
            <button style={styles.button} onClick={() => navigate(card.path)}>
              {card.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MentorDashboard;