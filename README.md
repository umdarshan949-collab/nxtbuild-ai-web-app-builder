# 🚀 NxtBuild — AI Powered Web App Builder

<p align="center">

AI-powered full-stack platform that generates beautiful web applications from natural language prompts.

</p>

---

<p align="center">

![Frontend](https://img.shields.io/badge/Frontend-React-blue)

![Backend](https://img.shields.io/badge/Backend-Node.js-green)

![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen)

![Authentication](https://img.shields.io/badge/Auth-JWT-orange)

![AI](https://img.shields.io/badge/AI-OpenAI-purple)

![API](https://img.shields.io/badge/API-OpenRouter-black)

![Deployment](https://img.shields.io/badge/Deployment-Ready-success)

</p>

---

# ✨ Features

- 🤖 AI-powered web app generation
- 🔐 JWT authentication system
- 📁 Project dashboard management
- ⚡ Live app preview rendering
- 💾 Save & load projects
- 🎨 Modern responsive UI
- 🌙 Dark mode-friendly designs
- 🧠 AI-generated frontend applications
- 📱 Responsive layouts

---

# 🧠 System Architecture

```txt
Client (React + Vite)
        ↓
Axios API Requests
        ↓
Express.js Backend
        ↓
JWT Authentication Middleware
        ↓
AI Generation Route
        ↓
OpenRouter API
        ↓
OpenAI GPT Model
        ↓
Generated HTML/CSS/JS
        ↓
Live Preview Rendering
```

---

# 🛠 Tech Stack

## 🎨 Frontend

- React.js
- React Router DOM
- Axios
- CSS3
- Vite

---

## ⚙ Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

## 🤖 AI Integration

- OpenRouter API
- OpenAI GPT-3.5 Turbo

---

# 🔐 Authentication Flow

```txt
User registers / logs in
            ↓
Server generates JWT token
            ↓
Frontend stores token in cookies
            ↓
Axios attaches token automatically
            ↓
Protected routes validate token
            ↓
Authorized user accesses projects
```

---

# 📂 Project Structure

```bash
ai_powered_web_app_builder/

│

├── client/                    # Frontend (React + Vite)

│   ├── src/

│   │   ├── components/

│   │   ├── context/

│   │   ├── pages/

│   │   ├── services/

│   │   ├── styles/

│   │   └── App.jsx

│

├── server/                    # Backend (Node.js + Express)

│   ├── src/

│   │   ├── config/

│   │   ├── middleware/

│   │   ├── models/

│   │   ├── routes/

│   │   └── app.js

│

└── README.md
```

---

# ⚡ Installation

## 1️⃣ Clone Repository

```bash
git clone <your-github-repository-url>
```

---

## 2️⃣ Frontend Setup

```bash
cd client

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## 3️⃣ Backend Setup

```bash
cd server

npm install

node server.js
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 🔑 Environment Variables

Create `.env` inside:

```bash
server/
```

Add:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d

OPENROUTER_API_KEY=your_openrouter_key

CLIENT_URL=http://localhost:5173
```

---

# 🚀 AI Generation Flow

```txt
User enters prompt
        ↓
Frontend sends prompt to backend
        ↓
Backend sends request to OpenRouter
        ↓
OpenAI model generates app code
        ↓
Backend cleans response
        ↓
Frontend renders live preview
        ↓
Project saved to MongoDB
```

---

# 📸 Screenshots

## 🏠 Landing Page

_Add screenshot here_

---

## 📊 Dashboard

_Add screenshot here_

---

## 🤖 AI Builder

_Add screenshot here_

---

# 🔥 Future Improvements

- ⚛ Generate React applications
- 📦 Export project ZIP
- 🌐 One-click deployment
- ✏ Live code editor
- 📁 Multi-file project generation
- 💬 AI conversation memory
- 📱 Better mobile optimization

---

# 👨‍💻 Author

## Darshan U M

Full Stack Developer | AI Application Builder

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub.