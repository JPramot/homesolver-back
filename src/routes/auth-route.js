const { Router } = require("express");
const {
  validateRegister,
} = require("../middlewares/validations/auth-validate");
const { register } = require("../controller/auth-controller");

const router = Router();

router.post("/register", validateRegister, register);

module.exports = router;
