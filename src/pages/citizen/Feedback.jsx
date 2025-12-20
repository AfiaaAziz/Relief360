import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import Textarea from "../../components/ui/Textarea";
import { useToast } from "../../hooks/use-toast";
import { MessageSquare, Send } from "lucide-react";

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

const Feedback = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";

    try {
      const res = await fetch(`${apiBase}/api/contact/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Failed to send message");
      }

      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      toast({
        title: "Send Failed",
        description: err?.message || "Failed to send message",
        variant: "destructive",
      });
    }
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
          Feedback
        </h1>
        <p className="text-xl md:text-2xl font-bold mt-3" style={{ color: '#16537e' }}>
          Help us improve Relief360 with your suggestions
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
            <MessageSquare className="h-6 w-6 text-white" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
            <div>
              <CardTitle>We Value Your Feedback</CardTitle>
              <CardDescription>
                Your input helps us serve you better
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <CardHeader>
          <CardTitle>Share Your Thoughts</CardTitle>
          <CardDescription>
            Tell us about your experience or suggest improvements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-bold" style={{ color: '#16537e' }}>Name *</Label>
              <Input
                id="name"
                placeholder="Your name"
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
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="font-semibold"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="font-bold" style={{ color: '#16537e' }}>Message *</Label>
              <Textarea
                id="message"
                placeholder="Share your feedback, suggestions, or concerns..."
                rows={8}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
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
              size="lg"
              style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                color: '#ffffff',
                boxShadow: '0 4px 15px rgba(22, 83, 126, 0.4)'
              }}
            >
              <Send className="mr-2 h-4 w-4" />
              Submit Feedback
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <CardHeader>
          <CardTitle>Other Ways to Reach Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div 
            className="flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, rgba(22, 83, 126, 0.1) 0%, rgba(22, 83, 126, 0.05) 100%)',
              border: '2px solid rgba(22, 83, 126, 0.2)'
            }}
          >
            <div 
              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)'
              }}
            >
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-black" style={{ color: '#16537e' }}>Email Support</p>
              <p className="text-sm font-semibold mt-1" style={{ color: '#666' }}>
                support@relief360.com
              </p>
            </div>
          </div>
          <div 
            className="flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, rgba(106, 168, 79, 0.1) 0%, rgba(56, 118, 29, 0.05) 100%)',
              border: '2px solid rgba(106, 168, 79, 0.2)'
            }}
          >
            <div 
              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, #6aa84f 0%, #38761d 100%)'
              }}
            >
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-black" style={{ color: '#16537e' }}>Help Center</p>
              <p className="text-sm font-semibold mt-1" style={{ color: '#666' }}>
                Visit our FAQ and documentation
              </p>
            </div>
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

export default Feedback;
