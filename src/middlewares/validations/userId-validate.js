const Joi = require("joi");

const userIdSchema = Joi.object({
  userId: Joi.number().positive().required(),
});

exports.validateUserId = (req, res, next) => {
  const { value, error } = userIdSchema.validate(req.params);
  if (error) throw error;

  req.userId = value.userId;
  next();
};
