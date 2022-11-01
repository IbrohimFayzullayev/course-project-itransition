const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  item_id: {
    type: String,
    required: [true, "Item id is required"],
  },
  author_id: {
    type: String,
    required: [true, "User id is required"],
  },
  author_name: {
    type: String,
    required: [true, "Author name is requred"],
  },
  comment: {
    type: String,
    required: [true, "Comment is requred"],
  },
});

const Comments = mongoose.model("Comments", CommentSchema);
module.exports = Comments;
