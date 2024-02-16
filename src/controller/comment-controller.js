const { createComment } = require("../service/comment-service");
const { findPostByPostId } = require("../service/post-service");
const catchError = require("../utilitys/catchError");
const createError = require("../utilitys/createError");

exports.postComment = catchError(async (req, res, next) => {
  const data = { ...req.body, postId: req.postId, userId: req.user.id };
  const existPost = await findPostByPostId(req.postId);
  if (!existPost) createError(400, "post not found");

  const comment = await createComment(data);
  res.status(201).json({ comment });
});
