import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./App"; // your current App.jsx is the Home page
import Dairypage from "./pages/Dairypage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Delivery from "./pages/Delivery";
import History from "./pages/History";



import "./index.css";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dairy" element={<Dairypage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/delivery" element={<Delivery />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
};

export default Router;