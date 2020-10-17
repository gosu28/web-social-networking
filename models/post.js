const mongoose = require('mongoose');
const {ObjectId}=mongoose.Schema.Types
const postSchema=new mongoose.Schema({
    title: {
        type: String
      },
      content: {
        type: String
      },
      photo: String,
      postedBy: {
        type: ObjectId,
        ref: 'user'
      },
      created: {
        type: Date,
        default: Date.now
      },
      likes: [{ type: ObjectId, ref: 'User' }],
      comments: [
        {
          text: String,
          created: { type: Date, default: Date.now() },
          postedBy: { type: ObjectId, ref: 'User' }
        }
      ]
});
const post=mongoose.model("Post",postSchema);
module.exports=post;