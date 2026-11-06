const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const emailRoutes = require('./src/routes/emialRoutes');

app.use('/email',emailRoutes);
app.get('/',(req,res)=>{
    return res.send("working")
})

const PORT = process.env.PORT || 5005;

app.listen(PORT,()=>{
    console.log(`Email server is running at port: ${PORT}`)
});
