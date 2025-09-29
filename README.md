# Todo List App

A RESTful API for managing todo items with user authentication. Built with Node.js, Express, TypeScript, and MongoDB.

## Features

- **User Management**: Create, read, update, and delete users
- **Todo Management**: Full CRUD operations for todo items
- **User-Todo Association**: Each todo is linked to a specific user
- **Timestamps**: Automatic creation and update timestamps
- **Data Validation**: Input validation and error handling
- **MongoDB Integration**: Persistent data storage with Mongoose

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
├── index.ts            # Main application entry point
└── test.ts             # Test utilities
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or remote instance)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd todo-list-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the .env file and update MONGO_URI if needed
cp .env.example .env
```

4. Make sure MongoDB is running:
```bash
# For Ubuntu/Debian systems
sudo systemctl start mongod
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

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/users` | Get all users | - |
| GET | `/users/:id` | Get user by ID | - |
| POST | `/users` | Create new user | `{name, email, password}` |
| PATCH | `/users/:id` | Update user | `{name?, email?, password?}` |
| DELETE | `/users/:id` | Delete user | - |

### Todos

| Method | Endpoint | Description | Body | Query Params |
|--------|----------|-------------|------|--------------|
| GET | `/todos` | Get all todos | - | `userId?` (filter by user) |
| GET | `/todos/:id` | Get todo by ID | - | - |
| POST | `/todos` | Create new todo | `{title, description?, userId}` | - |
| PATCH | `/todos/:id` | Update todo | `{title?, description?, completed?}` | - |
| DELETE | `/todos/:id` | Delete todo | - | - |

## Example Usage

### Create a User
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'
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
  password: string (required)
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

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/todo-list-app` |
| `PORT` | Server port | `3000` |

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