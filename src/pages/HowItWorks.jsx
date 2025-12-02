import {Link} from "react-router-dom";
import { 
  AlertTriangle, 
  UserCheck, 
  Users, 
  Hospital, 
  CheckCircle,
 // ArrowRight,
  MapPin,
  Clock,
  Shield
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      icon: AlertTriangle,
      title: "Incident Reported",
      description: "Citizens quickly report disasters with location, photos, and details through our easy-to-use platform.",
      details: ["Real-time location tracking", "Photo/video evidence", "Severity assessment", "Instant verification"]
    },
    {
      step: 2,
      icon: UserCheck,
      title: "Admin Assessment",
      description: "Emergency coordinators receive instant alerts and assess the situation for appropriate response.",
      details: ["Automated severity analysis", "Resource requirement estimation", "Response team selection", "Priority assignment"]
    },
    {
      step: 3,
      icon: Users,
      title: "Volunteer Deployment",
      description: "Qualified volunteers are notified and deployed based on skills, location, and availability.",
      details: ["Skill-based matching", "Proximity calculation", "Availability confirmation", "Task assignment"]
    },
    {
      step: 4,
      icon: Hospital,
      title: "Hospital Coordination",
      description: "Nearby hospitals are notified and share real-time capacity and resource availability.",
      details: ["Bed availability updates", "Ambulance dispatch", "Medical supply status", "Emergency contacts"]
    },
    {
      step: 5,
      icon: CheckCircle,
      title: "Resolution & Follow-up",
      description: "Incident resolution is tracked, documented, and analyzed for future improvements.",
      details: ["Status updates", "Resource utilization", "Performance metrics", "Lessons learned"]
    }
  ];

  const features = [
    {
      icon: MapPin,
      title: "Real-time Location",
      description: "GPS-enabled incident reporting and resource tracking"
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Continuous system monitoring and instant alert notifications"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900">How It</span>{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Works
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              A streamlined 5-step process that connects all stakeholders for rapid, 
              coordinated emergency response.
            </p>
            <Link to="/report-incident">
            <button className="inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Start Emergency Report
            </button>
            </Link>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="space-y-16">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {index < steps.length - 1 && (
  <div
    className={`hidden lg:block absolute top-32 w-px h-16 bg-gradient-to-b
      from-blue-600 to-blue-600/20 
      ${index % 2 === 0 ? 'left-[95%]' : 'right-[95%]'}
    `}
  ></div>
)}
                  
                  <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                    <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center">
                              <step.icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                              {step.step}
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                          <p className="text-lg text-gray-600 mb-6">
                            {step.description}
                          </p>
                          <ul className="space-y-2">
                            {step.details.map((detail, idx) => (
                              <li key={idx} className="flex items-center text-gray-600">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`text-center ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                      <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-600/10 to-green-500/10 flex items-center justify-center mb-6">
                        <step.icon className="h-16 w-16 text-blue-600" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        Step {step.step}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20 bg-gray-100/50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Key Features
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Advanced technology powering every step of the emergency response process.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join our network of citizens, volunteers, and organizations working together 
              to create safer, more resilient communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/report-incident">
              <button className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Report Emergency
              </button>
              </Link>
              <Link to="/volunteer-register">
              <button className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
                <Users className="h-5 w-5 mr-2" />
                Become a Volunteer
              </button>
              </Link>
              <Link to="/hospital-registration">
              <button className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                <Hospital className="h-5 w-5 mr-2" />
                Register Hospital
              </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HowItWorks;