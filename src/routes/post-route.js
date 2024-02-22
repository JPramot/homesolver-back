const { Router } = require("express");
const { validatePost } = require("../middlewares/validations/post-validate");
const {
  createPost,
  getAllpost,
  deletePost,
  getPostWithComment,
  editPost,
} = require("../controller/post-controller");
const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authenticate");
const {
  validatePostId,
} = require("../middlewares/validations/postid-validate");
const {
  userAuthenticate,
  checkPermission,
} = require("../middlewares/role-authenticate");

const router = Router();

router.post(
  "/",
  authenticate,
  userAuthenticate,
  upload.array("image"),
  validatePost,
  createPost
);

router.get("/", getAllpost);

router.delete("/:postId", authenticate, validatePostId, deletePost);

router.get("/:postId/comment", validatePostId, getPostWithComment);

router.patch(
  "/:postId/",
  authenticate,
  checkPermission("user"),
  upload.array("image"),
  validatePostId,
  editPost
);

module.exports = router;
