import "./App.css";
import SafetyTips from "./pages/SafetyTips";
import Navbar from "./components/Navbar";
import ContactUs from "./pages/ContactUs";
import AboutPage from "./pages/About";

import HomePage from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/safety" element={<SafetyTips />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
