const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const filename = uuidv4() + "." + file.mimetype.split("/")[1];
    cb(null, filename);
  },
});

module.exports = multer({ storage });
