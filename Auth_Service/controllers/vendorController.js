const Vendor = require('../models/Vendor');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {setCache} = require('../utils/cache')
const {sendWelcomeEmail,sendForgotPasswordLink} = require('../utils/email')
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
        try {
            await sendWelcomeEmail(email,name);
        } catch (error) {
            console.error("Email send failed" , error)
        }

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

const loginVendor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const vendor = await Vendor.findOne({ email });
        if (!vendor) {
            return res.status(404).json(
                { 
                    message: "Vendor not found, Failed to login!" 
                }
            );
        }
        const isMatch = await bcrypt.compare(password, vendor.password);
        if (!isMatch) {
            return res.status(401).json(
                { 
                    message: "Invalid credentials" 
                }
            );
        }
        const sessionId = crypto.randomUUID();
        await setCache(
            `${vendor.role}:session:${vendor._id}`,
            sessionId,
            1800
        )
        const token = jwt.sign(
            {
                id: vendor._id,
                role:vendor.role,
                sessionId:sessionId 
            },
            process.env.JWT_SECRET, 
            { 
                expiresIn: '1h',
                issuer:"foodstack-auth",
                audience:"foodstack-api",
                algorithm:"HS256"
            }
        );
        res.status(200).json(
            { 
                message: "Vendor logged in successfully", 
                token, 
                vendor 
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json(
            { 
                message: "Internal server error, Failed to Login vendor", 
                error: error.message 
            }
        );
    }
};

const forgotPassword = async(req,res)=>{
    try {
        const {email} = req.body;
        const vendor = await Vendor.findOne({email})
        if(!vendor){
            return res.status(400).json(
                {
                    message:"Vendor not found, Please create Account!"
                }
            )
        }

        // generate random token
        const resetToken = crypto.randomBytes(32).toString("hex");
        // console.log("original token" , resetToken)
        // hashing token before soting in db

        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")
        vendor.passwordResetToken = hashedToken;

        vendor.passwordResetTokenExpires =   Date.now()+10*60*1000;


        await vendor.save({validateBeforeSave:false})

        const resetURL =`${process.env.FRONTEND_URL_VENDOR}/reset-password/${resetToken}`

        // await sendForgotPasswordLink(vendor.email,vendor.name,resetURL);
        return res.status(200).json(
            {
                message:"Password reset link is sent!"
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).json(
            {
                message:"Internal server error, Failed to sent the Forgot password link!",
                error:error.message
            }
        )
    }
}
const resetPassword = async (req,res)=>{
    try {
        const {token} = req.params;
        const {password} = req.body;
        if(!password){
            return res.status(400).json(
                {
                    message:"Password is required!"
                }
            )
        }

        // hashed token 
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex")

        // find vendor by using token + expire

        const vendor = await Vendor.findOne({
            passwordResetToken :hashedToken,
            passwordResetTokenExpires:{
                $gt:Date.now()
            }
        })

        if(!vendor){
            return res.status(400).json(
                {
                    message:"Invalid or expired reset Link"
                }
            )
        }

        const hashPassword = await bcrypt.hash(password,10);

        vendor.password = hashPassword;


        // remove resetToken

        vendor.passwordResetToken = null;

        vendor.passwordResetTokenExpires = null;


        await vendor.save();

        res.status(200).json(
            {
                message:"password reset successfully!"
            }
        )
    } catch (error) {
        console.error(error);
        return res.status(500).json(
            {
                message:"Internal server error, Failed to resetPassword!",
                error:error.message
            }
        )
    }
}
module.exports = {
    createVendor,
    loginVendor,
    forgotPassword,
    resetPassword
}