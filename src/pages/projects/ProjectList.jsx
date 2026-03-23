import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProjectList() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user || user.role !== "mentor") {
      alert("Access denied. Only mentors can view this page.");
      navigate("/login");
      return;
    }

    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];

    // Filter projects assigned to this mentor
    const mentorProjects = storedProjects.filter((p) => p.mentor === user.name);
    setProjects(mentorProjects);
  }, [navigate]);

  const getStatusColor = (status) => {
    const map = {
      Completed: "#d4edda",
      "In Progress": "#cce5ff",
      Testing: "#fff3cd",
      Started: "#e2d9f3",
      Pending: "#f8d7da",
    };
    return map[status] || "#e9ecef";
  };

  const styles = {
    container: {
      padding: "40px",
      fontFamily: "Arial",
      minHeight: "100vh",
      background: "#f4f6f9",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
    },
    card: {
      background: "white",
      padding: "20px 24px",
      borderRadius: "10px",
      marginBottom: "15px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "10px",
    },
    info: {
      flex: 1,
    },
    title: {
      fontWeight: "bold",
      fontSize: "16px",
      marginBottom: "6px",
    },
    statusBadge: {
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: "12px",
      fontSize: "13px",
      fontWeight: "bold",
      marginTop: "6px",
    },
    updateButton: {
      padding: "8px 14px",
      border: "none",
      borderRadius: "5px",
      background: "#9C27B0",
      color: "white",
      cursor: "pointer",
      whiteSpace: "nowrap",
    },
    backButton: {
      padding: "8px 14px",
      border: "none",
      background: "#607D8B",
      color: "white",
      borderRadius: "5px",
      cursor: "pointer",
    },
    empty: {
      textAlign: "center",
      color: "#888",
      marginTop: "60px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{ margin: 0 }}>My Projects</h2>
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      {projects.length === 0 ? (
        <p style={styles.empty}>No projects assigned to you yet.</p>
      ) : (
        projects.map((project, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.info}>
              <div style={styles.title}>{project.projectName}</div>
              <div style={{ color: "#555", marginBottom: "4px" }}>
                Batch: <strong>{project.batch}</strong>
              </div>
              <span
                style={{
                  ...styles.statusBadge,
                  background: getStatusColor(project.status),
                }}
              >
                {project.status || "Pending"}
              </span>
            </div>

            {/* FIX: navigate with batch name, not project name */}
            <button
              style={styles.updateButton}
              onClick={() => navigate(`/update-project/${project.batch}`)}
            >
              Update Status
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ProjectList;