const express = require("express");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;
app.listen(PORT || 8000, () => {
  console.log("server is running on port", PORT);
});
