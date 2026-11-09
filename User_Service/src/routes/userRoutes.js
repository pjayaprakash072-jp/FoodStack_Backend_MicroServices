const express = require('express')
const router = express.Router();
const upload = require('../middleware/upload')
const verifyToken = require('../middleware/verifyToken')
const authorizeRoles = require('../middleware/authorizeRoles')
const {createUser,updateUser, getOneUser} = require("../controllers/userController")
router.post("/create",upload.single("profileImg"),createUser)
router.get("/get",verifyToken,getOneUser);
router.put("/update",upload.single("profileImg"),verifyToken,authorizeRoles("user"),updateUser)
module.exports= router;