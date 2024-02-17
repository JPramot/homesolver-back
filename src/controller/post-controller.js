const catchError = require("../utilitys/catchError");
const imageSchema = require("../middlewares/validations/image-validate");
const { upload } = require("../service/upload-service");
const fs = require("fs/promises");
const {
  createPostByUser,
  createImageForPost,
  findAllPost,
  findPostByPostId,
  deletePostByPostId,
  findImagePostByPostId,
  deleteImagePostByPostId,
  getPostAndCommentByPostId,
  findAppealPostByUserAndPostId,
  createAppealPost,
} = require("../service/post-service");
const createError = require("../utilitys/createError");

exports.createPost = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.body, "test req body");
    console.log(req.files);
    // delete req.body.image;
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

exports.deletePost = catchError(async (req, res, next) => {
  const existPost = await findPostByPostId(req.postId);
  if (!existPost) createError(400, "post not found");
  const existImagePost = await findImagePostByPostId(req.postId);
  if (existImagePost.length > 0) await deleteImagePostByPostId(req.postId);
  await deletePostByPostId(req.postId);
  res.status(204).json({});
});

exports.getPostWithComment = catchError(async (req, res, next) => {
  const existPost = await getPostAndCommentByPostId(req.postId);
  console.log(existPost);
  if (!existPost) createError(400, "post not found");
  res.status(200).json({ post: existPost });
});

exports.appealPost = catchError(async (req, res, next) => {
  const existPost = await findPostByPostId(req.postId);
  if (!existPost) createError(400, "post not found");
  const existAppealPost = await findAppealPostByUserAndPostId(
    req.user.id,
    req.postId
  );
  if (existAppealPost) createError(400, "you was already appealed this post");
  const data = { ...req.body, userId: req.user.id, postId: req.postId };
  await createAppealPost(data);
  res.status(200).json({ message: "post was appealed" });
});
