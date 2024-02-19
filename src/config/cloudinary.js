// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   // cloud_name: "dmzla7cgd",
//   // api_key: 287575699985447,
//   // api_secret: "PwBNOA0XyHqJM8_-012xA6IF0Ns",
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// module.exports = cloudinary;

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
