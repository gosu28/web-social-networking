const Post = require('../models/post');
const multer = require('multer');
const sharp = require('sharp');
const AppError = require('../errors/appError');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const User = require('../models/user');
const multerStorage = multer.memoryStorage();
const Comment = require('../models/comment');
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images', 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadPostPhoto = upload.single('photo');

exports.postById = async (req, res, next, id) => {
  try {
    const post = await Post.findById(id);

    req.post = post;

    next();
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.resizePostPhoto = async (req, res, next) => {
  try {
    if (!req.file) return next();

    req.file.filename = `post-${req.user.id}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/image/posts/${req.file.filename}`);
    next();
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.postByUser = async (req, res) => {
  try {
    const post = await Post.find({
      postedBy: req.user._id,
    })
      .populate('postedBy', '_id name photo fullname')
      .sort('_created');
    res.status(200).json({
      status: 'success',
      post: post,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.getPosts = async (req, res) => {
  try {
    const following = req.user.following;

    const users = await User.find()
      .where('_id')
      .in(following.concat([req.user.id]))
      .exec();

    const postId = users.map((user) => user.posts).flat();
    const posts = await Post.find()
      .populate({ path: 'postedBy', select: 'photo fullname name' })
      .sort('-created')
      .where('_id')
      .in(postId)
      .lean()
      .exec();

    posts.forEach((post) => {
      post.isLiked = false;
      const likes = post.likes.map((like) => like.toString());
      if (likes.includes(req.user.id)) {
        post.isLiked = true;
      }
      post.isMine = false;
      if (post.postedBy._id.toString() === req.user.id) {
        post.isMine = true;
      }
      // post.comments.map(async (id) => {
      //   let comment = await Comment.findById(id);
      //   comment.isCommentMine = false;
      //   if (comment.user === req.user.id) {
      //     comment.isCommentMine = true;
      //   }
      // });
    });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.getPost = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: req.post,
  });
};
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);

    if (req.file) newPost.photo = req.file.filename;
    newPost.postedBy = req.user;

    let post = await newPost.save();
    await User.findByIdAndUpdate(req.user.id, {
      $push: { posts: post._id },
      $inc: { postCount: 1 },
    });
    res.status(201).json({
      status: 'success',
      data: {
        post: post,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    if (req.post.postedBy.toString() !== req.user.id) {
      return next({
        message: 'You are not authorized to delete this post',
        statusCode: 401,
      });
    }

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { posts: req.post.id },
      $inc: { postCount: -1 },
    });

    await req.post.remove();

    res.status(201).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.updatePost = async (req, res) => {
  try {
    let updatePost = req.post;

    updatePost = _.extend(updatePost, req.body);

    if (req.file) updatePost.photo = req.file.filename;
    updatePost.updated = Date.now();
    // fs.stat(path.join(__dirname), function (err, stats) {
    //     console.log(stats);//here we got all information of file in stats variable
    //     if (err) {
    //         return console.error(err);
    //     }
    //     fs.unlink(`../public/image/posts/${req.post.photo}`,function(err){
    //          if(err) return console.log(err);
    //          console.log('file deleted successfully');
    //     });
    //  });

    console.log(__dirname);

    const post = await updatePost.save();
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.addComment = async (req, res) => {
  const post = req.post;
  let comment = await Comment.create({
    user: req.user.id,
    post: post._id,
    text: req.body.text,
  });

  post.comments.push(comment);

  post.commentsCount = post.commentsCount + 1;
  await post.save();
  comment = await comment
    .populate({ path: 'User', select: 'photo name fullname' })
    .execPopulate();
  res.status(200).json({ success: true, data: comment });
};
exports.getComment = async (req, res) => {
  let comment = await Comment.findById(req.params.id).lean().exec();
  comment.isCommentMine = false;
  const userStr = comment.user.toString();
  if (userStr === req.user.id) {
    comment.isCommentMine = true;
  }
  res.status(200).json({ success: true, data: comment });
};
exports.toggleLike = async (req, res) => {
  const post = req.post;
  if (post.likes.includes(req.user.id)) {
    const index = post.likes.indexOf(req.user.id);
    post.likes.splice(index, 1);
    post.likesCount = post.likesCount - 1;
    await post.save();
  } else {
    post.likes.push(req.user.id);
    post.likesCount = post.likesCount + 1;
    await post.save();
  }
  res.status(200).json({ success: true, data: {} });
};
exports.deleteComment = async (req, res) => {
  const post = req.post;
  const comment = await Comment.findOne({
    _id: req.params.commentId,
    post: post._id,
  });

  if (!comment) {
    return next({
      message: `No comment found for id ${post._id}`,
      statusCode: 404,
    });
  }

  if (comment.user.toString() !== req.user.id) {
    return next({
      message: 'You are not authorized to delete this comment',
      statusCode: 401,
    });
  }
  const index = post.comments.indexOf(comment._id);
  post.comments.splice(index, 1);
  post.commentsCount = post.commentsCount - 1;
  await post.save();

  await comment.remove();

  res.status(201).json({ success: true, data: null });
};
