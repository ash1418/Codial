{
// method to submit the form data for new post using ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),  //convert form data to json
                success: function(data){
                      console.log(data);
                }, error: function(error){
                    console.log(error,responseText);
                }
            }); 
        });
    }

// method to create a post in dom


    createPost();
}
