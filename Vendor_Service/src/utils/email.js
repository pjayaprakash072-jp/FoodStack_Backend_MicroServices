const nodemailer = require('nodemailer')
console.log("EMAIL_USER exists:", !!process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport( // creating transporter between my node applicaton to the acutal gmail server to send emails from my foodStack application.
    {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    }
);


const sendWelcomeEmail = async (email, name) =>{

    const mailOptions = {
        from:`"FoodStack" <${process.env.EMAIL_USER}>`,
        to:email,
        subject:"Welcome to FoodStack 🎉",

        html:`
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Welcome to FoodStack, ${name}! 👏</h2>
                <p>
                    Thank you for registering with FoodStack.
                </p>
                <p>
                    Your account has been successfully created.
                </p>
                <p>
                    We're happy to have you with us!
                </p>
                <br>
                <p>
                    Regards,<br>
                    <strong>FoodStack Team</strong>
                </p>
            </div>
        
        `
    };
    await transporter.sendMail(mailOptions)
}

module.exports = {sendWelcomeEmail}

