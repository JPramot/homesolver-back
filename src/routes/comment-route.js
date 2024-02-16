const { Router } = require("express");
const {
  validatePostId,
} = require("../middlewares/validations/postid-validate");
const { postComment } = require("../controller/comment-controller");

const router = Router();

router.post("/:postId", validatePostId, postComment);

module.exports = router;
