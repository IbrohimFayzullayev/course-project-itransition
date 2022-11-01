const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const User = require("../models/userModel");
const catchAsync = require("../utility/catchAsync");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.findOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
const handleErrors = (err) => {
  let errors = { email: "", password: "", active: "" };

  if (err.message === "block") {
    errors.active = "That user is blocked";
  }

  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "ibrohimsupersecretkeydsabksabdkjasbdkasjdsakjs", {
    expiresIn: maxAge,
  });
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role, active } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role,
      active,
    });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      maxAge: 10 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    res.status(201).json({ user: user._id, created: true });
  } catch (error) {
    const errors = handleErrors(error);
    res.json({ errors, created: false });
  }
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    console.log(req.body);
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      maxAge: 10 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    res.status(200).json({ status: "succes", user_id: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
});
exports.protect = catchAsync(async (req, res, next) => {
  // console.log(req);
  console.log(req.headers.authorization);
  let token = req.headers.authorization;
  if (token.split(" ")[0] === "Bearer" && token.split(" ")[1])
    token = req.headers.authorization.split(" ")[1];
  else return next(new AppError("Token not found", 401));
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const time = new Date().getTime();
  if (!decoded || !(decoded.exp <= time)) {
    return next(new AppError("Token is not valid", 401));
  }
  const user = await User.findOne({
    attributes: ["id", "email", "password", "username", "role"],
    where: {
      id: decoded.id,
    },
  });
  if (!user) {
    return new AppError("User not found", 404);
  }
  console.log(user);
  // req.user = user;

  res.status(200).json({
    status: "succes",
    data: user,
  });
});

// exports.protect = catchAsync(async (req, res, next) => {
//   console.log(req.headers.authorization);
//   let token = req.headers.authorization;
//   if (token.split(" ")[0] === "Bearer" && token.split(" ")[1])
//     token = req.headers.authorization.split(" ")[1];
//   else return next(new AppError("Token not found", 401));
//   const decoded = await jwt.verify(token, process.env.JWT_SECRET);

//   const time = new Date().getTime();
//   if (!decoded || !(decoded.exp <= time)) {
//     return next(new AppError("Token is not valid", 401));
//   }
//   const user = await User.findOne({
//     attributes: ["id", "email", "password", "username", "role"],
//     where: {
//       id: decoded.id,
//     },
//   });
//   if (!user) {
//     return new AppError("User not found", 404);
//   }
//   req.user = user;
//   next();
// });
