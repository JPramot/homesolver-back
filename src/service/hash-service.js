const bcrypt = require("bcryptjs");

exports.hash = (input) => bcrypt.hash(input, 10);

exports.compare = (text, code) => bcrypt.compare(text, code);
