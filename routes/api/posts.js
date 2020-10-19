const express = require("express");
const postController = require("../../controllers/post");
const authController = require("../../controllers/authController");
const router = express.Router();
router.route('/').get(postController.getPosts);
router.route('/post').post(authController.protect, postController.uploadPostPhoto, postController.resizePostPhoto, postController.createPost);
router.get('/postByUser', authController.protect, postController.postByUser);
router.delete('/:postId',authController.protect,postController.isPoster,postController.deletePost)
router.get('/:postId', authController.protect, postController.getPost);
router.param('postId', postController.postById);
module.exports=router