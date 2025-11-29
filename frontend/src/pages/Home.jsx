import React, { useEffect, useState } from "react";
import api from "../api/api";
import BugForm from "../components/BugForm";
import BugList from "../components/BugList";

function Home() {
  const [bugs, setBugs] = useState([]);

  const fetchBugs = async () => {
    const res = await api.get("/bugs");
    setBugs(res.data);
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  return (
    <div>
      <h1>MERN Bug Tracker</h1>
      <BugForm refreshBugs={fetchBugs} />
      <BugList bugs={bugs} refreshBugs={fetchBugs} />
    </div>
  );
}

export default Home;
