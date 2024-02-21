const prisma = require("../model/prisma");

exports.findUserByUsername = (username) =>
  prisma.user.findFirst({
    where: { username },
    include: { userProfile: true },
  });

exports.findUserByEmail = (email) =>
  prisma.user.findFirst({ where: { email } });

exports.createUser = (data) => prisma.user.create({ data });

exports.findUserById = (id) =>
  prisma.user.findFirst({ where: { id }, include: { userProfile: true } });

exports.findUserProfileById = (userId) =>
  prisma.userProfile.findFirst({ where: { userId } });

exports.createUserProfile = (data) => prisma.userProfile.create({ data });

exports.updateUserProfileById = (data, id) =>
  prisma.userProfile.update({ data, where: { id } });

exports.findUserProfileAndAllPost = (id) =>
  prisma.userProfile.findFirst({
    where: { userId: id },
    include: { user: { select: { posts: { include: { comments: true } } } } },
  });
