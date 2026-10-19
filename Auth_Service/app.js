const express = require('express');
const app = express();

app.use(express.json());

const vendorRoutes = require('./routes/vendorRoutes')
const userRoutes = require('./routes/userRoutes')
const managerRoutes = require('./routes/mangerRoutes')
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