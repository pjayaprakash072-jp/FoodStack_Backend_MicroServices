const axios = require('axios');
const unwrap = (res)=>res.data;
const userApi = axios.create(
    {
        baseURL:process.env.USER_SERVICE_URL,
        timeout:5000
    }
)

const getOrdersByOutlet_s = async(outletId,token)=>{
    try {
        const response = await userApi.get(
            `/order/outlet`,
            {
                headers:{
                    token:token
                },
                params:{
                    outletId
                }
            }
        )
        return unwrap(response);
    } catch (error) {
        if(
            error.response?.status === 400 || 
            error.response?.status === 404
        ){
            return null;
        }
        throw error;
    }
}
const updateOrder_s = async(payload,orderId,token)=>{
    try {
        const response = await userApi.put(
            `/order/update`,
            payload,
            {
                headers:{
                    token:token
                },
                params:{
                    orderId
                }
            }
        )
        return unwrap(response);
    } catch (error) {
        if(
            error.response?.status === 400 || 
            error.response?.status === 404
        ){
            return null;
        }
        throw error;
    }
}
module.exports = {
    getOrdersByOutlet_s,
    updateOrder_s
}