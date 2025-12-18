import React from "react";
import { Shield, Users, Heart, Zap } from "lucide-react";
import volunteerNetworkImage from "../assets/images/volunteer-network.png";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/Card";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description:
        "Every decision we make prioritizes the safety and well-being of our communities.",
      gradient: "from-[#16537e] to-[#6aa84f]",
      bgGradient: "from-[#16537e]/10 to-[#6aa84f]/10",
    },
    {
      icon: Zap,
      title: "Rapid Response",
      description:
        "Time is critical in emergencies. We've built our system for speed and efficiency.",
      gradient: "from-[#f48836] to-[#ff3535]",
      bgGradient: "from-[#f48836]/10 to-[#ff3535]/10",
    },
    {
      icon: Heart,
      title: "Compassion",
      description:
        "We understand that disasters affect real people with real stories and needs.",
      gradient: "from-[#f44336] to-[#990000]",
      bgGradient: "from-[#f44336]/10 to-[#990000]/10",
    },
    {
      icon: Users,
      title: "Unity",
      description:
        "Bringing together diverse stakeholders to work toward a common goal of safety.",
      gradient: "from-[#6aa84f] to-[#38761d]",
      bgGradient: "from-[#6aa84f]/10 to-[#38761d]/10",
    },
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
                About <span className="block md:inline">Relief-360</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium animate-fade-in-up delay-200">
                We're building the future of disaster management through
                technology, connecting communities when they need it most.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-radial-gradient(circle at 50% 50%, rgba(106, 168, 79, 0.1) 0%, transparent 70%)"></div>
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <h2 className="text-4xl md:text-5xl font-black mb-6" style={{
                  background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: '1.3'
                }}>
                  Our Mission
                </h2>
                <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed font-medium">
                  To create a comprehensive, technology-driven platform that
                  connects citizens, volunteers, hospitals, and emergency
                  responders in real-time during disasters.
                </p>
                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed font-medium">
                  We believe that effective disaster management requires
                  seamless coordination between all stakeholders. Our platform
                  bridges communication gaps, optimizes resource allocation, and
                  ensures that help reaches those who need it most, as quickly
                  as possible.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 animate-fade-in-up delay-200">
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#16537e]/20 to-[#16537e]/5 backdrop-blur-sm border-2 border-[#16537e]/30 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="text-4xl font-black mb-2" style={{ color: '#16537e' }}>
                    50K+
                  </div>
                  <div className="text-sm font-semibold text-gray-700">Lives Protected</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#f48836]/20 to-[#f48836]/5 backdrop-blur-sm border-2 border-[#f48836]/30 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="text-4xl font-black mb-2" style={{ color: '#f48836' }}>
                    1000+
                  </div>
                  <div className="text-sm font-semibold text-gray-700">Active Volunteers</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#6aa84f]/20 to-[#6aa84f]/5 backdrop-blur-sm border-2 border-[#6aa84f]/30 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="text-4xl font-black mb-2" style={{ color: '#6aa84f' }}>
                    100+
                  </div>
                  <div className="text-sm font-semibold text-gray-700">Partner Hospitals</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#ff3535]/20 to-[#ff3535]/5 backdrop-blur-sm border-2 border-[#ff3535]/30 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="text-4xl font-black mb-2" style={{ color: '#ff3535' }}>
                    24/7
                  </div>
                  <div className="text-sm font-semibold text-gray-700">Response Time</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#6aa84f]/10 via-transparent to-[#16537e]/10"></div>
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up delay-200">
                <h2 className="text-4xl md:text-5xl font-black mb-6" style={{
                  background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: '1.3'
                }}>
                  Our Community
                </h2>
                <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed font-medium">
                  We're powered by passionate volunteers and professionals who
                  believe in making a difference. Our diverse community comes
                  together to provide rapid response and support during
                  disasters.
                </p>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                  From first responders to medical professionals, from logistics
                  experts to compassionate volunteers - everyone plays a vital
                  role in our mission to save lives and rebuild communities.
                </p>
              </div>
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 animate-fade-in-up delay-300 hover:scale-105 transition-transform duration-500">
                <img
                  src={volunteerNetworkImage}
                  alt="Diverse volunteers working together during disaster relief"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16537e]/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(106, 168, 79, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(22, 83, 126, 0.15) 0%, transparent 50%)'
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
                Our Values
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
                The principles that guide everything we do and every decision we
                make.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div
                    key={index}
                    className={`animate-fade-in-up delay-${(index + 1) * 100}`}
                  >
                    <Card className={`border-0 shadow-xl bg-gradient-to-br ${value.bgGradient} hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center h-full backdrop-blur-sm`}>
                      <CardHeader>
                        <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${value.gradient} flex items-center justify-center animate-pulse-slow shadow-lg`}>
                          <IconComponent className="h-10 w-10 text-white" />
                        </div>
                        <CardTitle className="text-xl md:text-2xl font-black text-gray-900">{value.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base text-gray-700 font-medium">{value.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Platform Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-black mb-6" style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.3'
              }}>
                Why This Platform?
              </h2>
            </div>

            <div className="space-y-8">
              {[
                { num: 1, title: "Communication Breakdown", color: "#f44336", bgColor: "#f44336" },
                { num: 2, title: "Resource Misallocation", color: "#f48836", bgColor: "#f48836" },
                { num: 3, title: "Volunteer Coordination", color: "#6aa84f", bgColor: "#6aa84f" },
              ].map((item, index) => (
                <div key={index} className={`flex items-start space-x-4 animate-fade-in-up delay-${(index + 1) * 100} p-6 rounded-2xl bg-gradient-to-r from-white to-${item.bgColor}/5 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-${item.bgColor}/30`}>
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-black text-white shadow-lg`} style={{
                    background: `linear-gradient(135deg, ${item.color} 0%, ${item.bgColor} 100%)`
                  }}>
                    {item.num}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black mb-2 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 font-medium leading-relaxed">
                      {index === 0 && "During disasters, traditional communication channels often fail or become overwhelmed, leaving communities isolated and unable to coordinate effective responses."}
                      {index === 1 && "Without real-time visibility into available resources and needs, emergency responses can be inefficient, with some areas over-served while others are neglected."}
                      {index === 2 && "Willing volunteers often don't know where they're needed most or how to help effectively, leading to wasted goodwill and missed opportunities to save lives."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#16537e]/10 via-transparent to-[#6aa84f]/10"></div>
          <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-black mb-4" style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.3'
              }}>
                FAQs
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 font-medium">
                Find answers to common questions about disaster preparedness and
                platform usage
              </p>
            </div>

            <div className="space-y-6">
              {[
                { q: "What is disaster recovery?", a: "Disaster recovery refers to the process of restoring systems, data, and infrastructure after a disaster, ensuring continuity of operations." },
                { q: "How to prepare for disasters?", a: "Disaster preparedness involves creating an emergency plan, assembling a disaster supply kit, and staying informed about potential risks in your area." },
                { q: "How can I contribute?", a: "You can contribute by donating to disaster relief efforts, volunteering your time and skills, and spreading awareness about the platform to help more people stay safe during disasters." },
                { q: "Is the platform free?", a: "Yes, the platform is free to use for both community members and emergency responders. We believe in providing accessible tools for disaster management." },
                { q: "How can I sign up?", a: "To sign up, simply visit our website and follow the registration process. It only takes a few minutes." },
              ].map((faq, index) => (
                <div key={index} className={`bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#16537e]/50 hover:shadow-xl transition-all duration-300 animate-fade-in-up delay-${(index + 1) * 100}`}>
                  <h3 className="text-lg md:text-xl font-black mb-2 text-gray-900">
                    {faq.q}
                  </h3>
                  <p className="text-base md:text-lg text-gray-700 font-medium leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
