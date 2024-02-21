const {
  findAllAppealPost,
  createAppealPost,
  findAppealPostByUserAndPostId,
  findAppealPostById,
  deleteAppealPostById,
} = require("../service/appeal-service");
const { findPostByPostId } = require("../service/post-service");
const catchError = require("../utilitys/catchError");
const createError = require("../utilitys/createError");

exports.appealPost = catchError(async (req, res, next) => {
  const existPost = await findPostByPostId(req.postId);
  if (!existPost) createError(400, "post not found");
  const existAppealPost = await findAppealPostByUserAndPostId(
    req.user.id,
    req.postId
  );
  if (existAppealPost) createError(400, "you was already appealed this post");
  const data = { ...req.body, userId: req.user.id, postId: req.postId };
  await createAppealPost(data);
  res.status(200).json({ message: "post was appealed" });
});

exports.getAppealPost = catchError(async (req, res, next) => {
  if (req.user.role !== "admin") createError(401, "You're not admin");
  const appealPost = await findAllAppealPost();
  res.status(200).json({ appealPost });
});

exports.deleteAppealPost = catchError(async (req, res, next) => {
  if (req.user.role !== "admin") createError(400, "You're not admin");
  const existAppealPost = await findAppealPostById(req.appealPostId);
  if (!existAppealPost) createError(400, "Appeal post not found");
  await deleteAppealPostById(req.appealPostId);
  res.status(204).json({});
});
