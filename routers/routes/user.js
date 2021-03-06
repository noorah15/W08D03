const express = require("express");
const authentication = require("../middlewares/authentication");
const {
  adminAuthorization,
  userAuthorization,
} = require("../middlewares/authorization");

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
userRouter.get("/users", authentication, getUsers);
userRouter.delete("/delUsers", authentication, adminAuthorization, delUsers);
module.exports = userRouter;
