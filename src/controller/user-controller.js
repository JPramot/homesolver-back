const fs = require("fs/promises");
const {
  findUserProfileById,
  createUserProfile,
  updateUserProfileById,
  findUserById,
  findUserProfileAndAllPost,
} = require("../service/user-service");
const createError = require("../utilitys/createError");
const { upload } = require("../service/upload-service");
const {
  userProfileData,
} = require("../middlewares/validations/userprofile-validate");
const catchError = require("../utilitys/catchError");

exports.updateUserProfile = async (req, res, next) => {
  try {
    let data = userProfileData(req.body);
    data = { ...data, userId: req.user.id };
    if (req.body.birthDate) {
      const date = new Date(req.body.birthDate);
      delete data.birthDate;
      data = { ...data, birthDate: date };
    }
    if (req.file) {
      const profileImage = await upload(req.file.path);
      if (!profileImage) createError(500, "server for cloud picture error");
      else data = { ...data, profileImage };
    }

    const existUserProfile = await findUserProfileById(req.user.id);
    if (!existUserProfile) {
      const userProfile = await createUserProfile(data);
      res.status(200).json({ userProfile: userProfile });
    } else {
      delete data.userId;
      const userProfile = await updateUserProfileById(
        data,
        existUserProfile.id
      );
      res.status(200).json({ userProfile: userProfile });
    }
  } catch (err) {
    createError(400, err);
    console.log(err);
  } finally {
    if (req.file) fs.unlink(req.file?.path);
  }
};

exports.getUserProfileAndAllPost = catchError(async (req, res, next) => {
  const existUser = await findUserById(req.userId);
  if (!existUser) createError(400, "User not found");
  const existUserProfileAndAllPost = await findUserProfileAndAllPost(
    req.userId
  );
  res.status(200).json({ userProfile: existUserProfileAndAllPost });
});
