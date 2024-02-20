const prisma = require("../model/prisma");

exports.findAppealPostByUserAndPostId = (userId, postId) =>
  prisma.appealedPost.findFirst({ where: { userId, postId } });

exports.createAppealPost = (data) => prisma.appealedPost.create({ data });

exports.findAllAppealPost = () =>
  prisma.appealedPost.findMany({
    include: {
      post: { select: { title: true, content: true } },
      user: { select: { userProfile: true } },
    },
  });

exports.findAppealPostById = (id) =>
  prisma.appealedPost.findFirst({ where: { id } });

exports.deleteAppealPostById = (id) =>
  prisma.appealedPost.delete({ where: { id } });
