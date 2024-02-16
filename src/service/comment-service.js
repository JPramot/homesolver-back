const prisma = require("../model/prisma");

exports.createComment = (data) => prisma.comment.create({ data });
