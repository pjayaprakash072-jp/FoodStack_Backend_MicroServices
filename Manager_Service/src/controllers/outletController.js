const {
    updateOutlet_s
} = require('../service/outletServices');
const updateOutlet = async (req,res)=>{
    try {
        const token = req.headers.token;
        const id = req.outletId;
        let payload = req.body;
        if(req.file){
            const image_m = {
                url:req.file.path,
                public_id:req.file.filename
            }
            payload = {...payload,image_m};
        }
        const result = await updateOutlet_s(payload,id,token);
        res.status(200).json(
            {
                message:result.message,
                oulet:result.outlet
            }
        )
    } catch (error) {
        console.log("Error, Failed to update outlet(manager)",error);
        res.status(500).json(
            {
                message:"Internal server error, Failed to update outlet(manager)",
                error:error.message
            }
        )
    }
}
module.exports = {
    updateOutlet
}