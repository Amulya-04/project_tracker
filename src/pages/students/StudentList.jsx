import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentList() {

  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {

    if (role !== "mentor") {
      alert("Access Denied. Only mentors can view students.");
      navigate("/");
      return;
    }

    const batches = JSON.parse(localStorage.getItem("batches")) || [];

    let allStudents = [];

    batches.forEach(batch => {
      if (batch.students) {
        allStudents = [...allStudents, ...batch.students];
      }
    });

    setStudents(allStudents);

  }, [navigate, role]);

  const styles = {
    container: {
      padding: "40px",
      fontFamily: "Arial",
      background: "#f4f6f9",
      minHeight: "100vh"
    },
    grid: {
      display: "flex",
      flexWrap: "wrap",
      gap: "15px"
    },
    card: {
      background: "white",
      padding: "15px",
      borderRadius: "8px",
      width: "180px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    }
  };

  return (
    <div style={styles.container}>

      <h2>All Students</h2>

      <div style={styles.grid}>

        {students.map((student, index) => (

          <div key={index} style={styles.card}>
            {student}
          </div>

        ))}

      </div>

    </div>
  );
}

export default StudentList;