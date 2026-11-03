const router = require('express').Router();
const {createManager} = require('../controllers/managercontroller')
router.post('/create',createManager);
module.exports = router;