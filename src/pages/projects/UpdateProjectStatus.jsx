import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UpdateProjectStatus() {

  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const styles = {
    container: {
      padding: "30px",
      fontFamily: "Arial",
      backgroundColor: "#f4f6f9",
      minHeight: "100vh"
    },
    title: {
      textAlign: "center",
      marginBottom: "30px"
    },
    card: {
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "15px",
      boxShadow: "0 3px 8px rgba(0,0,0,0.1)"
    },
    select: {
      padding: "6px",
      marginTop: "8px"
    },
    button: {
      marginTop: "10px",
      padding: "8px 12px",
      border: "none",
      backgroundColor: "#4CAF50",
      color: "white",
      borderRadius: "5px",
      cursor: "pointer"
    },
    backButton: {
      marginTop: "30px",
      padding: "10px",
      border: "none",
      backgroundColor: "#888",
      color: "white",
      borderRadius: "5px",
      cursor: "pointer"
    }
  };

  useEffect(() => {

    const loggedUser =
      JSON.parse(localStorage.getItem("loggedInUser"));

    const batches =
      JSON.parse(localStorage.getItem("batches")) || [];

    const projects =
      JSON.parse(localStorage.getItem("projects")) || [];

    // get mentor batches
    const mentorBatches = batches
      .filter((b) => b.mentor === loggedUser.name)
      .map((b) => b.name);

    // filter projects of those batches
    const mentorProjects = projects.filter((p) =>
      mentorBatches.includes(p.batch)
    );

    setProjects(mentorProjects);

  }, []);

  const updateStatus = (index, newStatus) => {

    const allProjects =
      JSON.parse(localStorage.getItem("projects")) || [];

    const updatedProjects = [...allProjects];

    const projectName = projects[index].title;

    const projectIndex = updatedProjects.findIndex(
      (p) => p.title === projectName
    );

    if (projectIndex !== -1) {
      updatedProjects[projectIndex].status = newStatus;
    }

    localStorage.setItem("projects", JSON.stringify(updatedProjects));

    alert("Project status updated");

  };

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>Update Project Status</h2>

      {projects.length === 0 ? (
        <p>No projects found for your batches</p>
      ) : (
        projects.map((p, i) => (

          <div key={i} style={styles.card}>

            <h3>{p.title}</h3>
            <p><b>Batch:</b> {p.batch}</p>
            <p><b>Current Status:</b> {p.status}</p>

            <select
              style={styles.select}
              onChange={(e) =>
                updateStatus(i, e.target.value)
              }
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

          </div>

        ))
      )}

      <button
        style={styles.backButton}
        onClick={() => navigate(-1)}
      >
        Back
      </button>

    </div>
  );
}

export default UpdateProjectStatus;