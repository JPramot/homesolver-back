const prisma = require("../model/prisma");

exports.createComment = (data) =>
  prisma.comment.create({
    data,
  });

exports.findCommentByCommentId = (id) =>
  prisma.comment.findFirst({ where: { id } });

exports.deleteCommentByCommentId = (id, postId) =>
  prisma.comment.delete({ where: { id, postId } });
