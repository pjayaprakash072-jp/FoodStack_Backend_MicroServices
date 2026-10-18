const router = require('express').Router();
const {createVendor,loginVendor} = require('../controllers/vendorController')

router.post('/create',createVendor);
router.post('/login',loginVendor);


module.exports =router;