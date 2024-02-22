const { Router } = require("express");
const {
  validatePostId,
} = require("../middlewares/validations/postid-validate");
const {
  validateAppealPostId,
} = require("../middlewares/validations/appealPostId-validate");
const {
  appealPost,
  getAppealPost,
  deleteAppealPost,
} = require("../controller/appeal-controller");
const { checkPermission } = require("../middlewares/role-authenticate");

const router = Router();

router.post("/:postId", checkPermission("user"), validatePostId, appealPost);

router.get("/", checkPermission("admin"), getAppealPost);

router.delete(
  "/:appealPostId",
  checkPermission("admin"),
  validateAppealPostId,
  deleteAppealPost
);

module.exports = router;
