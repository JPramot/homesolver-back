const prisma = require("../model/prisma");

exports.createPostByUser = (data) => prisma.post.create({ data });

exports.createImageForPost = (data) => prisma.postImage.create({ data });

exports.findAllPost = () =>
  prisma.post.findMany({
    include: {
      user: {
        select: {
          role: true,
          comments: true,
          userProfile: { select: { alias: true, profileImage: true } },
        },
      },
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
          user: {
            select: {
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
