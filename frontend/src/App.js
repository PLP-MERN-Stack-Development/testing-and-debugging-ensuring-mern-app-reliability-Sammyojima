import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [bugs, setBugs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium"
  });

  // Fetch bugs
  const fetchBugs = async () => {
    const response = await axios.get("http://localhost:5000/api/bugs");
    setBugs(response.data);
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  // Submit bug
  const submitBug = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/bugs", form);
    setForm({ title: "", description: "", priority: "medium" });
    fetchBugs();
  };

  // Update status
  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/bugs/${id}/status`, { status });
    fetchBugs();
  };

  // Delete bug
  const deleteBug = async (id) => {
    await axios.delete(`http://localhost:5000/api/bugs/${id}`);
    fetchBugs();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bug Tracker</h1>

      {/* Form */}
      <form onSubmit={submitBug}>
        <input
          type="text"
          placeholder="Bug title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <br />

        <textarea
          placeholder="Bug description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <br />

        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <br />
        <button type="submit">Submit Bug</button>
      </form>

      <hr />

      {/* Bug List */}
      <h2>All Bugs</h2>
      {bugs.map((bug) => (
        <div
          key={bug._id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <h3>{bug.title}</h3>
          <p>{bug.description}</p>
          <p>Priority: {bug.priority}</p>
          <p>Status: {bug.status}</p>

          <button onClick={() => updateStatus(bug._id, "in-progress")}>
            Mark In-Progress
          </button>

          <button onClick={() => updateStatus(bug._id, "resolved")}>
            Mark Resolved
          </button>

          <button onClick={() => deleteBug(bug._id)} style={{ color: "red" }}>
            Delete Bug
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
