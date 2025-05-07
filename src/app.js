const express = require("express");
const path = require("path");
const morgan = require("morgan");

//! Routes
const indexRouter = require("./routes/indexRouter");
const compoundRouter = require("./routes/compoundRouter");
const testRouter = require("./routes/testRouter");

//! Start App
const app = express();

//! EJS Viewengine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

//! Express Middleware
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//! Middleware
app.use(morgan("tiny"));

//! Routes
app.use("/", indexRouter);
app.use("/compounds/", compoundRouter);
app.use("/tests/", testRouter);

module.exports = app;
