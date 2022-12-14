/**
 *  Main File for run server and connect to DB
 * @author Mahmoud Atef
 * @author hangra
 */

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connect } = require("./config/db");
const mainRoute = require("./routes/index");
const ErrorHandler = require("./middlewares/ErrorHandler");
const { HOST, PORT } = require("./config/config");

const app = express();

// Main function for start server

const Main = async () => {
  try {
    // connect to database
    console.log("start connecting to db will take some seconds ......");
    await connect();

    console.log("runnung server ......");
    app.listen(PORT, () => {
      console.log(`Server is running on port: http://${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error("error in starting server", err);
    // close process if error happen in start
    process.exit();
  }
};
const loadExpressRoutesAndMiddleWares = () => {
  // Init Middlewares
  app.use(cors());
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(morgan("dev"));
  // load routes
  app.use("/", mainRoute);

  // error middleware
  app.use(ErrorHandler);
};

// run functions
loadExpressRoutesAndMiddleWares();
Main();
module.exports = app;
