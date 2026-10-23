const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();


const vendorRoutes = require("./routes/vendorRoutes");
const outletRoutes = require("./routes/outletRoutes");
const menuCategoryRoutes = require("./routes/menuCategoryRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");
const userRoutes = require('./routes/User/userRoutes')
const cartRoutes = require("./routes/User/cartRoutes")
const addressRoutes = require('./routes/User/addressRoutes')
const orderRoutes = require('./routes/User/orderRoutes')
const paymentRoutes = require('./routes/User/paymentRoutes')
const managerRoutes = require('./routes/managerRoutes')
const vendorAuthRoutes = require('./routes/vendroAuthRoutes')
const userAuthRoutes = require('./routes/User/userAuthRoutes')

const { redisClient } = require("./config/redis")


const INSTANCE_ID = crypto.randomUUID();

const PORT = process.env.PORT || 5000;  


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))// name=Jayaprakash&email=jay@gmail.com suppose the req.body is like this , then it will make req.body as obj.

app.use("/vendor", vendorRoutes);
app.use("/outlet", outletRoutes);
app.use("/menu-category", menuCategoryRoutes);
app.use("/menu-item", menuItemRoutes);
app.use("/manager",managerRoutes)

// HOME route.
app.get('/',(req,res)=>{
    res.send("Welcome to FoodStack!")
})
// health Check.

app.get("/health" , (req,res)=>{
    return res.status(200).json(
        {
            status:"ok"
        }
    )
})
module.exports = app;
