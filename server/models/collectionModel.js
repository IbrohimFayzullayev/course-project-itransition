const mongoose = require("mongoose");

const CollectionSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minlength: [5, "name must be at least 5 characters"],
    maxlength: [40, "name must be at most 40 characters"],
  },
  user_id: {
    type: String,
    required: [true, "user_id is required"],
  },
  description: {
    type: String,
  },
});

const Collection = mongoose.model("Collection", CollectionSchema);
module.exports = Collection;
