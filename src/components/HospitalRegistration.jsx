import { useState } from "react";
import { Hospital, Ambulance, Stethoscope, Building2 } from "lucide-react";

const HospitalRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    hospitalName: "",
    hospitalType: "",
    address: "",
    phone: "",
    emergencyPhone: "",
    email: "",
    totalBeds: "",
    icuBeds: "",
    emergencyBeds: "",
    ambulances: "",
    staffCount: "",
    contactName: "",
    contactPosition: "",
    contactPhone: "",
    contactEmail: "",
    additionalInfo: "",
    terms: false,
    dataSharing: false,
  });

  const availableServices = [
    { id: "emergency", label: "Emergency Department" },
    { id: "trauma", label: "Trauma Center" },
    { id: "icu", label: "Intensive Care Unit" },
    { id: "surgery", label: "Surgery Department" },
    { id: "pediatric", label: "Pediatric Care" },
    { id: "maternity", label: "Maternity Ward" },
    { id: "mental", label: "Mental Health" },
    { id: "cardiac", label: "Cardiac Care" },
  ];

  const handleServiceChange = (serviceId, checked) => {
    if (checked) {
      setServices([...services, serviceId]);
    } else {
      setServices(services.filter((id) => id !== serviceId));
    }
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [id]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiBase}/api/hospital-registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          services: services,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to register hospital");
      }

      setIsSubmitting(false);
      alert(
        "Hospital Registration Successful!\nYour facility has been added to our emergency response network."
      );
      // Reset form
      setFormData({
        hospitalName: "",
        hospitalType: "",
        address: "",
        phone: "",
        emergencyPhone: "",
        email: "",
        totalBeds: "",
        icuBeds: "",
        emergencyBeds: "",
        ambulances: "",
        staffCount: "",
        contactName: "",
        contactPosition: "",
        contactPhone: "",
        contactEmail: "",
        additionalInfo: "",
        terms: false,
        dataSharing: false,
      });
      setServices([]);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Hospital registration submit error:", error);
      alert(
        "Sorry, we couldn't register your hospital. Please try again later."
      );
    }
  };

  return (
    <section id="hospitals" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-blue-600">Partner</span> Hospital Registration
          </h2>
          <p className="text-xl text-gray-600">
            Join our healthcare network to coordinate emergency medical response
            and resource sharing.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Resource Coordination Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
              <Hospital className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Resource Coordination
            </h3>
            <p className="text-sm text-gray-600">
              Share real-time capacity and resource availability with emergency
              services.
            </p>
          </div>

          {/* Priority Referrals Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <Ambulance className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Priority Referrals</h3>
            <p className="text-sm text-gray-600">
              Receive priority emergency referrals based on your specialties and
              capacity.
            </p>
          </div>

          {/* Enhanced Communication Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
              <Stethoscope className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Enhanced Communication
            </h3>
            <p className="text-sm text-gray-600">
              Direct communication channels with emergency coordinators and
              volunteers.
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="flex items-center text-2xl font-bold text-gray-900">
              <Building2 className="h-6 w-6 text-blue-600 mr-2" />
              Hospital Registration
            </h2>
            <p className="text-gray-600 mt-2">
              Register your healthcare facility to join our emergency response
              network.
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Basic Information
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="hospitalName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Hospital Name *
                    </label>
                    <input
                      id="hospitalName"
                      type="text"
                      value={formData.hospitalName}
                      onChange={handleInputChange}
                      placeholder="Enter hospital name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="hospitalType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Hospital Type *
                    </label>
                    <select
                      id="hospitalType"
                      value={formData.hospitalType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select hospital type</option>
                      <option value="general">General Hospital</option>
                      <option value="specialized">Specialized Hospital</option>
                      <option value="trauma">Trauma Center</option>
                      <option value="children">Children's Hospital</option>
                      <option value="psychiatric">Psychiatric Hospital</option>
                      <option value="rehabilitation">
                        Rehabilitation Center
                      </option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Hospital Address *
                  </label>
                  <textarea
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Complete hospital address with postal code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-20"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Main Phone *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Hospital main number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="emergencyPhone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Emergency Line *
                    </label>
                    <input
                      id="emergencyPhone"
                      type="tel"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      placeholder="Emergency department"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="admin@hospital.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Capacity Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Capacity & Resources
                </h3>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="totalBeds"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Total Beds *
                    </label>
                    <input
                      id="totalBeds"
                      type="number"
                      value={formData.totalBeds}
                      onChange={handleInputChange}
                      placeholder="Total bed capacity"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="icuBeds"
                      className="block text-sm font-medium text-gray-700"
                    >
                      ICU Beds *
                    </label>
                    <input
                      id="icuBeds"
                      type="number"
                      value={formData.icuBeds}
                      onChange={handleInputChange}
                      placeholder="ICU bed capacity"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="emergencyBeds"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Emergency Beds *
                    </label>
                    <input
                      id="emergencyBeds"
                      type="number"
                      value={formData.emergencyBeds}
                      onChange={handleInputChange}
                      placeholder="Emergency dept. capacity"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="ambulances"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Ambulances Available
                    </label>
                    <input
                      id="ambulances"
                      type="number"
                      value={formData.ambulances}
                      onChange={handleInputChange}
                      placeholder="Number of ambulances"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="staffCount"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Medical Staff Count *
                    </label>
                    <input
                      id="staffCount"
                      type="number"
                      value={formData.staffCount}
                      onChange={handleInputChange}
                      placeholder="Total medical staff"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Available Services (Select all that apply) *
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {availableServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        id={service.id}
                        checked={services.includes(service.id)}
                        onChange={(e) =>
                          handleServiceChange(service.id, e.target.checked)
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={service.id}
                        className="text-sm text-gray-700"
                      >
                        {service.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Person */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Emergency Contact Person
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="contactName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contact Name *
                    </label>
                    <input
                      id="contactName"
                      type="text"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder="Emergency coordinator name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="contactPosition"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Position *
                    </label>
                    <input
                      id="contactPosition"
                      type="text"
                      value={formData.contactPosition}
                      onChange={handleInputChange}
                      placeholder="Job title/position"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="contactPhone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Direct Phone *
                    </label>
                    <input
                      id="contactPhone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      placeholder="Direct contact number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="contactEmail"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contact Email *
                    </label>
                    <input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      placeholder="contact@hospital.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="additionalInfo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Additional Information
                </label>
                <textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  placeholder="Any additional information about your facility, special equipment, or emergency protocols..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-24"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || services.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Registering Hospital...
                  </>
                ) : (
                  <>
                    <Hospital className="h-4 w-4 mr-2" />
                    Register Hospital
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">
            Partnership Benefits
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              • Priority access to emergency medical supplies during disasters
            </li>
            <li>• Coordinated patient transfer and evacuation support</li>
            <li>• Real-time communication with emergency response teams</li>
            <li>• Access to disaster preparedness training and resources</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HospitalRegistration;
