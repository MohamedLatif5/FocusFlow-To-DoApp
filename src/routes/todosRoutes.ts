import express from "express";
import type { Request, Response } from "express";
import Todo from "../models/todoModel";

const router = express.Router();

// restful api // crud operations // create read update delete

// read todos
// get all todos
router.get("/", async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { user: userId } : {};
    const todos = await Todo.find(filter).populate("user", "name email").sort({ createdAt: -1 });
    res.json(todos);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// get todo by id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(todo);
  } catch (error: any) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid todo ID" });
    }
    res.status(500).json({ error: error.message });
  }
});

// create todo
router.post("/", async (req: Request, res: Response) => {
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

    const todo = new Todo({
      title,
      description,
      user: userId,
    });
    await todo.save();
    await todo.populate("user", "name email");
    res.status(201).json(todo);
  } catch (error: any) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    res.status(400).json({ error: error.message });
  }
});

// update todo
router.patch("/:id", async (req: Request, res: Response) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid updates!" });
  }

  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    updates.forEach((update) => {
      (todo as any)[update] = req.body[update];
    });
    await todo.save();
    await todo.populate("user", "name email");
    res.json(todo);
  } catch (error: any) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid todo ID" });
    }
    res.status(400).json({ error: error.message });
  }
});

// delete todo
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully", todo });
  } catch (error: any) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid todo ID" });
    }
    res.status(500).json({ error: error.message });
  }
});

export default router;
