const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const emailRoutes = require('../src/routes/emialRoutes');

app.use('/email',emailRoutes);
app.get('/',(req,res)=>{
    return res.send("Email service is working!")
})


module.exports = app;
