const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { models: { User } } = require('../db')
const app = require('../app')
const session = require('express-session');
const { CommandCompleteMessage } = require('pg-protocol/dist/messages');
// const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
//need .env file 



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
passport.serializeUser((user, done) => {
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
    // passReqToCallback : true,
    scope: ['email', 'profile']
    },
    async (accessToken, refreshToken, profile, done) =>{
        // console.log("Before findOne fuction")
        // // 
        // console.log("givenName here", profile.displayName)
        console.log("Email here", JSON.stringify(profile._json.email))
        // console.log(JSON.stringify(profile[0].email))

        console.log('FUNCTION RUNNING------------')
        console.log('<<<<<<<<<<<<',profile)
                try {
                    let userExist = await User.findOne({
                        where:{
                            username: profile.displayName
                        }
                    })
                    console.log('BEFORE BOOLEAN+++++++')
                    if(userExist){
                        console.log('************userExist')
                        return done(null,userExist);
                    }
                    // const mail = profile.emails[0].value
                    // console.log("this is the profile",profile)
                    console.log('Creating new user......')
                    const newUser = await User.create({ username: profile.displayName, 
                        password: profile.sub
                        // email: mail
                     })
                    return done(null,newUser)
                } catch (error) {
                    console.log('+++++++++=',error)
                    return done(error, false)
                }
                //using express findoOrCreate to create user if not found in database
            }
        ))