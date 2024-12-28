const express=require('express');
const router=express.Router();

// restful api // crud operations // create read update delete

// read todos
// get all todos

router.get("/", (req, res) => {
  res.send("todos");
});

// get todo by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send("todo");
});

// create todo
router.post("/", (req, res) => {
  res.send("todo created");
  console.log("todo", req.body);
});

// update todo
router.patch("//:id", (req, res) => {
  const { id } = req.params;
  res.send("todo updated");
});
// delete todo
router.delete("/:id", (req, res) => {
  res.send("todo deleted");
});

module.exports=router;