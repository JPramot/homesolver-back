const Joi = require("joi");

const postImageIdSchema = Joi.object({
  postImageId: Joi.string(),
  postId: Joi.number().positive().required(),
});

exports.ValidatepostImageId = (req, res, next) => {
  const { value, error } = postImageIdSchema.validate(req.params);
  if (error) throw error;

  req.postId = value.postId;
  req.postImageId = value.postImageId;
  next();
};
