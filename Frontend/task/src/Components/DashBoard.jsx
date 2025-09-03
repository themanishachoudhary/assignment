import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {token ? (
        <>
          <p>✅ You are logged in with token: {token}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Please login first</p>
      )}
    </div>
  );
}

export default Dashboard;
