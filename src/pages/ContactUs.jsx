import React from "react";
import { Phone, Mail, MapPin, AlertTriangle } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="w-full">

      <div className="bg-gray-50 py-16 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-red-500 flex items-center justify-center">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold">
            Contact <span className="text-red-600">Us</span>
          </h1>
          <p className="text-gray-500 max-w-xl">
            Get in touch with our team. We're here to help with emergencies, support questions, and partnership opportunities.
          </p>
        </div>
      </div>

      <div className="bg-red-500 text-white py-2 text-center font-semibold flex items-center justify-center gap-2">
        <AlertTriangle className="w-4 h-4" />
        FOR IMMEDIATE EMERGENCIES: Call 911 or use our emergency reporting system
        <AlertTriangle className="w-4 h-4" />
      </div>

      <div className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2">Get in Touch</h2>
        <p className="text-gray-500 text-center mb-8">Multiple ways to reach us based on your needs and urgency level.</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="border border-red-500 rounded-lg p-6 text-center hover:shadow-lg transition">
            <div className="flex justify-center mb-2">
              <Phone className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="font-semibold">Emergency Hotline</h3>
            <p className="text-red-500 font-semibold">+1 (555) EMERGENCY</p>
            <p className="text-gray-400 text-sm mt-1">24/7 emergency support line</p>
          </div>

          <div className="border rounded-lg p-6 text-center hover:shadow-lg transition">
            <div className="flex justify-center mb-2">
              <Mail className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="font-semibold">Support Email</h3>
            <p className="text-red-500 font-semibold">support@cdms.org</p>
            <p className="text-gray-400 text-sm mt-1">General inquiries and support</p>
          </div>

          <div className="border rounded-lg p-6 text-center hover:shadow-lg transition">
            <div className="flex justify-center mb-2">
              <Phone className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="font-semibold">General Phone</h3>
            <p className="text-red-500 font-semibold">+1 (555) 123-CDMS</p>
            <p className="text-gray-400 text-sm mt-1">Business hours: 9 AM - 6 PM</p>
          </div>

          <div className="border rounded-lg p-6 text-center hover:shadow-lg transition">
            <div className="flex justify-center mb-2">
              <MapPin className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="font-semibold">Headquarters</h3>
            <p className="text-red-500 font-semibold">123 Emergency Response Blvd</p>
            <p className="text-gray-400 text-sm mt-1">Disaster Management District, City 12345</p>
          </div>
        </div>
      </div>

      <div className="py-16 px-4 bg-gray-50">
        <h2 className="text-2xl font-bold text-center mb-2">Send us a Message</h2>
        <p className="text-gray-500 text-center mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

        <form className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-lg shadow-md">
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Full Name *</label>
            <input type="text" placeholder="Your full name" className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Email Address *</label>
            <input type="email" placeholder="your.email@example.com" className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Phone Number</label>
            <input type="text" placeholder="Your phone number" className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Department *</label>
            <select className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500">
              <option>Select department</option>
              <option>Support</option>
              <option>Volunteer</option>
              <option>General Inquiry</option>
            </select>
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 font-medium">Subject *</label>
            <input type="text" placeholder="Brief description of your inquiry" className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 font-medium">Message *</label>
            <textarea placeholder="Please provide detailed information about your inquiry or request…" rows="5" className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"></textarea>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Priority Level</label>
            <select className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500">
              <option>Medium - Support needed</option>
              <option>High - Immediate action</option>
              <option>Low - General inquiry</option>
            </select>
          </div>

          <div className="flex items-end gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex-1">
              Send Message
            </button>
            <button type="reset" className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition">
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
