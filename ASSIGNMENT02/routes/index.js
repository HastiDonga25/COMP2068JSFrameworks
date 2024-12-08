var express = require('express');
var router = express.Router();
// use passport middleware to authentiicate
var passport = require("passport");
// import the user model to handle registration
var User = require("../Models/user");

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.render('index', {
    title: 'Express',
    user: req.user,
  });
});

// GEt/login > loads the page
router.get("/login", (req, res, next) => {
  // Handle the failure
  let messages = req.session.messages || [];
  //reset session messages
  req.session.messages = [];
  // pass messages back to show info form
  res.render("login", { title: "Enter your Credentials", messages: messages,  user: req.user });
});
// POST/login >user clicks on login button in the form
router.post("/login", passport.authenticate(
  "local",
  {
    successRedirect: "book_records",
    failureRedirect: "/login",
    failureMessage: "Invalid Credentials" // stored in rq.session.messages
  }
));
// GET/register > loads the page
router.get("/register", (req, res, next) => {
  res.render("register", { title: "Create an account" ,  user: req.user});
});
// POST/register > user clicks on register button in the form
router.post("/register", function (req, res, next) {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        return res.redirect("/register");
      }
      else {
        req.login(user, (err) => {
          res.redirect("/book_records")
        });
      }
    }
  );
});

// Get/logout> logs the user out
router.get("/logout", (req, res, next) => {
  req.logout((err) => { res.redirect("/login"); });
});


// GET/ Github > authenticate with Github
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
// passpoet will take care of the starting the authentication flow anf redirecting  user to github.com

// GET. Github/ callback > github will redirect here after autheication
router.get("/github/callback",
  passport.authenticate(
    "github",
    {
      successRedirect: "/book_records", // if successful go to projects
      failureRedirect: "/login" // if not {user clicked cancel}, go to login
    }
  )
);

module.exports = router;
