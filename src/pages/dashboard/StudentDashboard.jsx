import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [batch, setBatch] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // read from the correct localStorage key
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      navigate("/login", { replace: true });
      return;
    }

    setUser(loggedInUser);

    // get batch details
    const batches = JSON.parse(localStorage.getItem("batches")) || [];
    const studentBatch = batches.find((b) => b.name === loggedInUser.batch);
    setBatch(studentBatch);

    // get projects for this batch
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const batchProjects = storedProjects.filter(
      (p) => p.batch === loggedInUser.batch
    );
    setProjects(batchProjects);
  }, []); // run once

  if (!user) return null; // wait for state to initialize

  const styles = {
    container: { padding: 30, fontFamily: "Arial", backgroundColor: "#f4f6f9", minHeight: "100vh" },
    title: { textAlign: "center", marginBottom: 30 },
    cardContainer: { display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" },
    card: { background: "white", padding: 20, width: 260, borderRadius: 10, boxShadow: "0 4px 10px rgba(0,0,0,0.1)", textAlign: "center" },
    button: { marginTop: 10, padding: "8px 14px", border: "none", borderRadius: 5, backgroundColor: "#2196F3", color: "white", cursor: "pointer" },
    backButton: { marginTop: 40, padding: 10, border: "none", borderRadius: 5, backgroundColor: "#777", color: "white", cursor: "pointer" }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Student Dashboard</h1>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3>Student Name</h3>
          <p>{user.name}</p>
        </div>

        <div style={styles.card}>
          <h3>Batch</h3>
          <p>{user.batch || "No batch assigned"}</p>
          {user.batch && (
            <button style={styles.button} onClick={() => navigate(`/batch-details/${user.batch}`)}>
              View Batch
            </button>
          )}
        </div>

        <div style={styles.card}>
          <h3>Projects</h3>
          {projects.length === 0 ? (
            <p>No projects assigned</p>
          ) : (
            <ul style={{ textAlign: "left" }}>
              {projects.map((p, i) => (
                <li key={i}>{p.projectName}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <button style={styles.backButton} onClick={() => {
          localStorage.removeItem("loggedInUser");
          navigate("/login", { replace: true });
        }}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default StudentDashboard;