const router = require('express').Router();
const {
    welcomeEmail,
    forgotPasswordEmail,
    verificationEmail
} = require('../controllers/emailController');
const serviceAuth = require('../middleware/emailAuth')
router.post('/welcome',serviceAuth, welcomeEmail);
router.post('/forgot-pass',serviceAuth,forgotPasswordEmail);
router.post('/verify-email',serviceAuth,verificationEmail);

module.exports = router;