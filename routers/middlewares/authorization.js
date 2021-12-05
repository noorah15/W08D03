const roleModel = require("./../../db/models/role");
const userModel = require("./../../db/models/user");

const adminAuthorization = async (req, res, next) => {
  const result = await roleModel.findById(req.token.role);
  if (result.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "forbidden" });
  }
};

const userAuthorization = async (req, res, next) => {
  const { id } = req.body;

  console.log(id);
  console.log("user " + req.token.userId);
  if (req.token.userId === id) {
    next();
  } else {
    res.status(403).json({ message: "forbidden" });
  }
};

const userAuthorizationByParams = async (req, res, next) => {
  const { userId } = req.params;

  console.log(userId);
  console.log("user " + req.token.userId);
  if (req.token.userId === userId) {
    next();
  } else {
    res.status(403).json({ message: "forbidden" });
  }
};

const adminAuthorizationByParams = async (req, res, next) => {
  const { id } = req.params;

  console.log(id);
  console.log("admin " + req.token.userId);
  if (req.token.userId === id) {
    next();
  } else {
    res.status(403).json({ message: "forbidden" });
  }
};

module.exports = {
  adminAuthorization,
  userAuthorization,
  userAuthorizationByParams,
  adminAuthorizationByParams,
};
