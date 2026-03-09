import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function BatchDetails() {

  const { batchName } = useParams();
  const navigate = useNavigate();

  const [batch, setBatch] = useState(null);
  const [status, setStatus] = useState("Not Updated");

  useEffect(() => {

    const batches =
      JSON.parse(localStorage.getItem("batches")) || [];

    const selectedBatch = batches.find(
      (b) => b.name === batchName
    );

    setBatch(selectedBatch);

    const projects =
      JSON.parse(localStorage.getItem("projects")) || [];

    const batchProject = projects.find(
      (p) => p.batch === batchName
    );

    if (batchProject) {
      setStatus(batchProject.status);
    }

  }, [batchName]);

  const styles = {

    container: {
      padding: "40px",
      background: "#f4f6f9",
      minHeight: "100vh",
      fontFamily: "Arial"
    },

    card: {
      background: "white",
      padding: "25px",
      borderRadius: "10px",
      maxWidth: "500px",
      margin: "auto",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    },

    listItem: {
      background: "#e3f2fd",
      padding: "10px",
      marginBottom: "8px",
      borderRadius: "5px",
      listStyle: "none"
    },

    sectionTitle: {
      marginTop: "20px"
    },

    statusBox: {
      background: "#fff3cd",
      padding: "10px",
      borderRadius: "6px",
      marginTop: "10px"
    },

    backButton: {
      marginTop: "20px",
      padding: "10px 14px",
      border: "none",
      background: "#607D8B",
      color: "white",
      borderRadius: "6px",
      cursor: "pointer"
    }

  };

  if (!batch) return <p>Batch not found</p>;

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h2>{batch.name}</h2>

        <p>
          <strong>Mentor:</strong> {batch.mentor}
        </p>

        <p>
          <strong>Project:</strong> {batch.project}
        </p>

        {/* STATUS */}
        <div style={styles.statusBox}>
          <strong>Status:</strong> {status}
        </div>

        {/* Students */}

        <h3 style={styles.sectionTitle}>Students</h3>

        {batch.students?.length === 0 ? (
          <p>No students yet</p>
        ) : (
          <ul>
            {batch.students?.map((s, i) => (
              <li key={i} style={styles.listItem}>
                {s}
              </li>
            ))}
          </ul>
        )}

        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
        >
          Back
        </button>

      </div>

    </div>

  );
}

export default BatchDetails;