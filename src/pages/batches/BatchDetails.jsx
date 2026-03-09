import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function BatchDetails() {
  const { batchName } = useParams();
  const navigate = useNavigate();

  const [batch, setBatch] = useState(null);
  const [projects, setProjects] = useState([]);

  // Fetch batch and project data
  useEffect(() => {
    const fetchData = () => {
      const batches = JSON.parse(localStorage.getItem("batches")) || [];
      const selectedBatch = batches.find((b) => b.name === batchName);
      setBatch(selectedBatch);

      const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
      const batchProjects = storedProjects.filter((p) => p.batch === batchName);
      setProjects(batchProjects);
    };

    fetchData();
  }, [batchName]);

  const styles = {
    container: {
      padding: "40px",
      background: "#f4f6f9",
      minHeight: "100vh",
      fontFamily: "Arial"
    },
    card: {
      background: "white",
      padding: "25px",
      borderRadius: "10px",
      maxWidth: "500px",
      margin: "auto",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    },
    listItem: {
      background: "#e3f2fd",
      padding: "8px",
      marginBottom: "5px",
      borderRadius: "5px",
      listStyle: "none"
    },
    addButton: {
      padding: "10px 14px",
      border: "none",
      background: "#4CAF50",
      color: "white",
      borderRadius: "6px",
      cursor: "pointer",
      marginTop: "10px"
    },
    backButton: {
      marginTop: "20px",
      padding: "10px 14px",
      border: "none",
      background: "#607D8B",
      color: "white",
      borderRadius: "6px",
      cursor: "pointer"
    },
    sectionTitle: {
      marginTop: "20px"
    }
  };

  if (!batch) return <p>Batch not found</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{batch.name}</h2>
        <p><strong>Mentor:</strong> {batch.mentor}</p>

        {/* Students */}
        <h3 style={styles.sectionTitle}>Students</h3>
        {batch.students && batch.students.length === 0 ? (
          <p>No students yet</p>
        ) : (
          <ul>
            {batch.students?.map((s, i) => (
              <li key={i} style={styles.listItem}>{s}</li>
            ))}
          </ul>
        )}

        {/* Projects */}
        <h3 style={styles.sectionTitle}>Projects</h3>
        {projects.length === 0 ? (
          <p>No projects added</p>
        ) : (
          <ul>
            {projects.map((p, i) => (
              <li key={i} style={styles.listItem}>{p.projectName}</li>
            ))}
          </ul>
        )}

        {/* Add Project Button */}
        <button
          style={styles.addButton}
          onClick={() => navigate(`/project-details/${batchName}`)}
        >
          Add Project
        </button>

        {/* Back Button */}
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default BatchDetails;