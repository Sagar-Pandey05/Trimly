import React, { useContext, useState } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", credentials);
            login(res.data.token);
            console.log("Login successful:", res.data);
            if (res.data.user.role === "admin") navigate("/admin");
            else if (res.data.user.role === "barber") navigate("/barber");
            else if (res.data.user.role === "user") navigate("/user");
            else alert("User role not found in response.");
        } catch (err) {
            console.log(err);
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl mb-4">Login</h2>
                <input name="email" placeholder="Email" onChange={handleChange} className="p-2 outline-none w-full" required /><br />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} className="p-2 outline-none w-full" required />
                <button className="bg-blue-500 text-white px-4 py-2 mt-3 w-full">Login</button>
                <p className="text-center mt-3">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
            </form>
        </div>
    );
};

export default Login;