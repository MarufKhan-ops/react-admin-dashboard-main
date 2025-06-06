import TasksModel from "../model/TasksModel.js";
import mongoose from "mongoose";

export const CreateTask = async (req, res) => {
  try {
    let user_id = req.headers["user_id"];
    let reqBody = req.body;
    reqBody.user_id = user_id;
    await TasksModel.create(reqBody);
    res.json({ status: "success", Message: "User Update successfully" });
  } catch (err) {
    return res.json({ status: "failed", Message: err.toString() });
  }
};

export const UpdateTaskStatus = async (req, res) => {
  try {
    let id = req.params.id;
    let status = req.params.status;
    let user_id = req.headers["user_id"];

    await TasksModel.updateOne(
      { _id: id, user_id: user_id },
      {
        status: status,
      },
    );
    res.json({ status: "success", Message: "Task Update successfully" });
  } catch (err) {
    return res.json({ status: "failed", Message: err.toString() });
  }
};

export const TaskListByStatus = async (req, res) => {
  try {
    let status = req.params.status;
    let user_id = req.headers["user_id"];
    let data = await TasksModel.find({ user_id: user_id, status: status });
    return res.json({
      status: "success",
      data: data,
      Message: "Task Update successfully",
    });
  } catch (err) {
    return res.json({ status: "failed", Message: err.toString() });
  }
};

export const DeleteTask = async (req, res) => {
  try {
    let id = req.params.id;
    let user_id = req.headers["user_id"];
    let data = await TasksModel.deleteOne({ user_id: user_id, _id: id });
    return res.status(200).json({ message: "Delete Task successfully." });
  } catch (err) {
    return res.json({ status: "failed", Message: err.toString() });
  }
};

export const CountTask = async (req, res) => {
  let ObjectID = mongoose.Types.ObjectId;
  let user_id = req.headers["user_id"];
  let user_id_object = new ObjectID(req.headers["user_id"]);
  let data = await TasksModel.aggregate([
    { $match: { user_id: ObjectID } },
    { $group: { _id: "$status", sum: { $count: {} } } },
  ]);
  return res.json({
    status: "success",
    data: data,
    Message: "Task count successfully",
  });
};
