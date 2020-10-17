const mongoose = require('mongoose');
const {ObjectId}=mongoose.Schema.Types
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
    },
    photo: {
        data: Buffer,
    },
    postedBy: {
        type: ObjectId,
        ref:"user"
    },
    created: {
        type: Date,
        default:Date.now
    }
});
const post=mongoose.model("Post",postSchema);
module.exports=post;