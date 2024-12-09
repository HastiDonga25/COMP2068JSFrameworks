// Importing required modules
var createError = require('http-errors'); // Handles HTTP errors
var express = require('express'); // Framework for handling server and routing
var path = require('path'); // Utility for handling and transforming file paths
var cookieParser = require('cookie-parser'); // Middleware for parsing cookies
var logger = require('morgan'); // Logger for HTTP requests

const MongoStore = require('connect-mongo');

var User = require("./Models/user");
var GitHubStrategy = require("passport-github2").Strategy;
var GoogleStrategy = require("passport-google-oauth20").Strategy;

// Importing route handlers
var indexRouter = require('./routes/index'); // Main index route
var usersRouter = require('./routes/users'); // Route for user-related actions
var booksRouter = require("./routes/book_records");

// Import mongoose and the configuration object
var mongoose = require("mongoose");
var configs = require("./Configs/globals");


// Initializing the Express application
var app = express();

// Authentication mechanics (passport base and session)
var passport = require("passport");
var session = require("express-session");

// Setting up view engine
app.set('views', path.join(__dirname, 'views')); // Specifies directory for views
app.set('view engine', 'hbs'); // Sets Handlebars (hbs) as the view engine

// Middleware setup
app.use(logger('dev')); // Logs requests to the console in development
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parses URL-encoded data
app.use(cookieParser()); // Parses cookies attached to client requests
app.use(express.static(path.join(__dirname, 'public'))); // Serves static files from 'public' directory
//configure Authentication strategies ans sessions
app.use(session(
  {
    secret: "BookRecordManagementSystem",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.CONNECTION_STRING_MONGODB // Use your MongoDB connection string
  })
  }
));
// Initialize passport
app.use(passport.initialize());
app.use(passport.session()); // enables middleware for persisent login sessions
//configure local strtegy for username/password authentication
passport.use(User.createStrategy()); // createStrategy() comes from plm plugin
// GitHUb strategy configuration
passport.use(new GitHubStrategy(
  {
    clientID: configs.Authentication.Github.clientID,
    clientSecret: configs.Authentication.Github.clientSecret,
    callbackURL: configs.Authentication.Github.callbackURL,
  },
  async (accessToken, refreshToken, profile, done)=>{
    // find user
    const user = await User.findOne({oauthID: profile.id});
    // if it exitsrs return done(null, user)
    if(user)
      return done(null,user);
    // if null then create
    else{
      const newUser = new User({
        username: profile.username,
        oauthID: profile.id,
        oauthProvide: "Github",
      });
      let savedUser = await newUser.save();
      return done(null, newUser);
    }
  }
));
passport.use(new GoogleStrategy(
  {
    clientID: configs.Authentication.Google.clientID,
    clientSecret: configs.Authentication.Google.clientSecret,
    callbackURL: configs.Authentication.Google.callbackURL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user exists in database
      let user = await User.findOne({ oauthID: profile.id });

      if (user) {
        return done(null, user);
      } else {
        // Create a new user if not found
        const newUser = new User({
          username: profile.displayName,
          oauthID: profile.id,
          oauthProvider: "Google",
          email: profile.emails[0].value, // Google provides email in profile
        });

        let savedUser = await newUser.save();
        return done(null, savedUser);
      }
    } catch (err) {
      return done(err, null);
    }
  }
));
passport.serializeUser(User.serializeUser()); // serializeUser() comes from plm plugin
passport.deserializeUser(User.deserializeUser()); // deserializeUser() comes from plm plugin
// Route Configuration
app.use('/', indexRouter); // Uses 'index' router for root URL
app.use('/users', usersRouter); // Uses 'users' router for '/users' URL
app.use("/book_records", booksRouter);

//Connect to MongoDB after the route configuration
mongoose
  .connect(configs.ConnectionString.MongoDB)
  .then(() => {
    console.log("Connected to MongoDB..");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });


//import hbs to add helper functions for my views

const Handlebars = require('hbs'); // or 'express-handlebars', depending on your setup

Handlebars.registerHelper('toShortDate', function(date) {
  return new Date(date).toLocaleDateString(); // Customize the date format as needed
});

//Register a helper method to compare to values and render an option element with selected
Handlebars.registerHelper("createOptionElement",(currentValue, selectedValue) =>{
  if(currentValue === selectedValue){
    return new Handlebars.SafeString(`<option selected>${currentValue}</option>`)
  }
  else{
    return new Handlebars.SafeString(`<option>${currentValue}</option>`)
  }
});

// Catch 404 errors and forward to error handler
app.use(function (req, res, next) {
  next(createError(404)); // Passes a 404 error if route not found
});

// Error handler
app.use(function (err, req, res, next) {
  // Sets error message and error details only in development mode
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renders the error page with the status code or defaults to 500
  res.status(err.status || 500);
  res.render('error');
});

// Exporting the app module
module.exports = app; // Allows 'app' to be imported in other files (e.g., for server setup)
