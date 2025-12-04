import React, { useState, useRef, useEffect } from "react";
import { Upload, Camera, CheckCircle } from "lucide-react";
import { predictPose } from "../api";

export default function DetectorPage() {
  const [mode, setMode] = useState("upload"); // 'upload' | 'webcam'
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [webcamActive, setWebcamActive] = useState(false);
  const [webcamStream, setWebcamStream] = useState(null);
  const [liveMode, setLiveMode] = useState(false);
  const intervalRef = useRef(null);

  // Attach stream to video element when it becomes available
  useEffect(() => {
    if (webcamActive && webcamStream && videoRef.current) {
      videoRef.current.srcObject = webcamStream;
    }
  }, [webcamActive, webcamStream]);

  // -------------------------------
  // FILE UPLOAD HANDLER
  // -------------------------------

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setPrediction(null);
    setError(null);
  };

  const handlePredict = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);

    try {
      const result = await predictPose(selectedFile);
      setPrediction(result);
    } catch (err) {
      setError("Failed to analyze pose. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // WEBCAM HANDLERS
  // -------------------------------

  const startWebcam = async () => {
    try {
      // Check if browser supports webcam access
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Your browser doesn't support webcam access. Please use a modern browser like Chrome, Firefox, or Edge.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
      });

      setWebcamStream(stream);
      setWebcamActive(true);
      setPrediction(null);
      setError(null);
    } catch (err) {
      console.error("Webcam access error:", err);

      // Provide specific error messages based on the error type
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setError("Camera access denied. Please click the camera icon in your browser's address bar and allow camera access, then try again.");
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        setError("No camera found. Please connect a webcam and try again.");
      } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
        setError("Camera is already in use by another application. Please close other apps using the camera and try again.");
      } else if (err.name === "OverconstrainedError") {
        setError("Camera doesn't support the requested resolution. Trying with default settings...");
        // Retry with lower constraints
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setWebcamStream(stream);
          setWebcamActive(true);
          setPrediction(null);
          setError(null);
        } catch {
          setError("Unable to access camera. Please check your camera settings.");
        }
      } else {
        setError("Unable to access camera. Please ensure your camera is connected and you've granted permission in your browser settings.");
      }
    }
  };

  const stopWebcam = () => {
    if (webcamStream) {
      webcamStream.getTracks().forEach((t) => t.stop());
      setWebcamStream(null);
    }
    setWebcamActive(false);
    setLiveMode(false);
  };

  const captureAndAnalyze = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    canvas.toBlob(async (blob) => {
      setLoading(true);
      setError(null);

      try {
        const file = new File([blob], "webcam.jpg", { type: "image/jpeg" });
        const result = await predictPose(file);
        setPrediction(result);
      } catch (err) {
        setError("Failed to analyze pose.");
      } finally {
        setLoading(false);
      }
    }, "image/jpeg");
  };

  // Continuous live detection: Analyze frame every 1.5 seconds when liveMode is ON
  useEffect(() => {
    if (liveMode && webcamActive) {
      intervalRef.current = setInterval(() => {
        captureAndAnalyze();
      }, 1500);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [liveMode, webcamActive]);

  // -------------------------------
  // UI
  // -------------------------------

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", paddingTop: "120px", paddingBottom: "3rem" }}>
      <div style={{ maxWidth: "900px", width: "100%" }}>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", textAlign: "center", marginBottom: "0.5rem" }}>
          🧘 Yoga Pose Detector
        </h2>
        <p style={{ color: "var(--text-muted)", textAlign: "center", marginBottom: "2.5rem", fontSize: "1.05rem" }}>
          Upload an image or use your webcam to detect your yoga posture
        </p>

        <div className="glass-card" style={{ padding: "2.5rem" }}>

          {/* MODE SWITCH */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
            <button
              onClick={() => {
                setMode("upload");
                stopWebcam();
                setPrediction(null);
              }}
              className={`mode-btn ${mode === "upload" ? "mode-selected" : ""}`}
              style={{ flex: 1 }}
            >
              <Upload size={20} />
              <span>Upload Image</span>
            </button>

            <button
              onClick={() => {
                setMode("webcam");
                setSelectedFile(null);
                setPreview(null);
                setPrediction(null);
              }}
              className={`mode-btn ${mode === "webcam" ? "mode-selected" : ""}`}
              style={{ flex: 1 }}
            >
              <Camera size={20} />
              <span>Live Webcam</span>
            </button>
          </div>

          {/* ---------------- UPLOAD MODE ---------------- */}
          {mode === "upload" && (
            <>
              <input
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileSelect}
              />

              {!preview ? (
                <div
                  className="upload-box"
                  onClick={() => fileInputRef.current.click()}
                >
                  <Upload size={64} style={{ color: "rgba(255, 255, 255, 0.6)", margin: "0 auto 1rem" }} />
                  <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Click to upload a pose image</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>or drag and drop</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div style={{ borderRadius: "16px", overflow: "hidden", background: "rgba(0, 0, 0, 0.2)" }}>
                    <img
                      src={preview}
                      alt="Preview"
                      style={{ width: "100%", maxHeight: "400px", objectFit: "contain", display: "block" }}
                    />
                  </div>

                  {/* Prediction box */}
                  {prediction && (
                    <div className="success-box">
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                        <CheckCircle size={24} style={{ color: "#6ee7b7" }} />
                        <h3 style={{ fontSize: "1.25rem", margin: 0 }}>
                          Pose Detected!
                        </h3>
                      </div>
                      <p style={{ margin: 0, fontSize: "1.05rem" }}>
                        <span style={{ fontWeight: "600" }}>Prediction:</span>{" "}
                        {JSON.stringify(prediction)}
                      </p>
                    </div>
                  )}

                  {/* Error */}
                  {error && <div className="error-box">{error}</div>}

                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button
                      disabled={loading}
                      onClick={handlePredict}
                      className="btn-primary"
                      style={{ flex: 1 }}
                    >
                      {loading ? "Analyzing..." : "Analyze Pose"}
                    </button>

                    <button
                      onClick={() => {
                        setPreview(null);
                        setSelectedFile(null);
                        setPrediction(null);
                        setError(null);
                      }}
                      className="btn-secondary"
                    >
                      New Image
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ---------------- WEBCAM MODE ---------------- */}
          {mode === "webcam" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ borderRadius: "16px", overflow: "hidden", border: "4px solid rgba(255, 255, 255, 0.3)", background: "#000" }}>
                {!webcamActive ? (
                  <div style={{ aspectRatio: "16/9", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                    <Camera size={80} style={{ color: "rgba(255, 255, 255, 0.4)" }} />
                    <p style={{ color: "var(--text-muted)" }}>Webcam inactive</p>
                  </div>
                ) : (
                  <video ref={videoRef} autoPlay playsInline style={{ width: "100%", display: "block" }} />
                )}
                <canvas ref={canvasRef} style={{ display: "none" }} />
              </div>

              {/* Prediction */}
              {prediction && (
                <div className="success-box">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                    <CheckCircle size={24} style={{ color: "#6ee7b7" }} />
                    <h3 style={{ fontSize: "1.25rem", margin: 0 }}>
                      Pose Detected!
                    </h3>
                  </div>
                  <p style={{ margin: 0, fontSize: "1.05rem" }}>
                    <span style={{ fontWeight: "600" }}>Prediction:</span>{" "}
                    {JSON.stringify(prediction)}
                  </p>
                </div>
              )}

              {/* Error */}
              {error && <div className="error-box">{error}</div>}

              <div style={{ display: "flex", gap: "1rem" }}>
                {!webcamActive ? (
                  <button onClick={startWebcam} className="btn-start">
                    <Camera size={20} />
                    <span>Start Webcam</span>
                  </button>
                ) : (
                  <>
                    <button
                      disabled={loading}
                      onClick={captureAndAnalyze}
                      className="btn-primary"
                      style={{ flex: 1 }}
                    >
                      {loading ? "Analyzing..." : "📸 Capture & Analyze"}
                    </button>

                    <button
                      style={{
                        backgroundColor: liveMode ? "#ff6b6b" : "#4CAF50",
                        color: "white",
                        padding: "0.75rem 1.5rem",
                        borderRadius: "12px",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "1rem",
                        transition: "all 0.2s ease",
                      }}
                      onClick={() => setLiveMode((prev) => !prev)}
                    >
                      {liveMode ? "⛔ Stop Live Mode" : "▶ Start Live Mode"}
                    </button>

                    <button onClick={stopWebcam} className="btn-stop">
                      Stop Webcam
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
