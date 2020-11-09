const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const CommentSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'user',
    required: true,
  },
  post: {
    type: ObjectId,
    ref: 'Post',
    required: true,
  },
  text: {
    type: String,
    required: [true, 'Please enter the comment'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const comment = mongoose.model('Comment', CommentSchema);
module.exports = comment;
