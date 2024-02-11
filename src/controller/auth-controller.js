const { hash } = require("../service/hash-service");
const { sign } = require("../service/jwt-service");
const {
  findUserByUsername,
  findUserByEmail,
  createUser,
} = require("../service/user-service");
const catchError = require("../utilitys/catchError");
const createError = require("../utilitys/createError");

exports.register = catchError(async (req, res, next) => {
  const existUsername = await findUserByUsername(req.body.username);
  if (existUsername) createError(400, "username was used");
  const existEmail = await findUserByEmail(req.body.email);
  if (existEmail) createError(400, "email was used");
  req.body.password = await hash(req.body.password);
  const newUser = await createUser(req.body);
  const payload = { id: newUser.id, role: newUser.role };
  const token = sign(payload);
  delete newUser.password;
  res.status(200).json({ token, user: newUser });
});
