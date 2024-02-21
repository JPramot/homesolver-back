const { Router } = require("express");
const {
  validateUserId,
} = require("../middlewares/validations/userId-validate");
const {
  banUser,
  unBanUser,
  getAllBannedUser,
} = require("../controller/ban-controller");

const router = Router();

router.patch("/:userId", validateUserId, banUser);

router.patch("/:userId/unbanned", validateUserId, unBanUser);

router.get("/", getAllBannedUser);

module.exports = router;
