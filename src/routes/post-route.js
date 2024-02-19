const { Router } = require("express");
const { validatePost } = require("../middlewares/validations/post-validate");
const {
  createPost,
  getAllpost,
  deletePost,
  getPostWithComment,
  appealPost,
  getAppealPost,
} = require("../controller/post-controller");
const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authenticate");
const {
  validatePostId,
} = require("../middlewares/validations/postid-validate");

const router = Router();

router.post("/", authenticate, upload.array("image"), validatePost, createPost);

router.get("/", getAllpost);

router.delete("/:postId", authenticate, validatePostId, deletePost);

router.get("/:postId/comment", validatePostId, getPostWithComment);

router.post("/:postId/appeal", authenticate, validatePostId, appealPost);

router.get("/appealed", authenticate, getAppealPost);

module.exports = router;
