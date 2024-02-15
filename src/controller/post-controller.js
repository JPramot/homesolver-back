const catchError = require("../utilitys/catchError");
const imageSchema = require("../middlewares/validations/image-validate");
const { upload } = require("../service/upload-service");
const fs = require("fs/promises");
const {
  createPostByUser,
  createImageForPost,
  findAllPost,
} = require("../service/post-service");
const createError = require("../utilitys/createError");

exports.createPost = async (req, res, next) => {
  try {
    console.log(req.body, "test req body");
    delete req.body.image;
    const postData = { ...req.body, userId: req.user.id };
    const newPost = await createPostByUser(postData);
    const postImage = [];

    if (req.files.length > 0) {
      const { error } = imageSchema.validate(req.files);
      if (error) {
        throw error;
      }
      let data = { postId: newPost.id };
      for (image of req.files) {
        data.image = await upload(image.path);
        const linkImage = await createImageForPost(data);
        // console.log(linkImage, "kkkkkkkk");
        postImage.push(linkImage);
      }
    }
    console.log(postImage);
    res.status(200).json({ post: { ...newPost, postImage } });
  } catch (err) {
    console.log(err);
    createError(400, err);
  } finally {
    for (image of req.files) {
      fs.unlink(image.path);
    }
  }
};

exports.getAllpost = catchError(async (req, res, next) => {
  const allPost = await findAllPost();
  res.status(200).json({ posts: allPost });
});
