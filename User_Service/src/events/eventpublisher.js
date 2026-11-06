const {createClient} = require('redis');
const publisher = createClient(
    {
        url:process.env.REDIS_URL,
        RESP:2 // Redis serialization Protocol version 2
    }
)
publisher.on("error",(error)=>{
    console.log(`Redis Publisher Error: ${error}`);
});
publisher.on("connect",()=>{
    console.log(`Redis Publisher connecting...`);
});
publisher.on("ready",()=>{
    console.log(`Redis Publisher ready!`);
})
const connectPublisher = async()=>{
    try {
        if(!publisher.isOpen){
            await publisher.connect();
        }
    } catch (error) {
        console.error(`Publisher connection failes: ${error.message}`);
        throw error;
    }
}
const publishEvent = async (type, data)=>{
    try {
        if(!publisher.isReady){
            throw new Error('Redis Publisher is not ready')
        }
        await publisher.publish(
            "foodStack:events",
            JSON.stringify(
                {
                    type,
                    data
                }
            )
        )
    } catch (error) {
        console.error(`Publish failed: ${error.message}`);
        throw error;
    }
}
module.exports = {
    connectPublisher,
    publishEvent
}