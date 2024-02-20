const Joi = require("joi");

const appealPostIdSchema = Joi.object({
  appealPostId: Joi.number().required().positive(),
});

exports.validateAppealPostId = (req, res, next) => {
  const { value, error } = appealPostIdSchema.validate(req.params);

  if (error) throw error;

  req.appealPostId = value.appealPostId;
  next();
};
