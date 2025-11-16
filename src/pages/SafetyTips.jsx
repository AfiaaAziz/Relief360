import React, { useState } from "react";
import {
  Shield,
  Phone,
  Droplets,
  Flame,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  Package,
} from "lucide-react";

export default function SafetyTips() {
  const [openDisasterIndex, setOpenDisasterIndex] = useState(null);

  const preparednessItems = [
    "Keep your phone charged & enable location services",
    "Save emergency numbers (ambulance, fire, police, local rescue)",
    "Prepare a go-bag with water, food, medicines & documents",
    "Don't trust unverified social media info — rely on authorities",
    "Know the nearest shelter and evacuation route",
  ];

  const kitItems = [
    {
      icon: Package,
      name: "Water & Non-perishable Food",
      description: "3-day supply per person",
    },
    {
      icon: Shield,
      name: "First Aid Kit",
      description: "Bandages, medicines, antiseptics",
    },
    {
      icon: Phone,
      name: "Emergency Documents",
      description: "IDs, insurance, medical records",
    },
    {
      icon: AlertTriangle,
      name: "Flashlight & Batteries",
      description: "Plus portable power bank",
    },
    {
      icon: Package,
      name: "Personal Items",
      description: "Clothes, blankets, hygiene items",
    },
    {
      icon: Shield,
      name: "Tools & Supplies",
      description: "Multi-tool, duct tape, whistle",
    },
  ];

  const emergencyContacts = [
    { service: "Ambulance", number: "1122", color: "red" },
    { service: "Police", number: "15", color: "blue" },
    { service: "Fire", number: "16", color: "yellow" },
  ];

  const disasters = [
    {
      icon: Droplets,
      title: "Flood",
      color: "blue",
      tips: [
        "Move to higher ground immediately.",
        "Do not walk or drive through flood water.",
        "Turn off electricity when safe to do so.",
        "Use bottled or boiled water for drinking.",
      ],
    },
    {
      icon: AlertTriangle,
      title: "Earthquake",
      color: "yellow",
      tips: [
        "Drop, Cover, and Hold On — get under sturdy furniture.",
        "Stay away from windows and heavy objects.",
        "When shaking stops, move to an open area.",
        "Check for gas leaks and other hazards.",
      ],
    },
    {
      icon: Flame,
      title: "Fire",
      color: "red",
      tips: [
        "Stop, Drop & Roll if clothing catches fire.",
        "Stay low to avoid smoke inhalation.",
        "Use an extinguisher only for small fires.",
        "Do not use elevators; use stairs to evacuate.",
      ],
    },
  ];

  const recoverySteps = [
    "Check yourself and family for injuries.",
    "Avoid damaged buildings and fallen wires.",
    "Follow official instructions from authorities.",
    "Report missing persons to rescue services.",
  ];

  const toggleDisaster = (index) => {
    setOpenDisasterIndex(openDisasterIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <section className="py-20 bg-gradient-to-br from-white to-gray-150 text-center">
          <div className="mx-auto max-w-4xl px-4">
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Disaster <span className="text-red-600">Safety Tips</span>
            </h1>
            <p className="text-lg text-gray-600">
              Clear and actionable advice to prepare, stay safe, and recover
              during disasters.
            </p>
          </div>
        </section>
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">General Preparedness</h2>
            <p className="text-gray-600 mb-12">
              Essential steps everyone should take before disaster strikes
            </p>

            <div className="bg-white shadow-md p-8 rounded-xl max-w-3xl mx-auto">
              <ul className="space-y-4">
                {preparednessItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                    <span className="text-lg text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-100">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Emergency Kit Checklist</h2>
            <p className="text-gray-600 mb-12">
              Keep these items ready in an easily accessible location
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kitItems.map((item, index) => (
                <div key={index} className="bg-white shadow-md rounded-xl p-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Emergency Contacts</h2>
            <p className="text-gray-600 mb-12">
              Keep these numbers handy and update for your local area
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emergencyContacts.map((c, index) => (
                <div key={index} className="bg-white shadow-md rounded-xl p-8">
                  <div
                    className={`w-16 h-16 ${
                      c.color === "red"
                        ? "bg-red-100"
                        : c.color === "blue"
                        ? "bg-blue-100"
                        : "bg-yellow-100"
                    } rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <Phone
                      className={`w-8 h-8 ${
                        c.color === "red"
                          ? "text-red-600"
                          : c.color === "blue"
                          ? "text-blue-600"
                          : "text-yellow-600"
                      }`}
                    />
                  </div>

                  <h3 className="text-xl font-semibold">{c.service}</h3>
                  <p className="text-3xl font-bold text-red-600 mb-4">
                    {c.number}
                  </p>

                  <a
                    href={`tel:${c.number}`}
                    className="block bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Call Now
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-100">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Disaster-Specific Safety Tips
            </h2>
            <p className="text-gray-600 mb-12">
              Know what to do when disaster strikes
            </p>

            {disasters.map((d, index) => (
              <div key={index} className="mb-6">
                <div
                  onClick={() => toggleDisaster(index)}
                  className="bg-white shadow-md rounded-xl p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 ${
                        d.color === "blue"
                          ? "bg-blue-100"
                          : d.color === "yellow"
                          ? "bg-yellow-100"
                          : "bg-red-100"
                      } rounded-full flex items-center justify-center`}
                    >
                      <d.icon
                        className={`w-6 h-6 ${
                          d.color === "blue"
                            ? "text-blue-600"
                            : d.color === "yellow"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      />
                    </div>
                    <h3 className="text-2xl">{d.title}</h3>
                  </div>

                  <ChevronDown
                    className={`w-6 h-6 transition-transform ${
                      openDisasterIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {openDisasterIndex === index && (
                  <div className="bg-white shadow-md rounded-xl mt-2 p-6">
                    <ul className="space-y-3 text-left">
                      {d.tips.map((tip, i) => (
                        <li key={i} className="flex items-start">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              After a Disaster — Recovery
            </h2>
            <p className="text-gray-600 mb-12">
              Important steps to take after the immediate danger has passed
            </p>

            <div className="bg-white shadow-md rounded-xl p-8 max-w-3xl mx-auto">
              <ul className="space-y-4">
                {recoverySteps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <span className="font-bold text-green-600">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-lg text-gray-800">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className="py-10 bg-red-50 text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Prepared, Stay Safe</h2>
          <p className="text-gray-600 mb-8">
            In an emergency, every second counts. Report incidents immediately.
          </p>
        </section>
      </main>
    </div>
  );
}
