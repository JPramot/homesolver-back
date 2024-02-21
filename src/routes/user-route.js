const { Router } = require("express");
const upload = require("../middlewares/upload");
const {
  updateUserProfile,
  getUserProfileAndAllPost,
} = require("../controller/user-controller");
const {
  validateUserId,
} = require("../middlewares/validations/userId-validate");
const authenticate = require("../middlewares/authenticate");

const router = Router();

router.patch(
  "/",
  authenticate,
  upload.single("profileImage"),
  updateUserProfile
);

router.get("/profile/:userId", validateUserId, getUserProfileAndAllPost);

module.exports = router;
