const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const authorizeRoles = require('../middleware/authorizeRoles')
const {createManager,updateManager} = require('../controllers/managercontroller')
router.post('/create',createManager);
router.put('/update',verifyToken,authorizeRoles("manager","vendor"),updateManager);
module.exports = router;