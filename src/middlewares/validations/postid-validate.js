const Joi = require("joi");

const postIdSchema = Joi.object({
  postId: Joi.number().positive().required(),
});

exports.validatePostId = (req, res, next) => {
  const { value, error } = postIdSchema.validate(req.params);
  if (error) throw error;

  req.postId = value.postId;
  next();
};
