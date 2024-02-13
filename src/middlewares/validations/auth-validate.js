const validate = require("./validate");
const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string()
    .required()
    .trim()
    .pattern(/^[a-zA-Z0-9]{6,}$/)
    .message({
      "string.empty": "username is required",
      "any.required": "username is required",
    }),
  email: Joi.string()
    .required()
    .trim()
    .email({ tlds: ["com"] })
    .message({
      "string.empty": "email is required",
      "any.required": "email is required",
    }),
  password: Joi.string()
    .required()
    .trim()
    .pattern(/^[a-zA-Z0-9]{8,}$/)
    .message({
      "string.empty": "password is required",
      "any.required": "password is required",
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "string.empty": "confirm password is required",
      "any.required": "confirm password is required",
      "any.only": "password and confirm password did not match",
    })
    .strip(),
  role: Joi.forbidden(),
});

const loginSchema = Joi.object({
  username: Joi.string()
    .required()
    .trim()
    .pattern(/^[a-zA-Z0-9]{6,}$/)
    .message({
      "string.empty": "username is required",
      "any.required": "username is required",
    }),
  password: Joi.string()
    .required()
    .trim()
    .pattern(/^[a-zA-Z0-9]{8,}$/)
    .message({
      "string.empty": "password is required",
      "any.required": "password is required",
    }),
});

exports.validateRegister = validate(registerSchema);

exports.validateLogin = validate(loginSchema);
