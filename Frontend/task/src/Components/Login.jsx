import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./login.css";   


function Login() {
  const [formData, setFormData] = useState({ email: "", contactNo: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", formData);
      alert(res.data.message);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="contactNo" placeholder="Contact No" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
