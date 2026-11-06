const transporter = require('../config/email');
const sendWelcomeEmail = async(email,name)=>{
    const mailOptions = {
        from:`FoodStack <${process.env.EMAIL_USER}>`,
        to:email,
        subject:`Welcome to FoodStack 🎉`,
        html:`
        <h2>Welcome to FoodStack, ${name}!</h2>
        <p>Thank you for registering with FoodStack.</p>
        <p>Your account has been successfully created.</p>
        <p>Regards,<br><strong>FoodStack Team</strong></p>
        `
    }
    return transporter.sendMail(mailOptions)
}
const sendForgotPasswordLink = async(email,name,resetUrl)=>{
    const mailOptions = {
        from:`FoodStack <${process.env.EMAIL_USER}>`,
        to:email,
        subject:`Password Reset Link`,
        html:`
        <h2>Reset Your FoodStack Password</h2>
        <p>Hello ${name},</p>
        <p>You requested to reset your password.</p>
        <br>
        <a href="${resetUrl}"
            style="padding:12px 20px; background:#000; color:#fff;">
        Reset Password
        </a>
        <br>
        <p>This link will expire in 10 minutes.</p>
        <p>Regards,<br><strong>FoodStack Team</strong></p>
        `
    }
    return transporter.sendMail(mailOptions)
}
const sendVerificationEmail = async(email,name,verificationUrl)=>{
    const mailOptions = {
        from:`FoodStack <${process.env.EMAIL_USER}>`,
        to:email,
        subject:`Verify Your FoodStack email`,
        html:`
        <h2>Verify your FoodStack Email</h2>
        <p>Hello ${name},</p>
        <p>Thank you for registering with FoodStack.</p>
        <br>
        <a href="${verificationUrl}"
            style="padding:12px 20px; background:#000; color:#fff;">
            Verify Email
        </a>
        <br>
        <p>This link will expire in 10 minutes.</p>
        <p>Regards,<br><strong>FoodStack Team</strong></p>
        `
    }
    return transporter.sendMail(mailOptions)
}
module.exports = {
    sendWelcomeEmail,
    sendForgotPasswordLink,
    sendVerificationEmail
}