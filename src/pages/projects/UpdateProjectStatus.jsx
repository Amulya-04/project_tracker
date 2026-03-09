import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function UpdateProjectStatus() {

  const navigate = useNavigate();

  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {

    const storedBatches =
      JSON.parse(localStorage.getItem("batches")) || [];

    // get unique batch names
    const uniqueBatches = [
      ...new Set(storedBatches.map((b) => b.name))
    ];

    setBatches(uniqueBatches);

  }, []);

  const updateProgress = () => {

    const storedProjects =
      JSON.parse(localStorage.getItem("projects")) || [];

    const updatedProjects = storedProjects.map((p) => {

      if (p.batch === selectedBatch) {
        return { ...p, status };
      }

      return p;

    });

    localStorage.setItem(
      "projects",
      JSON.stringify(updatedProjects)
    );

    alert("Project status updated!");

    navigate(-1); // go back to previous page

  };

  const styles = {

    container: {
      padding: "40px",
      fontFamily: "Arial",
      background: "#f4f6f9",
      minHeight: "100vh"
    },

    card: {
      background: "white",
      padding: "25px",
      maxWidth: "400px",
      margin: "auto",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    },

    input: {
      width: "100%",
      padding: "8px",
      marginBottom: "12px"
    },

    button: {
      padding: "10px",
      background: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    }

  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h2>Update Project Status</h2>

        {/* Batch Dropdown */}

        <select
          style={styles.input}
          value={selectedBatch}
          onChange={(e) =>
            setSelectedBatch(e.target.value)
          }
        >

          <option value="">Select Batch</option>

          {batches.map((batch, index) => (
            <option key={index} value={batch}>
              {batch}
            </option>
          ))}

        </select>

        {/* Status Dropdown */}

        <select
          style={styles.input}
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >

          <option value="">Select Status</option>
          <option value="Started">Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Testing">Testing</option>
          <option value="Completed">Completed</option>

        </select>

        <button
          style={styles.button}
          onClick={updateProgress}
        >
          Update Status
        </button>

      </div>

    </div>

  );
}

export default UpdateProjectStatus;