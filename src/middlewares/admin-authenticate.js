const createError = require("../utilitys/createError");

exports.adminAuthenticate = (req, res, next) => {
  if (req.user.role !== "admin") createError(403, "Forbidden");
  next();
};
