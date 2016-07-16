var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var express_session = require('express-session');

//Base setup
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test'); // connect to our database

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(express_session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

var indexRoute = require('./app/routes/index');
var usersRoute = require('./app/routes/users');
var storiesRoute = require('./app/routes/stories');
var tagsRoute = require('./app/routes/tags');


//Port
var port = process.env.PORT || 3000;

// Configure the Twitter strategy for use by Passport.
//
// OAuth 1.0-based strategies require a `verify` function which receives the
// credentials (`token` and `tokenSecret`) for accessing the Twitter API on the
// user's behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.


passport.use(new Strategy({
    consumerKey: "RNObfLht2saEKcxqyDVHZh37B",
    consumerSecret: "4IQt0qAneBsG494B5Xjdel9aIzhVHiU2rtUqHsA02t2lB8UUgP",
    callbackURL: 'http://127.0.0.1:3000/login/twitter/return'
  },
  function(token, tokenSecret, profile, cb) {
    // In this example, the user's Twitter profile is supplied as the user
    // record.  In a production-quality application, the Twitter profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.

    var newuser = {};
    newuser["_id"] = profile.id;
    newuser["name"] = profile.displayName;
    newuser["handle"] = profile.username;

    usersRoute.findOrCreate(newuser, function(err, click, created) {
      if(created) {
        console.log("New user: " + profile.displayName);
      }
    });

    return cb(null, profile);
  }));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


//Router
var router = express.Router();
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.use(function(req, res, next) {
    console.log("Request incoming");
    next();
})

//Routes
app.use('/api', indexRoute.router);
app.use('/api/users', usersRoute.router);
app.use('/api/stories', storiesRoute.router);
app.use('/api/stories', storiesRoute.router);
app.use('/api/tags', tagsRoute.router);


// Login routers
app.get('/login/twitter',
  passport.authenticate('twitter'));

app.get('/login/twitter/return',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/views/feed.html');
  });


// Server
app.use(express.static(__dirname));
app.use('/api', router);

app.listen(port);
console.log("Raven is sent via " + port);

