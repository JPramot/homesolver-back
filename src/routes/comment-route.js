const { Router } = require("express");
const {
  validatePostId,
} = require("../middlewares/validations/postid-validate");
const {
  postComment,
  deleteComment,
} = require("../controller/comment-controller");
const {
  validateCommentId,
} = require("../middlewares/validations/commentId-validate");
const { checkPermission } = require("../middlewares/role-authenticate");

const router = Router();

router.post("/:postId", checkPermission("user"), validatePostId, postComment);

router.delete(
  "/:commentId/:postId",
  checkPermission("user"),
  validateCommentId,
  deleteComment
);

module.exports = router;
