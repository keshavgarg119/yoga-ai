import React from "react";
import { Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          <Activity size={28} style={{ color: "rgba(255, 143, 177, 0.9)" }} />
          <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>YogaAI</span>
        </div>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          © 2025 YogaAI — Elevate Your Practice with AI
        </p>
      </div>
    </footer>
  );
}
