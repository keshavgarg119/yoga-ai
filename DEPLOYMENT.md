# Deployment Guide for Yoga AI Project

This project contains a **FastAPI + TensorFlow Backend** and a **React Frontend**. Follow the step-by-step instructions below to deploy your application.

---

## 1. Deploying the Backend (FastAPI + TensorFlow)

Because the backend uses TensorFlow, we recommend hosting platforms that support Python ML workloads:

### Option A: Render (Recommended - Free / Easy)
1. Push your project code to **GitHub**.
2. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** -> **Web Service**.
3. Connect your GitHub repository.
4. Set the following configuration:
   - **Root Directory**: `backend`
   - **Environment**: `Python 3` (or `Docker` if using the Dockerfile)
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app:app --host 0.0.0.0 --port $PORT`
5. Click **Create Web Service**. Once deployed, copy your backend URL (e.g., `https://yoga-backend.onrender.com`).

### Option B: Railway
1. Go to [Railway.app](https://railway.app/).
2. Create a new project from your GitHub repo.
3. Select the `backend` folder as the root directory.
4. Railway will automatically detect the `Procfile` / `Dockerfile` and start the FastAPI service.
5. Copy your deployed backend URL (e.g., `https://yoga-backend.up.railway.app`).

---

## 2. Deploying the Frontend (React)

You can deploy the React frontend for free on **Vercel** or **Netlify**:

### Option A: Vercel (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/) and click **Add New** -> **Project**.
2. Import your GitHub repository.
3. In the project setup screen:
   - **Root Directory**: Select `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Expand **Environment Variables** and add:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://yoga-backend.onrender.com` (replace with your actual backend URL)
5. Click **Deploy**.

### Option B: Netlify
1. Go to [Netlify Dashboard](https://app.netlify.com/).
2. Click **Add new site** -> **Import an existing project**.
3. Select GitHub and choose your repo.
4. Set build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
5. Under **Environment variables**, set `REACT_APP_API_URL` to your backend URL.
6. Click **Deploy site**.

---

## 3. Local Testing

To test both frontend and backend locally before deploying:

### Backend:
```bash
cd backend
python -m venv .venv
# On Windows PowerShell:
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

### Frontend:
```bash
cd frontend
npm install
npm start
```
