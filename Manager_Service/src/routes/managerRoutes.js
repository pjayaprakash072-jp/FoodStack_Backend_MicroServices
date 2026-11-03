const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const authorizeRoles = require('../middleware/authorizeRoles');
const upload = require('../middleware/upload')
const {
    createManager,
    updateManager
} = require('../controllers/managercontroller');
const {
    updateOutlet
} = require('../controllers/outletController');
const {
    getMenuCategoriesByOutlet, 
    createMenuCategory, 
    getMenuCategoryById, 
    updateMenuCategory, 
    deleteMenuCategory
} = require('../controllers/menuCategoryController')
router.post('/create',createManager);
router.put('/update',verifyToken,authorizeRoles("manager","vendor"),updateManager);
router.put('/outlet/update',verifyToken,authorizeRoles("manager"),updateOutlet);
router.get('/categories/outlet',verifyToken,authorizeRoles("manager"),getMenuCategoriesByOutlet);
router.post('/category/create',verifyToken,authorizeRoles("manager"),upload.single("image"),createMenuCategory);
router.get('/category/get/:id',verifyToken,authorizeRoles("manager"),getMenuCategoryById);
router.put('/category/update/:id',verifyToken,authorizeRoles("manager"),upload.single('image'),updateMenuCategory);
router.delete('/category/delete/:id',verifyToken,authorizeRoles("manager"),deleteMenuCategory);
module.exports = router;