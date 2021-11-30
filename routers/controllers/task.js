const taskModel = require("./../../db/models/task");

const todos = (req, res) => {
  const { userId } = req.params;
  taskModel
    .find({ user: userId, isDel: false })
    .then((result) => {
      if (result) res.status(200).json(result);
      else res.status(200).json("this user not has any tasks");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
const todo = (req, res) => {
  const { userId, taskId } = req.body;
  taskModel
    .find({ _id: taskId, user: userId, isDel: false })
    .then((result) => {
      if (result) res.status(200).json(result);
      else res.status(400).send("user does not has this task");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
const todosDel = (req, res) => {
  const { userId } = req.body;
  taskModel
    .find({ user: userId, isDel: false })
    .then((result) => {
      if (result) {
        let doc = taskModel.updateMany(result, { isDel: true });

        res.status(200).json(doc);
      } else res.status(400).send("user does not has this task");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
const todoUpdate = (req, res) => {
  const { userId, taskId, taskName } = req.body;
  taskModel
    .findOne({ _id: taskId, user: userId, isDel: false })
    .then((result) => {
      if (result) {
        let doc = await taskModel.findOneAndUpdate(
          result,
          { name: taskName },
          {
            new: true,
          }
        );

        res.status(200).json(doc);
      } else res.status(400).send("user does not has this task");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
const todoDel = (req, res) => {
  const { userId, taskId } = req.body;
  taskModel
    .findOne({ _id: taskId, user: userId })
    .then((result) => {
      if (result) {
        let doc = await taskModel.findOneAndUpdate(
          result,
          { isDel: true },
          {
            new: true,
          }
        );

        res.status(200).json(doc);
      } else res.status(400).send("user does not has this task");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
const create = (req, res) => {
  const { name } = req.body;

  const newTask = new taskModel({
    name,
  });

  newTask
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = { todos, todo, todosDel, todoUpdate, todoDel, create };
