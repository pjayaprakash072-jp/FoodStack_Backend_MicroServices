const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();


const vendorRoutes = require("./src/routes/vendorRoutes");
const outletRoutes = require("./src/routes/outletRoutes");
const menuCategoryRoutes = require("./src/routes/menuCategoryRoutes");
const menuItemRoutes = require("./src/routes/menuItemRoutes");
const managerRoutes = require('./src/routes/managerRoutes')


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
