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
  findPostImagebyId,
  deletePostImagebyId,
  editPostById,
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
        postImage.push(linkImage);
      }
    }
    console.log(newPost);
    res.status(201).json({ post: { ...newPost, postImage } });
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
  if (existPost.userId !== req.user.id && req.user.role !== "admin")
    createError(400, "not authorized");
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

exports.editPost = async (req, res, next) => {
  try {
    console.log("controller");
    console.log(req.params);
    console.log(req.body);
    console.log(req.files);
    const existPost = await findPostByPostId(req.postId);
    if (!existPost) createError(400, "post not found");
    if (existPost.userId !== req.user.id)
      createError(400, "You can't edit this post");
    if (req.body.deleteImage) {
      let imageId = req.body.deleteImage.split(",").map((el) => Number(el));
      console.log(imageId, "testtttttttttttttttttttt");
      for (id of imageId) {
        const existPostImage = await findPostImagebyId(id);
        if (!existPostImage) createError(400, "Post image not found");
        await deletePostImagebyId(id);
      }
    }
    delete req.body.deleteImage;
    const post = await editPostById(req.body, req.postId);
    const postImage = [];
    if (req.files.length > 0) {
      const { error } = imageSchema.validate(req.files);
      if (error) {
        throw error;
      }
      let data = { postId: post.id };
      for (images of req.files) {
        data.image = await upload(images.path);
        linkImage = await createImageForPost(data);
        postImage.push(linkImage);
      }
    }
    res.status(200).json({ test: "test" });
  } catch (err) {
    console.log(err);
    createError(400, err);
  } finally {
    for (images of req.files) {
      fs.unlink(images.path);
    }
  }
};
