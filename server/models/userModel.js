const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minlength: [5, "name must be at least 5 characters"],
    maxlength: [40, "name must be at most 40 characters"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "password is required"],
  },

  role: {
    type: String,
    default: "user",
  },
  active: {
    type: Boolean,
    default: true,
  },
});

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = password === user.password;
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
