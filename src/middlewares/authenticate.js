const { verify } = require("../service/jwt-service");
const catchError = require("../utilitys/catchError");
const createError = require("../utilitys/createError");
const { findUserById } = require("../service/user-service");

const authenticate = catchError(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer")) {
    createError(401, "invalid authentication");
  }
  console.log("_________________", req.body);
  console.log(req.params);
  const token = authorization.split(" ")[1];
  const payload = verify(token);
  if (!payload.id) createError(401, "invalided authentication");

  const user = await findUserById(payload.id);
  if (!user) createError(401, "user not found");
  delete user.password;
  req.user = user;
  next();
});

module.exports = authenticate;
