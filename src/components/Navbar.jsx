import React from "react";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-40 h-10 rounded-md bg-gradient-to-r from-purple-500 to-red-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Relief-360</span>
            </div>
          </div>

          <div className="hidden md:flex space-x-6 font-medium text-gray-700">
            <Link to="/about" className="hover:text-gray-900 transition">
              About
            </Link>
            <a href="#how-it-works" className="hover:text-gray-900 transition">
              How It Works
            </a>
            <Link to="/safety" className="hover:text-gray-900 transition">
              Safety Tips
            </Link>

            <a href="#volunteer" className="hover:text-gray-900 transition">
              Volunteer
            </a>
            <a href="#hospitals" className="hover:text-gray-900 transition">
              Hospitals
            </a>
            <Link to="/contact" className="hover:text-gray-900 transition">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-4 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
              Sign In
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition">
              <AlertTriangle className="w-4 h-4" /> Report Emergency
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
