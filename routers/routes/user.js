const express = require("express");
const {
  register,
  login,
  getUsers,
  delUsers,
} = require("./../controllers/user.js");
const userRouter = express.Router();

userRouter.post("/signup", register);
userRouter.post("/login", login);

//for admin
userRouter.get("/users", getUsers);
userRouter.delete("/delUsers", delUsers);
module.exports = userRouter;
