const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const dotenv = require('dotenv');
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
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Api_Gateway is runnig at port: ${PORT}`);
})
