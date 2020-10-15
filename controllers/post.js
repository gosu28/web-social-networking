const Post = require("../models/post")
exports.getPosts =async (req, res) => {
    try {
        const post = await Post.find().select("_id title body")
        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message:error
        })        
    }
};
exports.createPost =async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                post: newPost
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message:err
        })
    }
    
}