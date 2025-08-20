import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// Import images
import img1 from "./assets/1.jpeg";
import img3 from "./assets/3.jpeg";
import img4 from "./assets/4.jpeg";
import img5 from "./assets/5.jpeg";
import img6 from "./assets/6.jpeg";
import img1m from "./assets/1m.jpeg";
import img2m from "./assets/2m.jpeg";

const App = () => {
  const navigate = useNavigate();

  const fakeUser = { name: "Sneha Sharma" }; 
  // const fakeUser = null; // uncomment to simulate logged out

  const products = [
    { img: img3, name: "Dairy Products" },
    { img: img4, name: "Pet Cares" },
    { img: img5, name: "Fruits & Vegetables" },
    { img: img6, name: "Pharmacy" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <NavBar />

  

      {/* Infinite Horizontal Scroll Section after Banner */}
      <div className="overflow-hidden relative my-4 h-48">
        <div className="flex gap-4 absolute animate-scroll">
          {/* Repeat images to make seamless scroll */}
          <img
            src={img1m}
            alt="Scroll Image 1"
            className="h-48 w-auto flex-shrink-0 rounded-xl shadow-md"
          />
          <img
            src={img1}
            alt="Scroll Image 1"
            className="h-48 w-auto flex-shrink-0 rounded-xl shadow-md"
          />
          <img
            src={img2m}
            alt="Scroll Image 2"
            className="h-48 w-auto flex-shrink-0 rounded-xl shadow-md"
          />
          <img
            src={img1m}
            alt="Scroll Image 1"
            className="h-48 w-auto flex-shrink-0 rounded-xl shadow-md"
          />
          <img
            src={img2m}
            alt="Scroll Image 2"
            className="h-48 w-auto flex-shrink-0 rounded-xl shadow-md"
          />
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="px-6 my-10">
        <h2 className="text-3xl font-bold text-green-600 mb-8 text-center">
          Featured Products
        </h2>

        <div className="flex gap-8 justify-center flex-wrap">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center w-[240px] transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-[0_0_25px_5px_rgba(253,224,71,0.6)]"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-48 h-48 object-cover rounded-lg"
              />
              <h3 className="mt-4 text-gray-800 font-semibold text-lg text-center">
                {product.name}
              </h3>
              <button
                onClick={() => navigate("/dairy")}
                className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium px-5 py-2 rounded-lg transition"
              >
                Search More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center my-12">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          Want to explore more?
        </h2>
        <div className="flex justify-center gap-6">
          <button
            onClick={() => navigate("/login")}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow-md transition text-base"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-xl shadow-md transition text-base"
          >
            Go to Cart
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Custom Tailwind animation */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 15s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default App;
