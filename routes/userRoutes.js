const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, World!");
});

router.post("/", (req, res) => {
  res.send("User created");
  console.log("User data:", req.body);
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`User with ID ${id} updated`);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`User with ID ${id} deleted`);
});

module.exports = router;
