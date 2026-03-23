import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [batchInfo, setBatchInfo] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
      navigate("/login", { replace: true });
      return;
    }

    setUser(loggedInUser);

    // Find batch this student belongs to
    // loggedInUser may have a batch field, or we find it from batches list
    const batches = JSON.parse(localStorage.getItem("batches")) || [];
    let foundBatch = null;

    // First try by loggedInUser.batch field
    if (loggedInUser.batch) {
      foundBatch = batches.find((b) => b.name === loggedInUser.batch);
    }

    // Fallback: search by student name in batches
    if (!foundBatch) {
      foundBatch = batches.find(
        (b) => b.students && b.students.includes(loggedInUser.name)
      );
    }

    if (foundBatch) {
      setBatchInfo(foundBatch);

      // Get project status
      const projects = JSON.parse(localStorage.getItem("projects")) || [];
      const proj = projects.find((p) => p.batch === foundBatch.name);
      if (proj) setProject(proj);
    }
  }, [navigate]);

  if (!user) return null;

  const getStatusColor = (status) => {
    const map = {
      Completed: "#d4edda",
      "In Progress": "#cce5ff",
      Testing: "#fff3cd",
      Started: "#e2d9f3",
      Pending: "#f8d7da",
      "Not Updated": "#e9ecef",
    };
    return map[status] || "#e9ecef";
  };

  const styles = {
    container: {
      padding: 30,
      fontFamily: "Arial",
      backgroundColor: "#f4f6f9",
      minHeight: "100vh",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 30,
    },
    title: { margin: 0, fontSize: "26px" },
    cardContainer: {
      display: "flex",
      justifyContent: "center",
      gap: 20,
      flexWrap: "wrap",
    },
    card: {
      background: "white",
      padding: 24,
      width: 240,
      borderRadius: 10,
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    cardTitle: { margin: "0 0 12px", fontSize: "16px", color: "#333" },
    button: {
      marginTop: 10,
      padding: "8px 14px",
      border: "none",
      borderRadius: 5,
      backgroundColor: "#2196F3",
      color: "white",
      cursor: "pointer",
    },
    statusBadge: {
      display: "inline-block",
      padding: "6px 14px",
      borderRadius: "12px",
      fontSize: "14px",
      fontWeight: "bold",
      marginTop: 8,
    },
    logoutButton: {
      padding: "8px 16px",
      border: "none",
      borderRadius: 5,
      backgroundColor: "#f44336",
      color: "white",
      cursor: "pointer",
    },
    noData: { color: "#999", fontSize: "14px" },
  };

  const status = project?.status || "Not Updated";

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Student Dashboard</h1>
        <button
          style={styles.logoutButton}
          onClick={() => {
            localStorage.removeItem("loggedInUser");
            navigate("/", { replace: true });
          }}
        >
          Logout
        </button>
      </div>

      <div style={styles.cardContainer}>
        {/* Student Name */}
        <div style={styles.card}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>👤</div>
          <h3 style={styles.cardTitle}>Student Name</h3>
          <p style={{ fontWeight: "bold", fontSize: "16px", margin: 0 }}>
            {user.name}
          </p>
        </div>

        {/* Batch Info */}
        <div style={styles.card}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🗂️</div>
          <h3 style={styles.cardTitle}>Batch</h3>
          {batchInfo ? (
            <>
              <p style={{ fontWeight: "bold", margin: "0 0 4px" }}>
                {batchInfo.name}
              </p>
              <p style={{ color: "#666", fontSize: "13px", margin: "0 0 10px" }}>
                Mentor: {batchInfo.mentor}
              </p>
              <button
                style={styles.button}
                onClick={() => navigate(`/batch-details/${batchInfo.name}`)}
              >
                View Batch
              </button>
            </>
          ) : (
            <p style={styles.noData}>No batch assigned</p>
          )}
        </div>

        {/* Project Info */}
        <div style={styles.card}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>📁</div>
          <h3 style={styles.cardTitle}>Project</h3>
          {batchInfo ? (
            <>
              <p style={{ fontWeight: "bold", margin: "0 0 8px" }}>
                {batchInfo.project}
              </p>
              <span
                style={{
                  ...styles.statusBadge,
                  background: getStatusColor(status),
                }}
              >
                {status}
              </span>
            </>
          ) : (
            <p style={styles.noData}>No project assigned</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;