//"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const sequelize = require("sequelize");
require("dotenv").config();

const db = require("./models/index");
const logger = require("./utils/logger");
const userRoute = require("./routes/route");

//connect to database and sync models with database
db.sequelize.sync().then(() => {
  logger.info("Database connected");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("combined"));
app.use("/user", userRoute);

app.listen(process.env.PORT, (err) => {
  if (err) {
    logger.error(err);
  }
  logger.info(`Server is running on port ${process.env.PORT}`);
});
