const User = require('../models/user');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
       expiresIn: process.env.JWT_EXPIRES_IN
   });
}
exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        const token = signToken(newUser._id)
        res.status(201).json({
            status: 'success',
            token,
        data: {
            user:newUser
        }
    })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            
            message:error
        })
    }
    
}
exports.login =async (req, res, next) => {
    try {
        const { email, password } = req.body;
    if (!email || !password) {
        next(res.status(400).json({
            status: 'fail',
            message:'Please provide email and password'
        }))
        }
        const user = await User.findOne({ email }).select('password');
        const correct = await user.correctPassword(password, user.password);
        if (!user || !correct) {
            res.status(401).json({
                status: 'fails',
                message: 'Incorrect email or password'
            });
        }
    
        //3) If everything ok,send token to client
            const token = signToken(user._id);
            
            res.status(200).json({
                status: 'success',
                token
            });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message:error
        })
    }
    
}
exports.protect = async (req, res, next) => {
    try {
        let token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }

        if (!token) {
            return next(res.status(401).json({
                status: 'fail',
                message:'You are not logged in! Please log in to get access'
            }))
        }
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        const freshUser = await User.findById(decoded.id);
        if (!freshUser) {
            return next(res.status(401).json({
                status: 'fail',
                message:"The user belonging to this token does no longer exist"
            }))
        }
        req.user = freshUser;
        next();
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message:error
        })
    }
}