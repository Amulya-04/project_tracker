import { useNavigate } from "react-router-dom";

function MentorDashboard() {

  const navigate = useNavigate();

  const styles = {
    container: {
      padding: "30px",
      fontFamily: "Arial",
      backgroundColor: "#f4f6f9",
      minHeight: "100vh"
    },

    title: {
      textAlign: "center",
      marginBottom: "30px"
    },

    cardContainer: {
      display: "flex",
      gap: "20px",
      justifyContent: "center",
      flexWrap: "wrap"
    },

    card: {
      background: "white",
      padding: "20px",
      width: "250px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      textAlign: "center"
    },

    button: {
      marginTop: "10px",
      padding: "8px 14px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#4CAF50",
      color: "white",
      cursor: "pointer"
    },

    backButton: {
      marginTop: "40px",
      padding: "10px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#888",
      color: "white",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>Mentor Dashboard</h1>

      <div style={styles.cardContainer}>

        {/* UPDATE PROJECT STATUS CARD */}
        <div style={styles.card}>
          <h3>Update Project Status</h3>
          <p>Change project progress</p>

          <button
            style={styles.button}
            onClick={() => navigate("/update-project")}
          >
            Update Status
          </button>
        </div>


        {/* STUDENTS CARD */}
        <div style={styles.card}>
          <h3>Students Under Supervision</h3>

          <button
            style={styles.button}
            onClick={() => navigate("/students")}
          >
            View Students
          </button>
        </div>


        {/* PROJECTS CARD */}
        <div style={styles.card}>
          <h3>Projects Progress</h3>
          <p>Track project completion</p>

          <button
            style={styles.button}
            onClick={() => navigate("/projects")}
          >
            View Projects
          </button>
        </div>

      </div>

      <div style={{ textAlign: "center" }}>
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

export default MentorDashboard;