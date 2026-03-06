import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const navigate = useNavigate();

  // Styles
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f6f8"
  };

  const formStyle = {
    background: "white",
    padding: "30px",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  };

  const inputStyle = {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  };

  const buttonStyle = {
    padding: "10px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px"
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // get stored users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // find user with email, password and role
    const user = users.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (!user) {
      alert("Invalid credentials");
      return;
    }

    // save logged-in user info
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({
        email: user.email,
        name: user.name,
        role: user.role,
        batch: user.batch || null // optional, only for students
      })
    );

    // redirect based on role
    if (user.role === "student") {
      navigate("/student-dashboard");
    } else if (user.role === "mentor") {
      navigate("/mentor-dashboard");
    }
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
          style={inputStyle}
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          style={inputStyle}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="mentor">Mentor</option>
        </select>

        <button style={buttonStyle} type="submit">
          Login
        </button>

        <button
          type="button"
          style={{ ...buttonStyle, backgroundColor: "gray" }}
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Login;