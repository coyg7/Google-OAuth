const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

//grabs user and stuffs it in a cookie and send to the browser
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//take the id and find user based on the id
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  })
});

passport.use(
  new GoogleStrategy({
    //options for google strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    
    //check if user already exists
    User.findOne({
      googleId: profile.id
    }).then((currentUser) => {
      if(currentUser) {
        //user already in database
        console.log('User already exists : ' + currentUser);
        done(null, currentUser);  //goes to serealizeUser
      } else {
        //if no user in db, create a new user
        new User({
          username: profile.displayName,
          googleId: profile.id,
          thumbnail: profile._json.image.url
        }).save().then((newUser) => {
          console.log('New user created: ' + newUser);  
          done(null, newUser);
        });
      }
    })
  })
);
