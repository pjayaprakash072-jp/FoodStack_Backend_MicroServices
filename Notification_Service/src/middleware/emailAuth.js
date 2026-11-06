const serviceAuth = (req,res,next)=>{
    try {
        const servicekay = req.headers['service-key'];
        if(!servicekay || servicekay !== process.env.EMAIL_SERVICE_SECRET){
            return res.status(401).json(
                {
                    message:"Unauthorized service!"
                }
            )
        }
        next();
    } catch (error) {
        console.log(`Failed to verify service error: ${error}`);
        res.status(500).json(
            {
                message:"Internal server error, Failed to verify the service!",
                error:error.message
            }
        )
    }
}
module.exports = serviceAuth;