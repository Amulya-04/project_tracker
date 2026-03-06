import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProjectList() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Get logged-in user
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user || user.role !== "mentor") {
      alert("Access denied. Only mentors can view this page.");
      navigate("/login");
      return;
    }

    // Get all projects from localStorage
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];

    // Filter projects assigned to this mentor
    const mentorProjects = storedProjects.filter(
      (p) => p.mentor === user.name
    );

    setProjects(mentorProjects);
  }, [navigate]);

  const styles = {
    container: {
      padding: "40px",
      fontFamily: "Arial",
      minHeight: "100vh",
      background: "#f4f6f9"
    },
    card: {
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "15px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    },
    title: {
      fontWeight: "bold",
      marginBottom: "10px"
    },
    status: {
      fontStyle: "italic",
      color: "#555"
    },
    updateButton: {
      marginTop: "10px",
      padding: "8px 12px",
      border: "none",
      borderRadius: "5px",
      background: "#2196F3",
      color: "white",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.container}>
      <h2>My Projects</h2>

      {projects.length === 0 ? (
        <p>No projects assigned to you yet.</p>
      ) : (
        projects.map((project, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.title}>{project.projectName}</div>
            <div>Batch: {project.batch}</div>
            <div style={styles.status}>Status: {project.status}</div>

            <button
              style={styles.updateButton}
              onClick={() => navigate(`/update-project/${project.projectName}`)}
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