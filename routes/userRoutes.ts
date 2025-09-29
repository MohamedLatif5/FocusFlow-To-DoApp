const express = require("express");
import type { Request, Response } from "express";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
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
