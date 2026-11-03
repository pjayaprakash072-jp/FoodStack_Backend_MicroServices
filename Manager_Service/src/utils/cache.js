const { redisClient } = require("../config/redis")
const getCache = async (key)=>{
    const data = await redisClient.get(key);
    if(!data){
        return null;
    }
    return JSON.parse(data); // converting the string data that we get from redis cloud
}
module.exports= {
    getCache
}
