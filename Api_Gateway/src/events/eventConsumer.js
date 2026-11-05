const {createClient} = require('redis');
const {getIo} = require('../sockets/socketServer');
const subscriber = createClient(
    {
        url:process.env.REDIS_URL,
        RESP:2
    }
)
subscriber.on("error",(error)=>{
    console.log(`Redis Subscriber Error:,${error}`);
})
subscriber.on("connect",()=>{
    console.log(`Redis Subscriber connecting...`);
})
subscriber.on("ready",()=>{
    console.log(`Redis Subscriber is ready!`);
})

const initializeEventConsumer = async()=>{
    await subscriber.connect();
    console.log(`Redis Subscriber Connected`);
    await subscriber.subscribe(
        "foodStack:events",
        (msg)=>{
            const event = JSON.parse(msg);
            const io = getIo();
            if(event.type === "order.status.updated"){
                io.to(`order:${event.data.orderId}`).emit(`order-status-updated`,event.data);
            }
            if(event.type === "new.order"){
                io.to(`outlet:${event.data.outletId}`).emit(`new-order`,event.data);
            }
        }
    )
}

module.exports ={
    initializeEventConsumer
}