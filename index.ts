import express from "express";
import morgan from "morgan";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import todosRoutes from "./routes/todosRoutes";

connectDB();

const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// user routes
app.use("/users", userRoutes);
// todo routes
app.use("/todos", todosRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
