import React from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Heart,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { name: "About Us", path: "/about" },
      { name: "How It Works", path: "/how-it-works" },
      { name: "Safety Tips", path: "/safety" },
      { name: "Contact Us", path: "/contact" },
    ],
    resources: [
      { name: "Hospital Info", path: "/hospital-info" },
      { name: "Report Incident", path: "/report-incident" },
      { name: "Join as Volunteer", path: "/volunteer-register" },
      { name: "Sign In", path: "/sign-in" },
    ],
    legal: [
      { name: "Privacy Policy", path: "#" },
      { name: "Terms of Service", path: "#" },
      { name: "Cookie Policy", path: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, label: "Facebook", url: "#" },
    { icon: Twitter, label: "Twitter", url: "#" },
    { icon: Linkedin, label: "LinkedIn", url: "#" },
    { icon: Instagram, label: "Instagram", url: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-100">
      {/* Main Footer Content */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1">
              <Link to="/" className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-orange-500">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                    Relief360
                  </span>
                  <span className="text-xs text-gray-400">
                    Emergency Response
                  </span>
                </div>
              </Link>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Connecting citizens, volunteers, hospitals, and emergency
                responders in real-time to save lives and manage disasters
                effectively.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      aria-label={social.label}
                      className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-red-600 to-orange-500 rounded"></div>
                Quick Links
              </h3>
              <ul className="space-y-3">
                {footerLinks.quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-red-600 to-orange-500 rounded"></div>
                Resources
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-red-600 to-orange-500 rounded"></div>
                Contact
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Emergency Hotline</p>
                    <p className="text-white font-semibold">+92-300-XXXX-XXX</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-semibold">
                      support@relief360.com
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Address</p>
                    <p className="text-white font-semibold text-sm">
                      Karachi, Pakistan
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            © {currentYear} Relief360. All rights reserved. Dedicated to
            emergency response and disaster management.
          </p>

          {/* Legal Links */}
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-400 hover:text-red-500 transition-colors duration-200 text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2 text-white font-semibold">
          <Heart className="w-5 h-5" />
          <span>
            In case of emergency, always dial 911 or use our Report Emergency
            feature
          </span>
        </div>
      </div>
    </footer>
  );
}
