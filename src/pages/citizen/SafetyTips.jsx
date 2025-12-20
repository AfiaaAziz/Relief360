import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/Accordion";
import { safetyTips } from "../../utils/mockData";
import {
  Shield,
  Flame,
  Droplets,
  ZapOff,
  AlertTriangle,
  Sun,
} from "lucide-react";

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
  Earthquake: ZapOff,
  Flood: Droplets,
  Fire: Flame,
  "Terror Attack": AlertTriangle,
  Heatwave: Sun,
};

const colorMap = {
  Earthquake: "#ff3535",
  Flood: "#16537e",
  Fire: "#f44336",
  "Terror Attack": "#f48836",
  Heatwave: "#f48836",
};

const SafetyTips = () => {
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
          Safety Tips
        </h1>
        <p className="text-xl md:text-2xl font-bold mt-3" style={{ color: '#16537e' }}>
          Essential emergency preparedness guidelines
        </p>
      </div>

      <Card 
        className="border-2 animate-slide-up" 
        style={{ 
          animationDelay: '0.1s',
          borderColor: '#6aa84f',
          background: 'linear-gradient(135deg, rgba(106, 168, 79, 0.1) 0%, rgba(56, 118, 29, 0.05) 100%)'
        }}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-white" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
            <div>
              <CardTitle>Emergency Preparedness Guide</CardTitle>
              <CardDescription>
                Learn how to stay safe during different types of emergencies
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Accordion type="single" collapsible className="space-y-4">
        {Object.entries(safetyTips).map(([category, tips], idx) => {
          const Icon = iconMap[category] || Shield;
          const color = colorMap[category] || "#16537e";

          return (
            <Card 
              key={category} 
              className="animate-slide-up"
              style={{ animationDelay: `${(idx + 2) * 0.1}s` }}
            >
              <AccordionItem value={category} className="border-none">
                <CardHeader>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div 
                        className="p-3 rounded-xl transition-all duration-300 hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`
                        }}
                      >
                        <Icon className="h-6 w-6" style={{ color }} />
                      </div>
                      <div className="text-left">
                        <CardTitle>{category}</CardTitle>
                        <CardDescription>
                          Safety guidelines and precautions
                        </CardDescription>
                      </div>
                    </div>
                  </AccordionTrigger>
                </CardHeader>
                <AccordionContent>
                  <CardContent className="pt-0">
                    <ul className="space-y-3">
                      {tips.map((tip, index) => (
                        <li
                          key={index}
                          className="flex gap-3 p-4 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                          style={{
                            background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(226, 232, 240, 0.9) 100%)',
                            border: '2px solid rgba(22, 83, 126, 0.2)'
                          }}
                        >
                          <div 
                            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black text-white transition-all duration-300 hover:scale-110"
                            style={{
                              background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
                              boxShadow: `0 2px 8px ${color}40`
                            }}
                          >
                            {index + 1}
                          </div>
                          <p className="text-sm font-semibold flex-1" style={{ color: '#333' }}>{tip}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </AccordionContent>
              </AccordionItem>
            </Card>
          );
        })}
      </Accordion>

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

export default SafetyTips;
