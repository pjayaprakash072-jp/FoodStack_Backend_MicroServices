const Manager = require('../models/Manager');
const createManager = async(req,res)=>{
    console.log(req.body);
    try {
        const manager = new Manager(req.body);
        await manager.save();
        res.status(201).json(
            {
                message:"manager Created successfully",
                manager
            }
        )
    } catch (error) {
        console.log("Error, Failed to create the manager",error);
        res.status(500).json(
            {
                message:"Internal server error, Failed to create manager!",
                error:error.message
            }
        )
    }
}

module.exports = {
    createManager
}