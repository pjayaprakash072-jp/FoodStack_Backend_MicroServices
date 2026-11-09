const router = require('express').Router();
const {
    createUserAuth,
    loginUser,
    verifyUserEmail,
    updateUserAuth
} = require('../controllers/userAuthController');
const verifyCaptcha = require("../middleware/verifyCaptcha");
const verifyTokenAuth = require('../middleware/verifyTokenAuth');
router.post("/create",verifyCaptcha,createUserAuth);
router.post("/login", loginUser);
router.get("/verify-email/:verificationToken", verifyUserEmail)
router.post('/update',verifyTokenAuth,updateUserAuth)
module.exports = router;