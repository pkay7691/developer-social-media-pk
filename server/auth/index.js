const router = require('express').Router();
const passport = require('passport');
require('../auth/googleAuth')
const {
  models: { User },
} = require('../db');
// module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const userToken = await user.generateToken()
    console.log('This is user token ', userToken)
    res.send({ token: userToken});
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    console.log('its in /me',user)
    res.send(user);
  } catch (ex) {
    console.log('its in /me',ex)
    next(ex);
  }
});
// passport will control this route
router.get('/google',
  passport.authenticate('google', { scope:
  	['email', 'profile' ] }
));

router.get('/google/callback',
    passport.authenticate( 'google', {
        // successRedirect: '/home' ,
        //success will show the logout and home page
        failureRedirect: '/google/failure',
        // failure will show login or signup
}),
async function (req, res){
  console.log(req.user)
  const userToken = await req.user.generateToken()
  console.log('This is user token ', userToken)
  res.redirect('/home?token=' + userToken)
});

// router.get('/home', async(req,res)=>{
//   const userToken = await user.generateToken()
//   console.log('This is user token ', userToken)
//   res.send({ token: userToken});
// })
//going to add a function for isAuthenticated
// Success
router.get('/' , (req , res) => {
  if(!req.user)
      res.redirect('/google/failure');
  res.send("Welcome " + req.user.name);
});

// failure
router.get('/google/failure' , (req , res) => {
  res.send("Error")
})
//make a logout route
router.get('/logout', (req, res)=>{
  req.logout()
  res.redirect('/login')
})

module.exports = router
