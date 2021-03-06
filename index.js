const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db/db.js");

const app = express();
app.use(express.json());
app.use(cors());

const role = require("./routers/routes/role");
app.use(role);

const user = require("./routers/routes/user");
app.use(user);

const task = require("./routers/routes/task");
app.use("/task", task);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});
