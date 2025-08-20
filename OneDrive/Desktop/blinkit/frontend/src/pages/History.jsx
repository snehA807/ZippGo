import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const History = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-500 text-xl">No orders placed yet.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Order History</h1>
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <div className="flex justify-between mb-2">
                <p className="font-semibold">Order ID: {order.id}</p>
                <p className="text-gray-500">{order.date}</p>
              </div>
              <ul className="mb-2">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.name} x {item.qty}</span>
                    <span>₹{item.price * item.qty}</span>
                  </li>
                ))}
              </ul>
              <p className="font-bold text-right">Total: ₹{order.totalAmount}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default History;
