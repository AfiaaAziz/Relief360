// import React from "react";
// import { AlertTriangle } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 md:px-12">
//         <div className="flex justify-between items-center h-16">

//           <div className="flex items-center gap-2">
//             <div className="w-40 h-10 rounded-md bg-gradient-to-r from-purple-500 to-red-500 flex items-center justify-center">
//               <span className="text-white font-bold text-lg">Relief-360</span>
//             </div>
//           </div>

//           <div className="hidden md:flex space-x-6 font-medium text-gray-700">
//             <Link to="/about" className="hover:text-gray-900 transition">
//               About
//             </Link>

//             <Link to="/how-it-works" className="hover:text-gray-900 transition">
//               How It Works
//             </Link>

//             <Link to="/safety" className="hover:text-gray-900 transition">
//               Safety Tips
//             </Link>

//             <Link to="/volunteer-info" className="hover:text-gray-900 transition">
//               Volunteer
//             </Link>

//             <Link to="/hospital-info" className="hover:text-gray-900 transition">
//               Hospital
//             </Link>

//             <Link to="/contact" className="hover:text-gray-900 transition">
//               Contact
//             </Link>
//           </div>

//           <div className="flex items-center gap-4">
//             <Link to="/sign-in">
//             <button className="px-4 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
//               Sign In
//             </button>
//             </Link>

//            <Link 
//   to="/report-incident" 
//   className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition"
// >
//   <AlertTriangle className="w-4 h-4" /> 
//   Report Emergency
// </Link>
//           </div>

//         </div>
//       </div>
//     </nav>
//   );
// }
import React from "react";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-40 h-10 rounded-md bg-gradient-to-r from-purple-500 to-red-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Relief-360</span>
            </div>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex space-x-6 font-medium text-gray-700">
            <Link to="/about" className="hover:text-gray-900 transition">
              About
            </Link>
            <Link to="/how-it-works" className="hover:text-gray-900 transition">
              How It Works
            </Link>
            <Link to="/safety" className="hover:text-gray-900 transition">
              Safety Tips
            </Link>
            <Link to="/volunteer-info" className="hover:text-gray-900 transition">
              Volunteer
            </Link>
            <Link to="/hospital-info" className="hover:text-gray-900 transition">
              Hospital
            </Link>
            <Link to="/contact" className="hover:text-gray-900 transition">
              Contact
            </Link>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-4">
            {/* Sign In */}
            <Link to="/sign-in">
              <button className="px-4 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                Sign In
              </button>
            </Link>

            {/* Report Emergency */}
            <Link
              to="/report-incident"
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition"
            >
              <AlertTriangle className="w-4 h-4" />
              Report Emergency
            </Link>

            {/* NEW: Admin Panel Button */}
            <Link
              to="/admin-dashboard"
              className="flex items-center gap-2 px-5 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:from-purple-700 hover:to-pink-700 transition shadow-lg transform hover:scale-105"
            >
              Admin Panel
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}