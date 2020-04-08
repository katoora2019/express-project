// ROUTES
const express = require("express");
const router = express.Router();

router.get("/hello_world", (request, response) => {

  response.render("welcome");
});

router.get("/contact_us", (request, response) => {
  // console.log("URL query: ", request.query);
  response.render("contactUs");
});

// http:localhost:3000/contact_us?fullName=hano&message=javascript
// scheme | host | PORT | path | query (search)

// The "query" in the URL is a way to encode data as key-value
// pairs in the URL itself. It used by forms to store data from
// its inputs for example. this called URL encoding

// The encoding format is as follows:
// ?key_1=value_1&key_2=value_2&key_3=value_3
// Express takes a query from a URL and converts into
// an object as follows:
// { key_1: "value_1", key_2: "value_2", key_3: "value_3" }

router.get("/thank_you", (request, response) => {
  // 'request.query' is a property that holds an object
  // representation of the URL query.

  // console.log("request.query: ", request.query);

  // const fullName = request.query.fullName;
  // const favouriteColour = request.query.favouriteColour;
  // const message = request.query.message;
  // below line is equivalent to the above three lines
  const { fullName, favouriteColour, message } = request.query;

  //   response.render("thankYou", {
  //     fullName: fullName,
  //     favouriteColour: favouriteColour,
  //     message: message
  //   });

  // When the objects key and value are the same, you can just type key
  response.render("thankYou", {
    fullName,
    favouriteColour,
    message,
  });
});

router.post("/sign_in", (request, response) => {
  const params = request.body;
  // console.log("request.body: ", params);
  // 'request.body' is only available if the 'urlencoded' middleware is being used,
  // and it will contain data from a submitted form as an object

  // 'response.cookie(<cookie-name>, <cookie-value>, <options>)'
  // The 'response.cookie' method is added to the 'response' object
  // by the 'cookie-parser' middleware.
  // We use this method to send cookies to the browser.
  // - The first argument is a string indicates the name of cookie
  // - The second is the value of the cookie
  // - (optional) the last argument are the options for that cookie
  response.cookie("username", params.username, { maxAge: COOKIE_MAX_AGE });

  // When the broswer receives a redirect response, it makes a follow up request
  // to provided location.
  // In this case, the browser is send to our welcome / root route ('/');
  response.redirect("/");
});

router.post("/sign_out", (request, response) => {
  // We use 'response.clearCookie' to remove the specific cookie with
  // that cookie-name
  // In this case, we are removing the 'username' cookie from the browser
  response.clearCookie("username");
  response.redirect("/");
});

// Make sure you export router
module.exports = router;