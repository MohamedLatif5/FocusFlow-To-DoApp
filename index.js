const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;
const userRoutes = require("./routes/userRoutes");
const todosRoutes = require("./routes/todosRoutes");
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
