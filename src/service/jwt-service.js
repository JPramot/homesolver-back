const jwt = require("jsonwebtoken");

const secret = process.env.SECRET || "asdfjkl";

const expire = process.env.EXPIRE || "25d";

exports.sign = (payload) => jwt.sign(payload, secret, { expiresIn: expire });

exports.verify = (token) => jwt.verify(token, secret);
