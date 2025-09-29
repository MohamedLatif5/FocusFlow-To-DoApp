# Todo List App

A RESTful API for managing todo items with user authentication. Built with Node.js, Express, TypeScript, and MongoDB.

## Features

- **User Authentication**: Secure login system with JWT tokens and bcrypt password hashing
- **User Management**: Create, read, update, and delete users
- **Todo Management**: Full CRUD operations for todo items
- **User-Todo Association**: Each todo is linked to a specific user
- **Timestamps**: Automatic creation and update timestamps
- **Data Validation**: Input validation and error handling
- **MongoDB Integration**: Persistent data storage with Mongoose
- **TypeScript Support**: Full type safety and enhanced development experience

## Tech Stack

- **Backend**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Development**: Nodemon for hot reloading
- **Logging**: Morgan middleware for request logging

## Project Structure

```
src/
├── config/
│   └── db.ts           # Database connection configuration
├── models/
│   ├── userModel.ts    # User schema and model
│   └── todoModel.ts    # Todo schema and model
├── routes/
│   ├── userRoutes.ts   # User-related API endpoints
│   └── todosRoutes.ts  # Todo-related API endpoints
├── services/           # Business logic layer (e.g., authentication, user operations)
│   └── userService.ts  # User authentication and validation services
└── index.ts            # Main application entry point
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or remote instance)
- npm or yarn package manager

## Installation

```bash
# Clone the repository
git clone https://github.com/MohamedLatif5/todo-list-app.git

# Navigate to project directory
cd todo-list-app

# Install dependencies
npm install

# Set up environment variables (optional)
cp .env.example .env
```

## Usage

### Development Mode

```bash
npm run dev
```

The server will start on port 3000 with hot reloading enabled.

### Production Build

```bash
npm run build
npm start
```

## API Endpoints

### Users

| Method | Endpoint     | Description     | Body                         |
| ------ | ------------ | --------------- | ---------------------------- |
| GET    | `/users`     | Get all users   | -                            |
| GET    | `/users/:id` | Get user by ID  | -                            |
| POST   | `/users`     | Create new user | `{name, email, password}`    |
| PATCH  | `/users/:id` | Update user     | `{name?, email?, password?}` |
| DELETE | `/users/:id` | Delete user     | -                            |

### Todos

| Method | Endpoint     | Description     | Body                                 | Query Params               |
| ------ | ------------ | --------------- | ------------------------------------ | -------------------------- |
| GET    | `/todos`     | Get all todos   | -                                    | `userId?` (filter by user) |
| GET    | `/todos/:id` | Get todo by ID  | -                                    | -                          |
| POST   | `/todos`     | Create new todo | `{title, description?, userId}`      | -                          |
| PATCH  | `/todos/:id` | Update todo     | `{title?, description?, completed?}` | -                          |
| DELETE | `/todos/:id` | Delete todo     | -                                    | -                          |

## Example Usage

**Note:** In production, use HTTPS for all requests. Passwords are automatically hashed before storage using bcrypt. Use the returned JWT token for authenticated requests (add `Authorization: Bearer <token>` header).

### Login

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "securePassword123"}'
```

### Create a User

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "securePassword123"}'
```

### Create a Todo

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn TypeScript", "description": "Complete TypeScript tutorial", "userId": "USER_ID_HERE"}'
```

### Get User's Todos

```bash
curl "http://localhost:3000/todos?userId=USER_ID_HERE"
```

### Mark Todo as Completed

```bash
curl -X PATCH http://localhost:3000/todos/TODO_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

## Data Models

### User Model

```typescript
{
  name: string (required)
  email: string (required, unique)
  password: string (required, hashed with bcrypt)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

### Todo Model

```typescript
{
  title: string (required)
  description: string (optional)
  completed: boolean (default: false)
  user: ObjectId (required, references User)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

## Environment Variables

| Variable     | Description               | Default                                   |
| ------------ | ------------------------- | ----------------------------------------- |
| `MONGO_URI`  | MongoDB connection string | `mongodb://localhost:27017/todo-list-app` |
| `PORT`       | Server port               | `3000`                                    |
| `JWT_SECRET` | Secret key for JWT tokens | Required for authentication              |

## Error Handling

The API returns appropriate HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `404`: Not Found
- `500`: Internal Server Error

## Development

### Available Scripts

- `npm run dev`: Start development server with hot reloading
- `npm run build`: Build TypeScript to JavaScript
- `npm start`: Start production server
- `npm test`: Run tests (currently placeholder)

### Recent Updates

- ✅ Fixed TypeScript compilation errors in user service
- ✅ Improved password handling and security
- ✅ Enhanced type safety for MongoDB ObjectId operations
- ✅ Better error handling and validation

### Code Style

The project uses TypeScript with strict mode enabled and follows these conventions:

- ES6+ features
- Async/await for asynchronous operations
- Express Router for modular routing
- Mongoose for database operations
- Proper error handling and validation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.
