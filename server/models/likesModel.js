const mongoose = require("mongoose");

const LikesSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: [true, "User id is required"],
  },
  item_id: {
    type: String,
    required: [true, "Item is is required"],
  },
});

const Likes = mongoose.model("Likes", LikesSchema);
module.exports = Likes;
