const express = require("express");
import type { Request, Response } from "express";
const router = express.Router();

const Todo = require("../models/todoModel");

// restful api // crud operations // create read update delete

// read todos
// get all todos

router.get("/", async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find({ user: "60d5f9f8f8a8a0a8a0a8a0a8" }); // placeholder user id
    res.send(todos);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get todo by id
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.send("todo");
});

// create todo
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const todo = new Todo({
      title,
      description,
      user: "60d5f9f8f8a8a0a8a0a8a0a8", // placeholder user id
    });
    await todo.save();
    res.status(201).send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// update todo
router.patch("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.send("todo updated");
});
// delete todo
router.delete("/:id", (req: Request, res: Response) => {
  res.send("todo deleted");
});

module.exports = router;
