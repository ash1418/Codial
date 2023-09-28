const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
async function authenticateUser(req,email, password, done) {   // to pass this req(flash mssg) passReqToCallback is set to true
    try {
      const user = await User.findOne({ email: email });
      if (!user || user.password !== password) {
        // console.log('Invalid Username/Password');
        req.flash('error','Invalid Username/Password');
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      req.flash('error', err);
      // console.log('Error in finding user --> Passport');
      return done(err);
    }
  }
  
  passport.use(new LocalStrategy({ usernameField: 'email',passReqToCallback: true}, authenticateUser));
  

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id); //this automatically encrypt id into the cookie , stores the u_id
})


//deserializing the user from the key in the cookies
passport.deserializeUser(async function(id, done) 
{
    try {
      const user = await User.findById(id);
      return done(null, user);
    } 
    catch (err) 
    {
      console.log('Error in finding user --> Passport');
      return done(err);
    }
  }
);

// check if ther is user authenticated
passport.checkAuthentication = function(req, res, next){   // middleware
  //if user is signed-in , then pass the request to the next function(controller's action)  
  if(req.isAuthenticated()){
      return next();
    }

    // if user not signed in
    return res.redirect('/user/sign-in');
}

passport.setAuthenticatedUser = function (req, res, next){
   if(req.isAuthenticated()){
    //req.user conatins the current signed in user from the session cookie and we are just sending this to the locals for the view 
    res.locals.user = req.user;
   }

   next();
}


module.exports = passport;