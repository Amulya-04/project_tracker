import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentList() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // FIX: read role from loggedInUser object, not a standalone "role" key
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser || loggedInUser.role !== "mentor") {
      alert("Access Denied. Only mentors can view students.");
      navigate("/");
      return;
    }

    const batches = JSON.parse(localStorage.getItem("batches")) || [];

    // Collect all students with their batch info
    const allStudents = [];
    batches.forEach((batch) => {
      if (batch.students && batch.students.length > 0) {
        batch.students.forEach((name) => {
          if (name.trim()) {
            allStudents.push({ name, batch: batch.name });
          }
        });
      }
    });

    setStudents(allStudents);
  }, [navigate]);

  const styles = {
    container: {
      padding: "40px",
      fontFamily: "Arial",
      background: "#f4f6f9",
      minHeight: "100vh",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
    },
    grid: {
      display: "flex",
      flexWrap: "wrap",
      gap: "15px",
    },
    card: {
      background: "white",
      padding: "16px 18px",
      borderRadius: "8px",
      width: "180px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      cursor: "pointer",
      transition: "box-shadow 0.2s",
    },
    studentName: {
      fontWeight: "bold",
      marginBottom: "4px",
    },
    batchTag: {
      fontSize: "12px",
      color: "#666",
      background: "#e3f2fd",
      padding: "2px 8px",
      borderRadius: "10px",
      display: "inline-block",
    },
    backButton: {
      padding: "8px 14px",
      border: "none",
      background: "#607D8B",
      color: "white",
      borderRadius: "5px",
      cursor: "pointer",
    },
    empty: {
      color: "#888",
      marginTop: "40px",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{ margin: 0 }}>All Students ({students.length})</h2>
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      {students.length === 0 ? (
        <p style={styles.empty}>No students found. Add students via batches.</p>
      ) : (
        <div style={styles.grid}>
          {students.map((student, index) => (
            <div
              key={index}
              style={styles.card}
              onClick={() =>
                navigate(`/students/${encodeURIComponent(student.name)}`)
              }
            >
              <div style={styles.studentName}>👤 {student.name}</div>
              <span style={styles.batchTag}>{student.batch}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentList;