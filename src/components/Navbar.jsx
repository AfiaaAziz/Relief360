import React, { useState } from "react";
import { AlertTriangle, Menu, X, Heart, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Safety Tips", path: "/safety" },
    { name: "Hospital", path: "/hospital-info" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-orange-500 shadow-lg group-hover:shadow-xl transition-shadow">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                  Relief360
                </span>
                <span className="text-xs font-semibold text-gray-600">
                  Emergency Response
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-4 py-2 text-gray-700 font-medium hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Sign In */}
              <Link to="/sign-in">
                <button className="px-5 py-2.5 text-gray-700 font-semibold border-2 border-gray-300 rounded-lg hover:border-red-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200">
                  Sign In
                </button>
              </Link>

              {/* Report Emergency - Primary CTA */}
              <Link to="/report-incident">
                <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Report Emergency</span>
                </button>
              </Link>

              {/* Admin Panel */}
              <Link to="/admin-dashboard">
                <button className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
                  Admin
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden pb-6 border-t border-gray-200">
              <div className="flex flex-col space-y-2 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 text-gray-700 font-medium hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-gray-200">
                <Link to="/sign-in" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full px-5 py-2.5 text-gray-700 font-semibold border-2 border-gray-300 rounded-lg hover:border-red-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200">
                    Sign In
                  </button>
                </Link>

                <Link
                  to="/report-incident"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <button className="w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200">
                    <AlertTriangle className="w-5 h-5" />
                    Report Emergency
                  </button>
                </Link>

                <Link
                  to="/admin-dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <button className="w-full px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md hover:shadow-lg transition-all duration-200">
                    Admin Panel
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
