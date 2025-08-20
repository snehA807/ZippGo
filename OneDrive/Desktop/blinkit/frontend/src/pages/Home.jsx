import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

// Import images from assets folder
import img1 from "../assets/1.jpeg";
import img3 from "../assets/3.jpeg";
import img4 from "../assets/4.jpeg";
import img5 from "../assets/5.jpeg";
import img6 from "../assets/6.jpeg";

const Home = () => {
  const navigate = useNavigate();

  // ✅ Products with custom names
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

      {/* Banner Section */}
      <div className="flex justify-center my-6">
        <img
          src={img1}
          alt="Offer Banner"
          className="w-full max-w-6xl h-[280px] object-cover rounded-xl shadow-md 
                     transition duration-300 ease-in-out 
                     hover:shadow-[0_0_30px_6px_rgba(253,224,71,0.8)]"
        />
      </div>

      {/* Product Section */}
      <div className="px-6 my-10">
        <h2 className="text-3xl font-bold text-green-600 mb-8 text-center">
          Featured Products
        </h2>

        {/* Horizontal Row */}
        <div className="flex gap-8 justify-center flex-wrap">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center 
                         w-[240px] transition duration-300 ease-in-out transform hover:scale-105 
                         hover:shadow-[0_0_25px_5px_rgba(253,224,71,0.6)]"
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
                onClick={() => navigate("/login")}
                className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium px-5 py-2 rounded-lg transition"
              >
                Search More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
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
    </div>
  );
};

export default Home;
