const router = require('express').Router();
const {createUserAuth,loginUser,verifyUserEmail} = require('../controllers/userAuthController');
const verifyCaptcha = require("../middleware/verifyCaptcha")
router.post("/create",verifyCaptcha,createUserAuth);
router.post("/login", loginUser);
router.get("/verify-email/:verificationToken", verifyUserEmail)

module.exports = router;