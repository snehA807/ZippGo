// src/components/Footer.jsx
import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-10 border-t">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-green-600 mb-3">ZippGo</h2>
          <p className="text-sm text-gray-600">
            Delivering groceries and essentials at lightning speed.
          </p>
        </div>

        {/* Customer Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-600">About Us</a></li>
            <li><a href="#" className="hover:text-green-600">Careers</a></li>
            <li><a href="#" className="hover:text-green-600">Help Center</a></li>
            <li><a href="#" className="hover:text-green-600">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-600">Fruits & Vegetables</a></li>
            <li><a href="#" className="hover:text-green-600">Dairy & Bakery</a></li>
            <li><a href="#" className="hover:text-green-600">Snacks & Beverages</a></li>
            <li><a href="#" className="hover:text-green-600">Household Essentials</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#"><Facebook className="w-5 h-5 hover:text-green-600" /></a>
            <a href="#"><Twitter className="w-5 h-5 hover:text-green-600" /></a>
            <a href="#"><Instagram className="w-5 h-5 hover:text-green-600" /></a>
            <a href="#"><Linkedin className="w-5 h-5 hover:text-green-600" /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Blinkit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
