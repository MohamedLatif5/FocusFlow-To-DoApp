"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.loginUser = exports.comparePassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const comparePassword = async (hashedPassword, candidatePassword) => {
    try {
        return await bcryptjs_1.default.compare(candidatePassword, hashedPassword);
    }
    catch (error) {
        throw new Error("Password comparison failed");
    }
};
exports.comparePassword = comparePassword;
const loginUser = async (email, password) => {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }
    const user = await userModel_1.default.findOne({ email }).select("+password");
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const isMatch = await (0, exports.comparePassword)(user.password, password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return {
        message: "Login successful",
        token,
        user: { id: user._id.toString(), name: user.name, email: user.email },
    };
};
exports.loginUser = loginUser;
// Function to create user (example, can expand)
const createUser = async (name, email, password) => {
    // Basic validation
    if (!name || !email || !password) {
        throw new Error("Missing required fields");
    }
    // Check if user already exists
    const existingUser = await userModel_1.default.findOne({ email });
    if (existingUser) {
        throw new Error("Email already exists");
    }
    const user = new userModel_1.default({ name, email, password });
    await user.save();
    // Convert to plain object and remove password before returning
    const userObject = user.toObject();
    const { password: _, ...userWithoutPassword } = userObject;
    return userWithoutPassword;
};
exports.createUser = createUser;
//# sourceMappingURL=userService.js.map