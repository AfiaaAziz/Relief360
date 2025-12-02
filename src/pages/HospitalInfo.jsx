import { 
  Hospital, 
  Heart, 
  Shield, 
  Clock, 
  //Stethoscope, 
  Ambulance,
  CheckCircle,
 // ArrowRight,
  Users,
  Phone,
  MapPin,
  Bed,
  Activity,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const HospitalInfo = () => {
  const features = [
    {
      icon: Activity,
      title: "Real-time Capacity Management",
      description: "Update bed availability, ICU capacity, and emergency room status in real-time"
    },
    {
      icon: Ambulance,
      title: "Ambulance Coordination",
      description: "Manage ambulance fleet, dispatch tracking, and emergency transport coordination"
    },
    {
      icon: Users,
      title: "Staff & Resource Tracking",
      description: "Monitor medical staff availability, equipment status, and resource allocation"
    },
    {
      icon: AlertCircle,
      title: "Emergency Notifications",
      description: "Receive instant alerts for mass casualty events and disaster situations"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Enhanced Preparedness",
      description: "Better coordination with emergency services and disaster response teams"
    },
    {
      icon: Clock,
      title: "Faster Response Times",
      description: "Direct communication channels reduce delays in emergency situations"
    },
    {
      icon: Heart,
      title: "Community Impact",
      description: "Contribute to your community's resilience and disaster preparedness"
    },
    {
      icon: CheckCircle,
      title: "Streamlined Operations",
      description: "Automated reporting and coordination reduce administrative burden"
    }
  ];

  const hospitalTypes = [
    {
      type: "General Hospitals",
      description: "Full-service medical facilities with emergency departments",
      capabilities: ["Emergency Medicine", "Surgery", "ICU", "Ambulance Services"]
    },
    {
      type: "Specialty Centers",
      description: "Specialized medical facilities (trauma centers, children's hospitals)",
      capabilities: ["Specialized Care", "Expert Staff", "Advanced Equipment", "Research Facilities"]
    },
    {
      type: "Urgent Care Centers",
      description: "Fast treatment for non-life-threatening emergencies",
      capabilities: ["Quick Treatment", "Extended Hours", "Minor Procedures", "Diagnostic Services"]
    },
    {
      type: "Mobile Medical Units",
      description: "Deployable medical support for disaster zones",
      capabilities: ["Rapid Deployment", "Field Medicine", "Triage Support", "Emergency Supplies"]
    }
  ];

  const exampleHospitals = [
    {
      name: "Central Medical Center",
      location: "Downtown District",
      capacity: { beds: 450, icu: 45, emergency: 25 },
      status: "Available",
      contact: "+1 (555) 123-4567",
      services: ["Trauma Center", "Cardiac Care", "Emergency Surgery"]
    },
    {
      name: "Regional Trauma Hospital",
      location: "North District",
      capacity: { beds: 280, icu: 30, emergency: 15 },
      status: "Limited",
      contact: "+1 (555) 987-6543",
      services: ["Level 1 Trauma", "Neurosurgery", "Burns Unit"]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Limited':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center">
              <Hospital className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900">Hospital</span>{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Partnership
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Join our network of healthcare providers committed to coordinated emergency response. 
              Strengthen your community's disaster preparedness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/hospital-registration" 
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                <Hospital className="h-5 w-5 mr-2" />
                Register Hospital
              </Link>
              <button className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                View Network
              </button>
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Platform Features for Hospitals
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive tools designed to help healthcare facilities manage capacity, 
                coordinate with emergency services, and respond effectively to disasters.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600 mt-4">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hospital Types */}
        <section className="py-20 bg-gray-100/50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                All Healthcare Facilities Welcome
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From large medical centers to specialized clinics, every healthcare provider 
                plays a vital role in emergency response.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {hospitalTypes.map((hospital, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{hospital.type}</h3>
                    <p className="text-gray-600 mb-4">
                      {hospital.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-gray-900">Key Capabilities:</h4>
                      <div className="flex flex-wrap gap-2">
                        {hospital.capabilities.map((capability, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs border border-gray-300 text-gray-700 rounded-md">
                            {capability}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Example Hospital Cards */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Example Hospital Profiles
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how hospitals in our network share their capacity and coordinate during emergencies.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {exampleHospitals.map((hospital, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{hospital.name}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-2" />
                          {hospital.location}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-4 w-4 mr-2" />
                          {hospital.contact}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(hospital.status)}`}>
                        {hospital.status}
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 rounded-lg bg-blue-50">
                          <div className="flex items-center justify-center mb-2">
                            <Bed className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="text-2xl font-bold text-blue-600">{hospital.capacity.beds}</div>
                          <div className="text-xs text-gray-600">Beds</div>
                        </div>
                        <div className="p-3 rounded-lg bg-red-50">
                          <div className="flex items-center justify-center mb-2">
                            <Activity className="h-4 w-4 text-red-600" />
                          </div>
                          <div className="text-2xl font-bold text-red-600">{hospital.capacity.icu}</div>
                          <div className="text-xs text-gray-600">ICU</div>
                        </div>
                        <div className="p-3 rounded-lg bg-yellow-50">
                          <div className="flex items-center justify-center mb-2">
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                          </div>
                          <div className="text-2xl font-bold text-yellow-600">{hospital.capacity.emergency}</div>
                          <div className="text-xs text-gray-600">Emergency</div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900 mb-2">Specialized Services:</h4>
                        <div className="flex flex-wrap gap-2">
                          {hospital.services.map((service, idx) => (
                            <span key={idx} className="px-2 py-1 text-xs border border-gray-300 text-gray-700 rounded-md">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-100/50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Benefits of Joining
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Enhance your hospital's emergency preparedness while contributing to community resilience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-green-500">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Strengthen Emergency Response
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join our network of healthcare providers committed to coordinated disaster response. 
              Together, we save lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/hospital-registration"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Hospital className="h-5 w-5 mr-2" />
                Register Your Hospital
              </Link>
              <Link to ="/contact">
              <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                <Phone className="h-5 w-5 mr-2" />
                Contact Support
              </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HospitalInfo;