import { useState } from "react";

function AddStudent() {
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, batch);
  };

  return (
    <div>
      <h2>Add Student</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Student Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Batch"
          onChange={(e) => setBatch(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddStudent;