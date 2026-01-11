# 🌾 Farmer Buddy

Farmer Buddy is a **full-stack agriculture support web application** designed to help farmers and agriculture learners access crop information, ask farming-related questions, and receive expert guidance through an admin-managed system.

The application follows a **monorepo architecture**, with both frontend and backend maintained in a single repository for easy development, deployment, and version control.

---

## 📌 Project Overview

Farmer Buddy provides a digital platform where:
- Users can register and log in securely
- Farmers can submit agricultural queries
- Admins can view and answer user queries
- Users can view responses and manage their own queries
- Crop-related information and advisory sections are available

---

## 🧱 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React, JavaScript, CSS |
| Backend | Node.js, Express |
| Database | MySQL |
| Authentication | Email & OTP based |
| Version Control | Git & GitHub |

---

## 📁 Project Structure

farmer-buddy/
├── frontend/ # React frontend
│ ├── public/
│ ├── src/
│ ├── package.json
│ └── .gitignore
│
├── backend/ # Node.js backend
│ ├── server.js
│ ├── package.json
│ ├── constants.js
│ └── .gitignore
│
└── README.md

yaml
Copy code

---

## 🚀 Features

### 👤 User Features
- User registration and login
- OTP-based password reset
- Submit farming queries
- View admin responses
- Delete own queries
- Submit feedback

### 🛠 Admin Features
- Admin login
- View all user-submitted queries
- Answer queries through dashboard

### 🌱 Agriculture Support
- Crop information pages
- Pest and fertilizer advisory section
- Category-wise crop browsing

---

## ⚙️ Installation & Setup

### ✅ Prerequisites
- Node.js
- npm
- MySQL

---

### 🖥️ Frontend Setup

```bash
cd frontend
npm install
npm start
Frontend runs on:

arduino
Copy code
http://localhost:3000
🖥️ Backend Setup
Create a .env file inside the backend folder with the following variables:

ini
Copy code
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASS=your_database_password
DB_NAME=your_database_name
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
Then run:

bash
Copy code
cd backend
npm install
node server.js
Backend runs on:

arduino
Copy code
http://localhost:5000
🔗 API Functionality (Summary)
User authentication (register, login, OTP reset)

Query submission and retrieval

Admin query answering

Feedback submission
