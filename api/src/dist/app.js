"use strict";
// @ts-ignore
Object.defineProperty(exports, "__esModule", { value: true });
const createError = require("http-errors"); // change all 'var' to import
const express = require("express");
const path_1 = require("path"); // this is a Node native module. only using #join from 'path'
// @ts-ignore
const cookieParser = require("cookie-parser");
// @ts-ignore
const logger = require("morgan");
// @ts-ignore
const Magic = require("express-routemagic");
const app = express(); // the correct type declaration style
// view engine setup
app.set('views', path_1.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path_1.join(__dirname, 'public')));
Magic.use(app, { invokerPath: __dirname }); // need to use 'invokerPath because we are not in api's root dir
// catch 404 and forward to error handler
app.use((req, res, next) => {
    // type declaration, and changed to use arrow function
    next(createError(404));
});
// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
