import React, { useState } from "react";

const AboutPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is disaster recovery?",
      answer: "Disaster recovery refers to the process of restoring systems, data, and infrastructure after a disaster, ensuring continuity of operations.",
      subQuestions: [
        {
          question: "How to prepare for disasters?",
          answer: "Disaster preparedness involves creating an emergency plan, assembling a disaster supply kit, and staying informed about potential risks in your area."
        },
        {
          question: "How can I contribute?",
          answer: "You can contribute by donating to disaster relief efforts, volunteering your time and skills, and spreading awareness about the platform to help more people stay safe during disasters."
        }
      ]
    },
    {
      question: "Is the platform free?",
      answer: "Yes, the platform is free to use for both community members and emergency responders. We believe in providing accessible tools for disaster management."
    },
    {
      question: "How can I sign up?",
      answer: "To sign up, simply visit our website and follow the registration process. It only takes a few minutes."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              About Relief-360
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We're building the future of disaster management through
              technology, connecting communities when they need it most.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">
              Our Mission
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  To create a comprehensive, technology-driven platform that
                  connects citizens, volunteers, hospitals, and emergency
                  responders in real-time during disasters.
                </p>
                <p className="text-lg text-gray-700">
                  We believe that effective disaster management requires
                  seamless coordination between all stakeholders. Our platform
                  bridges communication gaps, optimizes resource allocation, and
                  ensures that help reaches those who need it most, as quickly
                  as possible.
                </p>
              </div>
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4">
                    <div className="text-2xl font-bold text-blue-800 mb-2">
                      50K+
                    </div>
                    <div className="text-gray-600">Lives Protected</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-2xl font-bold text-blue-800 mb-2">
                      1000+
                    </div>
                    <div className="text-gray-600">Active Workforce</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-2xl font-bold text-blue-800 mb-2">
                      100+
                    </div>
                    <div className="text-gray-600">Partner Insights</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-2xl font-bold text-blue-800 mb-2">
                      24/7
                    </div>
                    <div className="text-gray-600">Response Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">
              Our Values
            </h2>
            <p className="text-lg text-gray-700 text-center mb-12 max-w-2xl mx-auto">
              The principles that guide everything we do and every decision we
              make.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-3">
                  Safety First
                </h3>
                <p className="text-gray-600">
                  Every decision we make prioritizes the safety and well-being
                  of our communities.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-3">
                  Rapid Response
                </h3>
                <p className="text-gray-600">
                  Time is critical in emergencies. We prioritize speed and
                  efficiency in all our operations.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-3">
                  Compassion
                </h3>
                <p className="text-gray-600">
                  We recognize that disasters affect real people with real
                  stories and needs.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-3">Unity</h3>
                <p className="text-gray-600">
                  Working together enables us to achieve our common goal of
                  community safety.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">
              Why This Platform?
            </h2>

            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-bold text-blue-700 mb-2">
                    1. Communication Breakdown
                  </h3>
                </div>
                <div className="md:w-2/3">
                  <p className="text-gray-700">
                    During disasters, traditional communication channels often
                    fail or become overwhelmed, leaving communities isolated and
                    unable to coordinate effective responses.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-bold text-blue-700 mb-2">
                    2. Resource Misallocation
                  </h3>
                </div>
                <div className="md:w-2/3">
                  <p className="text-gray-700">
                    Without real-time visibility into available resources and
                    needs, emergency responses can be inefficient, with some
                    areas over-supplied while others are neglected.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-bold text-blue-700 mb-2">
                    3. Volunteer Coordination
                  </h3>
                </div>
                <div className="md:w-2/3">
                  <p className="text-gray-700">
                    Willing volunteers often don't know where they're needed
                    most or how to help effectively, leading to wasted goodwill
                    and missed opportunities to save lives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-blue-900 mb-4 text-center">
              FAQs
            </h2>
            <p className="text-lg text-gray-700 text-center mb-12">
              Find answers to common questions about disaster preparedness and
              platform usage
            </p>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className="w-full flex justify-between items-center p-6 text-left hover:bg-blue-50 transition-colors duration-200"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="text-xl font-semibold text-blue-800 pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                      <div className={`transform transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : 'rotate-0'
                      }`}>
                        <svg 
                          className="w-5 h-5 text-blue-600" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M19 9l-7 7-7-7" 
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                  
                  <div className={`transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}>
                    <div className="p-6 bg-blue-50 border-t border-gray-200">
                      <p className="text-gray-700 mb-4">{faq.answer}</p>
                      
                      {faq.subQuestions && (
                        <div className="ml-4 space-y-4">
                          {faq.subQuestions.map((subFaq, subIndex) => (
                            <div key={subIndex}>
                              <h4 className="text-lg font-semibold text-blue-700 mb-2">
                                {subFaq.question}
                              </h4>
                              <p className="text-gray-600">
                                {subFaq.answer}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">
                Still Have Questions?
              </h3>
              <p className="text-gray-700 mb-6">
                Contact us for further assistance
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;