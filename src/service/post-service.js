const prisma = require("../model/prisma");

exports.createPostByUser = (data) => prisma.post.create({ data });

exports.createImageForPost = (data) => prisma.postImage.create({ data });
