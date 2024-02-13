const { hash, compare } = require("../service/hash-service");
const { sign } = require("../service/jwt-service");
const {
  findUserByUsername,
  findUserByEmail,
  createUser,
} = require("../service/user-service");
const catchError = require("../utilitys/catchError");
const createError = require("../utilitys/createError");

exports.register = catchError(async (req, res, next) => {
  const existUserByUsername = await findUserByUsername(req.body.username);
  if (existUserByUsername) createError(400, "username was used");
  const existUserByEmail = await findUserByEmail(req.body.email);
  if (existUserByEmail) createError(400, "email was used");
  req.body.password = await hash(req.body.password);
  const newUser = await createUser(req.body);
  const payload = { id: newUser.id, role: newUser.role };
  const token = sign(payload);
  delete newUser.password;
  res.status(200).json({ token, user: newUser });
});

exports.login = catchError(async (req, res, next) => {
  const existUserByUsername = await findUserByUsername(req.body.username);
  if (!existUserByUsername) createError(400, "invalid username or passoword");
  const isMatchPassword = await compare(
    req.body.password,
    existUserByUsername.password
  );
  if (!isMatchPassword) createError(400, "invalid username or password");
  const payload = {
    id: existUserByUsername.id,
    role: existUserByUsername.role,
  };
  const token = sign(payload);
  delete existUserByUsername.password;
  res.status(200).json({ user: existUserByUsername, token });
});

exports.getMe = catchError(async (req, res, next) => {
  res.status(200).json({ user: req.user });
});
