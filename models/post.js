const mongoose=require('mongoose');
const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:'Title is required',
        minlength:4,
        maxlength:150
    },
    body:{
        type:String,
        required:'Body is required',
        minlength:4,
        maxlength:2000
    }
});
const post=mongoose.model("Post",postSchema);
module.exports=post;