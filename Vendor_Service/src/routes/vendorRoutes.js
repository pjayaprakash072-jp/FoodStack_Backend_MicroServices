const express = require("express");
const router = express.Router();
const { createVendor, getAllVendors, getVendorByEmail, updateVendor, deleteVendor} = require("../controllers/vendorController");
const upload = require("../middleware/upload")
const verifyToken = require("../middleware/verifyToken");
const authorizeRoles = require("../middleware/authorizeRoles")

router.post("/create", upload.single("profileImg"), createVendor);
router.get("/getall", getAllVendors);
router.get("/get",getVendorByEmail);
router.put("/update",verifyToken, authorizeRoles("vendor"), upload.single("profileImg"), updateVendor);
router.delete("/delete",verifyToken, deleteVendor);

module.exports = router;