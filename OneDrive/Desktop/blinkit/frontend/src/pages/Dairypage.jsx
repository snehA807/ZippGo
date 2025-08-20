import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import API from "../api/axios";

// Import dairy product images
import img11 from "../assets/11.jpeg";
import img12 from "../assets/12.jpeg";
import img13 from "../assets/13.jpeg";
import img14 from "../assets/14.jpeg";
import img15 from "../assets/15.jpeg";
import img16 from "../assets/16.jpeg";
import img17 from "../assets/17.jpeg";
import img18 from "../assets/18.jpeg";

const Dairypage = () => {
  const navigate = useNavigate();

  const products = [
    { id: 11, name: "Milk Pack", price: 1, img: img11 },
    { id: 12, name: "Cheese Block", price: 120, img: img12 },
    { id: 13, name: "Curd Bowl", price: 35, img: img13 },
    { id: 14, name: "Butter", price: 90, img: img14 },
    { id: 15, name: "Paneer", price: 150, img: img15 },
    { id: 16, name: "Flavored Milk", price: 50, img: img16 },
    { id: 17, name: "Lassi Bottle", price: 30, img: img17 },
    { id: 18, name: "Cream", price: 70, img: img18 },
  ];

  // Load cart from localStorage initially
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const incrementQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decrementQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle payment
  const handlePayment = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    try {
      // 1️⃣ Create order on backend
      const { data: order } = await API.post("/payment/create-order", {
        amount: totalAmount, // in INR
      });

      // 2️⃣ Razorpay options
      const options = {
        key: import.meta.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount, // in paise
        currency: order.currency,
        name: "Blinkit",
        description: "Purchase from Blinkit",
        order_id: order.id,
        handler: async function (response) {
          try {
            // 3️⃣ Verify payment
            const verifyRes = await API.post("/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            alert("Payment Successful: " + verifyRes.data.message);

            // Save order in localStorage
            const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
            const newOrder = {
              id: new Date().getTime(),
              items: cart,
              totalAmount: totalAmount,
              date: new Date().toLocaleString(),
            };
            localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

            setCart([]); // Clear cart after payment
          } catch (err) {
            console.error(err);
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: JSON.parse(localStorage.getItem("user"))?.name || "",
          email: JSON.parse(localStorage.getItem("user"))?.email || "",
          contact: "9999999999",
        },
        theme: {
          color: "#22c55e",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert("Server error. Are you logged in?");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />

      <h1 className="text-3xl font-bold text-green-600 text-center my-6">
        Dairy Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-8 mb-12">
        {products.map((product) => {
          const inCart = cart.find((item) => item.id === product.id);
          return (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center 
                         transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-40 h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-green-600 font-bold mt-1">₹{product.price}</p>
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => decrementQty(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                >
                  <Minus size={16} />
                </button>
                <button
                  onClick={() => addToCart(product)}
                  className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 
                             text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  <ShoppingCart size={18} />
                  {inCart ? `+${inCart.qty}` : "Add to Cart"}
                </button>
                <button
                  onClick={() => incrementQty(product.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Section */}
      <div className="bg-white shadow-inner p-6 mx-8 rounded-lg mb-10">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
          <ShoppingCart className="text-green-600" /> Cart
        </h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-3">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-14 h-14 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-green-600 font-medium">
                        ₹{item.price} x {item.qty}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decrementQty(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      <Minus size={16} />
                    </button>
                    <button
                      onClick={() => incrementQty(item.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition ml-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-right text-xl font-bold text-gray-800">
              Total: ₹{totalAmount}
            </div>

            <div className="mt-4 text-right">
              <button
                onClick={handlePayment}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-md transition text-base"
              >
                Pay Now
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dairypage;
