import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateBatch() {
  const navigate = useNavigate();

  const [batchName, setBatchName] = useState("");
  const [mentor, setMentor] = useState("");
  const [projectName, setProjectName] = useState("");
  const [studentCount, setStudentCount] = useState(0);
  const [students, setStudents] = useState([]);

  const handleStudentCount = (e) => {
    const count = parseInt(e.target.value) || 0;
    setStudentCount(count);
    // Preserve existing entries when resizing
    setStudents((prev) => {
      const updated = [...prev];
      updated.length = count;
      return Array.from({ length: count }, (_, i) => updated[i] || "");
    });
  };

  const handleStudentChange = (index, value) => {
    const updated = [...students];
    updated[index] = value;
    setStudents(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!batchName.trim() || !mentor.trim() || !projectName.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    // Check for duplicate batch name
    const batches = JSON.parse(localStorage.getItem("batches")) || [];
    const duplicate = batches.find(
      (b) => b.name.toLowerCase() === batchName.trim().toLowerCase()
    );
    if (duplicate) {
      alert("A batch with this name already exists. Please use a different name.");
      return;
    }

    const filledStudents = students.filter((s) => s.trim() !== "");

    const newBatch = {
      name: batchName.trim(),
      mentor: mentor.trim(),
      project: projectName.trim(),
      students: filledStudents,
    };

    batches.push(newBatch);
    localStorage.setItem("batches", JSON.stringify(batches));

    alert(`Batch "${batchName}" created successfully!`);
    navigate("/batches");
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
      maxWidth: "450px",
      margin: "auto",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    label: {
      display: "block",
      marginBottom: "4px",
      fontWeight: "bold",
      fontSize: "13px",
      color: "#555",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "16px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      boxSizing: "border-box",
      fontSize: "14px",
    },
    divider: {
      borderTop: "1px solid #eee",
      margin: "16px 0",
    },
    studentSection: {
      marginTop: "8px",
    },
    countText: {
      marginBottom: "10px",
      fontWeight: "bold",
      color: "#333",
    },
    button: {
      marginTop: "10px",
      padding: "11px",
      width: "100%",
      background: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "15px",
    },
    back: {
      marginTop: "12px",
      padding: "10px",
      width: "100%",
      background: "#777",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ marginTop: 0 }}>Create New Batch</h2>

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Batch Name *</label>
          <input
            style={styles.input}
            type="text"
            placeholder="e.g. Batch A"
            value={batchName}
            onChange={(e) => setBatchName(e.target.value)}
          />

          <label style={styles.label}>Mentor Name *</label>
          <input
            style={styles.input}
            type="text"
            placeholder="e.g. John Doe"
            value={mentor}
            onChange={(e) => setMentor(e.target.value)}
          />

          <label style={styles.label}>Project Name *</label>
          <input
            style={styles.input}
            type="text"
            placeholder="e.g. Library Management System"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <div style={styles.divider} />

          <label style={styles.label}>Number of Students</label>
          <input
            style={styles.input}
            type="number"
            placeholder="0"
            min="0"
            max="50"
            value={studentCount || ""}
            onChange={handleStudentCount}
          />

          {studentCount > 0 && (
            <div style={styles.studentSection}>
              <p style={styles.countText}>Enter Student Names ({studentCount})</p>
              {students.map((student, index) => (
                <input
                  key={index}
                  style={styles.input}
                  type="text"
                  placeholder={`Student ${index + 1} Name`}
                  value={student}
                  onChange={(e) => handleStudentChange(index, e.target.value)}
                />
              ))}
            </div>
          )}

          <button type="submit" style={styles.button}>
            ✓ Create Batch
          </button>
        </form>

        <button style={styles.back} onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    </div>
  );
}

export default CreateBatch;