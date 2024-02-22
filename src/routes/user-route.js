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
const { checkPermission } = require("../middlewares/role-authenticate");

const router = Router();

router.patch(
  "/",
  authenticate,
  checkPermission("user"),
  upload.single("profileImage"),
  updateUserProfile
);

router.get("/profile/:userId", validateUserId, getUserProfileAndAllPost);

module.exports = router;
