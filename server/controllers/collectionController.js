const jwt = require("jsonwebtoken");
const Collection = require("../models/collectionModel");
const Items = require("../models/itemModel");

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

exports.createCollection = async (req, res) => {
  try {
    const UserId = parseJwt(req.headers.authorization);
    const { name, description } = req.body;
    const collection = await Collection.create({
      name,
      user_id: UserId.id,
      description,
    });

    createToken(collection._id);

    res.status(201).json({ collection: collection._id, created: true });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getCollections = async (req, res) => {
  try {
    const UserId = parseJwt(req.headers.authorization);
    const collections = await Collection.find();
    const data = collections.filter((val) => val.user_id === UserId.id);
    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getAllCollection = async (req, res) => {
  try {
    const data = await Collection.find();
    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.deleteOneCollection = async (req, res) => {
  try {
    await Items.deleteMany({ collection_id: req.params.id });
    await Collection.deleteOne({ _id: req.params.id });
    res.status(200).json({ status: "success", deleted: true });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
