const express = require("express");
const {
  todos,
  todo,
  todosDel,
  todoUpdate,
  todoDel,
  create,
} = require("./../controllers/task.js");
const taskRouter = express.Router();

taskRouter.get("/todos/:id", todos);
taskRouter.get("/todo", todo);
taskRouter.delete("/todosDel/:id", todosDel);
taskRouter.put("/todoUpdate", todoUpdate);
taskRouter.delete("/todoDel", todoDel);
taskRouter.post("/create", create);

module.exports = taskRouter;
