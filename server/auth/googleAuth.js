const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { models: { User } } = require('../db')
// const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
//need .env file 

passport.serializeUser( (user, done) => {
   done(null, user)
})
//brings in the authenticated the user
passport.deserializeUser((user, done) => {
    done (null, user)
  })
// reads the authenticated user object
passport.use(new GoogleStrategy({
    clientID: '635857443662-m660ubej5a3g0046gi44j2j8afhkpau6.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL: 'http://localhost:8080/auth/google/callback',
    passReqToCallback: true
    },
    (profile, done) =>{
        User.findOrCreate({
            username: profile.name
        })
        .spread((user, created) => {
            done(null, user)
        })
        .catch((err) => {
            return done(new Error('Internal Server Error'))
        })
    }
))