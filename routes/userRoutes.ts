const express = require("express");
import type { Request, Response } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

const User = require("../models/userModel");

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`User with ID ${id} updated`);
});

router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`User with ID ${id} deleted`);
});

module.exports = router;
