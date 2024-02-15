const fs = require("fs/promises");
const {
  findUserProfileById,
  createUserProfile,
  updateUserProfileById,
} = require("../service/user-service");
const createError = require("../utilitys/createError");
const { upload } = require("../service/upload-service");

exports.updateUserProfile = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.file);
    const profileImage = await upload(req.file.path);
    const data = { ...req.body, userId: req.user.id, profileImage };

    const existUserProfile = await findUserProfileById(req.user.id);
    console.log(existUserProfile);
    if (!existUserProfile) {
      const userProfile = await createUserProfile(data);
      res.status(200).json({ userProfile: userProfile });
    } else {
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
    fs.unlink(req.file.path);
  }
  //   res.status(400).json({ message: "user error" });
};
