import express from "express";
import morgan from "morgan";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import todosRoutes from "./routes/todosRoutes";

connectDB();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/users", userRoutes);
app.use("/todos", todosRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Todo List API", 
    version: "1.0.0",
    status: "running",
    endpoints: {
      users: "/users",
      todos: "/todos"
    }
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Health check: http://localhost:${port}/`);
});
