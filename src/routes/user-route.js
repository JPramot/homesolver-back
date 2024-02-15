const { Router } = require("express");
const upload = require("../middlewares/upload");
const { updateUserProfile } = require("../controller/user-controller");

const router = Router();

router.patch("/", upload.single("profileImage"), updateUserProfile);

module.exports = router;
