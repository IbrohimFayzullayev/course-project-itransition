const Likes = require("../models/likesModel");

exports.addLike = async (req, res) => {
  try {
    await Likes.create({
      user_id: req.body.userId,
      item_id: req.body.itemId,
    });
    res.status(200).json({ status: "success", created: true });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.removeLike = async (req, res) => {
  try {
    const data = await Likes.deleteOne({ user_id: req.body.id });
    console.log(data);
    res.status(200).json({ status: "success", deleted: true });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
