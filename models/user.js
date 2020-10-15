const mongoose=require('mongoose');
const { default: validator } = require('validator');
const bcrypt = require('bcryptjs');
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please tell us your name!"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Please provide your email"],
        unique: true,
        lowercase: true,
        validate:[validator.isEmail,"Please provide a valid email"]
    },
    password:{
        type:String,
        required: [true, "Please provide a password"],
        minlength: 8,
        select:false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message:'Password are not the same!'
        },
        
    },
    photo:String,
    passwordResetToken: String,
    passwordResetExpires:Date
});
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next()
});
UserSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}
const User=mongoose.model('user',UserSchema);
module.exports=User;