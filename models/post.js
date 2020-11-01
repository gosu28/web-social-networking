const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  photo: String,
  postedBy: {
    type: ObjectId,
    ref: 'user',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  likes: [{ type: ObjectId, ref: 'User' }],
  likesCount: {
    type: Number,
    default: 0,
  },
  comments: [{ type: ObjectId, ref: 'Comment' }],
  commentsCount: {
    type: Number,
    default: 0,
  },
});
const post = mongoose.model('Post', postSchema);
module.exports = post;
