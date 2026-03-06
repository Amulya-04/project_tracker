import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [batch, setBatch] = useState(""); // Only for students

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select a role");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const exists = users.find((u) => u.email === email);
    if (exists) {
      alert("Email already registered!");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      role,
      batch: role === "student" ? batch : null
    };

    // Save user
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // If student, add to batches
    if (role === "student") {
      const batches = JSON.parse(localStorage.getItem("batches")) || [];
      const batchIndex = batches.findIndex((b) => b.name === batch);

      if (batchIndex !== -1) {
        // Batch exists, add student
        if (!batches[batchIndex].students) batches[batchIndex].students = [];
        batches[batchIndex].students.push(name);
      } else {
        // Batch does not exist, create it
        batches.push({
          name: batch,
          mentor: "TBD", // Can update mentor later
          students: [name]
        });
      }

      localStorage.setItem("batches", JSON.stringify(batches));
    }

    alert("Registration successful!");
    navigate("/");
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f4f6f9",
      fontFamily: "Arial"
    },
    card: {
      background: "white",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      width: "320px",
      textAlign: "center"
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "5px",
      border: "1px solid #ccc"
    },
    select: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "5px",
      border: "1px solid #ccc"
    },
    button: {
      width: "100%",
      padding: "10px",
      marginTop: "10px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#4CAF50",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer"
    },
    backButton: {
      marginTop: "12px",
      width: "100%",
      padding: "8px",
      backgroundColor: "#888",
      border: "none",
      borderRadius: "5px",
      color: "white",
      cursor: "pointer"
    },
    linkText: {
      marginTop: "10px",
      fontSize: "14px",
      cursor: "pointer",
      color: "#007bff"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            style={styles.select}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="mentor">Mentor</option>
          </select>

          {role === "student" && (
            <input
              style={styles.input}
              type="text"
              placeholder="Batch Name"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              required
            />
          )}

          <button style={styles.button} type="submit">
            Register
          </button>
        </form>

        <p
          style={styles.linkText}
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </p>

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

export default Register;