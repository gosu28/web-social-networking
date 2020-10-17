const User = require("../models/user");

const filterObj = (obj, ...allowedFields) => {
    const newObj = {}
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) newObj[el]=obj[el]
    })
    return newObj;
}
exports.userById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(400).json({
                status: 'fail',
                message:'User not found'
            })
        }
        req.profile = user;
        next();
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message:error
        })
    }
    

}
exports.allUsers =async (req, res) => {
    try {
        const users =await User.find();
        res.status(200).json({
            status: 'success',
            message:users
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message:error
        })
    }
}
exports.getUser = (req, res) => {
    res.status(200).json({
        status: 'success',
        user:req.user
    })
}
exports.updateUser = async (req, res) => {
    try {
        const filteredBody = filterObj(req.body, 'name', 'email');
        const updateUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                user:updateUser
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
    
}