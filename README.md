# 🧘 YogaAI - AI-Powered Yoga Pose Detection

An intelligent, real-time yoga pose detection application that uses computer vision and machine learning to help users perfect their yoga practice.

![YogaAI Banner](https://img.shields.io/badge/YogaAI-Pose%20Detection-purple?style=for-the-badge)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=flat&logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)

---

## 🌟 Why We Built This

Yoga is a powerful practice for physical and mental well-being, but proper form is crucial to avoid injuries and maximize benefits. Many practitioners struggle with:
- **Self-correction**: Difficulty assessing their own poses without a teacher
- **Accessibility**: Limited access to in-person yoga instructors
- **Consistency**: Need for immediate feedback during solo practice
- **Learning**: Understanding if they're performing poses correctly

**YogaAI** bridges this gap by providing instant, AI-powered pose detection and feedback, making quality yoga instruction accessible to everyone, anywhere, anytime.

---

## ✨ Features

- **🎯 Real-time Pose Detection**: Analyze yoga poses instantly using your webcam
- **📸 Image Upload Support**: Upload photos to detect and analyze poses
- **🎨 Modern UI/UX**: Beautiful, responsive design with glassmorphism effects and smooth animations
- **📱 Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **🌈 Interactive Feedback**: Clear visual feedback and pose predictions
- **⚡ Fast & Accurate**: Powered by MediaPipe and advanced ML models

---

## 🛠️ Tech Stack

### Frontend
- **React 18.x** - Modern UI library for building interactive interfaces
- **React Router DOM** - Client-side routing for seamless navigation
- **Lucide React** - Beautiful, consistent icon library
- **Custom CSS** - Modern design with glassmorphism, gradients, and animations
- **Google Fonts (Inter)** - Premium typography

### Backend
- **Python 3.8+** - Core programming language
- **FastAPI** - High-performance web framework for building APIs
- **MediaPipe** - Google's ML framework for pose detection
- **OpenCV** - Computer vision library for image processing
- **Uvicorn** - ASGI server for running FastAPI

### AI/ML
- **MediaPipe Pose** - Pre-trained pose estimation model
- **Custom ML Model** - Trained on yoga pose datasets for accurate classification

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+
- npm or yarn
- A webcam (for live pose detection)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/keshavgarg119/yoga-ai
cd yoga-ai
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```
The app will run on `http://localhost:3001`

#### 3. Backend Setup
```bash
cd ../backend
python -m venv .venv
source .venv/Scripts/activate  # On Windows
# source .venv/bin/activate    # On macOS/Linux

pip install -r requirements.txt
uvicorn app:app --reload
```
The API will run on `http://localhost:8000`

---

## 📖 Usage

1. **Navigate** to `http://localhost:3001` in your browser
2. **Choose a mode**:
   - **Upload Image**: Click to upload a yoga pose image
   - **Live Webcam**: Use your webcam for real-time detection
3. **Grant camera permissions** when prompted (for webcam mode)
4. **Capture & Analyze** your pose to get instant feedback
5. **View results** with detailed pose predictions

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can contribute:

### Fork & Clone
1. **Fork the repository** on GitHub (click the "Fork" button at the top right)
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/keshavgarg119/yoga-ai.git
   cd yoga-ai
   ```

### Create a Branch
3. **Create a feature branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Make Changes
4. **Make your changes** and test thoroughly
5. **Commit your changes** with clear, descriptive messages:
   ```bash
   git add .
   git commit -m "Add: Brief description of your changes"
   ```

### Submit a Pull Request
6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request** on GitHub:
   - Go to the original repository
   - Click "Pull Requests" → "New Pull Request"
   - Select your fork and branch
   - Add a clear title and description of your changes
   - Submit the PR for review

### Contribution Guidelines
- Write clean, readable code
- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes before submitting
- Update documentation if needed
- Be respectful and constructive in discussions

### What to Contribute
-  Bug fixes
-  New features
-  Documentation improvements
-  UI/UX enhancements
-  Test coverage
-  Accessibility improvements
-  Feedback System

---

## 📂 Project Structure

```
yoga-ai/
├── frontend/              # React frontend application
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # Reusable components (Navbar, Footer)
│   │   ├── pages/        # Page components (Home, About, Contact, Detector)
│   │   ├── api.js        # API client for backend communication
│   │   ├── App.js        # Main app component with routing
│   │   ├── App.css       # Component-specific styles
│   │   └── index.css     # Global styles and design system
│   └── package.json
│
├── backend/              # FastAPI backend
│   ├── app.py           # Main FastAPI application
│   ├── model/           # ML model files
│   └── requirements.txt
│
└── README.md            # Project documentation
```

---

## 🎯 Roadmap

- [ ] Add more yoga poses to the detection model
- [ ] Implement pose correction suggestions
- [ ] Add pose history tracking
- [ ] Create user profiles and progress tracking
- [ ] Multi-language support
- [ ] Mobile app versions (iOS & Android)
- [ ] Integration with fitness trackers

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **MediaPipe** by Google for the pose detection framework
- **React** team for the excellent UI library
- **FastAPI** for the high-performance backend framework
- All contributors who help improve this project

---

## 📧 Contact

Have questions or suggestions? Feel free to:
- Open an issue on GitHub
- Submit a pull request
- Reach out via the Contact page in the app

---

**Made with ❤️ for the yoga community**
