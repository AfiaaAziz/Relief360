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

// Volunteer Dashboard Pages
import VolunteerDashboard from "./pages/volunteer/VolunteerDashboard";
import Assignments from "./pages/volunteer/Assignments";
import Donations from "./pages/volunteer/Donations";
import EmergencyPlans from "./pages/volunteer/EmergencyPlans";
import Profile from "./pages/volunteer/Profile";
import VolunteerHospitals from "./pages/volunteer/VolunteerHospitals";

// Citizen Dashboard Pages
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import CitizenReportIncident from "./pages/citizen/ReportIncident";
import EmergencyContacts from "./pages/citizen/EmergencyContacts";
import CitizenSafetyTips from "./pages/citizen/SafetyTips";
import Hospitals from "./pages/citizen/Hospitals";
import MyIncidents from "./pages/citizen/MyIncidents";
import Feedback from "./pages/citizen/Feedback";

// Profile page without layout

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
                <Route
                  path="/volunteer-register"
                  element={<VolunteerRegister />}
                />
                <Route path="/hospital-info" element={<HospitalInfo />} />
                <Route
                  path="/hospital-registration"
                  element={<HospitalRegistration />}
                />
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

                {/* Catch all for admin routes */}
                <Route path="*" element={<Navigate to="/admin-dashboard" />} />
              </Routes>
            </DashboardLayout>
          }
        />

        {/* VOLUNTEER DASHBOARD ROUTES */}
        <Route
          path="/volunteer-dashboard/*"
          element={
            <DashboardLayout role="volunteer" key="volunteer-layout">
              <Routes>
                <Route index element={<VolunteerDashboard />} />
                <Route path="assignments" element={<Assignments />} />
                <Route path="donations" element={<Donations />} />
                <Route path="emergency-plans" element={<EmergencyPlans />} />
                <Route path="hospitals" element={<VolunteerHospitals />} />
                <Route path="profile" element={<Profile />} />

                {/* Catch all for volunteer routes */}
                <Route
                  path="*"
                  element={<Navigate to="/volunteer-dashboard" />}
                />
              </Routes>
            </DashboardLayout>
          }
        />

        {/* CITIZEN DASHBOARD ROUTES */}
        <Route
          path="/citizen-dashboard/*"
          element={
            <DashboardLayout role="citizen" key="citizen-layout">
              <Routes>
                <Route index element={<CitizenDashboard />} />
                <Route path="report" element={<CitizenReportIncident />} />
                <Route path="contacts" element={<EmergencyContacts />} />

                <Route path="safety" element={<CitizenSafetyTips />} />
                <Route path="hospitals" element={<Hospitals />} />
                <Route path="incidents" element={<MyIncidents />} />
                <Route path="feedback" element={<Feedback />} />

                {/* Catch all for citizen routes */}
                <Route
                  path="*"
                  element={<Navigate to="/citizen-dashboard" />}
                />
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
