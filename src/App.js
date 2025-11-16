import "./App.css";
import SafetyTips from "./pages/SafetyTips";
import Navbar from "./components/Navbar";
import ContactUs from "./pages/ContactUs";
import AboutPage from "./pages/About";
import VolunteerInfo from "./pages/VolunteerInfo";
import VolunteerRegister from "./components/VolunteerRegister";
import HowItWorks from "./pages/HowItWorks";
import HospitalInfo from "./pages/HospitalInfo";
import HospitalRegistration from "./components/HospitalRegistration";
import ReportIncident from "./pages/ReportIncident";
import SignIn from "./pages/SignIn";
import HomePage from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/safety" element={<SafetyTips />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/volunteer-info" element={<VolunteerInfo />} />
          <Route path="/volunteer-register" element={<VolunteerRegister />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/hospital-info" element={<HospitalInfo />} />
          <Route path="/hospital-registration" element={<HospitalRegistration />} />
          <Route path="/report-incident" element={<ReportIncident />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
