const dotEnv = require('dotenv');
dotEnv.config();
const app = require('./app')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000

const startServer =async ()=>{
    try {
        await connectDB();
        app.listen(PORT,()=>{
            console.log(`Server is running at port ${PORT}`)
        })
    } catch (error) {
        console.log("Failed to Start Server!",error);
        process.exit(1);
    }
}
startServer();