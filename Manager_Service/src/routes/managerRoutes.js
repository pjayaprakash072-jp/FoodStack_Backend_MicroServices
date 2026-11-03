const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const authorizeRoles = require('../middleware/authorizeRoles')
const {createManager,updateManager} = require('../controllers/managercontroller');
const {updateOutlet} = require('../controllers/outletController')
router.post('/create',createManager);
router.put('/update',verifyToken,authorizeRoles("manager","vendor"),updateManager);
router.put('/outlet/update',verifyToken,authorizeRoles("manager"),updateOutlet);
module.exports = router;