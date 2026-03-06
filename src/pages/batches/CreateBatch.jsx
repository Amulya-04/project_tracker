import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateBatch() {

  const navigate = useNavigate();

  const [batchName, setBatchName] = useState("");
  const [mentor, setMentor] = useState("");
  const [studentCount, setStudentCount] = useState(0);
  const [students, setStudents] = useState([]);

  const handleStudentCount = (e) => {
    const count = parseInt(e.target.value);
    setStudentCount(count);

    const studentArray = new Array(count).fill("");
    setStudents(studentArray);
  };

  const handleStudentChange = (index, value) => {
    const updated = [...students];
    updated[index] = value;
    setStudents(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!batchName || !mentor) {
      alert("Fill all fields");
      return;
    }

    const newBatch = {
      name: batchName,
      mentor: mentor,
      students: students
    };

    const batches =
      JSON.parse(localStorage.getItem("batches")) || [];

    batches.push(newBatch);

    localStorage.setItem("batches", JSON.stringify(batches));

    alert("Batch Created!");

    navigate("/batches");
  };

  const styles = {
    container: {
      padding: "40px",
      background: "#f4f6f9",
      minHeight: "100vh",
      fontFamily: "Arial"
    },
    card: {
      background: "white",
      padding: "30px",
      maxWidth: "450px",
      margin: "auto",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc"
    },
    button: {
      marginTop: "10px",
      padding: "10px",
      width: "100%",
      background: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    },
    back: {
      marginTop: "15px",
      padding: "10px",
      background: "#777",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h2>Create Batch</h2>

        <form onSubmit={handleSubmit}>

          <input
            style={styles.input}
            type="text"
            placeholder="Batch Name"
            value={batchName}
            onChange={(e) => setBatchName(e.target.value)}
          />

          <input
            style={styles.input}
            type="text"
            placeholder="Mentor Name"
            value={mentor}
            onChange={(e) => setMentor(e.target.value)}
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Number of Students"
            onChange={handleStudentCount}
          />

          {students.map((student, index) => (
            <input
              key={index}
              style={styles.input}
              type="text"
              placeholder={`Student ${index + 1} Name`}
              value={student}
              onChange={(e) =>
                handleStudentChange(index, e.target.value)
              }
            />
          ))}

          <button style={styles.button}>Create Batch</button>

        </form>

        <button
          style={styles.back}
          onClick={() => navigate(-1)}
        >
          Back
        </button>

      </div>

    </div>
  );
}

export default CreateBatch;