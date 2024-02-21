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

const router = Router();

router.post("/:postId", validatePostId, appealPost);

router.get("/", getAppealPost);

router.delete("/:appealPostId", validateAppealPostId, deleteAppealPost);

module.exports = router;
