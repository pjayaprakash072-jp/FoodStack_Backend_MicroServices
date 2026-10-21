const dotEnv = require('dotenv');
dotEnv.config();
const app = require("./app");
const connectDB = require('./src/config/db')
const {connectRedis} = require('./src/config/redis')

const PORT = process.env.PORT || 5000;

const startServer = async ()=>{
    try {
        await connectDB();
        await connectRedis();
        app.listen(PORT , ()=>{
            console.log(`Server is runnig at port ${PORT}`)
        })
    } catch (error) {
        console.log("Server startup erro",error);
        process.exit(1);
    }
}

startServer();