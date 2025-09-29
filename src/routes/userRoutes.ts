import express from "express";
import type { Request, Response } from "express";
import { createUser, loginUser } from "../services/userService"; // Import from service
import User from "../models/userModel";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error: any) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = await createUser(name, email, password); // Use service
    res.status(201).json(user);
  } catch (error: any) {
    if (error.message === "Email already exists") {
      return res.status(400).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    updates.forEach((update) => {
      (user as any)[update] = req.body[update];
    });
    await user.save();

    // Return user without password
    const userResponse = await User.findById(user._id);
    res.json(userResponse);
  } catch (error: any) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error: any) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password); // Use service
    res.json(result);
  } catch (error: any) {
    if (error.message === "Invalid credentials") {
      return res.status(401).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

export default router;
