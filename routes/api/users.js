const express = require('express');
const userController = require('../../controllers/user');
const authController = require('../../controllers/authController');
const router = express.Router();

router.get('/allUsers', userController.allUsers);
router.get('/singleUser', authController.protect, userController.getUser);
router.patch(
  '/updateMe',
  authController.protect,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateUser,
);
router
  .route('/:userId/follow')
  .get(authController.protect, userController.follow);
router
  .route('/:userId/unfollow')
  .get(authController.protect, userController.unfollow);
router.param('userId', userController.userById);
module.exports = router;
