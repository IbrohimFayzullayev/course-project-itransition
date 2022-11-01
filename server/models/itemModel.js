const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxlength: [40, "name must be at most 40 characters"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  user_id: {
    type: String,
    required: [true, "User id is required"],
  },
  collection_id: {
    type: String,
    required: [true, "Collection id is required"],
  },
  user_name: {
    type: String,
    required: [true, "Author name is required"],
  },
  col_name: {
    type: String,
    required: [true, "Collection name is required"],
  },
  comments: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Items = mongoose.model("Items", ItemSchema);
module.exports = Items;
