const express = require('express');
const app = express();
const PORT = process.env.PORT || 5003;

app.listen(PORT , ()=>{
    console.log(`Manager Service is running at port ${PORT}`)
})
