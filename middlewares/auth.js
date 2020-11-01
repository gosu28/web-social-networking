const jwt = require('jsonwebtoken');
const User = require('../models/user');
exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(
        res.status(401).json({
          status: 'fail',
          message: 'You are not logged in! Please log in to get access',
        }),
      );
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const freshUser = await User.findById(decoded.id).select('-password');

    if (!freshUser) {
      return next(
        res.status(401).json({
          status: 'fail',
          message: 'The user belonging to this token does no longer exist',
        }),
      );
    }
    req.user = freshUser;
    res.locals.user = freshUser;
    next();
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
