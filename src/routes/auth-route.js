const { Router } = require("express");
const {
  validateRegister,
  validateLogin,
} = require("../middlewares/validations/auth-validate");
const { register, login } = require("../controller/auth-controller");

const router = Router();

router.post("/register", validateRegister, register);

router.post("/login", validateLogin, login);

module.exports = router;
