const Post = require('../models/posts');
const User = require('../models/user');

module.exports.home = async function(req,res){
 //  console.log(req.cookies);
   //res.cookie('user_id', 25);

  //  try {
  //   const posts = await Post.find({});
  //   res.render('home', {
  //     title: "Codial | Home",
  //     posts: posts
  //   });
  // } catch (err) {
  //   // Handle error
  // }


  //populate user of each post
  
  try {
    // populate means preloading the schema 
    const posts = await Post.find({})
    .populate('user')
    .populate({
      path: 'comments',
      populate:{
        path: 'user'
      }
    })
    .exec();
    const users = await User.find({})
    
    res.render('home', {
      title: "Codial | Home",
      posts: posts,
      all_users: users   
    })
  } catch(err) {
    console.log(err);
    // Handle error
  }

}

//module.exports.actionName = function(req,res){}