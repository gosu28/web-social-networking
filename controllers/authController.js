const User = require('../models/user');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOption.secure = true;
  res.cookie('jwt', token, cookieOption);

  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};
exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    createSendToken(newUser, 201, res);
  } catch (error) {
    res.status(400).json({
      status: 'fail',

      message: error,
    });
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      next(
        res.status(400).json({
          status: 'fail',
          message: 'Please provide email and password',
        }),
      );
    }
    const user = await User.findOne({ email }).select('password');
    const correct = await user.correctPassword(password, user.password);
    if (!user || !correct) {
      res.status(401).json({
        status: 'fails',
        message: 'Incorrect email or password',
      });
    }

    //3) If everything ok,send token to client
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
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

    const freshUser = await User.findById(decoded.id);
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
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET,
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};
