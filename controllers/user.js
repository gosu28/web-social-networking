const User = require('../models/user');
const sharp = require('sharp');
const multer = require('multer');

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
exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = async (req, res, next) => {
  try {
    if (!req.file) return next();
    req.file.filename = `post-${req.user._id}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(620, 690)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/image/users/${req.file.filename}`);
    next();
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};
exports.userById = async (req, res, next, _id) => {
  try {
    const user = await User.findById(_id)
      .select('-password')
      .populate('posts', 'photo commentsCount likesCount')
      .populate({ path: 'followers', select: 'photo username fullname' })
      .populate({ path: 'following', select: 'photo username fullname' })
      .lean()
      .exec();
    if (!user) {
      res.status(400).json({
        status: 'fail',
        message: 'User not found',
      });
    }
    req.profile = user;
    next();
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.getUserById = async (req, res) => {
  const user = req.profile;

  user.isFollowing = false;
  const followers = user.followers.map((follower) => follower._id.toString());

  user.followers.forEach((follower) => {
    follower.isFollowing = false;
    if (req.user.following.includes(follower._id.toString())) {
      follower.isFollowing = true;
    }
  });

  user.following.forEach((user) => {
    user.isFollowing = false;
    if (req.user.following.includes(user._id.toString())) {
      user.isFollowing = true;
    }
  });

  if (followers.includes(req.user.id)) {
    user.isFollowing = true;
  }

  user.isMe = req.user.id === user._id.toString();

  res.status(200).json({ success: true, user: user });
};
exports.allUsers = async (req, res) => {
  try {
    let users = await User.find().select('-password').lean().exec();
    users.forEach((user) => {
      user.isFollowing = false;
      const followers = user.followers.map((follower) => follower.toString());
      console.log(followers.includes(req.user.id));
      if (followers.includes(req.user.id)) {
        user.isFollowing = true;
      }
    });
    users = users.filter((user) => user._id.toString() !== req.user.id);
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.getUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    user: req.user,
  });
};
exports.updateUser = async (req, res) => {
  try {
    const filteredBody = filterObj(
      req.body,
      'name',
      'email',
      'bio',
      'fullname',
    );
    if (req.file) filteredBody.photo = req.file.filename;
    const updateUser = await User.findByIdAndUpdate(
      req.user._id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).json({
      status: 'success',
      data: {
        user: updateUser,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.follow = async (req, res) => {
  const user = req.profile;
  if (user._id == req.user._id) {
    return next(
      res.status(400).json({
        status: 'fail',
        message: "You can't unfollow/follow yourself",
      }),
    );
  }
  if (user.followers.includes(req.user._id)) {
    return next(
      res.status(400).json({
        status: 'fail',
        message: 'You are already following him',
      }),
    );
  }
  await User.findByIdAndUpdate(user._id, {
    $push: { followers: req.user._id },
    $inc: { followersCount: 1 },
  });
  await User.findByIdAndUpdate(req.user._id, {
    $push: { following: user._id },
    $inc: { followingCount: 1 },
  });
  res.status(200).json({ success: true, data: {} });
};
exports.unfollow = async (req, res) => {
  const user = req.profile;
  if (user._id === req.user._id) {
    return next(
      res.status(400).json({
        status: 'fail',
        message: "You can't follow/unfollow yourself",
      }),
    );
  }
  await User.findByIdAndUpdate(user._id, {
    $pull: { followers: req.user._id },
    $inc: { followersCount: -1 },
  });
  await User.findByIdAndUpdate(req.user._id, {
    $pull: { following: user._id },
    $inc: { followingCount: -1 },
  });

  res.status(200).json({ success: true, data: {} });
};
