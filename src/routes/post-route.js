const { Router } = require("express");
const { validatePost } = require("../middlewares/validations/post-validate");
const { createPost } = require("../controller/post-controller");
const upload = require("../middlewares/upload");

const router = Router();

router.post("/", upload.array("image"), validatePost, createPost);
//
module.exports = router;
