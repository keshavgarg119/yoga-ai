import React, { useState } from "react";
import { Send } from "lucide-react";

export default function ContactPage() {
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setData({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", paddingTop: "120px" }}>
      <div className="glass-card" style={{ maxWidth: "600px", width: "100%" }}>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem", textAlign: "center" }}>
          Contact Us
        </h2>

        <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "2rem", fontSize: "1.05rem" }}>
          Have questions or feedback? We'd love to hear from you!
        </p>

        <form onSubmit={submit}>
          <input
            className="input"
            placeholder="Your Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />

          <input
            className="input"
            type="email"
            placeholder="Your Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />

          <textarea
            className="input"
            rows="5"
            placeholder="Your Message"
            value={data.message}
            onChange={(e) => setData({ ...data, message: e.target.value })}
            required
          />

          {submitted && (
            <div className="success-box" style={{ marginBottom: "1rem" }}>
              <p style={{ margin: 0, fontSize: "1rem", color: "#d1fae5" }}>
                ✓ Thank you for your message! We'll get back to you soon.
              </p>
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem"
            }}
          >
            <Send size={20} />
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
