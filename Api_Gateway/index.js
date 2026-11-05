const express = require('express');
const http = require('http');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const dotenv = require('dotenv');
const {initializeSocket} = require('./src/sockets/socketServer');
const {initializeEventConsumer} = require('./src/events/eventConsumer');
dotenv.config();
const app = express();
app.use(cors());

app.use(createProxyMiddleware(
    {
        pathFilter:(path)=> path.startsWith("/vendorAuth") || path.startsWith("/userAuth") || path.startsWith("/managerAuth"),
        target:process.env.AUTH_SERVICE_URL,
        changeOrigin:true
    }
))
app.use(createProxyMiddleware(
    {
        pathFilter:(path)=> path.startsWith("/vendor") || path.startsWith("/outlet") || path.startsWith("/menu-category") || path.startsWith("/menu-item"),
        target:process.env.VENDOR_SERVICE_URL,
        changeOrigin:true
    }
))
app.use(createProxyMiddleware(
    {
        pathFilter:(path)=> path.startsWith("/user") || path.startsWith("/cart") || path.startsWith("/address") || path.startsWith("/order") || path.startsWith("/payment"),
        target:process.env.USER_SERVICE_URL,
        changeOrigin:true
    }
))
app.use(createProxyMiddleware(
    {
        pathFilter:(path)=> path.startsWith("/manager"),
        target:process.env.MANAGER_SERVICE_URL,
        changeOrigin:true
    }
))
const server = http.createServer(app);
initializeSocket(server);
const PORT = process.env.PORT || 5000;
const startServer = async()=>{
    try {
        await initializeEventConsumer();
        server.listen(PORT,()=>{
            console.log(`API Gateway runnign on port :${PORT}`)
        })
    } catch (error) {
        console.log(`Gateway startup failed:${error}`);
        process.exit(1);
    }
}
startServer();
