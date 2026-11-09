const axios = require("axios");
const vendorAuth = axios.create(
    {
        baseURL:process.env.MANAGER_AUTH_SERVICE_URL,
        timeout:5000
    }
);

const updateVendorAuth = async(payload,token)=>{
    try {
        const response = await vendorAuth.put(
            '/vendorAuth/update',
            payload,
            {
                headers:{
                    token
                }
            }
        )
        return response.data;
    } catch (error) {
        if(error.response?.status === 404 || error.response?.status === 400){
            return null;
        }
        throw error;
    }
}
const deleteVendorAuth = async(token)=>{
    try {
        const response = await vendorAuth.delete(
            '/vendorAuth/delete',
            {
                headers:{
                    token
                }
            }
        )
        return response.data;
    } catch (error) {
        if(error.response?.status === 404 || error.response?.status === 400){
            return null;
        }
        throw error;
    }
}
module.exports = {
    updateVendorAuth,
    deleteVendorAuth
    
}
