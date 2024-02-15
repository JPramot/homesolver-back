const { Router } = require("express");
const { validatePost } = require("../middlewares/validations/post-validate");
const { createPost, getAllpost } = require("../controller/post-controller");
const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authenticate");

const router = Router();

router.post("/", authenticate, upload.array("image"), validatePost, createPost);

router.get("/", getAllpost);
//
module.exports = router;
