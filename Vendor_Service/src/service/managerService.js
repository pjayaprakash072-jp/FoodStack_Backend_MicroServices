const axios = require("axios");
const managerService = axios.create(
    {
        baseURL:process.env.MANAGER_SERVICE_URL,
        timeout:5000
    }
);

const crateManager = async(payload) => { 
    try {
        const response = await managerService.post(
            "/manager/create",
            payload
        )
        return response.data.manager;
    } catch (error) {
        if(error.response?.status === 404 || error.response?.status === 400){
            return null;
        }
        throw error;
    }
}
const updateManager = async(payload,token) => { 
    try {
        const response = await managerService.put(
            `/manager/update?outletId=${payload.remove}`,
            payload,
            {
                headers:{
                    token
                }
            }
        )
        console.log(response.data);
        return response.data.manager;
    } catch (error) {
        if(error.response?.status === 404 || error.response?.status === 400){
            return null;
        }
        throw error;
    }
}
module.exports = {
    crateManager,
    updateManager
}