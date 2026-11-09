const axios = require('axios');
const managerapi = axios.create(
    {
        baseURL:process.env.MANAGER_SERVICE_URL,
        timeout:5000
    }
)
const getManager = async(token)=>{
    try {
        const response = await managerapi.get(
            '/manager/get',
            {
                headers:{
                    token
                }
            }
        )
        return response.data;
    } catch (error) {
        if(error.response?.status === 400 || error.response?.status === 404){
            console.log(error.response?.data?.message);
            return null;
        }
        throw error;
    }
}
module.exports = {
    getManager
}