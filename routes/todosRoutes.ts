const express = require("express");
import type { Request, Response } from "express";
const router = express.Router();

// restful api // crud operations // create read update delete

// read todos
// get all todos

router.get("/", (req: Request, res: Response) => {
  res.send("todos");
});

// get todo by id
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.send("todo");
});

// create todo
router.post("/", (req: Request, res: Response) => {
  res.send("todo created");
  console.log("todo", req.body);
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
