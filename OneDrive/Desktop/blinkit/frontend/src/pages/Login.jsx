import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios.js";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/users/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dairy"); // redirect after login
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-white">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md transform hover:scale-[1.01] transition duration-300">
        <h1 className="text-3xl font-extrabold text-green-600 text-center mb-2">
          Blinkit
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Fast groceries & food at your doorstep 🍏
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:ring-2 focus:ring-green-400 focus:outline-none 
                         transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                         focus:ring-2 focus:ring-green-400 focus:outline-none 
                         transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white 
                       py-3 rounded-xl font-semibold shadow-md 
                       transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6 space-y-2">
          <button
            onClick={() => navigate("/signup")}
            className="text-sm text-green-600 hover:underline block"
          >
            Don’t have an account? Sign Up
          </button>
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-green-600 hover:underline block"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
