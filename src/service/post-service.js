const prisma = require("../model/prisma");

exports.createPostByUser = (data) => prisma.post.create({ data });

exports.createImageForPost = (data) => prisma.postImage.create({ data });

exports.findAllPost = () =>
  prisma.post.findMany({
    include: {
      user: {
        select: {
          role: true,
          userProfile: { select: { alias: true, profileImage: true } },
        },
      },
      comments: { select: { content: true } },
    },
    orderBy: { createdAt: "desc" },
  });

exports.findPostByPostId = (id) => prisma.post.findFirst({ where: { id } });

exports.findImagePostByPostId = (id) =>
  prisma.postImage.findMany({ where: { postId: id } });

exports.deletePostByPostId = (id) => prisma.post.delete({ where: { id } });

exports.deleteImagePostByPostId = (id) =>
  prisma.postImage.deleteMany({ where: { postId: id } });

exports.getPostAndCommentByPostId = (id) =>
  prisma.post.findFirst({
    where: { id },
    include: {
      comments: {
        select: {
          id: true,
          createdAt: true,
          content: true,
          postId: true,
          post: { select: { userId: true } },
          user: {
            select: {
              id: true,
              userProfile: { select: { alias: true, profileImage: true } },
            },
          },
        },
      },
      postImages: true,
      user: {
        select: {
          userProfile: { select: { alias: true, profileImage: true } },
          username: true,
        },
      },
    },
  });

exports.findAppealPostByUserAndPostId = (userId, postId) =>
  prisma.appealedPost.findFirst({ where: { userId, postId } });

exports.createAppealPost = (data) => prisma.appealedPost.create({ data });
