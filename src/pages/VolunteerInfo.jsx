import { 
  Users, 
  Heart, 
  Shield, 
  Clock, 
  Award,
  CheckCircle,
  Phone,
  Stethoscope,
  Truck,
  HardHat,
  MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const VolunteerInfo = () => {
  const roles = [
    {
      icon: Stethoscope,
      title: "Medical Response",
      description: "First aid, triage, medical support",
      skills: ["First Aid", "CPR", "Medical Training", "Trauma Care"],
      urgency: "Critical"
    },
    {
      icon: HardHat,
      title: "Search & Rescue",
      description: "Emergency evacuation and rescue operations",
      skills: ["Physical Fitness", "Navigation", "Rope Access", "Team Work"],
      urgency: "High"
    },
    {
      icon: Truck,
      title: "Logistics & Transport",
      description: "Resource delivery and transportation",
      skills: ["Driving License", "Local Knowledge", "Heavy Lifting", "Organization"],
      urgency: "Medium"
    },
    {
      icon: MessageCircle,
      title: "Communication",
      description: "Coordination and information management",
      skills: ["Communication", "Languages", "Tech Savvy", "Organization"],
      urgency: "Medium"
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Save Lives",
      description: "Make a direct impact in your community during critical moments"
    },
    {
      icon: Shield,
      title: "Professional Training",
      description: "Access to certified emergency response training programs"
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Official recognition and certificates for your service"
    },
    {
      icon: Users,
      title: "Community Network",
      description: "Connect with like-minded individuals committed to helping others"
    }
  ];

  const requirements = [
    "Minimum age of 18 years",
    "Background check completion",
    "Basic emergency response training",
    "Commitment to availability during emergencies",
    "Physical and mental fitness assessment",
    "Local area familiarity preferred"
  ];

  const stats = [
    { number: "1000+", label: "Active Volunteers", icon: Users },
    { number: "500+", label: "Lives Saved", icon: Heart },
    { number: "95%", label: "Response Rate", icon: CheckCircle },
    { number: "24/7", label: "Availability", icon: Clock }
  ];

  const getBadgeColor = (urgency) => {
    switch (urgency) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center">
              <Users className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900">Become a</span>{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Volunteer
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Join our network of dedicated volunteers and be the difference when disasters strike. 
              Your skills, your time, their hope.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/volunteer-register" 
                className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
              >
                <Users className="h-5 w-5 mr-2" />
                Join Now
              </Link>
              <button className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-100/50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Volunteer Roles */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Volunteer Roles
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find the role that matches your skills and availability. Every contribution matters.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {roles.map((role, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center">
                      <role.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-center text-gray-900 mb-2">{role.title}</h3>
                    <div className="flex justify-center mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getBadgeColor(role.urgency)}`}>
                        {role.urgency} Priority
                      </span>
                    </div>
                    <p className="text-gray-600 text-center mb-4">
                      {role.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-gray-900">Required Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {role.skills.map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs border border-gray-300 text-gray-700 rounded-md">
                            {skill}
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

        {/* Benefits Section */}
        <section className="py-20 bg-gray-100/50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Why Volunteer With Us?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Beyond the satisfaction of helping others, volunteering offers personal and professional benefits.
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

        {/* Requirements Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Requirements
              </h2>
              <p className="text-xl text-gray-600">
                To ensure the safety and effectiveness of our volunteer network.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Volunteer Requirements</h3>
                <div className="space-y-4">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-600">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-green-500">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Your community needs you. Join thousands of volunteers who are already making an impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/volunteer-register"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Users className="h-5 w-5 mr-2" />
                Register as Volunteer
              </Link>
              <Link to ="/contact" >
              <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                <Phone className="h-5 w-5 mr-2" />
                Contact Us
              </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VolunteerInfo;