import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProjectDetails() {
  const { batchName } = useParams();
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");

  const saveProject = () => {
    if (!projectName.trim()) {
      alert("Enter project name");
      return;
    }

    // Get logged-in user (mentor)
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user || user.role !== "mentor") {
      alert("Only mentors can add projects");
      return;
    }

    // Get existing projects
    const stored = JSON.parse(localStorage.getItem("projects")) || [];

    // New project with mentor info
    const newProject = {
      projectName,
      batch: batchName,
      mentor: user.name, // assign project to logged-in mentor
      status: "Pending" // initial status
    };

    const updated = [...stored, newProject];
    localStorage.setItem("projects", JSON.stringify(updated));

    alert("Project Added!");
    navigate(`/batch-details/${batchName}`);
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "#f4f6f9",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial",
      padding: "20px"
    },
    card: {
      background: "white",
      padding: "30px",
      borderRadius: "10px",
      width: "400px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      textAlign: "center"
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "16px",
      marginBottom: "20px",
      boxSizing: "border-box"
    },
    saveButton: {
      padding: "10px 16px",
      border: "none",
      background: "#4CAF50",
      color: "white",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
      marginRight: "10px"
    },
    backButton: {
      padding: "10px 16px",
      border: "none",
      background: "#607D8B",
      color: "white",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px"
    },
    title: {
      marginBottom: "20px",
      color: "#333"
    },
    batchInfo: {
      marginBottom: "20px",
      fontWeight: "bold",
      color: "#555"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Add Project</h2>

        <p style={styles.batchInfo}>Batch: {batchName}</p>

        <input
          type="text"
          placeholder="Enter Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          style={styles.input}
        />

        <div>
          <button onClick={saveProject} style={styles.saveButton}>
            Save Project
          </button>

          <button onClick={() => navigate(-1)} style={styles.backButton}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;