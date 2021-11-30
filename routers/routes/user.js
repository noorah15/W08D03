const express = require("express");
const { register, login, getUsers } = require("./../controllers/user.js");
const userRouter = express.Router();

userRouter.post("/signup", register);
userRouter.post("/login", login);

//for admin
userRouter.get("/users", getUsers);
module.exports = userRouter;
