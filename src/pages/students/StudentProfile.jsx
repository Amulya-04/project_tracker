function StudentProfile() {
  const student = {
    name: "Rahul",
    batch: "Batch A",
    project: "Library Management System",
    status: "In Progress",
  };

  return (
    <div>
      <h2>Student Profile</h2>

      <p><b>Name:</b> {student.name}</p>
      <p><b>Batch:</b> {student.batch}</p>
      <p><b>Project:</b> {student.project}</p>
      <p><b>Status:</b> {student.status}</p>
    </div>
  );
}

export default StudentProfile;