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
