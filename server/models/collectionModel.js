const mongoose = require("mongoose");

const CollectionSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
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
