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
      color: "#16537e"
    },
    {
      icon: Shield,
      name: "First Aid Kit",
      description: "Bandages, medicines, antiseptics",
      color: "#f44336"
    },
    {
      icon: Phone,
      name: "Emergency Documents",
      description: "IDs, insurance, medical records",
      color: "#6aa84f"
    },
    {
      icon: AlertTriangle,
      name: "Flashlight & Batteries",
      description: "Plus portable power bank",
      color: "#f48836"
    },
    {
      icon: Package,
      name: "Personal Items",
      description: "Clothes, blankets, hygiene items",
      color: "#16537e"
    },
    {
      icon: Shield,
      name: "Tools & Supplies",
      description: "Multi-tool, duct tape, whistle",
      color: "#38761d"
    },
  ];

  const emergencyContacts = [
    { service: "Ambulance", number: "1122", color: "#f44336", bgColor: "rgba(244, 67, 54, 0.1)" },
    { service: "Police", number: "15", color: "#16537e", bgColor: "rgba(22, 83, 126, 0.1)" },
    { service: "Fire", number: "16", color: "#ff3535", bgColor: "rgba(255, 53, 53, 0.1)" },
  ];

  const disasters = [
    {
      icon: Droplets,
      title: "Flood",
      color: "#16537e",
      bgColor: "rgba(22, 83, 126, 0.1)",
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
      color: "#f48836",
      bgColor: "rgba(244, 136, 54, 0.1)",
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
      color: "#ff3535",
      bgColor: "rgba(255, 53, 53, 0.1)",
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
    <div className="min-h-screen" style={{
      background: 'radial-gradient(circle at 20% 50%, rgba(106, 168, 79, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(22, 83, 126, 0.15) 0%, transparent 50%), linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
    }}>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; }
        .delay-400 { animation-delay: 0.4s; opacity: 0; }
      `}</style>
      
      <main>
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f44336]/20 via-[#ff3535]/15 to-[#990000]/20"></div>
          <div className="mx-auto max-w-4xl px-4 text-center relative z-10">
            <div className="animate-fade-in-up">
              <div className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center shadow-2xl animate-pulse-slow" style={{
                background: 'linear-gradient(135deg, #ff3535 0%, #f44336 100%)',
                boxShadow: '0 8px 25px rgba(255, 53, 53, 0.5)'
              }}>
                <Shield className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6" style={{
                background: 'linear-gradient(135deg, #f44336 0%, #ff3535 50%, #990000 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 4px 20px rgba(244, 67, 54, 0.2)',
                lineHeight: '1.2',
                paddingBottom: '0.5rem'
              }}>
                Disaster <span className="block md:inline">Safety Tips</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                Clear and actionable advice to prepare, stay safe, and recover
                during disasters.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-20 relative">
          <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-black mb-4" style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.3'
              }}>
                General Preparedness
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 mb-12 font-medium">
                Essential steps everyone should take before disaster strikes
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm shadow-2xl p-8 md:p-12 rounded-3xl max-w-3xl mx-auto border-2 animate-fade-in-up delay-200" style={{
              borderColor: 'rgba(106, 168, 79, 0.3)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(106, 168, 79, 0.05) 100%)'
            }}>
              <ul className="space-y-4">
                {preparednessItems.map((item, index) => (
                  <li key={index} className="flex items-start animate-fade-in-up" style={{ animationDelay: `${(index + 1) * 0.1}s`, opacity: 0 }}>
                    <CheckCircle className="w-7 h-7 flex-shrink-0 mr-4 mt-1" style={{ color: '#6aa84f' }} />
                    <span className="text-lg md:text-xl text-gray-800 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-20 relative">
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(106, 168, 79, 0.1) 0%, transparent 70%)'
          }}></div>
          <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-black mb-4" style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.3'
              }}>
                Emergency Kit Checklist
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 mb-12 font-medium">
                Keep these items ready in an easily accessible location
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kitItems.map((item, index) => (
                <div key={index} className={`bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-6 border-2 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up delay-${(index + 1) * 100}`} style={{
                  borderColor: `${item.color}40`,
                  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, ${item.color}08 100%)`
                }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg" style={{
                    background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`
                  }}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mb-2 text-gray-900">{item.name}</h3>
                  <p className="text-base md:text-lg text-gray-700 font-medium">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative">
          <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-black mb-4" style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.3'
              }}>
                Emergency Contacts
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 mb-12 font-medium">
                Keep these numbers handy and update for your local area
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emergencyContacts.map((c, index) => (
                <div key={index} className={`bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 border-2 hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up delay-${(index + 1) * 100}`} style={{
                  borderColor: `${c.color}40`,
                  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, ${c.bgColor} 100%)`
                }}>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-pulse-slow" style={{
                    background: `linear-gradient(135deg, ${c.color} 0%, ${c.color}dd 100%)`
                  }}>
                    <Phone className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-black mb-2 text-gray-900">{c.service}</h3>
                  <p className="text-4xl md:text-5xl font-black mb-6" style={{ color: c.color }}>
                    {c.number}
                  </p>

                  <a
                    href={`tel:${c.number}`}
                    className="block text-white py-3 rounded-xl hover:shadow-xl transition-all duration-300 font-black text-lg"
                    style={{
                      background: `linear-gradient(135deg, ${c.color} 0%, ${c.color}dd 100%)`,
                      boxShadow: `0 4px 15px ${c.color}40`
                    }}
                  >
                    Call Now
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative">
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(244, 136, 54, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255, 53, 53, 0.1) 0%, transparent 50%)'
          }}></div>
          <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-black mb-4" style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.3'
              }}>
                Disaster-Specific Safety Tips
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 mb-12 font-medium">
                Know what to do when disaster strikes
              </p>
            </div>

            {disasters.map((d, index) => (
              <div key={index} className={`mb-6 animate-fade-in-up delay-${(index + 1) * 100}`}>
                <div
                  onClick={() => toggleDisaster(index)}
                  className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-6 flex justify-between items-center cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:scale-105"
                  style={{
                    borderColor: `${d.color}40`,
                    background: `linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, ${d.bgColor} 100%)`
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg" style={{
                      background: `linear-gradient(135deg, ${d.color} 0%, ${d.color}dd 100%)`
                    }}>
                      <d.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900">{d.title}</h3>
                  </div>

                  <ChevronDown
                    className={`w-6 h-6 transition-transform ${openDisasterIndex === index ? "rotate-180" : ""}`}
                    style={{ color: d.color }}
                  />
                </div>

                {openDisasterIndex === index && (
                  <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl mt-2 p-6 border-2 animate-fade-in-up" style={{
                    borderColor: `${d.color}40`,
                    background: `linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, ${d.bgColor} 100%)`
                  }}>
                    <ul className="space-y-3 text-left">
                      {d.tips.map((tip, i) => (
                        <li key={i} className="flex items-start">
                          <div className="w-3 h-3 rounded-full mt-2 mr-4 flex-shrink-0" style={{
                            background: d.color
                          }}></div>
                          <span className="text-base md:text-lg text-gray-800 font-medium">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        
        <section className="py-20 relative">
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-black mb-4" style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.3'
              }}>
                After a Disaster — Recovery
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 mb-12 font-medium">
                Important steps to take after the immediate danger has passed
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl p-8 md:p-12 max-w-3xl mx-auto border-2 animate-fade-in-up delay-200" style={{
              borderColor: 'rgba(106, 168, 79, 0.3)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(106, 168, 79, 0.05) 100%)'
            }}>
              <ul className="space-y-4">
                {recoverySteps.map((step, index) => (
                  <li key={index} className="flex items-start animate-fade-in-up" style={{ animationDelay: `${(index + 1) * 0.1}s`, opacity: 0 }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 shadow-lg" style={{
                      background: 'linear-gradient(135deg, #6aa84f 0%, #38761d 100%)'
                    }}>
                      <span className="font-black text-white text-lg">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-lg md:text-xl text-gray-800 font-medium">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        
        <section className="py-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#f44336]/20 via-[#ff3535]/20 to-[#990000]/20"></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-black mb-4" style={{
                background: 'linear-gradient(135deg, #f44336 0%, #ff3535 50%, #990000 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.3'
              }}>
                Stay Prepared, Stay Safe
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 font-medium">
                In an emergency, every second counts. Report incidents immediately.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
