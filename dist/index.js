"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = __importDefault(require("./config/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const todosRoutes_1 = __importDefault(require("./routes/todosRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/users", userRoutes_1.default);
app.use("/todos", todosRoutes_1.default);
// Health check endpoint
app.get("/", (req, res) => {
    res.json({
        message: "Todo List API",
        version: "1.0.0",
        status: "running",
        endpoints: {
            users: "/users",
            todos: "/todos",
        },
    });
});
// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({ error: "Route not found" });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Health check: http://localhost:${port}/`);
});
//# sourceMappingURL=index.js.map