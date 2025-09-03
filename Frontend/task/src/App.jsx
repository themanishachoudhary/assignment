import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./Components/SignUp";
import Login from "./Components/Login";
import Dashboard from "./Components/DashBoard";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
