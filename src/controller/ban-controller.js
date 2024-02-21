const {
  bannedUserById,
  unbannedUserById,
  findAllBannedUser,
} = require("../service/ban-service");
const { findUserById } = require("../service/user-service");
const catchError = require("../utilitys/catchError");
const createError = require("../utilitys/createError");

exports.banUser = catchError(async (req, res, next) => {
  if (req.user.role !== "admin") createError(401, "You're not admin");
  const existUser = await findUserById(req.userId);
  if (!existUser) createError(400, "User not found");
  if (existUser.isBan == true) createError(400, "User already banned");
  await bannedUserById(req.userId);
  res.status(200).json({ message: "User was banned" });
});

exports.unBanUser = catchError(async (req, res, next) => {
  if (req.user.role !== "admin") createError(401, "You're not admin");
  const existUser = await findUserById(req.userId);
  if (!existUser) createError(400, "User not found");
  if (existUser.isBan == false) createError(400, "User already unbanned");
  await unbannedUserById(req.userId);
  res.status(200).json({ message: "User was unbanned" });
});

exports.getAllBannedUser = catchError(async (req, res, next) => {
  if (req.user.role !== "admin") createError(401, "You're not admin");
  const existBannedUser = await findAllBannedUser();
  res.status(200).json({ bannedUser: existBannedUser });
});
