import React, { useState } from "react";
import { AlertTriangle, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Safety Tips", path: "/safety" },
    { name: "Donations", path: "/donations" },
    { name: "Hospital", path: "/hospital-info" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav 
        className="shadow-xl sticky top-0 z-50 border-b-4" 
        style={{ 
          borderColor: '#16537e',
          background: 'linear-gradient(135deg, rgba(22, 83, 126, 0.95) 0%, rgba(56, 118, 29, 0.95) 100%)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div className="w-full">
          <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
            {/* Logo - Top Left */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <div 
                className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"
                style={{ 
                  background: 'radial-gradient(circle at 30% 30%, #f44336 0%, #990000 100%)'
                }}
              >
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span 
                  className="text-2xl font-bold"
                  style={{ 
                    color: '#ffffff'
                  }}
                >
                  Relief360
                </span>
                <span className="text-xs font-semibold" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  Emergency Response
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center gap-6 mx-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-3 py-2 font-semibold rounded-lg transition-all duration-300 whitespace-nowrap hover:scale-105"
                  style={{ 
                    color: '#ffffff',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#f48836';
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#ffffff';
                    e.target.style.background = 'transparent';
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side Buttons */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              {/* Sign In */}
              <Link to="/sign-in">
                <button 
                  className="px-4 py-2 font-bold border-2 rounded-lg transition-all duration-300 whitespace-nowrap hover:scale-105"
                  style={{ 
                    borderColor: '#ffffff',
                    color: '#ffffff',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = '#f48836';
                    e.target.style.color = '#f48836';
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = '#ffffff';
                    e.target.style.color = '#ffffff';
                    e.target.style.background = 'transparent';
                  }}
                >
                  Sign In
                </button>
              </Link>

              {/* Volunteer */}
              <button 
                onClick={() => {
                  const token = localStorage.getItem("token");
                  const user = localStorage.getItem("user");
                  if (token && user) {
                    try {
                      const userData = JSON.parse(user);
                      if (userData.role === "volunteer") {
                        window.location.href = "/volunteer-dashboard";
                        return;
                      }
                    } catch (e) {
                      // If parsing fails, continue to sign-in
                    }
                  }
                  window.location.href = "/sign-in?role=volunteer&redirect=/volunteer-dashboard";
                }}
                className="px-4 py-2 rounded-lg text-white font-bold shadow-md transition-all duration-300 whitespace-nowrap hover:scale-105 hover:shadow-lg"
                style={{ 
                  background: 'linear-gradient(135deg, #f44336 0%, #f48836 100%)'
                }}
              >
                Volunteer
              </button>

              {/* Citizen Dashboard */}
              <button 
                onClick={() => {
                  const token = localStorage.getItem("token");
                  const user = localStorage.getItem("user");
                  if (token && user) {
                    try {
                      const userData = JSON.parse(user);
                      if (userData.role === "citizen") {
                        window.location.href = "/citizen-dashboard";
                        return;
                      }
                    } catch (e) {
                      // If parsing fails, continue to sign-in
                    }
                  }
                  window.location.href = "/sign-in?role=citizen&redirect=/citizen-dashboard";
                }}
                className="px-4 py-2 rounded-lg text-white font-bold shadow-md transition-all duration-300 whitespace-nowrap hover:scale-105 hover:shadow-lg"
                style={{ 
                  background: 'linear-gradient(135deg, #16537e 0%, #38761d 100%)'
                }}
              >
                Citizen
              </button>

              {/* Admin Panel */}
              <button 
                onClick={() => {
                  window.location.href = "/sign-in?role=admin&redirect=/admin-dashboard";
                }}
                className="px-4 py-2 rounded-lg text-white font-bold shadow-md transition-all duration-300 whitespace-nowrap hover:scale-105 hover:shadow-lg"
                style={{ 
                  background: 'linear-gradient(135deg, #990000 0%, #f44336 100%)'
                }}
              >
                Admin
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors ml-auto"
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
            <div className="lg:hidden pb-6 border-t" style={{ borderColor: '#16537e' }}>
              <div className="flex flex-col space-y-3 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 font-semibold rounded-lg transition-all duration-300"
                    style={{ color: '#ffffff' }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#f48836';
                      e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#ffffff';
                      e.target.style.background = 'transparent';
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-4 mt-6 pt-6 border-t" style={{ borderColor: '#16537e' }}>
                <Link to="/sign-in" onClick={() => setIsMobileMenuOpen(false)}>
                  <button 
                    className="w-full px-5 py-2.5 font-bold border-2 rounded-lg transition-all duration-300"
                    style={{ 
                      borderColor: '#ffffff',
                      color: '#ffffff',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = '#f48836';
                      e.target.style.color = '#f48836';
                      e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = '#ffffff';
                      e.target.style.color = '#ffffff';
                      e.target.style.background = 'transparent';
                    }}
                  >
                    Sign In
                  </button>
                </Link>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    const token = localStorage.getItem("token");
                    const user = localStorage.getItem("user");
                    if (token && user) {
                      try {
                        const userData = JSON.parse(user);
                        if (userData.role === "volunteer") {
                          window.location.href = "/volunteer-dashboard";
                          return;
                        }
                      } catch (e) {
                        // If parsing fails, continue to sign-in
                      }
                    }
                    window.location.href = "/sign-in?role=volunteer&redirect=/volunteer-dashboard";
                  }}
                  className="w-full px-5 py-2.5 rounded-lg text-white font-bold shadow-md transition-all duration-300 hover:shadow-lg"
                  style={{ 
                    background: 'linear-gradient(135deg, #f44336 0%, #f48836 100%)'
                  }}
                >
                  Volunteer
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    const token = localStorage.getItem("token");
                    const user = localStorage.getItem("user");
                    if (token && user) {
                      try {
                        const userData = JSON.parse(user);
                        if (userData.role === "citizen") {
                          window.location.href = "/citizen-dashboard";
                          return;
                        }
                      } catch (e) {
                        // If parsing fails, continue to sign-in
                      }
                    }
                    window.location.href = "/sign-in?role=citizen&redirect=/citizen-dashboard";
                  }}
                  className="w-full px-5 py-2.5 rounded-lg text-white font-bold shadow-md transition-all duration-300 hover:shadow-lg"
                  style={{ 
                    background: 'linear-gradient(135deg, #16537e 0%, #38761d 100%)'
                  }}
                >
                  Citizen Dashboard
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.location.href = "/sign-in?role=admin&redirect=/admin-dashboard";
                  }}
                  className="w-full px-5 py-2.5 rounded-lg text-white font-bold shadow-md transition-all duration-300 hover:shadow-lg"
                  style={{ 
                    background: 'linear-gradient(135deg, #990000 0%, #f44336 100%)'
                  }}
                >
                  Admin Panel
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
