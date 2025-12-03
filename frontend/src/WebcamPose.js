import React, { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { predictPose } from "./api";

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

// helper: convert webcam screenshot to file object
function dataURLtoFile(dataUrl, filename) {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export default function WebcamPose() {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [pose, setPose] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [error, setError] = useState(null);
  const [liveMode, setLiveMode] = useState(false);
  const intervalRef = useRef(null);

  const analyzeFrame = useCallback(async () => {
    if (!webcamRef.current) return;

    const screenshot = webcamRef.current.getScreenshot();
    if (!screenshot) return;

    const file = dataURLtoFile(screenshot, "frame.png");

    try {
      setLoading(true);
      const result = await predictPose(file);
      setPose(result.pose);
      setConfidence(result.confidence);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("🚨 Could not analyze pose.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Run every 2 seconds when live mode is ON
  useEffect(() => {
    if (liveMode) {
      intervalRef.current = setInterval(() => {
        analyzeFrame();
      }, 2000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [liveMode, analyzeFrame]);

  return (
    <div style={{ textAlign: "center" }}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
        style={{ borderRadius: "10px", border: "2px solid #444" }}
      />

      <div style={{ marginTop: "15px" }}>
        <button onClick={analyzeFrame} disabled={loading}>
          {loading ? "Analyzing..." : "📸 Capture & Analyze"}
        </button>

        <button
          style={{
            marginLeft: "10px",
            backgroundColor: liveMode ? "#ff6b6b" : "#4CAF50",
            color: "white",
          }}
          onClick={() => setLiveMode((prev) => !prev)}
        >
          {liveMode ? "⛔ Stop Live Mode" : "▶ Start Live Mode"}
        </button>
      </div>

      {pose && (
        <div style={{ marginTop: "10px" }}>
          <h3>Detected Pose: 🧘‍♂️ {pose}</h3>
          <p>Confidence: {confidence.toFixed(2)}%</p>

          <p>
            {confidence > 80
              ? "🔥 Excellent! Your form looks correct!"
              : confidence > 60
              ? "🙂 Good, but you can adjust posture slightly."
              : "⚠ Posture seems incorrect — adjust and retry."}
          </p>
        </div>
      )}

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
      )}
    </div>
  );
}
