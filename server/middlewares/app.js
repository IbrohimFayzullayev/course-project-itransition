const userRoutes = require("../routes/userRoute");
const collectionRoutes = require("../routes/collectionRoute");
const itemRoutes = require("../routes/itemRoute");
const commentRoutes = require("../routes/commentsRoute");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { error } = require("../controllers/errorController");
// const { requireAuth, checkUser } = require("./authMiddlewares");

app.use(morgan("dev"));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/", userRoutes);
app.use("/", collectionRoutes);
app.use("/", itemRoutes);
app.use("/", commentRoutes);
app.use(error);
module.exports = app;
