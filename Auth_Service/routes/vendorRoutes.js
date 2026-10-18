const router = require('express').Router();
const {createVendor} = require('../controllers/vendorController')

router.post('/create',createVendor);


module.exports =router;