const {
  createComment,
  findCommentByCommentId,
  deleteCommentByCommentId,
} = require("../service/comment-service");
const { findPostByPostId } = require("../service/post-service");
const catchError = require("../utilitys/catchError");
const createError = require("../utilitys/createError");

exports.postComment = catchError(async (req, res, next) => {
  const data = { ...req.body, postId: req.postId, userId: req.user.id };
  const existPost = await findPostByPostId(req.postId);
  if (!existPost) createError(400, "post not found");

  const comment = await createComment(data);

  const existComment = await findCommentByCommentId(comment.id);
  res.status(201).json({ comment: existComment });
});

exports.deleteComment = catchError(async (req, res, next) => {
  const existPost = await findPostByPostId(req.postId);
  if (!existPost) createError(400, "post not found");
  const existComment = await findCommentByCommentId(req.commentId);
  if (!existComment) createError(400, "comment not found");
  await deleteCommentByCommentId(req.commentId, req.postId, req.user.id);
  console.log(res);
  res.status(204).json({});
});
