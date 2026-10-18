const Vendor = require('../models/Vendor');
const bcrypt = require('bcrypt')
const createVendor = async (req, res) => {
    try {
        const{
            name,
            email,
            password,
            phone,
            businessName
        } = req.body;
        const existingVendor = await Vendor.findOne({ email });
        if (existingVendor) {
            return res.status(400).json({ message: "Vendor with this email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const profileImg = req.file
        ? {
            url:req.file.path,
            public_id:req.file.filename
        }:{
            url:"",
            public_id:""
        }
        const vendor = new Vendor({
            name,
            email,
            password: hashedPassword,
            phone,
            businessName,
            profileImg,
            authProvider: "local"
        });

        await vendor.save();
        // try {
        //     await sendWelcomeEmail(email,name);
        // } catch (error) {
        //     console.error("Email send failed" , error)
        // }

        res.status(201).json(
            { 
                essage: "Vendor created successfully", 
                vendor 
            }
        );
    }
    catch (error) {
        console.error(error);
        res.status(500).json(
            {
                message: "Internal server error, Failed to create Vendor!", 
                error: error.message 
            }
        );
    }
}
module.exports = {
    createVendor
}