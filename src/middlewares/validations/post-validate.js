const Joi = require("joi");
const validate = require("./validate");

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
  // console.log(req.body);
  // console.log("5555");
  console.log("______________", req.files, "_______________");
  console.log(req.body);
  // if (req.body.image) {
  //   req.files = req.body.image;
  //   delete req.body.image;
  // }
  const { error } = schemaPost.validate(req.body);
  if (error) throw error;
  // console.log("err");
  next();
};

// exports.validatePost = validate(schemaPost);
