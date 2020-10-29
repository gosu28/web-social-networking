const express = require('express');
const userController = require('../../controllers/user');
const authController = require('../../controllers/authController');
const router = express.Router();

router.get('/singleUser', authController.protect, userController.getUser);
router.patch(
  '/updateMe',
  authController.protect,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateUser,
);
// router.param('userId', userController.userById);
module.exports = router;
