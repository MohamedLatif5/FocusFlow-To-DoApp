"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userService_1 = require("../services/userService"); // Import from service
const userModel_1 = __importDefault(require("../models/userModel"));
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    try {
        const users = await userModel_1.default.find({});
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const user = await userModel_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        res.status(500).json({ error: error.message });
    }
});
router.post("/", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await (0, userService_1.createUser)(name, email, password); // Use service
        res.status(201).json(user);
    }
    catch (error) {
        if (error.message === "Email already exists") {
            return res.status(400).json({ error: error.message });
        }
        res.status(400).json({ error: error.message });
    }
});
router.patch("/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).json({ error: "Invalid updates!" });
    }
    try {
        const user = await userModel_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        updates.forEach((update) => {
            user[update] = req.body[update];
        });
        await user.save();
        // Return user without password
        const userResponse = await userModel_1.default.findById(user._id);
        res.json(userResponse);
    }
    catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        if (error.code === 11000) {
            return res.status(400).json({ error: "Email already exists" });
        }
        res.status(400).json({ error: error.message });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const user = await userModel_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        res.status(500).json({ error: error.message });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await (0, userService_1.loginUser)(email, password); // Use service
        res.json(result);
    }
    catch (error) {
        if (error.message === "Invalid credentials") {
            return res.status(401).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=userRoutes.js.map