const router = require('express').Router();
const {createVendor,loginVendor,forgotPassword,resetPassword} = require('../controllers/vendorController')

router.post('/create',createVendor);
router.post('/login',loginVendor);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:token",resetPassword)

module.exports =router;