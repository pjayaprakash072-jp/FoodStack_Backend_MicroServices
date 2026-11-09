const express = require('express');
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

const managerRoutes = require('./src/routes/managerRoutes')
app.use('/manager',managerRoutes);
app.get('/',(req,res)=>{
    return res.send("Manager service is working....")
})

module.exports = app;