import { 
  Hospital, 
  Heart, 
  Shield, 
  Clock, 
  Ambulance,
  CheckCircle,
  Users,
  Phone,
  MapPin,
  Bed,
  Activity,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HospitalInfo = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";
        // Fetch all hospitals (not just approved) to show real data
        const response = await fetch(`${apiBase}/api/hospitals`);
        if (response.ok) {
          const data = await response.json();
          // Parse services if they're in PostgreSQL array format
          const parsedData = (data || []).map(hospital => {
            let services = hospital.services || [];
            // Handle PostgreSQL array format: "{trauma,maternity,pediatric}"
            if (typeof services === 'string' && services.startsWith('{') && services.endsWith('}')) {
              services = services.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
            }
            return {
              ...hospital,
              services: Array.isArray(services) ? services : []
            };
          });
          setHospitals(parsedData);
        } else {
          console.error("Failed to fetch hospitals");
          setHospitals([]);
        }
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        setHospitals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);
  const features = [
    {
      icon: Activity,
      title: "Real-time Capacity Management",
      description: "Update bed availability, ICU capacity, and emergency room status in real-time",
      gradient: "from-[#16537e] to-[#6aa84f]"
    },
    {
      icon: Ambulance,
      title: "Ambulance Coordination",
      description: "Manage ambulance fleet, dispatch tracking, and emergency transport coordination",
      gradient: "from-[#ff3535] to-[#f44336]"
    },
    {
      icon: Users,
      title: "Staff & Resource Tracking",
      description: "Monitor medical staff availability, equipment status, and resource allocation",
      gradient: "from-[#6aa84f] to-[#38761d]"
    },
    {
      icon: AlertCircle,
      title: "Emergency Notifications",
      description: "Receive instant alerts for mass casualty events and disaster situations",
      gradient: "from-[#f48836] to-[#ff3535]"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Enhanced Preparedness",
      description: "Better coordination with emergency services and disaster response teams",
      color: "#16537e"
    },
    {
      icon: Clock,
      title: "Faster Response Times",
      description: "Direct communication channels reduce delays in emergency situations",
      color: "#f48836"
    },
    {
      icon: Heart,
      title: "Community Impact",
      description: "Contribute to your community's resilience and disaster preparedness",
      color: "#f44336"
    },
    {
      icon: CheckCircle,
      title: "Streamlined Operations",
      description: "Automated reporting and coordination reduce administrative burden",
      color: "#6aa84f"
    }
  ];

  // Group hospitals by type and create dynamic hospital types
  const getHospitalTypes = () => {
    if (!hospitals || hospitals.length === 0) {
      // Return default types if no hospitals loaded yet
      return [
        {
          type: "General Hospitals",
          description: "Full-service medical facilities with emergency departments",
          capabilities: ["Emergency Medicine", "Surgery", "ICU", "Ambulance Services"],
          color: "#16537e"
        },
        {
          type: "Specialty Centers",
          description: "Specialized medical facilities (trauma centers, children's hospitals)",
          capabilities: ["Specialized Care", "Expert Staff", "Advanced Equipment", "Research Facilities"],
          color: "#6aa84f"
        },
        {
          type: "Urgent Care Centers",
          description: "Fast treatment for non-life-threatening emergencies",
          capabilities: ["Quick Treatment", "Extended Hours", "Minor Procedures", "Diagnostic Services"],
          color: "#f48836"
        },
        {
          type: "Mobile Medical Units",
          description: "Deployable medical support for disaster zones",
          capabilities: ["Rapid Deployment", "Field Medicine", "Triage Support", "Emergency Supplies"],
          color: "#ff3535"
        }
      ];
    }

    const typeMap = {
      "General Hospital": {
        type: "General Hospitals",
        description: "Full-service medical facilities with emergency departments",
        defaultCapabilities: ["Emergency Medicine", "Surgery", "ICU", "Ambulance Services"],
        color: "#16537e"
      },
      "Specialty Center": {
        type: "Specialty Centers",
        description: "Specialized medical facilities (trauma centers, children's hospitals)",
        defaultCapabilities: ["Specialized Care", "Expert Staff", "Advanced Equipment", "Research Facilities"],
        color: "#6aa84f"
      },
      "Specialized Hospital": {
        type: "Specialty Centers",
        description: "Specialized medical facilities (trauma centers, children's hospitals)",
        defaultCapabilities: ["Specialized Care", "Expert Staff", "Advanced Equipment", "Research Facilities"],
        color: "#6aa84f"
      },
      "Trauma Center": {
        type: "Trauma Centers",
        description: "Specialized facilities for treating severe injuries and trauma cases",
        defaultCapabilities: ["Trauma Care", "Emergency Surgery", "Critical Care", "24/7 Availability"],
        color: "#ff3535"
      },
      "Children's Hospital": {
        type: "Children's Hospitals",
        description: "Specialized pediatric care facilities",
        defaultCapabilities: ["Pediatric Care", "Child Emergency Services", "Specialized Equipment", "Family Support"],
        color: "#6aa84f"
      },
      "Psychiatric Hospital": {
        type: "Psychiatric Hospitals",
        description: "Mental health and psychiatric care facilities",
        defaultCapabilities: ["Mental Health Care", "Psychiatric Services", "Counseling", "Crisis Intervention"],
        color: "#16537e"
      },
      "Rehabilitation Center": {
        type: "Rehabilitation Centers",
        description: "Facilities providing rehabilitation and recovery services",
        defaultCapabilities: ["Physical Therapy", "Occupational Therapy", "Recovery Programs", "Long-term Care"],
        color: "#38761d"
      },
      "rehabilitation": {
        type: "Rehabilitation Centers",
        description: "Facilities providing rehabilitation and recovery services",
        defaultCapabilities: ["Physical Therapy", "Occupational Therapy", "Recovery Programs", "Long-term Care"],
        color: "#38761d"
      },
      "Urgent Care": {
        type: "Urgent Care Centers",
        description: "Fast treatment for non-life-threatening emergencies",
        defaultCapabilities: ["Quick Treatment", "Extended Hours", "Minor Procedures", "Diagnostic Services"],
        color: "#f48836"
      },
      "Mobile Medical Unit": {
        type: "Mobile Medical Units",
        description: "Deployable medical support for disaster zones",
        defaultCapabilities: ["Rapid Deployment", "Field Medicine", "Triage Support", "Emergency Supplies"],
        color: "#ff3535"
      }
    };

    // Get unique hospital types from database (case-insensitive)
    const uniqueTypes = [...new Set(
      hospitals
        .map(h => h.hospital_type)
        .filter(Boolean)
        .map(t => t.trim())
    )];
    
    // Create hospital types array with real data
    const hospitalTypesList = uniqueTypes.length > 0 
      ? uniqueTypes.map(type => {
          // Try to find matching type in typeMap (case-insensitive)
          const typeKey = Object.keys(typeMap).find(
            key => key.toLowerCase() === (type || '').toLowerCase()
          ) || type;
          const baseType = typeMap[typeKey] || {
            type: type || "Other Facilities",
            description: "Healthcare facilities providing essential medical services",
            defaultCapabilities: ["Medical Care", "Emergency Services"],
            color: "#16537e"
          };
          
          // Get capabilities from actual hospitals of this type
          const typeHospitals = hospitals.filter(h => {
            const hType = (h.hospital_type || '').toLowerCase();
            const compareType = (type || '').toLowerCase();
            return hType === compareType;
          });
          const allServices = typeHospitals
            .flatMap(h => {
              let services = h.services || [];
              // Handle PostgreSQL array format
              if (typeof services === 'string' && services.startsWith('{') && services.endsWith('}')) {
                services = services.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
              }
              return Array.isArray(services) ? services : [];
            })
            .filter((v, i, a) => a.indexOf(v) === i) // unique
            .slice(0, 4); // limit to 4
          
          return {
            ...baseType,
            capabilities: allServices.length > 0 ? allServices : baseType.defaultCapabilities,
            count: typeHospitals.length
          };
        })
      : Object.values(typeMap); // Fallback to default types if no hospitals

    return hospitalTypesList;
  };

  const hospitalTypes = getHospitalTypes() || [];

  // Get real hospitals for display (limit to 6 for example profiles)
  const displayHospitals = (hospitals || []).slice(0, 6).map((hospital, index) => {
    const colors = ["#6aa84f", "#f48836", "#16537e", "#ff3535", "#38761d", "#f44336"];
    const totalBeds = hospital.total_beds || 0;
    const status = totalBeds > 200 ? "Available" : totalBeds > 50 ? "Limited" : "Full";
    
    // Parse services if they're in PostgreSQL array format
    let services = hospital.services || [];
    if (typeof services === 'string' && services.startsWith('{') && services.endsWith('}')) {
      services = services.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
    }
    
    return {
      id: hospital.id,
      name: hospital.hospital_name,
      location: hospital.address || "Location not specified",
      capacity: {
        beds: hospital.total_beds || 0,
        icu: hospital.icu_beds || 0,
        emergency: hospital.emergency_beds || 0
      },
      status: status,
      contact: hospital.phone || hospital.emergency_phone || "Contact not available",
      services: Array.isArray(services) ? services : [],
      color: colors[index % colors.length]
    };
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return { bg: 'rgba(106, 168, 79, 0.1)', text: '#6aa84f', border: 'rgba(106, 168, 79, 0.3)' };
      case 'Limited':
        return { bg: 'rgba(244, 136, 54, 0.1)', text: '#f48836', border: 'rgba(244, 136, 54, 0.3)' };
      default:
        return { bg: 'rgba(107, 114, 128, 0.1)', text: '#6b7280', border: 'rgba(107, 114, 128, 0.3)' };
    }
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
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#16537e]/20 via-[#6aa84f]/15 to-[#38761d]/20"></div>
          <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
            <div className="animate-fade-in-up">
              <div className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center shadow-2xl animate-pulse-slow" style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                boxShadow: '0 8px 25px rgba(22, 83, 126, 0.4)'
              }}>
                <Hospital className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6" style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 50%, #38761d 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 4px 20px rgba(22, 83, 126, 0.2)',
                lineHeight: '1.2',
                paddingBottom: '0.5rem'
              }}>
                Hospital <span className="block md:inline">Partnership</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-medium">
                Join our network of healthcare providers committed to coordinated emergency response. 
                Strengthen your community's disaster preparedness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
                <Link 
                  to="/hospital-registration" 
                  className="inline-flex items-center px-8 py-4 text-white font-black rounded-xl transition-all duration-300 hover:scale-110 shadow-2xl hover:shadow-[#16537e]/50"
                  style={{
                    background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                    boxShadow: '0 8px 25px rgba(22, 83, 126, 0.4)'
                  }}
                >
                  <Hospital className="h-5 w-5 mr-2" />
                  Register Hospital
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-black mb-6" style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.3'
              }}>
                Platform Features for Hospitals
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
                Comprehensive tools designed to help healthcare facilities manage capacity, 
                coordinate with emergency services, and respond effectively to disasters.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border-2 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up delay-${(index + 1) * 100}`} style={{
                  borderColor: index === 0 ? 'rgba(22, 83, 126, 0.3)' : index === 1 ? 'rgba(255, 53, 53, 0.3)' : index === 2 ? 'rgba(106, 168, 79, 0.3)' : 'rgba(244, 136, 54, 0.3)',
                  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, ${index === 0 ? 'rgba(22, 83, 126, 0.05)' : index === 1 ? 'rgba(255, 53, 53, 0.05)' : index === 2 ? 'rgba(106, 168, 79, 0.05)' : 'rgba(244, 136, 54, 0.05)'} 100%)`
                }}>
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl animate-pulse-slow`} style={{
                        background: `linear-gradient(135deg, ${index === 0 ? '#16537e, #6aa84f' : index === 1 ? '#ff3535, #f44336' : index === 2 ? '#6aa84f, #38761d' : '#f48836, #ff3535'})`
                      }}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-gray-900">{feature.title}</h3>
                    </div>
                    <p className="text-base md:text-lg text-gray-700 font-medium leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hospital Types */}
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
                All Healthcare Facilities Welcome
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
                From large medical centers to specialized clinics, every healthcare provider 
                plays a vital role in emergency response.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {hospitalTypes.map((hospitalType, index) => (
                <div key={index} className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border-2 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up delay-${(index + 1) * 100}`} style={{
                  borderColor: `${hospitalType.color}40`,
                  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, ${hospitalType.color}08 100%)`
                }}>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl md:text-2xl font-black text-gray-900">{hospitalType.type}</h3>
                      {hospitalType.count !== undefined && (
                        <span className="px-3 py-1 text-xs font-black rounded-full border-2" style={{
                          borderColor: `${hospitalType.color}40`,
                          background: `${hospitalType.color}10`,
                          color: hospitalType.color
                        }}>
                          {hospitalType.count} {hospitalType.count === 1 ? 'Hospital' : 'Hospitals'}
                        </span>
                      )}
                    </div>
                    <p className="text-base md:text-lg text-gray-700 mb-4 font-medium">
                      {hospitalType.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-black text-sm text-gray-900">Key Capabilities:</h4>
                      <div className="flex flex-wrap gap-2">
                        {(hospitalType.capabilities || []).map((capability, idx) => (
                          <span key={idx} className="px-3 py-1 text-xs font-semibold rounded-lg border-2" style={{
                            borderColor: `${hospitalType.color}40`,
                            background: `${hospitalType.color}10`,
                            color: hospitalType.color
                          }}>
                            {capability}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Example Hospital Cards */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-black mb-6" style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.3'
              }}>
                Example Hospital Profiles
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
                See how hospitals in our network share their capacity and coordinate during emergencies.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-700 font-medium">Loading hospitals...</p>
              </div>
            ) : displayHospitals.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-700 font-medium">No hospitals available at the moment.</p>
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 gap-8">
                {displayHospitals.map((hospital, index) => {
                  const statusColors = getStatusColor(hospital.status);
                  return (
                    <div key={hospital.id || index} className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border-2 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up delay-${(index + 1) * 100}`} style={{
                      borderColor: `${hospital.color}40`,
                      background: `linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, ${hospital.color}08 100%)`
                    }}>
                      <div className="p-8">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2">{hospital.name}</h3>
                            <div className="flex items-center text-gray-700 mb-2 font-medium">
                              <MapPin className="h-4 w-4 mr-2" style={{ color: hospital.color }} />
                              {hospital.location}
                            </div>
                            <div className="flex items-center text-gray-700 font-medium">
                              <Phone className="h-4 w-4 mr-2" style={{ color: hospital.color }} />
                              {hospital.contact}
                            </div>
                          </div>
                          <span className="px-4 py-2 rounded-full text-sm font-black border-2" style={{
                            background: statusColors.bg,
                            color: statusColors.text,
                            borderColor: statusColors.border
                          }}>
                            {hospital.status}
                          </span>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="p-4 rounded-xl border-2" style={{
                              background: 'rgba(22, 83, 126, 0.1)',
                              borderColor: 'rgba(22, 83, 126, 0.3)'
                            }}>
                              <div className="flex items-center justify-center mb-2">
                                <Bed className="h-5 w-5" style={{ color: '#16537e' }} />
                              </div>
                              <div className="text-2xl md:text-3xl font-black" style={{ color: '#16537e' }}>{hospital.capacity.beds}</div>
                              <div className="text-xs text-gray-700 font-semibold">Beds</div>
                            </div>
                            <div className="p-4 rounded-xl border-2" style={{
                              background: 'rgba(255, 53, 53, 0.1)',
                              borderColor: 'rgba(255, 53, 53, 0.3)'
                            }}>
                              <div className="flex items-center justify-center mb-2">
                                <Activity className="h-5 w-5" style={{ color: '#ff3535' }} />
                              </div>
                              <div className="text-2xl md:text-3xl font-black" style={{ color: '#ff3535' }}>{hospital.capacity.icu}</div>
                              <div className="text-xs text-gray-700 font-semibold">ICU</div>
                            </div>
                            <div className="p-4 rounded-xl border-2" style={{
                              background: 'rgba(244, 136, 54, 0.1)',
                              borderColor: 'rgba(244, 136, 54, 0.3)'
                            }}>
                              <div className="flex items-center justify-center mb-2">
                                <AlertCircle className="h-5 w-5" style={{ color: '#f48836' }} />
                              </div>
                              <div className="text-2xl md:text-3xl font-black" style={{ color: '#f48836' }}>{hospital.capacity.emergency}</div>
                              <div className="text-xs text-gray-700 font-semibold">Emergency</div>
                            </div>
                          </div>
                          
                          {hospital.services && hospital.services.length > 0 && (
                            <div>
                              <h4 className="font-black text-sm text-gray-900 mb-2">Specialized Services:</h4>
                              <div className="flex flex-wrap gap-2">
                                {hospital.services.map((service, idx) => (
                                  <span key={idx} className="px-3 py-1 text-xs font-semibold rounded-lg border-2" style={{
                                    borderColor: `${hospital.color}40`,
                                    background: `${hospital.color}10`,
                                    color: hospital.color
                                  }}>
                                    {service}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(106, 168, 79, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(22, 83, 126, 0.1) 0%, transparent 50%)'
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
                Benefits of Joining
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
                Enhance your hospital's emergency preparedness while contributing to community resilience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className={`text-center animate-fade-in-up delay-${(index + 1) * 100} p-6 rounded-3xl bg-white/90 backdrop-blur-sm border-2 hover:shadow-2xl transition-all duration-300 hover:scale-105`} style={{
                  borderColor: `${benefit.color}40`,
                  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, ${benefit.color}08 100%)`
                }}>
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-xl animate-pulse-slow" style={{
                    background: `linear-gradient(135deg, ${benefit.color} 0%, ${benefit.color}dd 100%)`
                  }}>
                    <benefit.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mb-4 text-gray-900">{benefit.title}</h3>
                  <p className="text-base md:text-lg text-gray-700 font-medium">{benefit.description}</p>
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
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white" style={{
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}>
                Strengthen Emergency Response
              </h2>
              <p className="text-xl md:text-2xl text-white/90 mb-8 font-medium">
                Join our network of healthcare providers committed to coordinated disaster response. 
                Together, we save lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/hospital-registration"
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-black rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                    color: '#16537e',
                    boxShadow: '0 8px 25px rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <Hospital className="h-5 w-5 mr-2" />
                  Register Your Hospital
                </Link>
                <Link to="/contact">
                  <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-black rounded-xl hover:bg-white hover:text-[#16537e] transition-all duration-300 hover:scale-110" style={{
                    boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)'
                  }}>
                    <Phone className="h-5 w-5 mr-2" />
                    Contact Support
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
            opacity: 0.95
          }}></div>
        </section>
      </main>
    </div>
  );
};

export default HospitalInfo;
