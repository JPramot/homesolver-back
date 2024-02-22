const createError = require("../utilitys/createError");

exports.userAuthenticate = (req, res, next) => {
  if (req.user.role !== "user") createError(403, "Forbidden");
  next();
};

exports.checkPermission =
  (...roles) =>
  (req, res, next) => {
    console.log(roles.includes(req.user.role));
    if (!roles.includes(req.user.role)) createError(403, "Forbidden");
    next();
  };
