import React, { useState } from "react";
import { Send, MessageCircle, AlertTriangle } from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Label from "../components/ui/Label";
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

    setTimeout(() => {
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
    }, 2000);
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
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-gray-100">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <MessageCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900">Contact</span>{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Us
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Get in touch with our team. We're here to help with emergencies,
              support questions, and partnership opportunities.
            </p>
          </div>
        </section>

        {/* Emergency Notice */}
        <section className="py-8 bg-red-600 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="flex items-center justify-center space-x-4">
              <AlertTriangle className="h-6 w-6" />
              <span className="font-semibold">
                FOR IMMEDIATE EMERGENCIES: Call 911 or use our emergency
                reporting system
              </span>
              <AlertTriangle className="h-6 w-6" />
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Send us a Message
              </h2>
              <p className="text-xl text-gray-600">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>
            </div>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Contact Form
                </CardTitle>
                <CardDescription className="text-center">
                  All fields marked with * are required.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department *</Label>
                      <Select
                        value={formData.department}
                        onValueChange={(value) =>
                          handleSelectChange("department", value)
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="emergency"
                            onSelect={(value) =>
                              handleSelectChange("department", value)
                            }
                          >
                            Emergency Operations
                          </SelectItem>
                          <SelectItem
                            value="technical"
                            onSelect={(value) =>
                              handleSelectChange("department", value)
                            }
                          >
                            Technical Support
                          </SelectItem>
                          <SelectItem
                            value="general"
                            onSelect={(value) =>
                              handleSelectChange("department", value)
                            }
                          >
                            General Inquiries
                          </SelectItem>
                          <SelectItem
                            value="partnership"
                            onSelect={(value) =>
                              handleSelectChange("department", value)
                            }
                          >
                            Partnerships
                          </SelectItem>
                          <SelectItem
                            value="media"
                            onSelect={(value) =>
                              handleSelectChange("department", value)
                            }
                          >
                            Media Relations
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your inquiry"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide detailed information about your inquiry or request..."
                      className="min-h-32"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) =>
                        handleSelectChange("priority", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="low"
                          onSelect={(value) =>
                            handleSelectChange("priority", value)
                          }
                        >
                          Low - General inquiry
                        </SelectItem>
                        <SelectItem
                          value="medium"
                          onSelect={(value) =>
                            handleSelectChange("priority", value)
                          }
                        >
                          Medium - Support needed
                        </SelectItem>
                        <SelectItem
                          value="high"
                          onSelect={(value) =>
                            handleSelectChange("priority", value)
                          }
                        >
                          High - Urgent issue
                        </SelectItem>
                        <SelectItem
                          value="critical"
                          onSelect={(value) =>
                            handleSelectChange("priority", value)
                          }
                        >
                          Critical - Emergency related
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button
                      type="submit"
                      variant="info"
                      size="lg"
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={resetForm}
                    >
                      Reset Form
                    </Button>
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
