const dotEnv = require('dotenv');
dotEnv.config();

const app = require('./app');
const connectDB = require('./src/config/db')
const {connectRedis} = require('./src/config/redis')
const PORT = process.env.PORT;

const startServer = async()=>{
    try {
        await connectDB();
        await connectRedis();
        app.listen(PORT,()=>{
            console.log(`Manager server is running at port: ${PORT}`)
        })
    } catch (error) {
        console.log(`Server starting error:${error}`);
        process.exit(1);
    }
}

startServer();