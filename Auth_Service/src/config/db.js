const mongoose = require('mongoose')
console.log("MONGO_URI:",!!process.env.MONGO_URI)

const connectDB =async()=>{
    try {
        if( mongoose.connection.readyState === 1){
            return;
        }
        mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected Successfully!");
    } catch (error) {
        console.log("MongoDB connection Failed!",error.message);
        throw error;
    }
}
module.exports = connectDB;
