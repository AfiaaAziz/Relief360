import React from "react";
import { AlertTriangle, Users, Hospital, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../assets/images/HeroImage.jpg";

const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-200 whitespace-nowrap";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-700 text-white hover:bg-gray-800",
    hero: "bg-gradient-to-r from-red-600 to-orange-500 text-white hover:scale-105 shadow-lg",
  };

  const sizes = {
    default: "h-10 px-4 text-sm",
    lg: "h-12 px-8 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Home = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img
          src={heroImage}
          alt="Disaster management"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Relief - 360
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
            Connecting citizens, volunteers, hospitals, and emergency responders
            in real-time to save lives and manage disasters effectively.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-14">
          <Link to="/report-incident">
            <Button variant="hero" size="lg">
              <AlertTriangle className="h-5 w-5" />
              Report Emergency
            </Button>
          </Link>

          <Link to="/volunteer-register">
            <Button variant="secondary" size="lg">
              <Users className="h-5 w-5" />
              Join as Volunteer
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          <div>
            <p className="text-3xl md:text-4xl font-bold text-red-400">24/7</p>
            <p className="text-sm text-gray-300 mt-1">Emergency Response</p>
          </div>

          <div>
            <p className="text-3xl md:text-4xl font-bold text-yellow-400">
              1000+
            </p>
            <p className="text-sm text-gray-300 mt-1">Active Volunteers</p>
          </div>

          <div>
            <p className="text-3xl md:text-4xl font-bold text-green-400">50+</p>
            <p className="text-sm text-gray-300 mt-1">Partner Hospitals</p>
          </div>

          <div>
            <p className="text-3xl md:text-4xl font-bold text-blue-400">95%</p>
            <p className="text-sm text-gray-300 mt-1">Success Rate</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Emergency: 911</span>
            </div>
            <div className="flex items-center gap-2">
              <Hospital className="h-4 w-4" />
              <span>Medical: 112</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Fire: 101</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
