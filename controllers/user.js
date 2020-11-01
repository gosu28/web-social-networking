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
    req.file.filename = `post-${req.user.id}-${Date.now()}.jpeg`;
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
exports.userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
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
exports.allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      data: users,
    });
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
  if (user.id == req.user.id) {
    return next(
      res.status(400).json({
        status: 'fail',
        message: "You can't unfollow/follow yourself",
      }),
    );
  }
  if (user.followers.includes(req.user.id)) {
    return next(
      res.status(400).json({
        status: 'fail',
        message: 'You are already following him',
      }),
    );
  }
  await User.findByIdAndUpdate(user.id, {
    $push: { followers: req.user.id },
    $inc: { followersCount: 1 },
  });
  await User.findByIdAndUpdate(req.user.id, {
    $push: { following: user.id },
    $inc: { followingCount: 1 },
  });
  res.status(200).json({ success: true, data: {} });
};
exports.unfollow = async (req, res) => {
  const user = req.profile;
  if (user.id === req.user.id) {
    return next(
      res.status(400).json({
        status: 'fail',
        message: "You can't follow/unfollow yourself",
      }),
    );
  }
  await User.findByIdAndUpdate(user.id, {
    $pull: { followers: req.user.id },
    $inc: { followersCount: -1 },
  });
  await User.findByIdAndUpdate(req.user.id, {
    $pull: { following: user.id },
    $inc: { followingCount: -1 },
  });

  res.status(200).json({ success: true, data: {} });
};
