import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddStudent() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    // Only mentors can add students
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser || loggedInUser.role !== "mentor") {
      alert("Access denied.");
      navigate("/");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("batches")) || [];
    setBatches(stored);
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter a student name.");
      return;
    }
    if (!selectedBatch) {
      alert("Please select a batch.");
      return;
    }

    const batches = JSON.parse(localStorage.getItem("batches")) || [];

    const updatedBatches = batches.map((batch) => {
      if (batch.name === selectedBatch) {
        // Avoid duplicate names in the same batch
        if (batch.students && batch.students.includes(name.trim())) {
          alert(`"${name}" is already in batch "${selectedBatch}".`);
          return batch;
        }
        return {
          ...batch,
          students: [...(batch.students || []), name.trim()],
        };
      }
      return batch;
    });

    localStorage.setItem("batches", JSON.stringify(updatedBatches));
    setBatches(updatedBatches);

    alert(`Student "${name}" added to "${selectedBatch}" successfully!`);
    setName("");
    setSelectedBatch("");
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
      maxWidth: "400px",
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
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "16px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      boxSizing: "border-box",
      fontSize: "14px",
    },
    select: {
      width: "100%",
      padding: "10px",
      marginBottom: "16px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    button: {
      width: "100%",
      padding: "11px",
      background: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "15px",
    },
    backButton: {
      marginTop: "10px",
      width: "100%",
      padding: "10px",
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
        <h2 style={{ marginTop: 0 }}>Add Student to Batch</h2>

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Student Name *</label>
          <input
            style={styles.input}
            type="text"
            placeholder="Enter student name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label style={styles.label}>Assign to Batch *</label>
          <select
            style={styles.select}
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            <option value="">-- Select Batch --</option>
            {batches.map((batch, i) => (
              <option key={i} value={batch.name}>
                {batch.name}
              </option>
            ))}
          </select>

          <button type="submit" style={styles.button}>
            ✓ Add Student
          </button>
        </form>

        <button style={styles.backButton} onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    </div>
  );
}

export default AddStudent;