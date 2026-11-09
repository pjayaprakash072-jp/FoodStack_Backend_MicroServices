const axios = require('axios');
const emailclient = axios.create(
    {
        baseURL:process.env.EMAIL_SERVICE_URL,
        timeout:10000,
        headers:{
            'Content-Type':"application/json",
            'service-key': process.env.EMAIL_SERVICE_SECRET
        }
    }
)


const sendWelcomeEmail = async (email, name) =>{
    const response = await emailclient.post(
        '/email/welcome',
        {
            email,name
        }
    )
    return response.data;
}

const sendForgotPasswordLink  = async (email, name, resetURL)=>{
    const response = await emailclient.post(
        'email/forgot-pass',
        {
            email,
            name,
            resetURL
        }
    )
    return response.data;
}

const sendVerificationEmail = async (email, name, verificationUrl) => {
    const response = await emailclient.post(
        '/email/verify-email',
        {
            email,
            name,
            verificationUrl
        }
    )
    return response.data;
};


module.exports = {sendWelcomeEmail , sendForgotPasswordLink ,sendVerificationEmail }

