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
import { Switch } from "../../components/ui/Switch";
import { useToast } from "../../hooks/use-toast";
import { User, Shield, Bell } from "lucide-react";

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

const Profile = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "Ali Hassan",
    email: "ali@example.com",
    phone: "+92 300 1234567",
    skills: "Medical Aid",
    experience: "3 years",
    available: true,
    notifications: true,
    bio: "Experienced medical volunteer with passion for helping communities during emergencies.",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
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
          Profile Settings
        </h1>
        <p className="text-xl md:text-2xl font-bold mt-3" style={{ color: '#16537e' }}>
          Manage your volunteer profile and preferences
        </p>
      </div>

      <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-white" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
            <CardTitle>Personal Information</CardTitle>
          </div>
          <CardDescription>Update your basic profile details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-bold" style={{ color: '#16537e' }}>Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="font-semibold"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-bold" style={{ color: '#16537e' }}>Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="font-semibold"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="font-bold" style={{ color: '#16537e' }}>Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
                className="font-semibold"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="font-bold" style={{ color: '#16537e' }}>Bio</Label>
              <Textarea
                id="bio"
                rows={4}
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Tell us about yourself..."
                className="font-semibold"
                style={{
                  border: '2px solid rgba(22, 83, 126, 0.2)',
                  borderRadius: '0.5rem'
                }}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                color: '#ffffff',
                boxShadow: '0 4px 15px rgba(22, 83, 126, 0.4)'
              }}
            >
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-white" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
            <CardTitle>Volunteer Skills & Availability</CardTitle>
          </div>
          <CardDescription>
            Update your skills and availability status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="skills" className="font-bold" style={{ color: '#16537e' }}>Primary Skills *</Label>
            <Select
              value={formData.skills}
              onValueChange={(value) =>
                setFormData({ ...formData, skills: value })
              }
            >
              <SelectTrigger className="font-semibold">
                <SelectValue placeholder="Select your primary skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Medical Aid">Medical Aid</SelectItem>
                <SelectItem value="Rescue Operations">
                  Rescue Operations
                </SelectItem>
                <SelectItem value="Food Distribution">
                  Food Distribution
                </SelectItem>
                <SelectItem value="Logistics">Logistics</SelectItem>
                <SelectItem value="Communication">Communication</SelectItem>
                <SelectItem value="Technical Support">
                  Technical Support
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience" className="font-bold" style={{ color: '#16537e' }}>Experience Level</Label>
            <Select
              value={formData.experience}
              onValueChange={(value) =>
                setFormData({ ...formData, experience: value })
              }
            >
              <SelectTrigger className="font-semibold">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Less than 1 year">
                  Less than 1 year
                </SelectItem>
                <SelectItem value="1-2 years">1-2 years</SelectItem>
                <SelectItem value="3-5 years">3-5 years</SelectItem>
                <SelectItem value="5+ years">5+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div 
            className="flex items-center justify-between p-4 border-2 rounded-xl transition-all duration-300 hover:shadow-lg"
            style={{
              borderColor: 'rgba(22, 83, 126, 0.2)',
              background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(226, 232, 240, 0.9) 100%)'
            }}
          >
            <div>
              <p className="font-black" style={{ color: '#16537e' }}>Available for Assignments</p>
              <p className="text-sm font-semibold mt-1" style={{ color: '#666' }}>
                Toggle your availability status
              </p>
            </div>
            <Switch
              checked={formData.available}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, available: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-white" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
            <CardTitle>Notification Preferences</CardTitle>
          </div>
          <CardDescription>Manage how you receive updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div 
            className="flex items-center justify-between p-4 border-2 rounded-xl transition-all duration-300 hover:shadow-lg"
            style={{
              borderColor: 'rgba(22, 83, 126, 0.2)',
              background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(226, 232, 240, 0.9) 100%)'
            }}
          >
            <div>
              <p className="font-black" style={{ color: '#16537e' }}>Push Notifications</p>
              <p className="text-sm font-semibold mt-1" style={{ color: '#666' }}>
                Receive alerts about new assignments
              </p>
            </div>
            <Switch
              checked={formData.notifications}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, notifications: checked })
              }
            />
          </div>
          <div 
            className="flex items-center justify-between p-4 border-2 rounded-xl transition-all duration-300 hover:shadow-lg"
            style={{
              borderColor: 'rgba(22, 83, 126, 0.2)',
              background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(226, 232, 240, 0.9) 100%)'
            }}
          >
            <div>
              <p className="font-black" style={{ color: '#16537e' }}>Email Notifications</p>
              <p className="text-sm font-semibold mt-1" style={{ color: '#666' }}>
                Get email updates about incidents
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div 
            className="flex items-center justify-between p-4 border-2 rounded-xl transition-all duration-300 hover:shadow-lg"
            style={{
              borderColor: 'rgba(22, 83, 126, 0.2)',
              background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(226, 232, 240, 0.9) 100%)'
            }}
          >
            <div>
              <p className="font-black" style={{ color: '#16537e' }}>SMS Alerts</p>
              <p className="text-sm font-semibold mt-1" style={{ color: '#666' }}>
                Receive urgent alerts via SMS
              </p>
            </div>
            <Switch defaultChecked />
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

export default Profile;
