import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function StudentProfile() {
  const { studentName } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(() => {
    const decodedName = decodeURIComponent(studentName);

    // Find which batch this student belongs to
    const batches = JSON.parse(localStorage.getItem("batches")) || [];
    let foundBatch = null;

    for (const batch of batches) {
      if (batch.students && batch.students.includes(decodedName)) {
        foundBatch = batch;
        break;
      }
    }

    if (foundBatch) {
      setStudent({ name: decodedName, batch: foundBatch.name, project: foundBatch.project, mentor: foundBatch.mentor });

      // Get project status for this batch
      const projects = JSON.parse(localStorage.getItem("projects")) || [];
      const proj = projects.find((p) => p.batch === foundBatch.name);
      if (proj) setProject(proj);
    } else {
      setStudent({ name: decodedName, batch: null });
    }
  }, [studentName]);

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
      background: "#f4f6f9",
      minHeight: "100vh",
      fontFamily: "Arial",
    },
    card: {
      background: "white",
      padding: "30px",
      borderRadius: "10px",
      maxWidth: "420px",
      margin: "auto",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    avatar: {
      width: "64px",
      height: "64px",
      borderRadius: "50%",
      background: "#2196F3",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "26px",
      fontWeight: "bold",
      marginBottom: "16px",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: "1px solid #f0f0f0",
    },
    label: { color: "#888", fontSize: "14px" },
    value: { fontWeight: "bold", fontSize: "14px" },
    statusBadge: {
      display: "inline-block",
      padding: "4px 12px",
      borderRadius: "12px",
      fontSize: "13px",
      fontWeight: "bold",
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
  };

  if (!student) return <p style={{ padding: 40 }}>Loading...</p>;

  const initial = student.name.charAt(0).toUpperCase();
  const status = project?.status || "Not Updated";

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.avatar}>{initial}</div>
        <h2 style={{ margin: "0 0 20px" }}>{student.name}</h2>

        <div style={styles.row}>
          <span style={styles.label}>Batch</span>
          <span style={styles.value}>{student.batch || "Not Assigned"}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Mentor</span>
          <span style={styles.value}>{student.mentor || "—"}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Project</span>
          <span style={styles.value}>{student.project || "—"}</span>
        </div>

        <div style={{ ...styles.row, borderBottom: "none" }}>
          <span style={styles.label}>Project Status</span>
          <span
            style={{
              ...styles.statusBadge,
              background: getStatusColor(status),
            }}
          >
            {status}
          </span>
        </div>

        <button style={styles.backButton} onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    </div>
  );
}

export default StudentProfile;