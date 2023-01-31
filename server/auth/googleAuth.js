const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { models: { User } } = require('../db')
const app = require('../app')
const session = require('express-session')
// const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
//need .env file 


passport.use(new GoogleStrategy({
    clientID: '635857443662-m660ubej5a3g0046gi44j2j8afhkpau6.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL: 'http://localhost:8080/auth/google/callback',
    scope: ['profile'],
    passReqToCallback: true
    },
    async (accessToken, refreshToken, profile, done) =>{
        console.log(JSON.stringify('profile is coming back undefined',profile))
        try {
            let userExist = await User.findOne({
                username: profile.name
            })
            if(userExist){
                return done(null,userExist);
            }
            console.log('Creating new user......')
            const newUser = new User({
                method: 'google',
                username:{
                    name: profile.name
                }
            })
            await newUser.save()
            return done(null, newUser)
        } catch (error) {
            return done(error, false)
        }
        //using express findoOrCreate to create user if not found in database
    }
))
app.use(session({
    secret: 'somthingSerious',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
//using them because of cookies
app.use(passport.initialize());
app.use(passport.session());

//if the callback is succesful, the user will be stored in a cookie**only id**
passport.serializeUser( (user, done) => {
   done(null, user)
})
//brings in the authenticated the user
passport.deserializeUser((user, done) => {
    done (null, user)
  })
// reads the authenticated user object
