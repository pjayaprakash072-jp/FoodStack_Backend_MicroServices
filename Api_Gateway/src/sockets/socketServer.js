const {Server} = require('socket.io');
let io;
const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5173"
].filter(Boolean);
const initializeSocket = (server)=>{
    io = new Server(server,{
        cors:{
            origin:allowedOrigins,
            credentials:true
        }
    })
    io.on("connection",(socket)=>{
        console.log("Socket connected:" , socket.id);
        socket.on("join-outlet",(outletId)=>{
            if(!outletId) return;
            const roomName = `outlet:${outletId}`;
            socket.join(roomName);
            console.log(`socket ${socket.id} joined outlet: ${outletId}`)
        })
        socket.on("leave-outlet",(outletId)=>{
            if(!outletId) return;
            const roomName = `outlet:${outletId}`;
            socket.leave(roomName);
            console.log(`socket ${socket.id} left outlet: ${outletId}`)
        })
        socket.on("join-order",(orderId)=>{
            if(!orderId) return;
            const roomName = `order:${orderId}`;
            socket.join(roomName);
            console.log(`socket ${socket.id} joined order: ${orderId}`)
        })
        socket.on("leave-order",(orderId)=>{
            if(!orderId) return ;
            const roomName = `order:${orderId}`;
            socket.leave(roomName);
            console.log(`socket ${socket.id} left order: ${orderId}`)
        })
        socket.on("disconnect",()=>{
            console.log(`socket disconnedted: ${socket.id}`)
        })
    })
    return io;
}
const getIo = ()=> io;
module.exports ={
    initializeSocket,
    getIo
}