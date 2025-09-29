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
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: "60d5f9f8f8a8a0a8a0a8a0a8" }); // placeholder user id

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
    const todo = await Todo.findOne({ _id: req.params.id, user: "60d5f9f8f8a8a0a8a0a8a0a8" }); // placeholder user id

    if (!todo) {
      return res.status(404).send();
    }

    updates.forEach((update) => (todo[update] = req.body[update]));
    await todo.save();
    res.send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});
// delete todo
router.delete("/:id", (req: Request, res: Response) => {
  res.send("todo deleted");
});

module.exports = router;
