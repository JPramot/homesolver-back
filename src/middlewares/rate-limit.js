const { rateLimit } = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 1000 * 60 * 10,
  limit: 100,
  message: "too many request",
});
