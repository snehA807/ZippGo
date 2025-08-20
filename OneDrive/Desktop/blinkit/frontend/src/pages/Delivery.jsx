import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Delivery = () => {
  const navigate = useNavigate();

  // Sample addresses (could come from API or localStorage)
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      addressLine: "123, MG Road, Mumbai, Maharashtra",
      phone: "9876543210",
      lat: 19.076, // Latitude for map
      lng: 72.8777, // Longitude for map
    },
    {
      id: 2,
      name: "Office",
      addressLine: "456, Andheri West, Mumbai, Maharashtra",
      phone: "9876543211",
      lat: 19.119, 
      lng: 72.846,
    },
  ]);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleSelect = (id) => {
    const addr = addresses.find((a) => a.id === id);
    setSelectedAddress(addr);
  };

  const handleProceed = () => {
    if (!selectedAddress) return alert("Please select an address!");
    // Navigate to payment or confirmation page
    navigate("/payment", { state: { address: selectedAddress } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <div className="flex flex-col items-center justify-center flex-grow p-8">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Select Delivery Address
          </h2>

          {/* Address List */}
          <div className="flex flex-col space-y-4 mb-6">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`border rounded-xl p-4 flex flex-col gap-2 transition
                  ${selectedAddress?.id === addr.id ? "border-yellow-500 bg-yellow-100" : "border-gray-300 hover:bg-yellow-50"}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-700">{addr.name}</h3>
                    <p className="text-gray-500">{addr.addressLine}</p>
                    <p className="text-gray-500">Phone: {addr.phone}</p>
                  </div>
                  <button
                    onClick={() => handleSelect(addr.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-yellow-400 transition text-sm"
                  >
                    {selectedAddress?.id === addr.id ? "Selected" : "Select"}
                  </button>
                </div>

                {/* Simple map placeholder */}
                <div className="mt-2 w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  Map Placeholder (Lat: {addr.lat}, Lng: {addr.lng})
                </div>
              </div>
            ))}
          </div>

          {/* Proceed Button */}
          <button
            onClick={handleProceed}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-yellow-400 transition font-medium"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Delivery;
