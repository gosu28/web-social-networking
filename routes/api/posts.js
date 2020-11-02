const express = require('express');
const postController = require('../../controllers/post');
const authController = require('../../controllers/authController');
const router = express.Router();
router.route('/feed').get(authController.protect, postController.getPosts);
router
  .route('/post')
  .post(
    authController.protect,
    postController.uploadPostPhoto,
    postController.resizePostPhoto,
    postController.createPost,
  );
router.get('/postByUser', authController.protect, postController.postByUser);

router.put(
  '/:postId',
  authController.protect,
  postController.uploadPostPhoto,
  postController.resizePostPhoto,
  postController.updatePost,
);
router
  .route('/:postId/togglelike')
  .get(authController.protect, postController.toggleLike);
router
  .route('/:id/getComment')
  .get(authController.protect, postController.getComment);
router.get('/:postId', authController.protect, postController.getPost);
router.delete('/:postId', authController.protect, postController.deletePost);
router
  .route('/:postId/comments')
  .post(authController.protect, postController.addComment);
router
  .route('/:postId/comments/:commentId')
  .delete(authController.protect, postController.deleteComment);
router.param('postId', postController.postById);
module.exports = router;
