const Comment = require('../models/comment');
const Post = require('../models/posts');

module.exports.create = async function(req, res){

   //  try{
   //     const post = await Post.findById(req.body.post);
   //     if(post){
   //       Comment.create({
   //          content: req.body.content,
   //          post: req.body.post,
   //          user: req.user._id
   //       })
   //       post.comments.push(comment);
   //       post.save();  // to save in database

   //       res.redirect('/');
         
   //     }
   //  }
   //  catch(err){
   //       console.log(err);
   //  }
   try {
      const post = await Post.findById(req.body.post);
      if (post) {
        //console.log(req.user._id)
        const comment = await Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user._id

        });
        post.comments.push(comment);
        post.save();
        res.redirect('/');
      }
    } catch (err) {
      console.log(err);
      // handle error
    }


};


// module.exports.destroy = function(req, res){
//    Comment.findById(req.params.id, function(err, comment){
//        if(comment.user == req.user.id){
//           let postId = comment.post;
          
//           // comment.remove();

//            Comment.deleteOne({ _id: comment._id }).exec();



//           Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err, post){
//             return redirect('back');
//           })

//        }else{
//         return redirect('back');

//        }
//    });
   
// }

module.exports.destroy = async function(req, res) {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if(comment.user == req.user.id) {
      let postId = comment.post;

      await comment.deleteOne({ _id: comment._id });

      const post = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

      return res.redirect('back');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
}
