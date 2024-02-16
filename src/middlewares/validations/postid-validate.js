const Joi = require("joi");

const postIdSchema = Joi.object({
  postId: Joi.number().positive().required(),
});

exports.validatePostId = (req, res, next) => {
  console.log(req.params);
  const { value, error } = postIdSchema.validate(req.params);
  if (error) throw error;

  req.postId = value.postId;
  next();
};
