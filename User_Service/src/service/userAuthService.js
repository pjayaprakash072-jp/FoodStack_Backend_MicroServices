const axios = require('axios');
const userAuth = axios.create(
    {
        baseURL:process.env.AUTH_SERVICE_URL,
        timeout:5000
    }
)
const updateAuthUser = async(payload,token)=>{
    try {
        const response = await userAuth.post(
            "/userAuth/update",
            payload,
            {
                headers:{
                    token
                }
            }
        )
        return response.data;
    } catch (error) {
        if(error.response?.status ===400 || error.response?.status === 404){
            console.log(error.response?.data?.message);
            return null;
        }
        throw error;
    }
}
module.exports = {
    updateAuthUser
}