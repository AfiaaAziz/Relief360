
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import SafetyTips from "./pages/SafetyTips";
import ContactUs from "./pages/ContactUs";
import HowItWorks from "./pages/HowItWorks";
import VolunteerInfo from "./pages/VolunteerInfo";
import HospitalInfo from "./pages/HospitalInfo";
import ReportIncident from "./pages/ReportIncident";
import SignIn from "./pages/SignIn";

// Components
import Navbar from "./components/Navbar";
import VolunteerRegister from "./components/VolunteerRegister";
import HospitalRegistration from "./components/HospitalRegistration";

// Admin Dashboard Pages
import AdminDashboard from "./pages/admin/dashboard";
import Analytics from "./pages/admin/Analytics";
import ManageCitizens from "./pages/admin/ManageCitizens";
import ManageDonations from "./pages/admin/ManageDonations";
import ManageFeedback from "./pages/admin/ManageFeedback";
import ManageHospitals from "./pages/admin/ManageHospitals";
import ManageIncidents from "./pages/admin/ManageIncidents";
import ManageVolunteers from "./pages/admin/ManageVolunteers";








// Layout
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All Public Pages – Show Navbar */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/safety" element={<SafetyTips />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/volunteer-info" element={<VolunteerInfo />} />
                <Route path="/volunteer-register" element={<VolunteerRegister />} />
                <Route path="/hospital-info" element={<HospitalInfo />} />
                <Route path="/hospital-registration" element={<HospitalRegistration />} />
                <Route path="/report-incident" element={<ReportIncident />} />
                <Route path="/sign-in" element={<SignIn />} />
                
                {/* Catch all - redirect to home */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </>
          }
        />

        {/* ADMIN DASHBOARD ROUTES - FIXED STRUCTURE */}
        <Route
          path="/admin-dashboard/*"
          element={
            <DashboardLayout role="admin">
              <Routes>
                <Route index element={<AdminDashboard />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="citizens" element={<ManageCitizens />} />
                <Route path="donations" element={<ManageDonations />} />
                <Route path="feedback" element={<ManageFeedback />} />
                <Route path="hospitals" element={<ManageHospitals />} /> 
                <Route path="incidents" element={<ManageIncidents />} />
                <Route path="volunteers" element={<ManageVolunteers />} />
                
                {/* Add placeholder routes for other dashboard items */}
                <Route path="incidents" element={
                  <div className="p-6">
                    <h1 className="text-3xl font-bold">Manage Incidents</h1>
                    <p className="text-gray-600 mt-2">Page under construction</p>
                  </div>
                } />
                <Route path="citizens" element={
                  <div className="p-6">
                    <h1 className="text-3xl font-bold">Manage Citizens</h1>
                    <p className="text-gray-600 mt-2">Page under construction</p>
                  </div>
                } />
                <Route path="volunteers" element={
                  <div className="p-6">
                    <h1 className="text-3xl font-bold">Manage Volunteers</h1>
                    <p className="text-gray-600 mt-2">Page under construction</p>
                  </div>
                } />
                <Route path="hospitals" element={
                  <div className="p-6">
                    <h1 className="text-3xl font-bold">Manage Hospitals</h1>
                    <p className="text-gray-600 mt-2">Page under construction</p>
                  </div>
                } />
                <Route path="donations" element={
                  <div className="p-6">
                    <h1 className="text-3xl font-bold">Donations</h1>
                    <p className="text-gray-600 mt-2">Page under construction</p>
                  </div>
                } />
                <Route path="feedback" element={
                  <div className="p-6">
                    <h1 className="text-3xl font-bold">Feedback</h1>
                    <p className="text-gray-600 mt-2">Page under construction</p>
                  </div>
                } />
                
                {/* Catch all for admin routes */}
                <Route path="*" element={<Navigate to="/admin-dashboard" />} />
              </Routes>
            </DashboardLayout>
          }
        />
        
        {/* Global catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;