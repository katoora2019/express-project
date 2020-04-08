const path = require("path");
const express = require("express");
// Requiring the 'express' package
// returns a function that creates an instance
// of the express application
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const app = express();

app.set("view engine", "ejs");

// STATIC ASSETS
// Use 'path.join' to combine string arguments into directory paths
// for example:
// path.join('/', 'home', 'users', 'hindreen'); // '/home/users/hindreen'

// "__dirname" is a global variable available anywhere in any application
// that is run by Node that returns the full directory path beginning from
// root (i.e. '/') to the location of the file where '__diranme' is used.
console.log("__dirname: ", __dirname);

// The static assets middleware will take all the files and directories
// at a specified path and serve them publically with their own URL.
app.use(express.static(path.join(__dirname, "public")));
// The line above connects our 'public' directory to express
// so that it can server the browser those images, css files,
// browser side js, sounds, videos, etx

// MIDDLEWARE
// LOGGER
// when using the "morgan" middleware, call it with
// a string that describes the formatting of the logs.
// Find out more here:
// https://github.com/expressjs/morgan#readme

app.use(logger("dev"));

// Body Parser / URLEncoded
// This middleware will decode the data that was submitted
// from the form useing the 'POST' HTTP verb

// When the 'extended' option is set to 'true', it will allow
// form data to take the shape of arrays or objects.
// But if set to 'false', you can only get string from
// form data.
app.use(express.urlencoded({ extended: true }));
// It will modify the 'request' object fiven to routes
// by adding a property to it named 'body'
// 'request.body' will be an object containing the data from our form

// Cookie Parser
app.use(cookieParser());
// What cookieParser does as a middleware is modify the request and response objects
// that are given to all of our routes
// - it adds a property to the request object named 'cookies' which is an object itself
// of key value pairs.
// - it adds a method to response object called cookie() which we will use to set cookies

// Custom middleware
app.use((request, response, next) => {
  // console.log("request.cookies", request.cookies);
  // Read cookies from the request using 'request.cookies'
  // They are represented by an object whose properties are cookie-names
  // and the values associated with those properties are the corresponding
  // cookie values.

  const username = request.cookies.username;

  // Set propterties on 'response.locals' to create variables that
  // are global and available to all of the rendered templates
  response.locals.loggedInUserName = username || "";

  // The third argument to all middlewares is a callback function
  // named 'next'. When called, it tells Express that this middleware is complete
  // and moves on to the next middleware in line, or if it is the last middleware,
  // begins looking for the route that matches the request
  next();
});
app.get('/', (req, res) => {
  res.send({message: "Hello World"});
});

// METHOD OVERRIDE
app.use(
  // Without this, we cannot accept DELETE, PUT, or PATCH requests from
  // the browser!
  methodOverride((request, response) => {
    if (request.body && request.body._method) {
      const method = request.body._method;
      // This modifies the request object
      // It changes it from a POST request
      // to be whatever the value for _method
      // was within the form that was just submitted
      return method;
    }
  })
);

const baseRouter = require("./routes/baseRouter");
// The baseRouter defined within and exported from 'routes/baseRouter.js'
//  is being 'hooked up' to our app in the line of code below
// This says that all requests with any HTTP verb, and to any path beginning
// with "/" should be handled by the baseRouter
app.use("/", baseRouter);

const postsRouter = require("./routes/postsRouter");
app.use("/posts", postsRouter);

const PORT = 3000;
const ADDRESS = "localhost"; // 127.0.0.1
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on http://${ADDRESS}:${PORT}`);
});