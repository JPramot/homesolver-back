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

const router = Router();

router.post("/:postId", validatePostId, postComment);

router.delete("/:commentId/:postId", validateCommentId, deleteComment);

module.exports = router;
