const { Router } = require("express");
const { validatePost } = require("../middlewares/validations/post-validate");
const {
  createPost,
  getAllpost,
  deletePost,
  getPostWithComment,
  // appealPost,
  // getAppealPost,
  editPost,
} = require("../controller/post-controller");
const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authenticate");
const {
  validatePostId,
} = require("../middlewares/validations/postid-validate");
const {
  ValidatepostImageId,
} = require("../middlewares/validations/postImageId-validate");

const router = Router();

router.post("/", authenticate, upload.array("image"), validatePost, createPost);

router.get("/", getAllpost);

router.delete("/:postId", authenticate, validatePostId, deletePost);

router.get("/:postId/comment", validatePostId, getPostWithComment);

router.patch(
  "/:postId/",
  authenticate,
  upload.array("image"),
  validatePostId,
  editPost
);

module.exports = router;
