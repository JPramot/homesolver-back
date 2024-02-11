const prisma = require("../model/prisma");

exports.findUserByUsername = (username) =>
  prisma.user.findFirst({ where: { username } });

exports.findUserByEmail = (email) =>
  prisma.user.findFirst({ where: { email } });

exports.createUser = (data) => prisma.user.create({ data });
