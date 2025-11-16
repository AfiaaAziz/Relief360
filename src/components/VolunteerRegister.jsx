import { useState } from "react";
import { Users, Heart, Shield, UserPlus } from "lucide-react";

const VolunteerRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    availability: "",
    address: "",
    experience: "",
    motivation: "",
    termsAccepted: false,
    backgroundCheck: false
  });

  const skills = [
    { id: "medical", label: "Medical Aid/First Aid" },
    { id: "rescue", label: "Search & Rescue" },
    { id: "transportation", label: "Transportation/Logistics" },
    { id: "communication", label: "Communication/Coordination" },
    { id: "shelter", label: "Shelter Management" },
    { id: "food", label: "Food Distribution" },
    { id: "counseling", label: "Crisis Counseling" },
    { id: "technical", label: "Technical Support" },
  ];

  const handleSkillChange = (skillId, checked) => {
    if (checked) {
      setSelectedSkills([...selectedSkills, skillId]);
    } else {
      setSelectedSkills(selectedSkills.filter(id => id !== skillId));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.phone || !formData.age || !formData.availability || 
        !formData.address || !formData.motivation || !formData.termsAccepted || 
        !formData.backgroundCheck || selectedSkills.length === 0) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in">
          <div className="font-semibold">Registration Successful!</div>
          <div className="text-sm">Welcome to our volunteer network. You'll receive training materials via email.</div>
        </div>
      )}

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-green-600">Join</span> Our Volunteer Network
            </h2>
            <p className="text-xl text-gray-600">
              Be a hero in your community. Help save lives and support those in need during emergencies.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white text-center rounded-lg shadow-lg p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Make a Difference</h3>
              <p className="text-sm text-gray-600">
                Your skills and time can save lives and help communities recover faster.
              </p>
            </div>

            <div className="bg-white text-center rounded-lg shadow-lg p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Training</h3>
              <p className="text-sm text-gray-600">
                Comprehensive training programs to prepare you for emergency response.
              </p>
            </div>

            <div className="bg-white text-center rounded-lg shadow-lg p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Community Network</h3>
              <p className="text-sm text-gray-600">
                Connect with like-minded volunteers and build lasting friendships.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <h3 className="flex items-center text-2xl font-bold">
                <UserPlus className="h-6 w-6 text-green-600 mr-2" />
                Volunteer Registration
              </h3>
              <p className="text-gray-600 mt-2">
                Join our network of heroes. All fields marked with * are required.
              </p>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input 
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter your first name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input 
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter your last name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Your phone number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age *
                    </label>
                    <select 
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
                    >
                      <option value="">Select age group</option>
                      <option value="18-25">18-25 years</option>
                      <option value="26-35">26-35 years</option>
                      <option value="36-45">36-45 years</option>
                      <option value="46-55">46-55 years</option>
                      <option value="56+">56+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Availability *
                    </label>
                    <select 
                      value={formData.availability}
                      onChange={(e) => handleInputChange('availability', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
                    >
                      <option value="">When can you volunteer?</option>
                      <option value="weekdays">Weekdays</option>
                      <option value="weekends">Weekends</option>
                      <option value="both">Both Weekdays & Weekends</option>
                      <option value="emergency">Emergency Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea 
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Your full address"
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Skills & Expertise (Select all that apply) *
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {skills.map((skill) => (
                      <label key={skill.id} className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={selectedSkills.includes(skill.id)}
                          onChange={(e) => handleSkillChange(skill.id, e.target.checked)}
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="text-sm">{skill.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous Experience (Optional)
                  </label>
                  <textarea 
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder="Describe any relevant volunteer experience, certifications, or training..."
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Why do you want to volunteer? *
                  </label>
                  <textarea 
                    value={formData.motivation}
                    onChange={(e) => handleInputChange('motivation', e.target.value)}
                    placeholder="Tell us what motivates you to help others..."
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting || selectedSkills.length === 0}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Registering...</span>
                    </>
                  ) : (
                    <>
                      <Heart className="h-4 w-4" />
                      <span>Join as Volunteer</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-700 mb-2">What's Next?</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• You'll receive a welcome email with training materials</li>
              <li>• Complete online safety and emergency response training</li>
              <li>• Attend a local orientation session</li>
              <li>• Start receiving volunteer opportunities in your area</li>
            </ul>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default VolunteerRegistration;