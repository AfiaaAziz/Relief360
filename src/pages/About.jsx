import React from "react";
import { Shield, Users, Target, Heart, Zap } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "Every decision we make prioritizes the safety and well-being of our communities."
    },
    {
      icon: Zap,
      title: "Rapid Response",
      description: "Time is critical in emergencies. We've built our system for speed and efficiency."
    },
    {
      icon: Heart,
      title: "Compassion",
      description: "We understand that disasters affect real people with real stories and needs."
    },
    {
      icon: Users,
      title: "Unity",
      description: "Bringing together diverse stakeholders to work toward a common goal of safety."
    }
  ];

  const Accordion = ({ children, type = "single", collapsible = true, className = "" }) => {
    return (
      <div className={`space-y-4 ${className}`}>
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, {
            isSingle: type === "single",
            collapsible,
            index
          });
        })}
      </div>
    );
  };

  const AccordionItem = ({ children, value, className = "", isSingle, collapsible, index }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className={`bg-white border border-gray-200 rounded-lg ${className}`}>
        {React.Children.map(children, child => {
          if (child.type === AccordionTrigger) {
            return React.cloneElement(child, {
              onClick: () => setIsOpen(!isOpen),
              isOpen,
              value
            });
          }
          if (child.type === AccordionContent) {
            return isOpen ? child : null;
          }
          return child;
        })}
      </div>
    );
  };

  const AccordionTrigger = ({ children, onClick, isOpen, className = "" }) => {
    return (
      <button
        onClick={onClick}
        className={`w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors ${className}`}
      >
        <span className="text-lg font-semibold text-gray-900">{children}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    );
  };

  const AccordionContent = ({ children, className = "" }) => {
    return (
      <div className={`px-6 pb-6 text-gray-600 ${className}`}>
        {children}
      </div>
    );
  };

  const Card = ({ children, className = "" }) => {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
        {children}
      </div>
    );
  };

  const CardHeader = ({ children, className = "" }) => {
    return (
      <div className={`p-6 ${className}`}>
        {children}
      </div>
    );
  };

  const CardTitle = ({ children, className = "" }) => {
    return (
      <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
        {children}
      </h3>
    );
  };

  const CardDescription = ({ children, className = "" }) => {
    return (
      <p className={`text-sm text-gray-600 ${className}`}>
        {children}
      </p>
    );
  };

  const CardContent = ({ children, className = "" }) => {
    return (
      <div className={`p-6 pt-0 ${className}`}>
        {children}
      </div>
    );
  };

  const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
      default: "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500",
      emergency: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };

    const sizes = {
      default: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base"
    };

    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };



  return (
    <div className="min-h-screen bg-white">
      <main>
        <section className="py-20 bg-gradient-to-br from-blue-50 to-gray-100">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900">About</span>{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Relief-360</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We're building the future of disaster management through technology,
              connecting communities when they need it most.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  To create a comprehensive, technology-driven platform that connects citizens,
                  volunteers, hospitals, and emergency responders in real-time during disasters.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  We believe that effective disaster management requires seamless coordination
                  between all stakeholders. Our platform bridges communication gaps, optimizes
                  resource allocation, and ensures that help reaches those who need it most, as quickly as possible.
                </p>
              
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 rounded-lg bg-blue-50">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                  <div className="text-sm text-gray-600">Lives Protected</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-purple-50">
                  <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
                  <div className="text-sm text-gray-600">Active Volunteers</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-green-50">
                  <div className="text-3xl font-bold text-green-600 mb-2">100+</div>
                  <div className="text-sm text-gray-600">Partner Hospitals</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-orange-50">
                  <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-600">Response Time</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do and every decision we make.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 text-center">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{value.description}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Why This Platform?
              </h2>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Communication Breakdown</h3>
                  <p className="text-gray-600">
                    During disasters, traditional communication channels often fail or become overwhelmed,
                    leaving communities isolated and unable to coordinate effective responses.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Resource Misallocation</h3>
                  <p className="text-gray-600">
                    Without real-time visibility into available resources and needs, emergency responses
                    can be inefficient, with some areas over-served while others are neglected.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Volunteer Coordination</h3>
                  <p className="text-gray-600">
                    Willing volunteers often don't know where they're needed most or how to help effectively,
                    leading to wasted goodwill and missed opportunities to save lives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                FAQs
              </h2>
              <p className="text-xl text-gray-600">
                Find answers to common questions about disaster preparedness and platform usage
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="px-6">
                <AccordionTrigger>
                  What is disaster recovery?
                </AccordionTrigger>
                <AccordionContent>
                  Disaster recovery refers to the process of restoring systems, data, and infrastructure after a disaster, ensuring continuity of operations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="px-6">
                <AccordionTrigger>
                  How to prepare for disasters?
                </AccordionTrigger>
                <AccordionContent>
                  Disaster preparedness involves creating an emergency plan, assembling a disaster supply kit, and staying informed about potential risks in your area.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="px-6">
                <AccordionTrigger>
                  How can I contribute?
                </AccordionTrigger>
                <AccordionContent>
                  You can contribute by donating to disaster relief efforts, volunteering your time and skills, and spreading awareness about the platform to help more people stay safe during disasters.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="px-6">
                <AccordionTrigger>
                  Is the platform free?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, the platform is free to use for both community members and emergency responders. We believe in providing accessible tools for disaster management.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="px-6">
                <AccordionTrigger>
                  How can I sign up?
                </AccordionTrigger>
                <AccordionContent>
                  To sign up, simply visit our website and follow the registration process. It only takes a few minutes.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;