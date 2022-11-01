module.exports.error = async (error, req, res, next) => {
  res.status(400).json({
    status: "error",
    message: error.message,
    stack: error.stack,
  });
};
