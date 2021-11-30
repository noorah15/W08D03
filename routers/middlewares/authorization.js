const roleModel = require("./../../db/models/role");
const taskModel = require("./../../db/models/task");
const userModel = require("./../../db/models/user");

const authorization = async (req, res, next) => {
  const { id } = req.token.role;
  const result = await roleModel.findById(id);
  if (result.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "forbidden" });
  }
};

module.exports = authorization;
