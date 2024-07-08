const express = require('express')
const userController = require('../controller/userController')
const router = express.Router()


router.post('/userSignup',userController.userRegister)
router.post('/userLogin',userController.login)
router.post('/verifyotp',userController.verifyOtp)
router.post('/sendotp',userController.sendOtp)

module.exports = router