import { useState } from "react";
import { AlertTriangle, MapPin, Upload, Send } from "lucide-react";

const IncidentReportForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    incidentType: "",
    severity: "",
    title: "",
    description: "",
    location: "",
    contact: "",
    reporterName: "",
    reporterEmail: "",
    media: null,
  });

  const handleInputChange = (e) => {
    const { id, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [id]: files }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Map form data to API expected format
      const apiData = {
        title: `${formData.incidentType}: ${formData.title}`,
        description:
          formData.description +
          (formData.reporterEmail
            ? `\n\nReporter Email: ${formData.reporterEmail}`
            : ""),
        location: formData.location,
        severity: formData.severity.toLowerCase(),
        contact_person: formData.reporterName,
        contact_phone: formData.contact,
      };

      const response = await fetch("http://localhost:5000/api/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit incident report");
      }

      const result = await response.json();
      alert(
        `Incident Reported Successfully!\nIncident ID: ${result.id}\nEmergency services have been notified. You will receive updates via email.`
      );

      // Reset form
      setFormData({
        incidentType: "",
        severity: "",
        title: "",
        description: "",
        location: "",
        contact: "",
        reporterName: "",
        reporterEmail: "",
        media: null,
      });
    } catch (error) {
      console.error("Error submitting incident:", error);
      alert("Failed to submit incident report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return '#ff3535';
      case 'high':
        return '#f44336';
      case 'medium':
        return '#f48836';
      case 'low':
        return '#6aa84f';
      default:
        return '#16537e';
    }
  };

  return (
    <section id="report" className="py-20 relative" style={{
      background: 'radial-gradient(circle at 20% 50%, rgba(255, 53, 53, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(244, 67, 54, 0.15) 0%, transparent 50%), linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
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
      `}</style>
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-2xl animate-pulse-slow" style={{
            background: 'linear-gradient(135deg, #ff3535 0%, #f44336 100%)',
            boxShadow: '0 8px 25px rgba(255, 53, 53, 0.5)'
          }}>
            <AlertTriangle className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-4" style={{
            background: 'linear-gradient(135deg, #ff3535 0%, #f44336 50%, #990000 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 4px 20px rgba(255, 53, 53, 0.2)',
            lineHeight: '1.2',
            paddingBottom: '0.5rem'
          }}>
            Report <span className="block md:inline">Emergency</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 font-medium">
            Quick and accurate incident reporting helps us respond faster and
            save lives.
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 overflow-hidden animate-fade-in-up delay-100" style={{
          borderColor: 'rgba(255, 53, 53, 0.3)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 53, 53, 0.05) 100%)'
        }}>
          <div className="p-6 md:p-8 border-b-2" style={{
            borderColor: 'rgba(255, 53, 53, 0.2)',
            background: 'linear-gradient(135deg, #ff3535 0%, #f44336 100%)',
            boxShadow: '0 4px 15px rgba(255, 53, 53, 0.3)'
          }}>
            <h2 className="flex items-center text-2xl md:text-3xl font-black text-white">
              <AlertTriangle className="h-7 w-7 mr-3" />
              Emergency Incident Report
            </h2>
            <p className="text-white/90 mt-2 font-medium">
              Please provide as much detail as possible. All fields marked with
              * are required.
            </p>
          </div>

          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="incidentType"
                    className="block text-sm font-black text-gray-900"
                  >
                    Incident Type *
                  </label>
                  <select
                    id="incidentType"
                    value={formData.incidentType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 font-medium"
                    style={{
                      borderColor: '#e5e7eb',
                      focusRingColor: '#ff353520',
                      focusBorderColor: '#ff3535'
                    }}
                    required
                  >
                    <option value="">Select incident type</option>
                    <option value="fire">Fire</option>
                    <option value="flood">Flood</option>
                    <option value="earthquake">Earthquake</option>
                    <option value="medical">Medical Emergency</option>
                    <option value="accident">Accident</option>
                    <option value="violence">Violence/Security</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="severity"
                    className="block text-sm font-black text-gray-900"
                  >
                    Severity Level *
                  </label>
                  <select
                    id="severity"
                    value={formData.severity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 font-medium"
                    style={{
                      borderColor: formData.severity ? getSeverityColor(formData.severity) + '40' : '#e5e7eb',
                      focusRingColor: formData.severity ? getSeverityColor(formData.severity) + '20' : '#ff353520',
                      focusBorderColor: formData.severity ? getSeverityColor(formData.severity) : '#ff3535'
                    }}
                    required
                  >
                    <option value="">Select severity</option>
                    <option value="critical">Critical - Life Threatening</option>
                    <option value="high">High - Immediate Response</option>
                    <option value="medium">Medium - Urgent</option>
                    <option value="low">Low - Non-urgent</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-black text-gray-900"
                >
                  Incident Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Brief description of the incident"
                  className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                  style={{
                    borderColor: '#e5e7eb',
                    focusRingColor: '#ff353520',
                    focusBorderColor: '#ff3535'
                  }}
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-black text-gray-900"
                >
                  Detailed Description *
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide detailed information about what happened, when, and current situation..."
                  className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 min-h-32"
                  style={{
                    borderColor: '#e5e7eb',
                    focusRingColor: '#ff353520',
                    focusBorderColor: '#ff3535'
                  }}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="location"
                    className="block text-sm font-black text-gray-900"
                  >
                    Location Address *
                  </label>
                  <div className="relative">
                    <input
                      id="location"
                      type="text"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter full address or landmark"
                      className="w-full px-4 py-3 pr-12 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                      style={{
                        borderColor: '#e5e7eb',
                        focusRingColor: '#ff353520',
                        focusBorderColor: '#ff3535'
                      }}
                      required
                    />
                    <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact"
                    className="block text-sm font-black text-gray-900"
                  >
                    Contact Number *
                  </label>
                  <input
                    id="contact"
                    type="tel"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                    style={{
                      borderColor: '#e5e7eb',
                      focusRingColor: '#ff353520',
                      focusBorderColor: '#ff3535'
                    }}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="reporterName"
                    className="block text-sm font-black text-gray-900"
                  >
                    Your Name *
                  </label>
                  <input
                    id="reporterName"
                    type="text"
                    value={formData.reporterName}
                    onChange={handleInputChange}
                    placeholder="Full name"
                    className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                    style={{
                      borderColor: '#e5e7eb',
                      focusRingColor: '#ff353520',
                      focusBorderColor: '#ff3535'
                    }}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="reporterEmail"
                    className="block text-sm font-black text-gray-900"
                  >
                    Email Address
                  </label>
                  <input
                    id="reporterEmail"
                    type="email"
                    value={formData.reporterEmail}
                    onChange={handleInputChange}
                    placeholder="Email for updates"
                    className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                    style={{
                      borderColor: '#e5e7eb',
                      focusRingColor: '#ff353520',
                      focusBorderColor: '#ff3535'
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="media"
                  className="block text-sm font-black text-gray-900"
                >
                  Photos/Videos (Optional)
                </label>
                <div className="border-2 border-dashed rounded-xl p-8 text-center hover:border-[#ff3535] transition-all duration-300 cursor-pointer" style={{
                  borderColor: '#e5e7eb',
                  background: 'rgba(255, 53, 53, 0.05)'
                }}>
                  <Upload className="h-10 w-10 mx-auto mb-2" style={{ color: '#ff3535' }} />
                  <p className="text-sm text-gray-700 mb-2 font-medium">
                    Drop files here or click to upload
                  </p>
                  <p className="text-xs text-gray-600 font-medium">
                    PNG, JPG, MP4 up to 10MB each
                  </p>
                  <input
                    id="media"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 text-white font-black py-4 px-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl disabled:opacity-70"
                  style={{
                    background: 'linear-gradient(135deg, #ff3535 0%, #f44336 100%)',
                    boxShadow: '0 8px 25px rgba(255, 53, 53, 0.4)'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2 inline-block" />
                      Submit Emergency Report
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="px-8 py-4 border-2 text-gray-700 font-black rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/90 backdrop-blur-sm"
                  style={{
                    borderColor: '#ff3535',
                    color: '#ff3535'
                  }}
                >
                  Save as Draft
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 p-6 md:p-8 rounded-2xl border-2 animate-fade-in-up delay-200" style={{
          background: 'linear-gradient(135deg, rgba(22, 83, 126, 0.1) 0%, rgba(106, 168, 79, 0.1) 100%)',
          borderColor: 'rgba(22, 83, 126, 0.3)'
        }}>
          <h3 className="text-lg md:text-xl font-black mb-2" style={{ color: '#16537e' }}>
            What happens next?
          </h3>
          <ul className="text-sm md:text-base text-gray-700 space-y-1 font-medium">
            <li>• Your report is immediately sent to emergency dispatch</li>
            <li>• You'll receive a confirmation email with your incident ID</li>
            <li>• Appropriate emergency services will be notified</li>
            <li>• You'll get updates on response progress via email/SMS</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default IncidentReportForm;
