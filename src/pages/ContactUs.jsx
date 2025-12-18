import React, { useState } from "react";
import { Send, MessageCircle, AlertTriangle } from "lucide-react";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Label from "../components/ui/Label";
import contactSupportImage from "../assets/images/contactSupport.png";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/Card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/Select";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    subject: "",
    message: "",
    priority: "medium",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiBase}/api/contact/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          department: formData.department,
          subject: formData.subject,
          message: formData.message,
          priority: formData.priority,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to send message");
      }

      setIsSubmitting(false);
      alert(
        "Message Sent Successfully! Thank you for contacting us. We'll respond within 24 hours."
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        subject: "",
        message: "",
        priority: "medium",
      });
    } catch (error) {
      setIsSubmitting(false);
      console.error("Contact submit error:", error);
      alert("Sorry, we couldn't send your message. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      subject: "",
      message: "",
      priority: "medium",
    });
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
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; }
      `}</style>
      
      <main>
        {/* Hero Section with Background Image */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#16537e]/20 via-[#6aa84f]/15 to-[#38761d]/20"></div>
          <div className="absolute inset-0 opacity-10">
            <img
              src={contactSupportImage}
              alt="Customer support team ready to assist"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
            <div className="animate-fade-in-up">
              <div className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center shadow-2xl animate-pulse-slow" style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                boxShadow: '0 8px 25px rgba(22, 83, 126, 0.4)'
              }}>
                <MessageCircle className="h-12 w-12 text-white" />
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
                Contact <span className="block md:inline">Us</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                Get in touch with our team. We're here to help with emergencies,
                support questions, and partnership opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Emergency Notice */}
        <section className="py-8 relative" style={{
          background: 'linear-gradient(135deg, #f44336 0%, #ff3535 50%, #990000 100%)',
          boxShadow: '0 4px 15px rgba(244, 67, 54, 0.3)'
        }}>
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="flex items-center justify-center space-x-4">
              <AlertTriangle className="h-6 w-6 text-white animate-pulse-slow" />
              <span className="font-black text-white text-lg md:text-xl">
                FOR IMMEDIATE EMERGENCIES: Call 911 or use our emergency
                reporting system
              </span>
              <AlertTriangle className="h-6 w-6 text-white animate-pulse-slow" />
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 relative">
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(106, 168, 79, 0.1) 0%, transparent 70%)'
          }}></div>
          <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-black mb-6" style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.3'
              }}>
                Send us a Message
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 font-medium">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>
            </div>

            <Card className="border-2 shadow-2xl bg-white/90 backdrop-blur-sm animate-fade-in-up delay-200" style={{
              borderColor: 'rgba(22, 83, 126, 0.3)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(22, 83, 126, 0.05) 100%)'
            }}>
              <CardHeader className="rounded-t-xl" style={{
                background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                boxShadow: '0 4px 15px rgba(22, 83, 126, 0.3)'
              }}>
                <CardTitle className="text-2xl md:text-3xl text-center text-white font-black">
                  Contact Form
                </CardTitle>
                <CardDescription className="text-center text-white/90 font-medium">
                  All fields marked with * are required.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-black text-gray-900">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="border-2 focus:border-[#16537e] focus:ring-2 focus:ring-[#16537e]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-black text-gray-900">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border-2 focus:border-[#16537e] focus:ring-2 focus:ring-[#16537e]/20"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-black text-gray-900">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="border-2 focus:border-[#16537e] focus:ring-2 focus:ring-[#16537e]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department" className="font-black text-gray-900">Department *</Label>
                      <Select
                        value={formData.department}
                        onValueChange={(value) =>
                          handleSelectChange("department", value)
                        }
                        required
                      >
                        <SelectTrigger className="border-2 focus:border-[#16537e]">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emergency">Emergency Operations</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="general">General Inquiries</SelectItem>
                          <SelectItem value="partnership">Partnerships</SelectItem>
                          <SelectItem value="media">Media Relations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="font-black text-gray-900">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your inquiry"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="border-2 focus:border-[#16537e] focus:ring-2 focus:ring-[#16537e]/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-black text-gray-900">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide detailed information about your inquiry or request..."
                      className="min-h-32 border-2 focus:border-[#16537e] focus:ring-2 focus:ring-[#16537e]/20"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority" className="font-black text-gray-900">Priority Level</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) =>
                        handleSelectChange("priority", value)
                      }
                    >
                      <SelectTrigger className="border-2 focus:border-[#16537e]">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - General inquiry</SelectItem>
                        <SelectItem value="medium">Medium - Support needed</SelectItem>
                        <SelectItem value="high">High - Urgent issue</SelectItem>
                        <SelectItem value="critical">Critical - Emergency related</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button
                      type="submit"
                      variant="info"
                      size="lg"
                      className="flex-1 text-white font-black rounded-xl transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl disabled:opacity-70"
                      disabled={isSubmitting}
                      style={{
                        background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)',
                        boxShadow: '0 8px 25px rgba(22, 83, 126, 0.4)'
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2 inline-block" />
                          Send Message
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={resetForm}
                      className="px-8 py-3 border-2 font-black rounded-xl transition-all duration-300 hover:scale-105 bg-white/90 backdrop-blur-sm"
                      style={{
                        borderColor: '#16537e',
                        color: '#16537e'
                      }}
                    >
                      Reset Form
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
