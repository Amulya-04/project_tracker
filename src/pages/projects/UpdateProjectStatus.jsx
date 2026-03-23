import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function UpdateProjectStatus() {
  const navigate = useNavigate();
  // FIX: read batchName from URL param (passed from BatchList and BatchDetails)
  const { batchName: paramBatchName } = useParams();

  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(paramBatchName || "");
  const [status, setStatus] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");

  useEffect(() => {
    const storedBatches = JSON.parse(localStorage.getItem("batches")) || [];
    const uniqueBatches = [...new Set(storedBatches.map((b) => b.name))];
    setBatches(uniqueBatches);
  }, []);

  // When selected batch changes, load its current status
  useEffect(() => {
    if (!selectedBatch) {
      setCurrentStatus("");
      return;
    }
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const proj = projects.find((p) => p.batch === selectedBatch);
    setCurrentStatus(proj?.status || "Not Updated");
  }, [selectedBatch]);

  const updateProgress = () => {
    if (!selectedBatch) {
      alert("Please select a batch.");
      return;
    }
    if (!status) {
      alert("Please select a status.");
      return;
    }

    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];

    // Check if a project entry exists for this batch
    const exists = storedProjects.some((p) => p.batch === selectedBatch);

    let updatedProjects;
    if (exists) {
      // Update existing
      updatedProjects = storedProjects.map((p) =>
        p.batch === selectedBatch ? { ...p, status } : p
      );
    } else {
      // Create a new project record for this batch using batch's project name
      const batches = JSON.parse(localStorage.getItem("batches")) || [];
      const batchInfo = batches.find((b) => b.name === selectedBatch);
      const newProject = {
        projectName: batchInfo?.project || selectedBatch,
        batch: selectedBatch,
        mentor: batchInfo?.mentor || "",
        status,
      };
      updatedProjects = [...storedProjects, newProject];
    }

    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    alert(`Status updated to "${status}" for batch "${selectedBatch}".`);
    navigate(-1);
  };

  const statusColors = {
    Started: "#e2d9f3",
    "In Progress": "#cce5ff",
    Testing: "#fff3cd",
    Completed: "#d4edda",
    "Not Updated": "#e9ecef",
  };

  const styles = {
    container: {
      padding: "40px",
      fontFamily: "Arial",
      background: "#f4f6f9",
      minHeight: "100vh",
    },
    card: {
      background: "white",
      padding: "30px",
      maxWidth: "420px",
      margin: "auto",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
      fontSize: "13px",
      color: "#555",
    },
    select: {
      width: "100%",
      padding: "10px",
      marginBottom: "16px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    currentStatus: {
      padding: "10px 14px",
      borderRadius: "6px",
      marginBottom: "16px",
      fontWeight: "bold",
    },
    button: {
      padding: "11px",
      width: "100%",
      background: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "15px",
    },
    backButton: {
      marginTop: "10px",
      padding: "10px",
      width: "100%",
      background: "#777",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ marginTop: 0 }}>Update Project Status</h2>

        {/* Batch Dropdown */}
        <label style={styles.label}>Select Batch</label>
        <select
          style={styles.select}
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
        >
          <option value="">-- Select Batch --</option>
          {batches.map((batch, index) => (
            <option key={index} value={batch}>
              {batch}
            </option>
          ))}
        </select>

        {/* Show current status */}
        {selectedBatch && (
          <div
            style={{
              ...styles.currentStatus,
              background: statusColors[currentStatus] || "#e9ecef",
            }}
          >
            Current Status: {currentStatus}
          </div>
        )}

        {/* Status Dropdown */}
        <label style={styles.label}>New Status</label>
        <select
          style={styles.select}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">-- Select Status --</option>
          <option value="Started">Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Testing">Testing</option>
          <option value="Completed">Completed</option>
        </select>

        <button style={styles.button} onClick={updateProgress}>
          ✓ Update Status
        </button>

        <button style={styles.backButton} onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    </div>
  );
}

export default UpdateProjectStatus;