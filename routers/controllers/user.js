const userModel = require("./../../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT = Number(process.env.SALT);
const secretKey = process.env.secretKey;

const register = async (req, res) => {
  const { email, password, role } = req.body;

  const savedEmail = email.toLowerCase();
  const passwordHashed = await bcrypt.hash(password, SALT);

  const newUser = new userModel({
    email: savedEmail,
    password: passwordHashed,
    role,
  });

  newUser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  userModelemail
    .findOne({ email })
    .then(async (result) => {
      if (result) {
        if (email === result.email) {
          const hashedPass = await bcrypt.compare(password, result.password);

          if (hashedPass) {
            const payload = {
              role: result.role,
            };
            const options = {
              expiresIn: "60m",
            };

            const token = await jwt.sign(payload, secretKey, options);

            res.status(200).json({ result, token });
          } else {
            res.status(400).json("email or password is not correct");
          }
        } else {
          res.status(400).json("email or password is not correct");
        }
      } else {
        res.status(400).json("email not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getUsers = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const delUsers = (req, res) => {
  userModel
    .find({})
    .then(async (result) => {
      let doc = await userModel.update({}, { isDel: true });
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { register, login, getUsers, delUsers };
