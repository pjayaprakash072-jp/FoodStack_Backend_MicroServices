const axios = require('axios');

const unwrap = (res)=>res.data;
const vendorService = axios.create(
    {
        baseURL:process.env.VENDOR_SERVICE_URL,
        timeout:5000
    }
);

const createVendor = async(payload,authId)=>{
    try {
        const response = await vendorService.post(
            '/vendor/create',
            payload,
            {
                params:{
                    authId
                }
            }
        )
        return unwrap(response);
    } catch (error) {
        if(error.response?.status === 400 || error.response?.status === 404){
            console.log(error.response?.data?.message);
            return null;
        }
        throw error;
    }
}
const getVendor = async(email)=>{
    try {
        const response = await vendorService.get(
            '/vendor/get',
            {
                params:{
                    email
                }
            }
        )
        return unwrap(response);
    } catch (error) {
        if(error.response?.status === 400 || error.response?.status === 404){
            console.log(error.response?.data?.message);
            return null;
        }
        throw error;
    }
}
module.exports = {
    createVendor,
    getVendor
}