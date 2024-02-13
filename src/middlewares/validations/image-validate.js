const Joi = require("joi");

// const imageSchema = Joi.object({
//   fieldname: Joi.string().required(),
//   originalname: Joi.string().required(),
//   encoding: Joi.string().required(),
//   mimetype: Joi.string()
//     .valid("image/jpeg", "image/png", "image/gif")
//     .required(),
//   size: Joi.number()
//     .min(1)
//     .max(1024 * 1024 * 10)
//     .required(),
// });

const imageSchema = Joi.array().items(
  Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/gif")
      .required(),
    size: Joi.number()
      .min(1)
      .max(1024 * 1024 * 10)
      .required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
  })
);

module.exports = imageSchema;
