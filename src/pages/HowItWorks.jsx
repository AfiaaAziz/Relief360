import {Link} from "react-router-dom";
import { 
  AlertTriangle, 
  UserCheck, 
  Users, 
  Hospital, 
  CheckCircle,
  MapPin,
  Clock,
  Shield
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      icon: AlertTriangle,
      title: "Incident Reported",
      description: "Citizens quickly report disasters with location, photos, and details through our easy-to-use platform.",
      details: ["Real-time location tracking", "Photo/video evidence", "Severity assessment", "Instant verification"],
      gradient: "from-[#ff3535] to-[#f44336]",
      bgGradient: "from-[#ff3535]/10 to-[#f44336]/10"
    },
    {
      step: 2,
      icon: UserCheck,
      title: "Admin Assessment",
      description: "Emergency coordinators receive instant alerts and assess the situation for appropriate response.",
      details: ["Automated severity analysis", "Resource requirement estimation", "Response team selection", "Priority assignment"],
      gradient: "from-[#16537e] to-[#6aa84f]",
      bgGradient: "from-[#16537e]/10 to-[#6aa84f]/10"
    },
    {
      step: 3,
      icon: Users,
      title: "Volunteer Deployment",
      description: "Qualified volunteers are notified and deployed based on skills, location, and availability.",
      details: ["Skill-based matching", "Proximity calculation", "Availability confirmation", "Task assignment"],
      gradient: "from-[#6aa84f] to-[#38761d]",
      bgGradient: "from-[#6aa84f]/10 to-[#38761d]/10"
    },
    {
      step: 4,
      icon: Hospital,
      title: "Hospital Coordination",
      description: "Nearby hospitals are notified and share real-time capacity and resource availability.",
      details: ["Bed availability updates", "Ambulance dispatch", "Medical supply status", "Emergency contacts"],
      gradient: "from-[#16537e] to-[#6aa84f]",
      bgGradient: "from-[#16537e]/10 to-[#6aa84f]/10"
    },
    {
      step: 5,
      icon: CheckCircle,
      title: "Resolution & Follow-up",
      description: "Incident resolution is tracked, documented, and analyzed for future improvements.",
      details: ["Status updates", "Resource utilization", "Performance metrics", "Lessons learned"],
      gradient: "from-[#f48836] to-[#6aa84f]",
      bgGradient: "from-[#f48836]/10 to-[#6aa84f]/10"
    }
  ];

  const features = [
    {
      icon: MapPin,
      title: "Real-time Location",
      description: "GPS-enabled incident reporting and resource tracking",
      gradient: "from-[#16537e] to-[#6aa84f]"
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Continuous system monitoring and instant alert notifications",
      gradient: "from-[#f48836] to-[#ff3535]"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee",
      gradient: "from-[#6aa84f] to-[#38761d]"
    }
  ];

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
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
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
        .delay-500 { animation-delay: 0.5s; opacity: 0; }
      `}</style>
      
      <main>
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#16537e]/20 via-[#6aa84f]/15 to-[#38761d]/20"></div>
          <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6" style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 50%, #38761d 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 4px 20px rgba(22, 83, 126, 0.2)',
                lineHeight: '1.2',
                paddingBottom: '0.5rem'
              }}>
                How It <span className="block md:inline">Works</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-medium animate-fade-in-up delay-200">
                A streamlined 5-step process that connects all stakeholders for rapid, 
                coordinated emergency response.
              </p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="space-y-16">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {index < steps.length - 1 && (
                    <div
                      className={`hidden lg:block absolute top-32 w-1 h-16 ${index % 2 === 0 ? 'left-[95%]' : 'right-[95%]'}`}
                      style={{
                        background: `linear-gradient(to bottom, ${index === 0 ? '#ff3535' : index === 1 ? '#16537e' : index === 2 ? '#6aa84f' : index === 3 ? '#16537e' : '#f48836'} 0%, transparent 100%)`
                      }}
                    ></div>
                  )}
                  
                  <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                    <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                      <div className={`bg-white rounded-3xl shadow-xl border-2 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 ${index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'}`} style={{
                        borderColor: index === 0 ? 'rgba(255, 53, 53, 0.3)' : index === 1 ? 'rgba(22, 83, 126, 0.3)' : index === 2 ? 'rgba(106, 168, 79, 0.3)' : index === 3 ? 'rgba(22, 83, 126, 0.3)' : 'rgba(244, 136, 54, 0.3)'
                      }}>
                        <div className="p-8" style={{
                          background: `linear-gradient(135deg, ${index === 0 ? 'rgba(255, 53, 53, 0.05)' : index === 1 ? 'rgba(22, 83, 126, 0.05)' : index === 2 ? 'rgba(106, 168, 79, 0.05)' : index === 3 ? 'rgba(22, 83, 126, 0.05)' : 'rgba(244, 136, 54, 0.05)'} 0%, transparent 100%)`
                        }}>
                          <div className="flex items-center space-x-4 mb-6">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg animate-pulse-slow`} style={{
                              background: `linear-gradient(135deg, ${index === 0 ? '#ff3535, #f44336' : index === 1 ? '#16537e, #6aa84f' : index === 2 ? '#6aa84f, #38761d' : index === 3 ? '#16537e, #6aa84f' : '#f48836, #6aa84f'})`
                            }}>
                              <step.icon className="h-8 w-8 text-white" />
                            </div>
                          </div>
                          <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">{step.title}</h3>
                          <p className="text-lg md:text-xl text-gray-700 mb-6 font-medium leading-relaxed">
                            {step.description}
                          </p>
                          <ul className="space-y-3">
                            {step.details.map((detail, idx) => (
                              <li key={idx} className="flex items-center text-gray-700 font-medium">
                                <div className={`w-2 h-2 rounded-full mr-4`} style={{
                                  background: index === 0 ? '#ff3535' : index === 1 ? '#16537e' : index === 2 ? '#6aa84f' : index === 3 ? '#16537e' : '#f48836'
                                }}></div>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`text-center ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''} animate-float`}>
                      <div className={`w-40 h-40 mx-auto rounded-full flex items-center justify-center mb-6 shadow-2xl`} style={{
                        background: `radial-gradient(circle, ${index === 0 ? 'rgba(255, 53, 53, 0.2)' : index === 1 ? 'rgba(22, 83, 126, 0.2)' : index === 2 ? 'rgba(106, 168, 79, 0.2)' : index === 3 ? 'rgba(22, 83, 126, 0.2)' : 'rgba(244, 136, 54, 0.2)'} 0%, transparent 70%)`
                      }}>
                        <div className={`w-32 h-32 rounded-full flex items-center justify-center`} style={{
                          background: `linear-gradient(135deg, ${index === 0 ? '#ff3535' : index === 1 ? '#16537e' : index === 2 ? '#6aa84f' : index === 3 ? '#16537e' : '#f48836'} 0%, ${index === 0 ? '#f44336' : index === 1 ? '#6aa84f' : index === 2 ? '#38761d' : index === 3 ? '#6aa84f' : '#6aa84f'} 100%)`
                        }}>
                          <step.icon className="h-16 w-16 text-white" />
                        </div>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4" style={{
                        background: `linear-gradient(135deg, ${index === 0 ? '#ff3535' : index === 1 ? '#16537e' : index === 2 ? '#6aa84f' : index === 3 ? '#16537e' : '#f48836'} 0%, ${index === 0 ? '#f44336' : index === 1 ? '#6aa84f' : index === 2 ? '#38761d' : index === 3 ? '#6aa84f' : '#6aa84f'} 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                        Step {step.step}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20 relative">
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(106, 168, 79, 0.1) 0%, transparent 70%)'
          }}></div>
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-black mb-6" style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.3'
              }}>
                Key Features
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
                Advanced technology powering every step of the emergency response process.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className={`text-center animate-fade-in-up delay-${(index + 1) * 100} p-8 rounded-3xl bg-white/80 backdrop-blur-sm border-2 hover:shadow-2xl transition-all duration-300 hover:scale-105`} style={{
                  borderColor: index === 0 ? 'rgba(22, 83, 126, 0.3)' : index === 1 ? 'rgba(244, 136, 54, 0.3)' : 'rgba(106, 168, 79, 0.3)'
                }}>
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-xl animate-pulse-slow`} style={{
                    background: `linear-gradient(135deg, ${index === 0 ? '#16537e, #6aa84f' : index === 1 ? '#f48836, #ff3535' : '#6aa84f, #38761d'})`
                  }}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-base md:text-lg text-gray-700 font-medium">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, rgba(22, 83, 126, 0.1) 0%, rgba(106, 168, 79, 0.1) 100%)'
          }}></div>
          <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-black mb-6" style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.3'
              }}>
                Ready to Make a Difference?
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 font-medium">
                Join our network of citizens, volunteers, and organizations working together 
                to create safer, more resilient communities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/volunteer-register" className="animate-fade-in-up delay-200">
                  <button className="inline-flex items-center px-8 py-4 text-white font-black rounded-xl transition-all duration-300 hover:scale-110 shadow-2xl hover:shadow-[#6aa84f]/50" style={{
                    background: 'linear-gradient(135deg, #6aa84f 0%, #38761d 100%)',
                    boxShadow: '0 8px 25px rgba(106, 168, 79, 0.4)'
                  }}>
                    <Users className="h-5 w-5 mr-2" />
                    Become a Volunteer
                  </button>
                </Link>
                <Link to="/hospital-registration" className="animate-fade-in-up delay-400">
                  <button className="inline-flex items-center px-8 py-4 text-white font-black rounded-xl transition-all duration-300 hover:scale-110 shadow-2xl hover:shadow-[#16537e]/50" style={{
                    background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                    boxShadow: '0 8px 25px rgba(22, 83, 126, 0.4)'
                  }}>
                    <Hospital className="h-5 w-5 mr-2" />
                    Register Hospital
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HowItWorks;
