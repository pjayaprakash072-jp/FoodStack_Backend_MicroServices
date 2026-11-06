const {
    sendWelcomeEmail,
    sendForgotPasswordLink,
    sendVerificationEmail
} = require('../services/emailService');
const welcomeEmail = async(req,res)=>{
    try {
        const {email,name} = req.body;
        if(!email || !name){
            return res.status(400).json(
                {
                    message:"Email and name are required!"
                }
            )
        }
        await sendWelcomeEmail(email,name);
        res.status(200).json(
            {
                message:"welcome email sent successfully!"
            }
        )
        
    } catch (error) {
        console.log("Welcome email error:",error);
        res.status(500).json(
            {
                message:"Internal server error, Failed to send welcome email",
                error:error.message
            }
        )
    }
}

const forgotPasswordEmail = async (req,res) => {
    try {
        const {email,name,resetURL} = req.body;
        if(!email || !name || !resetURL){
            return res.status(400).json(
                {
                    message:"Required fields are missing!"
                }
            )
        }
        await sendForgotPasswordLink(email,name,resetURL);
        res.status(200).json(
            {
                message:"Password reset email sent."
            }
        )
    } catch (error) {
        console.log("Forgot password email error: ",error);
        res.status(500).json(
            {
                message:"Internal server error, Failed to send forgot password email",
                error: error.message
            }
        )
    }
}
const verificationEmail = async(req,res)=>{
    try {
        const {
            email,
            name,
            verificationUrl
        } = req.body;
        if(!email || !name || !verificationUrl){
            return res.status(400).json(
                {
                    message:"Required fields are missing!"
                }
            )
        }
        await sendVerificationEmail(email , name, verificationUrl);
        res.status(200).json(
            {
                message:"Verification email sent."
            }
        )
        
    } catch (error) {
        console.log("Verification email error: ",error);
        res.status(500).json(
            {
                message:"Internal server error, Failed to send Verification email!",
                error:error.message
            }
        )
    }
}

module.exports = {
    welcomeEmail,
    forgotPasswordEmail,
    verificationEmail
}