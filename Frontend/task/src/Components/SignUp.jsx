import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./singup.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    city: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/register", formData);
      alert(res.data.message);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} /> 
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="contactNo" placeholder="Contact No" onChange={handleChange} />
        <input name="city" placeholder="City" onChange={handleChange} />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
