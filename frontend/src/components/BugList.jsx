import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BugList({ refresh }) {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/bugs');
        setBugs(res.data);
      } catch (err) {
        console.error("Error fetching bugs:", err);
      }
    };

    fetchBugs();
  }, [refresh]); // reload when a new bug is added

  return (
    <div>
      <h2>All Reported Bugs</h2>

      {bugs.length === 0 ? (
        <p>No bugs reported yet.</p>
      ) : (
        bugs.map(bug => (
          <div
            key={bug._id}
            style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
          >
            <h3>{bug.title}</h3>
            <p>{bug.description}</p>
            <p>Status: {bug.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default BugList;
