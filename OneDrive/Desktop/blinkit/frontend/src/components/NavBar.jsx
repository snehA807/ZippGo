// src/components/NavBar.jsx
import React from "react";
import { ShoppingCart, Search, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; 
const NavBar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // check if user is logged in

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between sticky top-0 z-50">

      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src={logo}
          alt="ZippGo Logo"
          className="h-10 w-10 rounded-full"
        />
        <h1 className="text-2xl font-bold text-green-600 cursor-pointer" onClick={() => navigate('/')}>
          ZippGo
        </h1>
      </div>

      {/* Location */}
      <button
        onClick={() => navigate("/delivery")}
        className="hidden md:flex items-center space-x-1 text-gray-700 ml-6 px-3 py-2 rounded-md hover:bg-yellow-100 transition"
      >
        <MapPin className="w-5 h-5 text-green-600" />
        <span className="text-sm font-medium">
          Deliver to <b>New Delhi</b>
        </span>
      </button>

      {/* Search Bar */}
      <div className="flex-1 mx-6 hidden md:flex">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Search for milk, bread, apple..."
            className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Login/User + Cart */}
      <div className="flex items-center space-x-4">
        {user ? (
          // Show User icon + name
          <div
            onClick={() => navigate("/profile")}
            className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-green-600"
          >
            <User className="w-6 h-6" />
            <span className="hidden md:inline">{user.name || "Account"}</span>
          </div>
        ) : (
          // Show Login button if not logged in
          <button
            onClick={() => navigate("/login")}
            className="text-gray-700 font-medium hover:text-green-600"
          >
            Login
          </button>
        )}

        <button
          onClick={() => navigate("/history")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Receipt</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
