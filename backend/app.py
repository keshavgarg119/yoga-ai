from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from inference import predict_pose

app = FastAPI()

# Allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Yoga Pose Detection API is running 🚀"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    pose, confidence = predict_pose(file.file)
    return {"pose": pose, "confidence": round(confidence * 100, 2)}
