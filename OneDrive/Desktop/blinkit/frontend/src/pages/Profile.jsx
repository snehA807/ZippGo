import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "Sneha Sharma",
    email: "sneha@example.com",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser({ ...user, ...formData });
    setIsEditing(false);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <div className="flex flex-col items-center justify-center flex-grow p-8">
        <div
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md
                        transform transition duration-300 hover:bg-yellow-200 hover:scale-105"
        >
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>

            {!isEditing ? (
              <div className="flex flex-col w-full space-y-3 mt-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-yellow-400 transition"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-yellow-400 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col w-full space-y-3 mt-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Name"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Email"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="flex-1 px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-yellow-400 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-yellow-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
