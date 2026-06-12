# Task Management System

A full-stack Task Management System built with Node.js, Express, MongoDB, and React.js. Built as an internship-level project.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Password | bcryptjs |
| Frontend | React.js |
| API Docs | Swagger (OpenAPI 3.0) |
| Validation | express-validator |

---

## Project Structure

```
task-manager/
├── backend/
│   ├── config/
│   │   ├── db.js           # MongoDB connection
│   │   └── swagger.js      # Swagger config
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT protect + adminOnly
│   │   └── errorHandler.js   # Global error handler
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   └── userRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   └── Navbar.js
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   ├── TaskList.js
    │   │   ├── CreateTask.js
    │   │   └── EditTask.js
    │   ├── utils/
    │   │   └── api.js       # API helper + localStorage utils
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json
```

---

## Environment Variables

Create a `.env` file in the `backend/` folder:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=mysecretkey123
JWT_EXPIRE=7d
```

---

## Installation & Running

### Prerequisites
- Node.js (v16+)
- MongoDB running locally (or use MongoDB Atlas)
- npm

### Backend Setup

```bash
cd backend
npm install
npm start
```

Server runs on: `http://localhost:5000`  
Swagger docs: `http://localhost:5000/api-docs`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

---

## API Endpoints

### Auth Routes — `/api/v1/auth`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Register new user | No |
| POST | `/api/v1/auth/login` | Login and get JWT | No |
| GET | `/api/v1/auth/me` | Get current user | Yes |

### Task Routes — `/api/v1/tasks`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/tasks` | Create a task | Yes |
| GET | `/api/v1/tasks` | Get all tasks | Yes |
| GET | `/api/v1/tasks/:id` | Get single task | Yes |
| PUT | `/api/v1/tasks/:id` | Update a task | Yes |
| DELETE | `/api/v1/tasks/:id` | Delete a task | Yes |

### User Routes — `/api/v1/users`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/users` | Get all users | Admin only |

---

## Roles

- **user** — Can only see and manage their own tasks
- **admin** — Can view all tasks and all users

---

## Swagger API Documentation

Visit `http://localhost:5000/api-docs` after starting the backend.

You can test all APIs directly from the Swagger UI. Use the **Authorize** button to paste your JWT token.

---

## Postman Collection Examples

### Register User
```json
POST http://localhost:5000/api/v1/auth/register
Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

### Login
```json
POST http://localhost:5000/api/v1/auth/login
Body:
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Task (with JWT)
```json
POST http://localhost:5000/api/v1/tasks
Headers: Authorization: Bearer <your_token>
Body:
{
  "title": "Fix login bug",
  "description": "Button not working on mobile",
  "status": "Pending"
}
```

---

## Frontend Pages

| Page | Route | Description |
|------|-------|-------------|
| Register | `/register` | Create a new account |
| Login | `/login` | Login with email & password |
| Dashboard | `/dashboard` | Summary cards with task counts |
| Task List | `/tasks` | View, edit, delete tasks |
| Create Task | `/tasks/create` | Create a new task |
| Edit Task | `/tasks/edit/:id` | Edit an existing task |
