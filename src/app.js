const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

const limit = require("./middlewares/rate-limit");
const notFound = require("./middlewares/notfound");
const error = require("./middlewares/error");
const authRoute = require("./routes/auth-route");

const app = express();

app.use(cors());
app.use(express.json());
app.use(limit);
app.use(morgan("dev"));

app.use("/auth", authRoute);

app.use(notFound);

app.use(error);

const PORT = process.env.PORT;
app.listen(PORT || 8000, () => {
  console.log("server is running on port", PORT);
});
