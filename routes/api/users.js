const express = require('express');
const userController = require('../../controllers/user');
const authController = require("../../controllers/authController");
const router=express.Router();

// router.get('/', userController.allUsers);
router.get('/', authController.protect, userController.getUser);
router.put('/', authController.protect, userController.updateUser);
// router.param('userId', userController.userById);
module.exports=router;