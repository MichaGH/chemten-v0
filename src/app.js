const express = require("express");
const session = require('express-session');
const path = require("path");
const morgan = require("morgan");

//! Routes
const indexRouter = require("./routes/indexRouter");
const compoundRouter = require("./routes/compoundRouter");
const adminRouter = require("./routes/admin/adminRouter");

//! Start App
const app = express();

//! EJS Viewengine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

//! Express Middleware
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false
}))

//! Middleware
app.use(morgan("tiny"));

//! Routes
app.use("/", indexRouter);
app.use("/compounds/", compoundRouter);
app.use("/admin/", adminRouter);

module.exports = app;
