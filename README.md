# Task Management System - MERN Stack

A production-ready Task Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring JWT authentication, role-based access control, and a clean, modern UI.

## Features

### Authentication & Authorization

- JWT-based authentication using jsonwebtoken library
- Password hashing with bcrypt
- Role-based access control (Admin & Employee)
- Protected routes and API endpoints
- Secure token storage

### Admin Features

- Create and assign tasks to employees
- View all tasks across the organization
- Monitor task status (Pending, In Progress, Completed)
- Dashboard with task statistics
- Employee management

### Employee Features

- View assigned tasks
- Update task status
- Personal dashboard with task statistics
- Task filtering by status

## Technology Stack

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- CORS enabled

### Frontend

- React.js (v18)
- React Router for navigation
- Context API for state management
- Axios for API calls
- Modern CSS styling

## Project Structure

```
Assessment-Unicorn/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   └── PrivateRoute.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── AdminDashboard.js
    │   │   └── EmployeeDashboard.js
    │   ├── services/
    │   │   ├── api.js
    │   │   ├── authService.js
    │   │   └── taskService.js
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    ├── .env.example
    ├── .gitignore
    └── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file by copying `.env.example`:

```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

5. Start the backend server:

```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file by copying `.env.example`:

```bash
cp .env.example .env
```

4. Update the `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

5. Start the frontend development server:

```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Creating Initial Users

You can create initial users using the registration API or directly in MongoDB.

### Option 1: Using API (Recommended for Testing)

Use the POST `/api/auth/register` endpoint with the following payload:

**Create Admin:**

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

**Create Employee:**

```json
{
  "name": "Employee User",
  "email": "employee@example.com",
  "password": "employee123",
  "role": "employee"
}
```

### Option 2: Using MongoDB Directly

Connect to your MongoDB database and insert users manually.

## API Endpoints

### Authentication Routes

| Method | Endpoint              | Access  | Description       |
| ------ | --------------------- | ------- | ----------------- |
| POST   | `/api/auth/login`     | Public  | User login        |
| POST   | `/api/auth/register`  | Public  | User registration |
| GET    | `/api/auth/me`        | Private | Get current user  |
| GET    | `/api/auth/employees` | Admin   | Get all employees |

### Task Routes

| Method | Endpoint                | Access   | Description          |
| ------ | ----------------------- | -------- | -------------------- |
| POST   | `/api/tasks`            | Admin    | Create new task      |
| GET    | `/api/tasks`            | Admin    | Get all tasks        |
| GET    | `/api/tasks/mytasks`    | Employee | Get employee's tasks |
| GET    | `/api/tasks/:id`        | Private  | Get single task      |
| PUT    | `/api/tasks/:id/status` | Employee | Update task status   |
| PUT    | `/api/tasks/:id`        | Admin    | Update task          |
| DELETE | `/api/tasks/:id`        | Admin    | Delete task          |

## Testing

See `POSTMAN_GUIDE.md` for detailed API testing instructions with Postman.

## Deployment

See `DEPLOYMENT_GUIDE.md` for detailed deployment instructions.

## Security Features

- Password hashing using bcrypt (10 salt rounds)
- JWT token-based authentication
- Protected routes with middleware
- Role-based access control
- CORS configuration
- Environment variable protection
- Input validation

## Default Credentials (After Initial Setup)

**Admin Account:**

- Email: admin@example.com
- Password: admin123

**Employee Account:**

- Email: employee@example.com
- Password: employee123

⚠️ **Important:** Change these credentials in production!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.

## Support

For issues, questions, or contributions, please open an issue in the repository.
