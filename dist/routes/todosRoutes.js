"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoModel_1 = __importDefault(require("../models/todoModel"));
const router = express_1.default.Router();
// restful api // crud operations // create read update delete
// read todos
// get all todos
router.get("/", async (req, res) => {
    try {
        const { userId } = req.query;
        const filter = userId ? { user: userId } : {};
        const todos = await todoModel_1.default.find(filter).populate("user", "name email").sort({ createdAt: -1 });
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// get todo by id
router.get("/:id", async (req, res) => {
    try {
        const todo = await todoModel_1.default.findById(req.params.id).populate("user", "name email");
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json(todo);
    }
    catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ error: "Invalid todo ID" });
        }
        res.status(500).json({ error: error.message });
    }
});
// create todo
router.post("/", async (req, res) => {
    try {
        const { title, description, userId } = req.body;
        // Basic validation
        if (!title || !userId) {
            return res.status(400).json({
                error: "Missing required fields",
                required: ["title", "userId"]
            });
        }
        // Validate title length
        if (title.length < 1 || title.length > 200) {
            return res.status(400).json({
                error: "Title must be between 1 and 200 characters"
            });
        }
        const todo = new todoModel_1.default({
            title,
            description,
            user: userId,
        });
        await todo.save();
        await todo.populate("user", "name email");
        res.status(201).json(todo);
    }
    catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        res.status(400).json({ error: error.message });
    }
});
// update todo
router.patch("/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["title", "description", "completed"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).json({ error: "Invalid updates!" });
    }
    try {
        const todo = await todoModel_1.default.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        updates.forEach((update) => {
            todo[update] = req.body[update];
        });
        await todo.save();
        await todo.populate("user", "name email");
        res.json(todo);
    }
    catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ error: "Invalid todo ID" });
        }
        res.status(400).json({ error: error.message });
    }
});
// delete todo
router.delete("/:id", async (req, res) => {
    try {
        const todo = await todoModel_1.default.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json({ message: "Todo deleted successfully", todo });
    }
    catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ error: "Invalid todo ID" });
        }
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=todosRoutes.js.map