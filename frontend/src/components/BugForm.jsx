import React, { useState } from 'react';
import axios from 'axios';

function BugForm({ onBugAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/bugs', {
        title,
        description
      });

      console.log("Bug added:", res.data);

      // Notify parent component
      if (onBugAdded) onBugAdded();

      setTitle('');
      setDescription('');

    } catch (err) {
      console.error("Error submitting bug:", err);
      alert("Failed to add bug");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Report a New Bug</h2>

      <input
        type="text"
        placeholder="Bug title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <br /><br />

      <textarea
        placeholder="Bug description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <br /><br />

      <button type="submit">Submit Bug</button>
    </form>
  );
}

export default BugForm;
