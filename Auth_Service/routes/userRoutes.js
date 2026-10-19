const express = require('express')
const router = express.Router();
const verifyCaptcha = require("../middleware/verifyCaptcha")
const {createUser, verifyUserEmail, loginUser} = require("../controllers/userController")
router.post("/create",createUser)
router.get("/verify-email/:verificationToken", verifyUserEmail)
// router.post("/login",verifyCaptcha,loginUser)
router.post("/login",loginUser)
module.exports= router;