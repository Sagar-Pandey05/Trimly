import React, { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-4">Register</h2>
        <input name="name" placeholder="Name" onChange={handleChange} className="p-2 border-1 border-gray-500 outline-none w-full" required /><br />
        <input name="email" placeholder="Email" onChange={handleChange} className="p-2 border-1 border-gray-500 outline-none w-full" required /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="p-2 border-1 border-gray-500 outline-none w-full mb-3" required /><br />
        <select name="role" onChange={handleChange} className="p-2 border-[1px] border-black mb-2">
          <option value="user">User</option>
          <option value="barber">Barber</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 mt-3 w-full">Register</button>
        <p className="text-center mt-3">Already have an account? <Link to={"/login"} className="text-blue-500">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
