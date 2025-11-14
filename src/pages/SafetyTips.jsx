import React, { useState } from "react";
import {
  AlertTriangle,
  ShieldAlert,
  Home,
  Droplet,
  Zap,
  Phone,
  Briefcase,
  CheckCircle,
  List,
} from "lucide-react";

export default function SafetyTips() {
  const [openSection, setOpenSection] = useState(null);
  const toggle = (key) => setOpenSection(openSection === key ? null : key);

  const quickTips = [
    "Keep your phone charged & enable location services",
    "Save emergency numbers (ambulance, fire, police, local rescue)",
    "Prepare a go-bag with water, food, medicines & documents",
    "Don't trust unverified social media info — rely on authorities",
    "Know the nearest shelter and evacuation route",
  ];

  const emergencyKit = [
    "First-aid kit",
    "Flashlight + spare batteries",
    "Power bank",
    "Bottled water (3 days supply)",
    "Non-perishable food/snacks",
    "Whistle",
    "Emergency blanket",
    "Basic medicines",
    "Copies of important documents (in waterproof pouch)",
    "Cash (small notes)",
  ];

  const contacts = [
    { label: "Ambulance", number: "1122" },
    { label: "Police", number: "15" },
    { label: "Fire", number: "16" },
    { label: "Local Rescue", number: "(Add local number)" },
    { label: "Nearest Hospital", number: "(Add hospital number)" },
  ];

  return (
    <div className="min-h-screen bg-green-50 text-gray-900 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <ShieldAlert className="mx-auto w-14 h-14 text-green-600" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-800 mt-4">
            Disaster Safety Tips
          </h1>
          <p className="text-gray-700 mt-2 max-w-2xl mx-auto">
            Clear and actionable advice to prepare, stay safe, and recover during disasters.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-green-100">
            <h2 className="font-semibold text-lg flex items-center gap-2 text-green-700">
              <Home className="w-5 h-5" /> General Preparedness
            </h2>
            <ul className="mt-3 list-disc list-inside space-y-2 text-gray-700">
              {quickTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>

            <div className="mt-4">
              <button
                onClick={() => toggle("kit")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 transition"
              >
                <Briefcase className="w-4 h-4" /> Emergency Kit Checklist
              </button>

              {openSection === "kit" && (
                <div className="mt-3 bg-green-50 p-4 rounded-lg border border-green-100">
                  <ul className="list-decimal list-inside space-y-1 text-gray-700">
                    {emergencyKit.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-green-100">
            <h2 className="font-semibold text-lg flex items-center gap-2 text-green-700">
              <AlertTriangle className="w-5 h-5" /> Emergency Contacts
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Keep these numbers handy and update for your local area.
            </p>

            <div className="mt-4 grid gap-2">
              {contacts.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-100"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="text-sm font-medium">{c.label}</div>
                      <div className="text-xs text-gray-500">{c.number}</div>
                    </div>
                  </div>
                  <a
                    href={`tel:${c.number.replace(/[^0-9+]/g, "")}`}
                    className="text-sm text-green-700 font-semibold hover:underline"
                  >
                    Call
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <main className="mt-10 space-y-6">
          <Article
            icon={<Droplet className="w-6 h-6 text-blue-500" />}
            title="Flood"
            items={[
              "Move to higher ground immediately.",
              "Do not walk or drive through flood water.",
              "Turn off electricity when safe to do so.",
              "Use bottled or boiled water for drinking.",
            ]}
            open={openSection === "flood"}
            onToggle={() => toggle("flood")}
          />

          <Article
            icon={<Zap className="w-6 h-6 text-yellow-500" />}
            title="Earthquake"
            items={[
              "Drop, Cover, and Hold On — get under sturdy furniture.",
              "Stay away from windows and heavy objects.",
              "When shaking stops, move to an open area.",
              "Check for gas leaks and other hazards.",
            ]}
            open={openSection === "quake"}
            onToggle={() => toggle("quake")}
          />

          <Article
            icon={<Zap className="w-6 h-6 text-red-500" />}
            title="Fire"
            items={[
              "Stop, Drop & Roll if clothing catches fire.",
              "Stay low to avoid smoke inhalation.",
              "Use an extinguisher only for small fires.",
              "Do not use elevators; use stairs to evacuate.",
            ]}
            open={openSection === "fire"}
            onToggle={() => toggle("fire")}
          />

          <Article
            icon={<List className="w-6 h-6 text-gray-600" />}
            title="After a Disaster — Recovery"
            items={[
              "Check yourself and family for injuries.",
              "Avoid damaged buildings and fallen wires.",
              "Follow official instructions from authorities.",
              "Report missing persons to rescue services.",
            ]}
            open={openSection === "after"}
            onToggle={() => toggle("after")}
          />
        </main>

        <footer className="mt-12 text-sm text-gray-600 bg-white p-5 rounded-lg border border-green-100">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <strong>Notes:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Keep tips short and actionable for stressful situations.</li>
                <li>Regularly update emergency contacts for your area.</li>
                <li>Focus on safety actions — avoid graphic or scary details.</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Article({ icon, title, items = [], open = false, onToggle }) {
  return (
    <article className="bg-white p-6 rounded-2xl shadow-md border border-green-100">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="text-lg font-semibold text-green-800">{title}</h3>
        </div>
        <button
          onClick={onToggle}
          className="px-3 py-1 rounded-md border border-green-200 text-sm text-green-700 hover:bg-green-50 transition"
        >
          {open ? "Hide" : "Show"}
        </button>
      </header>

      {open && (
        <ul className="mt-4 list-disc list-inside text-gray-700 space-y-2">
          {items.map((it, idx) => (
            <li key={idx}>{it}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
