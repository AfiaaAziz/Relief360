import React from "react";
import { Shield, Users, Heart, Zap } from "lucide-react";
import volunteerNetworkImage from "../assets/images/volunteer-network.png";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description:
        "Every decision we make prioritizes the safety and well-being of our communities.",
    },
    {
      icon: Zap,
      title: "Rapid Response",
      description:
        "Time is critical in emergencies. We've built our system for speed and efficiency.",
    },
    {
      icon: Heart,
      title: "Compassion",
      description:
        "We understand that disasters affect real people with real stories and needs.",
    },
    {
      icon: Users,
      title: "Unity",
      description:
        "Bringing together diverse stakeholders to work toward a common goal of safety.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <main>
        <section className="py-20 bg-gradient-to-br from-blue-50 to-gray-100">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900">About</span>{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Relief-360
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We're building the future of disaster management through
              technology, connecting communities when they need it most.
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
                  To create a comprehensive, technology-driven platform that
                  connects citizens, volunteers, hospitals, and emergency
                  responders in real-time during disasters.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  We believe that effective disaster management requires
                  seamless coordination between all stakeholders. Our platform
                  bridges communication gaps, optimizes resource allocation, and
                  ensures that help reaches those who need it most, as quickly
                  as possible.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 rounded-lg bg-blue-50">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    50K+
                  </div>
                  <div className="text-sm text-gray-600">Lives Protected</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-purple-50">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    1000+
                  </div>
                  <div className="text-sm text-gray-600">Active Volunteers</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-green-50">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    100+
                  </div>
                  <div className="text-sm text-gray-600">Partner Hospitals</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-orange-50">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600">Response Time</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  Our Community
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We're powered by passionate volunteers and professionals who
                  believe in making a difference. Our diverse community comes
                  together to provide rapid response and support during
                  disasters.
                </p>
                <p className="text-lg text-muted-foreground">
                  From first responders to medical professionals, from logistics
                  experts to compassionate volunteers - everyone plays a vital
                  role in our mission to save lives and rebuild communities.
                </p>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={volunteerNetworkImage}
                  alt="Diverse volunteers working together during disaster relief"
                  className="w-full h-full object-cover"
                />
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
                The principles that guide everything we do and every decision we
                make.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card
                    key={index}
                    className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 text-center"
                  >
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
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    Communication Breakdown
                  </h3>
                  <p className="text-gray-600">
                    During disasters, traditional communication channels often
                    fail or become overwhelmed, leaving communities isolated and
                    unable to coordinate effective responses.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    Resource Misallocation
                  </h3>
                  <p className="text-gray-600">
                    Without real-time visibility into available resources and
                    needs, emergency responses can be inefficient, with some
                    areas over-served while others are neglected.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    Volunteer Coordination
                  </h3>
                  <p className="text-gray-600">
                    Willing volunteers often don't know where they're needed
                    most or how to help effectively, leading to wasted goodwill
                    and missed opportunities to save lives.
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
                Find answers to common questions about disaster preparedness and
                platform usage
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  What is disaster recovery?
                </h3>
                <p className="text-gray-600">
                  Disaster recovery refers to the process of restoring systems,
                  data, and infrastructure after a disaster, ensuring continuity
                  of operations.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  How to prepare for disasters?
                </h3>
                <p className="text-gray-600">
                  Disaster preparedness involves creating an emergency plan,
                  assembling a disaster supply kit, and staying informed about
                  potential risks in your area.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  How can I contribute?
                </h3>
                <p className="text-gray-600">
                  You can contribute by donating to disaster relief efforts,
                  volunteering your time and skills, and spreading awareness
                  about the platform to help more people stay safe during
                  disasters.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  Is the platform free?
                </h3>
                <p className="text-gray-600">
                  Yes, the platform is free to use for both community members
                  and emergency responders. We believe in providing accessible
                  tools for disaster management.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  How can I sign up?
                </h3>
                <p className="text-gray-600">
                  To sign up, simply visit our website and follow the
                  registration process. It only takes a few minutes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
