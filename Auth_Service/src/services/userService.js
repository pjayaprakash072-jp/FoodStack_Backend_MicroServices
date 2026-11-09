const axios = require('axios');
const userApi = axios.create(
    {
        baseURL:process.env.USER_SERVICE_URL,
        timeout:5000
    }
)
const createUser = async(payload,authId)=>{
    try {
        const response = await userApi.post(
            '/user/create',
            payload,
            {
                params:{
                    authId
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
const getUser = async(token)=>{
    try {
        const response = await userApi.get(
            '/user/get',
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
    createUser,
    getUser
}