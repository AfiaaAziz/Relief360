import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">


      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Relief-360
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-lg">
              Connecting citizens, volunteers, hospitals, and emergency responders in real-time to save lives and manage disasters effectively.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
                Report Emergency
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
                Join as Volunteer
              </button>
            </div>
          </div>

          <div className="md:w-1/2 grid grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-blue-800 mb-2">24/7</div>
              <div className="text-gray-600">Emergency Response</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-blue-800 mb-2">1000+</div>
              <div className="text-gray-600">Active Volunteers</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-blue-800 mb-2">50+</div>
              <div className="text-gray-600">Partner Hospitals</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-blue-800 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default HomePage;