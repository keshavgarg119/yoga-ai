import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import DetectorPage from "./pages/DetectorPage";
import "./App.css";

function AppContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get current page from URL path
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    if (path === "/about") return "about";
    if (path === "/contact") return "contact";
    if (path === "/detector") return "detector";
    return "home";
  };

  const currentPage = getCurrentPage();

  // Navigation handler
  const setCurrentPage = (page) => {
    setMobileMenuOpen(false);
    switch (page) {
      case "home":
        navigate("/");
        break;
      case "about":
        navigate("/about");
        break;
      case "contact":
        navigate("/contact");
        break;
      case "detector":
        navigate("/detector");
        break;
      default:
        navigate("/");
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="main-wrapper page-transition">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <Routes>
        <Route path="/" element={<HomePage setCurrentPage={setCurrentPage} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/detector" element={<DetectorPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AppContent />
    </Router>
  );
}

export default App;
