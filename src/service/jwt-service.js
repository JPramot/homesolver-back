const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "asdfjkl";

const expire = process.env.JWT_EXPIRE || 60 * 60 * 1000;

exports.sign = (payload) => jwt.sign(payload, SECRET, { expiresIn: expire });

exports.verify = (token) => jwt.verify(token, SECRET);
