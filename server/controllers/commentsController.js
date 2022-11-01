const jwt = require("jsonwebtoken");
const Comments = require("../models/commentsModel");
const Items = require("../models/itemModel");

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

exports.createComment = async (req, res) => {
  try {
    await Comments.create({
      item_id: req.body.itemId,
      author_id: req.body.userId,
      author_name: req.body.userName,
      comment: req.body.comment,
    });
    const com = await Comments.find({ item_id: req.body.itemId });
    console.log(com.length);
    const upt = await Items.findOneAndUpdate(
      { _id: req.body.itemId },
      { comments: com.length }
    );
    console.log(upt);
    res.status(200).json({ status: "success", created: true });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const data = await Comments.find();
    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comments.find({ item_id: req.headers.id });
    res.status(200).json({ status: "success", comments });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
