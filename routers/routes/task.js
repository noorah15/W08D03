const express = require("express");
const {
  todos,
  todo,
  todosDel,
  todoUpdate,
  todoDel,
  create,
} = require("./../controllers/task.js");
const {
  adminAuthorization,
  userAuthorization,
  userAuthorizationByParams,
  adminAuthorizationByParams,
} = require("../middlewares/authorization");
const authentication = require("../middlewares/authentication");
const taskRouter = express.Router();

taskRouter.get(
  "/todos/:userId",
  authentication,
  userAuthorizationByParams,
  todos
);
taskRouter.get("/todo", authentication, userAuthorization, todo);
taskRouter.delete("/todosDel/:id", authentication, userAuthorization, todosDel);
taskRouter.put("/todoUpdate", authentication, userAuthorization, todoUpdate);
taskRouter.delete("/todoDel", authentication, userAuthorization, todoDel);
taskRouter.post("/create", authentication, userAuthorization, create);

//for admin
taskRouter.get(
  "/todosByAdmin/:userId/:id",
  authentication,
  adminAuthorizationByParams,
  todos
);

module.exports = taskRouter;
