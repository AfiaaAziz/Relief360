import React from "react";
import { Button } from "../../components/ui/Button";
import { mockEmergencyContacts } from "../../utils/mockData";
import { Phone, Ambulance, Shield, Flame, Heart } from "lucide-react";

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

const iconMap = {
  Police: Shield,
  Rescue: Ambulance,
  Fire: Flame,
  Ambulance: Heart,
  Default: Phone,
};

const EmergencyContacts = () => {
  const getIcon = (name) => {
    for (const key in iconMap) {
      if (name.toLowerCase().includes(key.toLowerCase())) {
        return iconMap[key];
      }
    }
    return iconMap.Default;
  };

  return (
    <div 
      className="p-6 space-y-6 relative overflow-hidden min-h-screen"
      style={{
        background: 'radial-gradient(circle at 20% 50%, rgba(106, 168, 79, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(22, 83, 126, 0.15) 0%, transparent 50%), linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
      }}
    >
      <div className="animate-fade-in">
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
          Emergency Contacts
        </h1>
        <p className="text-xl md:text-2xl font-bold mt-3" style={{ color: '#16537e' }}>
          Quick access to essential emergency hotlines
        </p>
      </div>

      <Card 
        className="border-2 animate-slide-up" 
        style={{ 
          animationDelay: '0.1s',
          borderColor: '#ff3535',
          background: 'linear-gradient(135deg, rgba(255, 53, 53, 0.1) 0%, rgba(244, 67, 54, 0.05) 100%)'
        }}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Phone className="h-6 w-6 text-white" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
            <div>
              <CardTitle>
                Emergency Hotlines
              </CardTitle>
              <CardDescription>
                Call these numbers immediately during emergencies
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {mockEmergencyContacts.map((contact, index) => {
          const Icon = getIcon(contact.name);
          return (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-3 rounded-xl transition-all duration-300 hover:scale-110"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 53, 53, 0.2) 0%, rgba(244, 67, 54, 0.2) 100%)'
                      }}
                    >
                      <Icon className="h-6 w-6" style={{ color: '#ff3535' }} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{contact.name}</CardTitle>
                      <CardDescription className="text-lg font-black text-white">
                        {contact.number}
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    className="rounded-full"
                    onClick={() => window.open(`tel:${contact.number}`)}
                    style={{
                      background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                      color: '#ffffff',
                      boxShadow: '0 4px 15px rgba(22, 83, 126, 0.4)'
                    }}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      <Card className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <CardHeader>
          <CardTitle>Important Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div 
            className="p-4 border-l-4 rounded-xl transition-all duration-300 hover:shadow-lg"
            style={{
              borderLeftColor: '#f48836',
              background: 'linear-gradient(135deg, rgba(244, 136, 54, 0.1) 0%, rgba(244, 136, 54, 0.05) 100%)'
            }}
          >
            <p className="font-black text-lg" style={{ color: '#f48836' }}>
              When Calling Emergency Services
            </p>
            <ul className="mt-2 space-y-1 text-sm font-semibold list-disc list-inside" style={{ color: '#666' }}>
              <li>Stay calm and speak clearly</li>
              <li>Provide your exact location</li>
              <li>Describe the emergency situation</li>
              <li>Follow the operator's instructions</li>
              <li>Do not hang up until told to do so</li>
            </ul>
          </div>
          <div 
            className="p-4 border-l-4 rounded-xl transition-all duration-300 hover:shadow-lg"
            style={{
              borderLeftColor: '#16537e',
              background: 'linear-gradient(135deg, rgba(22, 83, 126, 0.1) 0%, rgba(22, 83, 126, 0.05) 100%)'
            }}
          >
            <p className="font-black text-lg" style={{ color: '#16537e' }}>
              Non-Emergency Situations
            </p>
            <p className="mt-2 text-sm font-semibold" style={{ color: '#666' }}>
              For non-urgent matters, consider visiting your local police
              station or hospital directly. Reserve emergency hotlines for
              critical situations only.
            </p>
          </div>
        </CardContent>
      </Card>

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

export default EmergencyContacts;
