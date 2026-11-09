const {
    getOrdersByOutlet_s,
    updateOrder_s
} = require('../service/userService');

const getOrdersByOutlet = async(req,res)=>{
    try {
        console.log("hitting controller")
        const token = req.headers.token;
        const id = req.outletId;
        const result = await getOrdersByOutlet_s(id,token);
        res.status(200).json(
            {
                message:result.message,
                orders:result.orders
            }
        )
        
    } catch (error) {
        console.log("Error, Failed to getOrdersByOutlet(manager)",error);
        res.status(500).json(
            {
                message:"Internal server error, Failed to getOrdersByOutlet(manager)",
                error:error.message
            }
        )
        
    }
}

const updateOrder = async(req,res)=>{
    try {
        const token = req.headers.token;
        const id = req.params.orderId;
        let payload = req.body;
        const result = await updateOrder_s(payload,id,token);
        res.status(200).json(
            {
                message:result.message,
                order:result.order
            }
        )
        
    } catch (error) {
        console.log("Error, Failed to update Order Status(manager)",error);
        res.status(500).json(
            {
                message:"Internal server error, Failed to update Order Status(manager)",
                error:error.message
            }
        )
        
    }
}

module.exports = {
    getOrdersByOutlet,
    updateOrder
}