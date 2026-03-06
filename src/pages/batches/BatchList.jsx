import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function BatchList() {

  const navigate = useNavigate();
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("batches")) || [];
    setBatches(stored);
  }, []);

  const deleteBatch = (indexToDelete) => {

    const confirmDelete = window.confirm("Delete this batch?");
    if (!confirmDelete) return;

    const updatedBatches = batches.filter(
      (_, index) => index !== indexToDelete
    );

    localStorage.setItem(
      "batches",
      JSON.stringify(updatedBatches)
    );

    setBatches(updatedBatches);
  };

  const styles = {
    container: {
      padding: "40px",
      fontFamily: "Arial",
      background: "#f4f6f9",
      minHeight: "100vh"
    },
    grid: {
      display: "flex",
      gap: "20px",
      flexWrap: "wrap"
    },
    card: {
      background: "white",
      padding: "20px",
      width: "220px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    },
    viewButton: {
      marginTop: "10px",
      padding: "8px 12px",
      border: "none",
      background: "#2196F3",
      color: "white",
      borderRadius: "5px",
      cursor: "pointer"
    },
    deleteButton: {
      marginTop: "10px",
      marginLeft: "8px",
      padding: "8px 12px",
      border: "none",
      background: "#f44336",
      color: "white",
      borderRadius: "5px",
      cursor: "pointer"
    },
    addProjectButton: {
      marginTop: "10px",
      marginLeft: "8px",
      padding: "8px 12px",
      border: "none",
      background: "#9C27B0",
      color: "white",
      borderRadius: "5px",
      cursor: "pointer"
    },
    createButton: {
      marginTop: "20px",
      padding: "10px 14px",
      border: "none",
      background: "#4CAF50",
      color: "white",
      borderRadius: "5px",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.container}>

      <h2>All Batches</h2>

      <div style={styles.grid}>

        {batches.map((batch, index) => (

          <div key={index} style={styles.card}>

            <h3>{batch.name}</h3>

            <p>Mentor: {batch.mentor}</p>

            <button
              style={styles.viewButton}
              onClick={() =>
                navigate(`/batch-details/${batch.name}`)
              }
            >
              View Details
            </button>

            <button
              style={styles.deleteButton}
              onClick={() => deleteBatch(index)}
            >
              Remove
            </button>

            <button
  style={styles.addProjectButton}
  onClick={() => navigate(`/project-details/${batch.name}`)}
>
  Add Project
</button>

          </div>

        ))}

      </div>

      <button
        style={styles.createButton}
        onClick={() => navigate("/create-batch")}
      >
        Create Batch
      </button>

    </div>
  );
}

export default BatchList;