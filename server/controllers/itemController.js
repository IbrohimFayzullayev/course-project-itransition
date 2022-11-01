const jwt = require("jsonwebtoken");
const Items = require("../models/itemModel");
const User = require("../models/userModel");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "ibrohim super secret key", {
    expiresIn: maxAge,
  });
};
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
exports.createItem = async (req, res) => {
  try {
    const UserId = parseJwt(req.headers.authorization);
    const user = await User.findById(UserId.id);

    const item = await Items.create({
      name: req.body.name,
      description: req.body.description,
      col_name: req.body.col_name,
      collection_id: req.body.collection_id,
      user_name: user.name,
      user_id: UserId.id,
    });
    createToken(item._id);

    res.status(200).json({ status: "success", item: item._id, created: true });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getItems = async (req, res) => {
  try {
    const col_id = req.headers.collectionid;
    const items = await Items.find();
    const data = items.filter((item) => item.collection_id === col_id);
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Items.deleteOne({ _id: req.params.id });
    res.status(200).json({ status: "success", deleted: true });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const data = await Items.find();
    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    console.log(req.body);
    // const data = await Items.findByIdAndUpdate();
    const item = await Items.findById(req.body.itemId);
    console.log(item);
    const obj = {
      comments: [],
      ...item,
    };
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
