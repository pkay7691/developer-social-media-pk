const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { models: { User } } = require('../db')
const app = require('../app')
require('dotenv').config()
const session = require('express-session');
const { CommandCompleteMessage } = require('pg-protocol/dist/messages');

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
    console.log('serial user', user)
   done(null, user)
})
//brings in the authenticated the user
passport.deserializeUser((user, done) => {
    console.log('deserial user', user)
    done (null, user)
  })
// reads the authenticated user object

passport.use(new GoogleStrategy({
    clientID: process.env.REACT_APP_DEVUPSOCIAL_GOOGLE_API_TOKEN,
    clientSecret: process.env.REACT_APP_SECRET_KEY,
    callbackURL: process.env.REACT_APP_CALLBACK,
    scope: ['email', 'profile']
    },
    async (accessToken, refreshToken, profile, done) =>{
        //variable due to deep seated
        const mail = profile.emails[0].value
                try {
                    //check for unique email, if email exist, return user, if not create and return user
                    let userExist = await User.findOne({
                        where:{
                            email: mail,
                        }
                    })
                    if(userExist){
                        return done(null,userExist);
                    }
                    console.log('Creating new user......')
                    //data from google cloud profile
                    const newUser = await User.create({ 
                        username: profile.displayName, 
                        password: profile.sub,
                        email: mail,
                        first_name: profile.given_name,
                        last_name: profile.family_name
                     })
                     const userToken = await User.generateToken();
                     console.log('this is user token', userToken)
                    return done(null,newUser)
                } catch (error) {
                    console.log('After creating', error)
                    return done(error, false)
                }
            }
        ))