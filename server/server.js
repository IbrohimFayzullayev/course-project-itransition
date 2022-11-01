const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const app = require("./middlewares/app");
const mongoose = require("mongoose");

const port = process.env.PORT || 8000;

mongoose.connect(process.env.DATABASE).then(() => {
  console.log("DB connected");
});

app.listen(port, () => {
  console.log(`Example app is listening on port http://localhost:${port}`);
});

// app.use("/", authRoutes);
// app.use(express.json());
