<div align="center">

# 🚀 Task Manager System

### Full Stack Task Management Application with JWT Authentication & Role-Based Access Control

<p align="center">
  <img src="./download/banner.png" alt="Task Manager Banner" width="100%">
</p>

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge\&logo=jsonwebtokens)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge\&logo=swagger\&logoColor=black)

### 📌 Backend Developer Internship Assignment

A secure and scalable Task Management System built using the MERN Stack featuring Authentication, Authorization, CRUD Operations, API Documentation, and Frontend Integration.

</div>

---

# 📖 Overview

This project is a full-stack Task Management application that allows users to register, log in, and manage tasks securely.

The application implements:

* JWT Authentication
* Role-Based Access Control (RBAC)
* RESTful APIs
* MongoDB Atlas Integration
* Swagger Documentation
* React Frontend

---

# ✨ Features

## 🔐 Authentication

* User Registration
* User Login
* JWT Token Generation
* Password Hashing using bcryptjs

## 👥 Authorization

* User Role
* Admin Role
* Protected Routes
* Route-Level Access Control

## 📋 Task Management

* Create Task
* View Tasks
* Update Task
* Delete Task
* Task Status Management

## 📚 API Features

* RESTful API Design
* API Versioning
* Input Validation
* Error Handling Middleware
* Swagger Documentation

## 💻 Frontend Features

* React.js User Interface
* Login Page
* Registration Page
* Dashboard
* Task Management Interface
* Success & Error Notifications

---

# 🛠 Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs
* Express Validator
* Swagger UI

## Frontend

* React.js
* JavaScript
* CSS

## API Testing

* Swagger UI
* Postman

---

# 📂 Project Structure

```text
task-manager/
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── swagger.js
│   │
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── utils/
│
├── screenshots/
│
├── README.md
├── SCALABILITY.md
└── postman-collection.json
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY

JWT_EXPIRE=7d
```

---

# 🚀 Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/task-manager-system.git

cd task-manager-system
```

---

## 2️⃣ Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY

JWT_EXPIRE=7d
```

Start Backend:

```bash
npm start
```

Backend will run at:

```text
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

Open a new terminal:

```bash
cd frontend

npm install

npm start
```

Frontend will run at:

```text
http://localhost:3000
```

---

# 🌐 Application URLs

| Service               | URL                            |
| --------------------- | ------------------------------ |
| Frontend              | http://localhost:3000          |
| Backend API           | http://localhost:5000          |
| Swagger Documentation | http://localhost:5000/api-docs |

---

# 🔑 API Endpoints

## Authentication

| Method | Endpoint              |
| ------ | --------------------- |
| POST   | /api/v1/auth/register |
| POST   | /api/v1/auth/login    |

## Tasks

| Method | Endpoint          |
| ------ | ----------------- |
| GET    | /api/v1/tasks     |
| POST   | /api/v1/tasks     |
| GET    | /api/v1/tasks/:id |
| PUT    | /api/v1/tasks/:id |
| DELETE | /api/v1/tasks/:id |

## Users

| Method | Endpoint      |
| ------ | ------------- |
| GET    | /api/v1/users |

---

# 📸 Project Screenshots

## Login Page

![Login](<img width="1897" height="626" alt="image" src="https://github.com/user-attachments/assets/e98ceead-4f5e-4f53-9b42-e2ad7fdf7a41" />

)

---

## Dashboard

![Dashboard](<img width="1907" height="595" alt="image" src="https://github.com/user-attachments/assets/3aa3aec6-381e-4ad5-b65e-bf33aa136707" />
)

---

## Task Management

![Tasks](<img width="1905" height="542" alt="image" src="https://github.com/user-attachments/assets/3bb4bba5-d16b-4008-a35d-abd3a4225caa" />
)

---

## Swagger Documentation

![Swagger](<img width="1917" height="866" alt="image" src="https://github.com/user-attachments/assets/44949f6a-9b70-45a2-810d-0549be42f357" />
)

---

# 🔒 Security Features

* JWT Authentication
* Password Hashing using bcryptjs
* Protected API Routes
* Role-Based Access Control
* Input Validation
* Error Handling Middleware
* Environment Variable Configuration

---

# 📈 Scalability Considerations

Future enhancements that can be implemented:

### Redis Caching

* Cache frequently accessed task data
* Improve response time

### Docker Deployment

* Containerized deployment
* Easy environment setup

### Load Balancing

* Distribute traffic across servers
* Improve availability

### Microservices Architecture

* Authentication Service
* Task Management Service
* Notification Service

### CI/CD Pipeline

* Automated Testing
* Automated Deployment

---

# 🧪 Testing

Swagger Documentation:

```text
http://localhost:5000/api-docs
```

Use Swagger UI or Postman Collection to test all endpoints.

---

# 🌟 Key Highlights

✅ JWT Authentication

✅ Role-Based Access Control

✅ MongoDB Atlas Integration

✅ Swagger Documentation

✅ React Frontend

✅ RESTful API Design

✅ Input Validation

✅ Error Handling

✅ Secure Password Storage

✅ CRUD Operations

---

# 👨‍💻 Author

### Shivang Gupta

Backend Developer Internship Assignment

LinkedIn: Add Your LinkedIn URL

GitHub: Add Your GitHub URL

---

⭐ If you found this project useful, feel free to star the repository.
