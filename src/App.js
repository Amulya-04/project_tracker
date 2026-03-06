import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Dashboards
import MentorDashboard from "./pages/dashboard/MentorDashboard";
import StudentDashboard from "./pages/dashboard/StudentDashboard";

// Batches
import BatchList from "./pages/batches/BatchList";
import BatchDetails from "./pages/batches/BatchDetails";
import CreateBatch from "./pages/batches/CreateBatch";

// Students
import StudentList from "./pages/students/StudentList";
import StudentProfile from "./pages/students/StudentProfile";
import AddStudent from "./pages/students/AddStudent";

// Projects
import ProjectList from "./pages/projects/ProjectList";
import ProjectDetails from "./pages/projects/ProjectDetails";
import UpdateProjectStatus from "./pages/projects/UpdateProjectStatus";

function App() {
  return (
    <Router>
      <Routes>

        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboards */}
        <Route path="/mentor-dashboard" element={<MentorDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />

        {/* Batch Routes */}
        <Route path="/batches" element={<BatchList />} />
        <Route path="/batch-details/:batchName" element={<BatchDetails />} />
        <Route path="/create-batch" element={<CreateBatch />} />

        {/* Student Routes */}
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/:id" element={<StudentProfile />} />
        <Route path="/add-student" element={<AddStudent />} />

        {/* Project Routes */}
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/project-details/:batchName" element={<ProjectDetails />} />
        <Route path="/update-project" element={<UpdateProjectStatus />} />

      </Routes>
    </Router>
  );
}

export default App;