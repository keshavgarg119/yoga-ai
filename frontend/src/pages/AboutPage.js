import React from "react";
import { Heart, Users, Target, Award } from "lucide-react";

export default function AboutPage() {
  const highlights = [
    { icon: Heart, title: "Wellness First", desc: "Prioritizing your health and safety" },
    { icon: Users, title: "For Everyone", desc: "Beginners to advanced practitioners" },
    { icon: Target, title: "Precision AI", desc: "Advanced pose detection technology" },
    { icon: Award, title: "Proven Results", desc: "Improve your practice effectively" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", paddingTop: "120px" }}>
      <div className="glass-card" style={{ maxWidth: "900px", width: "100%" }}>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1.5rem", textAlign: "center" }}>
          About YogaAI
        </h2>

        <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", lineHeight: "1.8" }}>
          YogaAI combines cutting-edge artificial intelligence with deep yoga knowledge to help practitioners
          of all levels improve their form, prevent injuries, and deepen their practice.
        </p>

        <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", lineHeight: "1.8" }}>
          Our real-time pose detection technology analyzes your body positioning and provides instant feedback,
          helping you maintain correct posture and alignment throughout your practice.
        </p>

        <p style={{ fontSize: "1.1rem", marginBottom: "2.5rem", lineHeight: "1.8" }}>
          Whether you're a beginner just starting your yoga journey or an experienced yogi looking to refine
          your technique, YogaAI is your personal digital yoga assistant, available anytime, anywhere.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginTop: "2rem" }}>
          {highlights.map((item, i) => (
            <div
              key={i}
              className="slide-up"
              style={{
                textAlign: "center",
                padding: "1.5rem",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transition: "all 0.3s ease",
                animationDelay: `${i * 0.1}s`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              }}
            >
              <item.icon size={36} style={{ color: "rgba(255, 143, 177, 0.9)", margin: "0 auto 0.75rem" }} />
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", fontWeight: "600" }}>{item.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
