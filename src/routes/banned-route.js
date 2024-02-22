const { Router } = require("express");
const {
  validateUserId,
} = require("../middlewares/validations/userId-validate");
const {
  banUser,
  unBanUser,
  getAllBannedUser,
} = require("../controller/ban-controller");
const { checkPermission } = require("../middlewares/role-authenticate");

const router = Router();

router.patch("/:userId", checkPermission("admin"), validateUserId, banUser);

router.patch(
  "/:userId/unbanned",
  checkPermission("admin"),
  validateUserId,
  unBanUser
);

router.get("/", checkPermission("admin"), getAllBannedUser);

module.exports = router;
