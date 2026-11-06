const express = require('express');
const app = express();

app.use(express.json());

const vendorRoutes = require('./src/routes/vendroAuthRoutes')
const userRoutes = require('./src/routes/userAuthRoutes')
const managerRoutes = require('./src/routes/mangerAuthRoutes')
app.get('/health',(req,res)=>{
    return res.status(200).json(
        {
            message:"ok"
        }
    )
})

app.use("/vendorAuth",vendorRoutes);
app.use("/userAuth",userRoutes)
app.use("/managerAuth",managerRoutes)

module.exports = app;