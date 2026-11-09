const router = require('express').Router();
const {
    createManagerAuth,
    loginManager,
    getManagerAuth,
    deltetManagerAuth
} = require('../controllers/managerAuthController')
const verifyTokenAuth = require('../middleware/verifyTokenAuth')

router.post('/create',createManagerAuth);
router.post('/login',loginManager);
router.get('/get',getManagerAuth);
router.delete('/delete',verifyTokenAuth, deltetManagerAuth)
module.exports = router;