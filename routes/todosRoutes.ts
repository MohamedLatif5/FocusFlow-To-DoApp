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
    const todos = await Todo.find(filter).populate('user', 'name email');
    res.send(todos);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get todo by id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id).populate('user', 'name email');

    if (!todo) {
      return res.status(404).send();
    }

    res.send(todo);
  } catch (error) {
    res.status(500).send(error);
  }
});

// create todo
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, description, userId } = req.body;
    
    if (!userId) {
      return res.status(400).send({ error: "User ID is required" });
    }
    
    const todo = new Todo({
      title,
      description,
      user: userId,
    });
    await todo.save();
    await todo.populate('user', 'name email');
    res.status(201).send(todo);
  } catch (error) {
    res.status(400).send(error);
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
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).send();
    }

    updates.forEach((update) => (todo[update] = req.body[update]));
    await todo.save();
    await todo.populate('user', 'name email');
    res.send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete todo
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).send();
    }

    res.send({ message: "Todo deleted successfully", todo });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
