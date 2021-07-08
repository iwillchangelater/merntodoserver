const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/db");
const error = require("./utility/error");

//routers
const userRoutes = require("./routes/users");
const ListRoutes = require("./routes/List");
// init
dotenv.config({ path: "./config/config.env" });
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/users", userRoutes);
app.use("/list", ListRoutes);

app.use(error);
const server = app.listen(
  process.env.PORT,
  console.log("ajilaj bn " + process.env.PORT)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`unhandled rejection ${err}`);
  server.close(() => {
    process.exit(1);
  });
});
