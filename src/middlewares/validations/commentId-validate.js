const Joi = require("joi");

const commentIdSchema = Joi.object({
  commentId: Joi.number().required().positive(),
  postId: Joi.number().required().positive(),
});

exports.validateCommentId = (req, res, next) => {
  const { value, error } = commentIdSchema.validate(req.params);
  if (error) throw error;
  req.commentId = value.commentId;
  req.postId = value.postId;
  next();
};
