// var express = require("express"),
// path = require("path"),
const bodyParser = require("body-parser");
// cors = require("cors");

module.exports = app => {
  if (process.env.NO_BACKEND == "1") {
    return;
  }
  console.log("Starting backend inside webpack-dev");

  app.use(bodyParser.json());
  // app.use(cors());

  app.get("/api", (req, res) => {
    res.json({ the: "Hello World!" });
  });
};
