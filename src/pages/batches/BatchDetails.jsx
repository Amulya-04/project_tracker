import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function BatchDetails() {
  const { batchName } = useParams();
  const navigate = useNavigate();

  const [batch, setBatch] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(() => {
    const batches = JSON.parse(localStorage.getItem("batches")) || [];
    const selectedBatch = batches.find((b) => b.name === batchName);
    setBatch(selectedBatch);

    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    // Find latest project for this batch
    const batchProject = projects.find((p) => p.batch === batchName);
    if (batchProject) setProject(batchProject);
  }, [batchName]);

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
      padding: "40px",
      background: "#f4f6f9",
      minHeight: "100vh",
      fontFamily: "Arial",
    },
    card: {
      background: "white",
      padding: "30px",
      borderRadius: "10px",
      maxWidth: "520px",
      margin: "auto",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    sectionTitle: {
      marginTop: "24px",
      marginBottom: "10px",
      borderBottom: "1px solid #eee",
      paddingBottom: "6px",
    },
    listItem: {
      background: "#e3f2fd",
      padding: "10px 14px",
      marginBottom: "8px",
      borderRadius: "5px",
      listStyle: "none",
    },
    statusBox: {
      padding: "12px 16px",
      borderRadius: "6px",
      marginTop: "10px",
      fontWeight: "bold",
    },
    infoRow: {
      display: "flex",
      gap: "8px",
      marginBottom: "8px",
    },
    backButton: {
      marginTop: "24px",
      padding: "10px 18px",
      border: "none",
      background: "#607D8B",
      color: "white",
      borderRadius: "6px",
      cursor: "pointer",
    },
    updateButton: {
      marginTop: "24px",
      marginLeft: "10px",
      padding: "10px 18px",
      border: "none",
      background: "#9C27B0",
      color: "white",
      borderRadius: "6px",
      cursor: "pointer",
    },
  };

  if (!batch) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <p>Batch <strong>"{batchName}"</strong> not found.</p>
          <button style={styles.backButton} onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>
      </div>
    );
  }

  const currentStatus = project?.status || "Not Updated";

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ margin: "0 0 16px" }}>{batch.name}</h2>

        <div style={styles.infoRow}>
          <span><strong>Mentor:</strong></span>
          <span>{batch.mentor}</span>
        </div>

        <div style={styles.infoRow}>
          <span><strong>Project:</strong></span>
          <span>{batch.project}</span>
        </div>

        {/* PROJECT STATUS */}
        <div
          style={{
            ...styles.statusBox,
            background: getStatusColor(currentStatus),
          }}
        >
          Status: {currentStatus}
        </div>

        {/* Students */}
        <h3 style={styles.sectionTitle}>
          Students ({batch.students?.length || 0})
        </h3>

        {!batch.students || batch.students.length === 0 ? (
          <p style={{ color: "#888" }}>No students in this batch yet.</p>
        ) : (
          <ul style={{ padding: 0, margin: 0 }}>
            {batch.students.map((s, i) => (
              <li key={i} style={styles.listItem}>
                👤 {s}
              </li>
            ))}
          </ul>
        )}

        <div>
          <button style={styles.backButton} onClick={() => navigate(-1)}>
            ← Back
          </button>
          <button
            style={styles.updateButton}
            onClick={() => navigate(`/update-project/${batch.name}`)}
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
}

export default BatchDetails;