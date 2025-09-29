const express = require("express");
import type { Request, Response } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

router.post("/", (req: Request, res: Response) => {
  res.send("User created");
  console.log("User data:", req.body);
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
