const express = require('express')
const authController = require('../controllers/authController')
const router = express.Router()

router.route('/login').post(authController.loginController)
router.route('/logout').post(authController.logoutController)
router.route('/register').post(authController.registerController)

module.exports = router