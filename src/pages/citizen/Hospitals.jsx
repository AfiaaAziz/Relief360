import React, { useState, useEffect } from "react";
import { Badge } from "../../components/ui/Badge";
import { Building2 } from "lucide-react";

// Reusable styled components matching admin portal
const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm ${className}`}
    style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
      borderColor: 'rgba(22, 83, 126, 0.2)'
    }}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div 
    className={`p-6 border-b-2 ${className}`}
    style={{
      background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
      borderColor: 'rgba(22, 83, 126, 0.3)',
      paddingTop: '1.75rem',
      paddingBottom: '1.75rem'
    }}
  >
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-xl font-black text-white ${className}`} style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)', lineHeight: '1.3', paddingBottom: '0.25rem' }}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-white/90 mt-2 font-semibold ${className}`} style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)' }}>{children}</p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/hospitals?status=approved"
        );
        if (response.ok) {
          const data = await response.json();
          setHospitals(data);
        } else {
          console.error("Failed to fetch hospitals");
        }
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div 
      className="p-6 space-y-6 max-w-7xl mx-auto relative overflow-hidden min-h-screen"
      style={{
        background: 'radial-gradient(circle at 20% 50%, rgba(106, 168, 79, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(22, 83, 126, 0.15) 0%, transparent 50%), linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
      }}
    >
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 
            className="text-5xl md:text-6xl font-black mb-3"
            style={{
              background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 50%, #38761d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 4px 20px rgba(22, 83, 126, 0.2)',
              lineHeight: '1.2',
              paddingBottom: '0.5rem'
            }}
          >
            Partner Hospitals
          </h1>
          <p className="text-xl md:text-2xl font-bold mt-3" style={{ color: '#16537e' }}>
            View available hospitals and their resources
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Hospitals
              </CardTitle>
              <Building2 className="h-5 w-5 text-white" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black" style={{ color: '#16537e' }}>{hospitals.length}</div>
              <p className="text-xs text-gray-500 mt-1 font-semibold">Active hospitals</p>
            </CardContent>
          </Card>
          <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Beds</CardTitle>
              <Building2 className="h-5 w-5 text-white" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black" style={{ color: '#6aa84f' }}>
                {hospitals.reduce((sum, h) => sum + (h.total_beds || 0), 0)}
              </div>
              <p className="text-xs text-gray-500 mt-1 font-semibold">Available beds</p>
            </CardContent>
          </Card>
          <Card className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Emergency Beds
              </CardTitle>
              <Building2 className="h-5 w-5 text-white" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black" style={{ color: '#ff3535' }}>
                {hospitals.reduce((sum, h) => sum + (h.emergency_beds || 0), 0)}
              </div>
              <p className="text-xs text-gray-500 mt-1 font-semibold">
                Emergency capacity
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Hospital Profiles */}
        <div>
          <h2 
            className="text-3xl font-black mb-4"
            style={{
              background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Hospital Profiles
          </h2>
          <p className="text-lg font-bold mb-6" style={{ color: '#16537e' }}>
            See how hospitals in our network share their capacity and coordinate
            during emergencies.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hospitals.map((hospital, idx) => {
              const availability =
                hospital.total_beds > 200 ? "Available" : "Limited";
              const availabilityVariant =
                availability === "Available" ? "default" : "secondary";
              return (
                <Card 
                  key={hospital.id} 
                  className="animate-slide-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {hospital.hospital_name}
                    </CardTitle>
                    <CardDescription>{hospital.address}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-bold" style={{ color: '#16537e' }}>
                        {hospital.phone}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={availabilityVariant}
                        style={
                          availability === "Available"
                            ? {
                                background: 'linear-gradient(135deg, #6aa84f 0%, #38761d 100%)',
                                color: '#ffffff',
                                borderColor: '#38761d'
                              }
                            : {
                                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                                color: '#ffffff',
                                borderColor: '#16537e'
                              }
                        }
                      >
                        {availability}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 rounded-xl transition-all duration-300 hover:shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(22, 83, 126, 0.1) 0%, rgba(22, 83, 126, 0.05) 100%)' }}>
                        <div className="text-2xl font-black" style={{ color: '#16537e' }}>
                          {hospital.total_beds}
                        </div>
                        <div className="text-xs font-bold mt-1" style={{ color: '#666' }}>
                          Beds
                        </div>
                      </div>
                      <div className="p-3 rounded-xl transition-all duration-300 hover:shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(106, 168, 79, 0.1) 0%, rgba(56, 118, 29, 0.05) 100%)' }}>
                        <div className="text-2xl font-black" style={{ color: '#6aa84f' }}>
                          {hospital.icu_beds}
                        </div>
                        <div className="text-xs font-bold mt-1" style={{ color: '#666' }}>ICU</div>
                      </div>
                      <div className="p-3 rounded-xl transition-all duration-300 hover:shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(255, 53, 53, 0.1) 0%, rgba(244, 67, 54, 0.05) 100%)' }}>
                        <div className="text-2xl font-black" style={{ color: '#ff3535' }}>
                          {hospital.emergency_beds}
                        </div>
                        <div className="text-xs font-bold mt-1" style={{ color: '#666' }}>
                          Emergency
                        </div>
                      </div>
                    </div>
                    {hospital.services && hospital.services.length > 0 && (
                      <div>
                        <h4 className="text-sm font-black mb-2" style={{ color: '#16537e' }}>
                          Specialized Services:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {hospital.services.map((service, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs font-bold"
                              style={{
                                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                                color: '#ffffff',
                                borderColor: '#16537e'
                              }}
                            >
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Hospitals;
