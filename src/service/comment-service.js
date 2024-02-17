const prisma = require("../model/prisma");

exports.createComment = (data) =>
  prisma.comment.create({
    data,
  });

exports.findCommentByCommentId = (id) =>
  prisma.comment.findFirst({
    where: { id },
    include: { user: { select: { id: true } } },
  });

exports.deleteCommentByCommentId = (id, postId, userId) =>
  prisma.comment.delete({
    where: { id, postId, OR: [{ userId }, { post: { userId } }] },
  });
