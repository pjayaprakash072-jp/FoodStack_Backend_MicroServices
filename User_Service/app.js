const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

const userRoutes = require('./src/routes/userRoutes')
const cartRoutes = require("./src/routes/cartRoutes")
const addressRoutes = require('./src/routes/addressRoutes')
const orderRoutes = require('./src/routes/orderRoutes')
const paymentRoutes = require('./src/routes/paymentRoutes')


app.use(cors());
app.use(express.urlencoded({extended:true}))// name=Jayaprakash&email=jay@gmail.com suppose the req.body is like this , then it will make req.body as obj.

app.use("/user",userRoutes)
app.use("/cart",cartRoutes)
app.use("/address",addressRoutes);
app.use("/order",orderRoutes);
app.use("/payment",paymentRoutes);

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
