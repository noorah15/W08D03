const taskModel = require("./../../db/models/task");
const userModel = require("./../../db/models/user");

//
const todos = (req, res) => {
  const { userId } = req.params;

  userModel
    .find({ _id: userId })
    .then((result) => {
      taskModel
        .find({ user: userId, isDel: false })
        .then((result) => {
          if (result) res.status(200).json(result);
          else res.status(400).json("this user not has any tasks");
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(400).json("User not found");
    });
};

//
const todo = (req, res) => {
  const { userId, taskId } = req.body;
  userModel
    .findById({ _id: userId })
    .then((result) => {
      taskModel
        .find({ _id: taskId, user: userId, isDel: false })
        .then((result) => {
          if (result) res.status(200).json(result);
          else res.status(400).send("user does not has this task");
        })
        .catch((err) => {
          res.status(400).send("user does not has this task");
        });
    })
    .catch((err) => {
      res.status(400).json("User not found");
    });
};

const todosDel = (req, res) => {
  const { id } = req.params;
  userModel
    .findById({ _id: id })
    .then((result) => {
      taskModel
        .find({ user: id, isDel: false })
        .then(async (result) => {
          if (result) {
            let doc = await taskModel.updateMany({ user: id }, { isDel: true });

            res.status(200).json(doc);
          } else res.status(400).send("user does not has this task");
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    })
    .catch((err) => {
      res.status(400).json("User not found");
    });
};

//
const todoUpdate = (req, res) => {
  const { userId, taskId, taskName } = req.body;

  if (userId == undefined || taskId == undefined || taskName == undefined)
    return res.status(400).send("some data are missing");
  taskModel
    .findOne({ _id: taskId, user: userId, isDel: false })
    .then(async (result) => {
      if (result) {
        let doc = await taskModel.findOneAndUpdate(
          { _id: taskId },
          { name: taskName },
          {
            new: true,
          }
        );

        res.status(200).json(doc);
      } else res.status(400).send("user does not has this task");
    })
    .catch((err) => {
      res.status(400).send("user does not has this task");
    });
};

//
const todoDel = (req, res) => {
  const { userId, taskId } = req.body;
  console.log(userId + " " + taskId);

  userModel
    .findById({ _id: userId })
    .then((result) => {
      taskModel
        .findOne({ _id: taskId, user: userId })
        .then(async (result) => {
          if (result) {
            let doc = await taskModel.findOneAndUpdate(
              { _id: taskId },
              {
                isDel: true,
              },
              {
                new: true,
              }
            );

            res.status(200).json(doc);
          } else res.status(400).send("user does not has this task");
        })
        .catch((err) => {
          res.status(400).send("user does not has this task");
        });
    })
    .catch((err) => {
      res.status(400).json("User not found");
    });
};

//
const create = (req, res) => {
  const { name, user } = req.body;

  userModel
    .findById({ _id: user })
    .then((result) => {
      if (result) {
        const newTask = new taskModel({
          name,
          user,
        });

        newTask
          .save()
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((err) => {
            res.status(400).send(err);
          });
      } else res.status(400).json("User not found");
    })
    .catch((err) => {
      res.status(400).json("User not found");
    });
};

module.exports = { todos, todo, todosDel, todoUpdate, todoDel, create };
