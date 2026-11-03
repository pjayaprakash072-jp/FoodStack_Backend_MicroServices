const {
    getOrdersByOutlet_s,
    updateOrder_s
} = require('../service/outletServices');

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
        if(req.file){
            const image_m = {
                url:req.file.path,
                public_id:req.file.filename
            }
            payload = {...payload,image_m};
        }
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