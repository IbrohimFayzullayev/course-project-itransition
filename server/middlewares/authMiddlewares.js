const User = require("../models/userModel");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  // check json web token exists & is verified
  if (token) {
    jwt.verify(
      token,
      "ibrohimsupersecretkeydsabksabdkjasbdkasjdsakjs",
      (err, decodeToken) => {
        if (err) {
          console.log(err.message);
          res.redirect("/login");
        } else {
          console.log(decodeToken);
          next();
        }
      }
    );
  } else {
    res.redirect("/login");
  }
};

//check current user

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(
      token,
      "ibrohimsupersecretkeydsabksabdkjasbdkasjdsakjs",
      (err, decodeToken) => {
        if (err) {
          console.log(err.message);
          res.locals.user = null;
          next();
        } else {
          console.log(decodeToken);
          let user = User.findById(decodeToken.id);
          res.locals.user = user;
          next();
        }
      }
    );
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
