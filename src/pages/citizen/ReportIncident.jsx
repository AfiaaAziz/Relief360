import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import Textarea from "../../components/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/Select";
import { useToast } from "../../hooks/use-toast";
import { Upload, MapPin } from "lucide-react";

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

const ReportIncident = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    type: "",
    severity: "",
    description: "",
    location: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const trackingId = `INC${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`;

    toast({
      title: "Incident Reported Successfully",
      description: `Your tracking ID is: ${trackingId}. We will respond shortly.`,
    });

    setFormData({ type: "", severity: "", description: "", location: "" });
  };

  return (
    <div 
      className="p-6 space-y-6 max-w-2xl mx-auto relative overflow-hidden min-h-screen"
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
          Report Incident
        </h1>
        <p className="text-xl md:text-2xl font-bold mt-3" style={{ color: '#16537e' }}>
          Submit an emergency incident report
        </p>
      </div>

      <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <CardHeader>
          <CardTitle>Incident Details</CardTitle>
          <CardDescription>
            Please provide as much information as possible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="type" className="font-bold" style={{ color: '#16537e' }}>Incident Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger className="font-semibold">
                  <SelectValue placeholder="Select incident type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="earthquake">Earthquake</SelectItem>
                  <SelectItem value="flood">Flood</SelectItem>
                  <SelectItem value="fire">Fire</SelectItem>
                  <SelectItem value="terror">Terror Attack</SelectItem>
                  <SelectItem value="heatwave">Heatwave</SelectItem>
                  <SelectItem value="accident">Accident</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="severity" className="font-bold" style={{ color: '#16537e' }}>Severity Level *</Label>
              <Select
                value={formData.severity}
                onValueChange={(value) =>
                  setFormData({ ...formData, severity: value })
                }
              >
                <SelectTrigger className="font-semibold">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="font-bold" style={{ color: '#16537e' }}>Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the incident in detail..."
                rows={5}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                className="font-semibold"
                style={{
                  border: '2px solid rgba(22, 83, 126, 0.2)',
                  borderRadius: '0.5rem'
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="font-bold" style={{ color: '#16537e' }}>Current Location *</Label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  placeholder="Enter your location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                  className="font-semibold"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  style={{
                    border: '2px solid #16537e',
                    background: 'transparent',
                    color: '#16537e',
                  }}
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="media" className="font-bold" style={{ color: '#16537e' }}>Upload Photo/Video (Optional)</Label>
              <div 
                className="border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 hover:shadow-lg cursor-pointer"
                style={{
                  borderColor: 'rgba(22, 83, 126, 0.3)',
                  background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(226, 232, 240, 0.9) 100%)'
                }}
              >
                <Upload className="h-8 w-8 mx-auto mb-2" style={{ color: '#16537e' }} />
                <p className="text-sm font-bold" style={{ color: '#16537e' }}>
                  Click to upload or drag and drop
                </p>
                <p className="text-xs font-semibold mt-1" style={{ color: '#666' }}>
                  PNG, JPG, MP4 up to 10MB
                </p>
                <Input
                  type="file"
                  className="hidden"
                  id="media"
                  accept="image/*,video/*"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                color: '#ffffff',
                boxShadow: '0 4px 15px rgba(22, 83, 126, 0.4)'
              }}
            >
              Submit Report
            </Button>
          </form>
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

export default ReportIncident;
