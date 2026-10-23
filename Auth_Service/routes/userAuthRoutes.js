const router = require('express').Router();
const {createUserAuth,loginUser,verifyUserEmail} = require('../controllers/userAuthController');

router.post("/create",createUserAuth);
router.post("/login",loginUser);
router.get("/verify-email/:verificationToken", verifyUserEmail)

module.exports = router;