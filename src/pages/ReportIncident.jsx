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
    media: null
  });

  const handleInputChange = (e) => {
    const { id, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({ ...prev, [id]: files }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Incident Reported Successfully!\nEmergency services have been notified. You will receive updates via email.");
    }, 2000);
  };

  return (
    <section id="report" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-red-600">Report</span> Emergency
          </h2>
          <p className="text-xl text-gray-600">
            Quick and accurate incident reporting helps us respond faster and save lives.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-red-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="flex items-center text-2xl font-bold text-gray-900">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
              Emergency Incident Report
            </h2>
            <p className="text-gray-600 mt-2">
              Please provide as much detail as possible. All fields marked with * are required.
            </p>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="incidentType" className="block text-sm font-medium text-gray-700">
                    Incident Type *
                  </label>
                  <select 
                    id="incidentType"
                    value={formData.incidentType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                  <label htmlFor="severity" className="block text-sm font-medium text-gray-700">
                    Severity Level *
                  </label>
                  <select 
                    id="severity"
                    value={formData.severity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Incident Title *
                </label>
                <input 
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Brief description of the incident"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Detailed Description *
                </label>
                <textarea 
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide detailed information about what happened, when, and current situation..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent min-h-32"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location Address *
                  </label>
                  <div className="relative">
                    <input 
                      id="location"
                      type="text"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter full address or landmark"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pr-10"
                      required
                    />
                    <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                    Contact Number *
                  </label>
                  <input 
                    id="contact"
                    type="tel"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="Your phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="reporterName" className="block text-sm font-medium text-gray-700">
                    Your Name *
                  </label>
                  <input 
                    id="reporterName"
                    type="text"
                    value={formData.reporterName}
                    onChange={handleInputChange}
                    placeholder="Full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="reporterEmail" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input 
                    id="reporterEmail"
                    type="email"
                    value={formData.reporterEmail}
                    onChange={handleInputChange}
                    placeholder="Email for updates"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="media" className="block text-sm font-medium text-gray-700">
                  Photos/Videos (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-300 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drop files here or click to upload
                  </p>
                  <p className="text-xs text-gray-500">
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
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Emergency Report
                    </>
                  )}
                </button>
                <button 
                  type="button" 
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Save as Draft
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">What happens next?</h3>
          <ul className="text-sm text-gray-600 space-y-1">
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