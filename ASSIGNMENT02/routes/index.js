var express = require('express');
var router = express.Router();
// use passport middleware to authentiicate
var passport = require("passport");
// import the user model to handle registration
var User = require("../Models/user");
// Import model

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// GEt/login > loads the page
router.get("/login", function (req, res, next) {
  // Handle the failure
  let messages = req.session.messages || [];
  //reset session messages
  req.session.messages = [];
  // pass messages back to show info form
  res.render("login", { title: "Enter your Credentials", messages: messages });
});
// POST/login >user clicks on login button in the form
router.post("/login", passport.authenticate("local", {
  successRedirect: "/book_records",
  failureRedirect: "/login",
  failureMessage: "Invalid Credentials" // stored in rq.session.messages
}));
// GET/register > loads the page
router.get("/register", function (req, res, next) {
  res.render("register", { title: "Create an account" });
});
// POST/register > user clicks on register button in the form
router.post("/register", function (req, res, next) {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, newUser) => {
      if (err) {
        console.log(err);
        return res.redirect("/register");
      }
      else {
        req.login(newUser, (err) => {
          res.redirect("/book_records")
        });
      }
    }
  );
});


module.exports = router;
