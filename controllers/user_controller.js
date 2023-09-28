const User = require('../models/user');

//render profile
// module.exports.profile= function(req,res){
//    if(req.cookies.user_id){
//        User.findById(req.cookies.user_id, function(err,req){
//          if(user){
//             return res.render('user_profile', {
//                      title: "User Profile"
//                  });
//          }

//          return res.redirect('/user/sign-up')

//        })
//    }
//    else{
//       return res.redirect('/user/sign-in')
//    }
// module.exports.profile = function(req, res){
//    User.findById(req.params.id , function(err, user){
//       return res.render('user_profile', {
//          title: 'User Profile',
//          profile_user: user
//      }) 

//    });
   
// }
module.exports.profile = async function(req, res) {
   try {
      const user = await User.findById(req.params.id);
      res.render('user_profile', {
         title: 'User Profile',
         profile_user: user
      });
   }catch(err){
      console.error(err);
      res.status(500).send('Internal Server Error');
   }
}

// module.exports.update = function(req,res){

//    if(req.user.id == req.params.id){
//       User.findByIdAndUpdate(req.params.id , req.body, function(err, user){
//            return res.redirect('back');
//       });
//    }else{
//       return res.status(401).send('Unauthorised');
//    }

// }

module.exports.update = async function(req, res) {
   try {
     if (req.user.id == req.params.id) {
       const user = await User.findByIdAndUpdate(req.params.id, req.body);
       return res.redirect('back');
     } else {
       return res.status(401).send('Unauthorised');
     }
   } catch (err) {
     console.error(err);
     return res.status(500).send('Internal Server Error');
   }
 }
 

//    return res.render('user_profile', {
//       title: "User Profile"
//   });

//render sign up page
module.exports.signUp = function(req,res){
   if(req.isAuthenticated()){
      return res.redirect('/user/profile');
   }

   return res.render('user_sign_up',{
      title: "Codial | Sign Up"
   })
  

}

//render sign in page
module.exports.signIn = function(req,res){
   if(req.isAuthenticated()){
      return res.redirect('/user/profile');
   }

   return res.render('user_sign_in',{
      title: "Codial | Sign In"
   })


}

// get the sign up data
module.exports.create = async function(req, res) {
   if (req.body.password !== req.body.confirm_password) {
     return res.redirect('back');
   }
 
   try {
     const user = await User.findOne({ email: req.body.email });
     if (user) {
       return res.redirect('back');
     }
     const newUser = await User.create(req.body);
     return res.redirect('/user/sign-in');
   } catch (error) {
     console.error('Error in creating user:', error);
     return res.status(500).json({ message: 'Server Error' });
   }
 };

 
// get the sign in data
module.exports.createSession = function(req, res){
   req.flash('success', 'Logged in Successfully ');
   return res.redirect('/');

 }

 module.exports.destroySession = function(req, res){
   
   req.logout(function(err) {  // passport provide this function
       if (err) {
           console.log(err);
           return next(err);
       }
   req.flash('success', 'You have Logged Out! ');
       
      // return res.redirect('/',{flash: {success, ""}}); no need 
      // to pass flash to next page like this instead create a middleware to show flash mssg 
      return res.redirect('/');
   });
}