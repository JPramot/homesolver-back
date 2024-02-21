const prisma = require("../model/prisma");

exports.bannedUserById = (id) =>
  prisma.user.update({ data: { isBan: true }, where: { id } });

exports.unbannedUserById = (id) =>
  prisma.user.update({ data: { isBan: false }, where: { id } });

exports.findAllBannedUser = () =>
  prisma.user.findMany({ where: { isBan: true } });
