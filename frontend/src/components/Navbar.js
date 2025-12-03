import React, { useState, useEffect } from "react";
import { Home, Info, Mail, Zap, Menu, X, Activity } from "lucide-react";

export default function Navbar({ currentPage, setCurrentPage, mobileMenuOpen, setMobileMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          {/* Logo */}
          <div className="nav-logo">
            <Activity size={32} />
            <span>YogaAI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links">
            <button
              onClick={() => setCurrentPage("home")}
              className={`nav-link ${currentPage === "home" ? "active" : ""}`}
            >
              <Home size={18} />
              Home
            </button>

            <button
              onClick={() => setCurrentPage("about")}
              className={`nav-link ${currentPage === "about" ? "active" : ""}`}
            >
              <Info size={18} />
              About
            </button>

            <button
              onClick={() => setCurrentPage("contact")}
              className={`nav-link ${currentPage === "contact" ? "active" : ""}`}
            >
              <Mail size={18} />
              Contact
            </button>

            <button
              onClick={() => setCurrentPage("detector")}
              className="nav-btn-primary"
            >
              <Zap size={18} />
              AI Pose Detector
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <button
          onClick={() => setCurrentPage("home")}
          className={`nav-link ${currentPage === "home" ? "active" : ""}`}
        >
          <Home size={18} />
          Home
        </button>

        <button
          onClick={() => setCurrentPage("about")}
          className={`nav-link ${currentPage === "about" ? "active" : ""}`}
        >
          <Info size={18} />
          About
        </button>

        <button
          onClick={() => setCurrentPage("contact")}
          className={`nav-link ${currentPage === "contact" ? "active" : ""}`}
        >
          <Mail size={18} />
          Contact
        </button>

        <button
          onClick={() => setCurrentPage("detector")}
          className="nav-btn-primary"
        >
          <Zap size={18} />
          AI Pose Detector
        </button>
      </div>
    </>
  );
}
