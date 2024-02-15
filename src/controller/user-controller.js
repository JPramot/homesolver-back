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
    let data = { ...req.body, userId: req.user.id };
    console.log(data);
    if (req.body.birthDate) {
      const date = new Date(req.body.birthDate);
      delete data.birthDate;
      data = { ...data, birthDate: date };
    }

    if (req.file) {
      console.log("upload");
      const profileImage = await upload(req.file.path);
      data = { ...data, profileImage };
    }
    console.log("before doing");

    const existUserProfile = await findUserProfileById(req.user.id);
    console.log(existUserProfile);
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
  //   res.status(400).json({ message: "user error" });
};
