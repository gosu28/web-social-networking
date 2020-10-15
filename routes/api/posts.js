const express = require("express");
const postController = require("../../controllers/post");
const authController=require("../../controllers/authController")
const router = express.Router();
router.route('/').get(postController.getPosts);
router.route('/post').post(authController.protect,postController.createPost);
module.exports=router