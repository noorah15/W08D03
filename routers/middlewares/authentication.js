const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.secretKey;

const authentication = (req, res, next) => {
  try {
    if (!req.header.authorization)
      return res.status(403).json({ message: "forbidden" });
    const token = req.header.authorization.split(" ")[1];
    const parsedToken = jwt.verify(token, secret);

    req.token = parsedToken;
    next();
  } catch (err) {
    res.status(403).json(err);
  }
};

module.exports = authentication;