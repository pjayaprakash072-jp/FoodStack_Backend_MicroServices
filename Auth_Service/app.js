const express = require('express');
const app = express();

app.use(express.json());

const vendorRoutes = require('./routes/vendorRoutes')
const userRoutes = require('./routes/userRoutes')
app.get('/health',(req,res)=>{
    return res.status(200).json(
        {
            message:"ok"
        }
    )
})

app.use("/vendor",vendorRoutes);
app.use("/user",userRoutes)

module.exports = app;