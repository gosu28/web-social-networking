const Post = require('../models/post');
const multer = require('multer');
const sharp = require('sharp');
const AppError = require('../errors/appError');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const multerStorage = multer.memoryStorage();
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
    const post = await Post.findById(id)
      .populate('postedBy', '_id name')
      .select('_id title content created likes comments');

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
      .resize(620, 690)
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
      .populate('postedBy', '_id name')
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
    const post = await Post.find()
      .populate('postedBy', '_id name')
      .select('_id title content created likes comments')
      .sort({ created: -1 });
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
    await newPost.save();
    res.status(201).json({
      status: 'success',
      data: {
        post: newPost,
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
    let isPoster =
      req.post && req.user && req.post.postedBy._id == req.user._id;
    if (!isPoster) {
      return res.status(403).json({
        err: ' User is not authorized',
      });
    }
    await Post.findByIdAndDelete(req.post._id);
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
    // let isPoster = req.post && req.user && req.post.postedBy._id == req.user._id;
    // if (!isPoster)
    // {
    //     return res.status(403).json({
    //         err: ' User is not authorized'
    //       });

    // }
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
