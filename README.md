🌾 Farmer Buddy — Smart Agriculture Support Platform

Farmer Buddy is a full-stack web application built to solve real-world agricultural problems by connecting farmers with structured crop knowledge and expert guidance through a role-based system.

The focus of this project is clean architecture, scalability, and real user workflows, not just feature completion.

🎯 Problem It Solves

Farmers often lack:

Reliable crop guidance in one place

Easy ways to ask and track expert advice

Structured, searchable agricultural information

Farmer Buddy addresses this by providing a centralized, interactive agriculture support system.

🧠 Key Highlights

End-to-end product development (frontend + backend)

Role-based access control (User / Admin)

OTP-based authentication for security

Real-world workflows: queries, responses, feedback

Designed with scalability and maintainability in mind

🧱 Tech Stack
Layer	Technology
Frontend	React, JavaScript, CSS
Backend	Node.js, Express
Database	MySQL
Authentication	Email + OTP
Version Control	Git, GitHub
🏗 Architecture

Monorepo structure

Clear separation of frontend and backend

RESTful API design

Modular backend logic for easy extension

farmer-buddy/
├── frontend/        # React application
│   ├── public/
│   ├── src/
│   └── package.json
├── backend/         # Node.js + Express API
│   ├── server.js
│   ├── constants.js
│   └── package.json
└── README.md

🚀 Features
👤 User Capabilities

Secure registration & login

OTP-based password reset

Submit agriculture-related queries

View expert/admin responses

Delete own queries

Submit feedback

🛠 Admin Capabilities

Admin authentication

View all user queries

Respond through dashboard

Manage query lifecycle

🌱 Agriculture Support

Crop information pages

Pest & fertilizer advisory sections

Category-wise crop browsing

⚙️ Setup & Installation
✅ Prerequisites

Node.js

npm

MySQL

🖥 Frontend
cd frontend
npm install
npm start


Runs on:
http://localhost:3000

🖥 Backend

Create .env inside backend/:

DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASS=your_database_password
DB_NAME=your_database_name
EMAIL_USER=your_email
EMAIL_PASS=your_email_password


Then run:

cd backend
npm install
node server.js


Runs on:
http://localhost:5000

🔌 API Overview

User authentication (register, login, OTP reset)

Query submission & retrieval

Admin query answering

Feedback management

🔮 Future Enhancements

AI-based crop advisory

Soil health analysis integration

Mobile-first UI improvements

Real-time notifications

👨‍💻 Author

Prashant Sonarwadikar
Final-year CSE student (2026)
Passionate about building scalable, real-world software products.
