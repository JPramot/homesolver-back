const Joi = require("joi");

const schemaPost = Joi.object({
  title: Joi.string().required().trim().message({
    "string.empty": "title is required",
    "any.required": "title is required",
  }),
  content: Joi.string().required().trim().message({
    "string.empty": "content is required",
    "any.required": "content is required",
  }),
});

exports.validatePost = (req, res, next) => {
  const { error } = schemaPost.validate(req.body);
  if (error) throw error;
  next();
};
