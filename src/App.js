import "./App.css";
import SafetyTips from "./pages/SafetyTips";
import Navbar from "./components/Navbar";
import ContactUs from "./pages/ContactUs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="App">
        <Routes>
          <Route path="/safety" element={<SafetyTips />} />
        </Routes>
        <Routes>
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
