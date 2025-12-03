import React from "react";
import { Camera, CheckCircle, Activity } from "lucide-react";

export default function HomePage({ setCurrentPage }) {
  const features = [
    { icon: Camera, title: "Real-time Analysis", desc: "Instant feedback on your poses" },
    { icon: CheckCircle, title: "Accurate Detection", desc: "AI-powered precision" },
    { icon: Activity, title: "Track Progress", desc: "Monitor your improvement" },
  ];

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Master Your Yoga Practice</h1>

        <p className="hero-subtitle">
          AI-powered pose detection to perfect your form and enhance your wellness journey
        </p>

        <div className="hero-buttons">
          <button
            onClick={() => setCurrentPage("detector")}
            className="cta-btn"
          >
            Try AI Detector
          </button>

          <button
            onClick={() => setCurrentPage("about")}
            className="cta-btn-secondary"
          >
            Learn More
          </button>
        </div>

        <div className="feature-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
              <f.icon className="feature-icon" size={48} />
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>{f.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
