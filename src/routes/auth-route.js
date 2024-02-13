const { Router } = require("express");
const {
  validateRegister,
  validateLogin,
} = require("../middlewares/validations/auth-validate");
const { register, login, getMe } = require("../controller/auth-controller");
const authenticate = require("../middlewares/authenticate");

const router = Router();

router.post("/register", validateRegister, register);

router.post("/login", validateLogin, login);

router.get("/me", authenticate, getMe);

module.exports = router;
