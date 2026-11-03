
const {
    getMenuitemsByOutlet_s,
    getMenuItemsByCategory_s,
    getMenuItemById_s,
    createMenuItem_s,
    updateMenuItem_s,
    deleteMenuItem_s
} = require('../service/outletServices')
const getMenuitemsByOutlet = async(req,res)=>{
    try {
        const token = req.headers.token;
        const result = await getMenuitemsByOutlet_s(req.outletId,token);
        res.status(200).json(
            {
                message:result.message,
                menuItems:result.menuItems
            }
        )
        
    } catch (error) {
        console.log("Error, Failed to get Items by Outlet(manager)",error);
        res.status(500).json(
            {
                message:"Internal server error, Failed to get Items by Outlet(manager)",
                error:error.message
            }
        )
        
    }
}
const getMenuItemsByCategory = async(req,res)=>{
    try {
        const token = req.headers.token;
        const id = req.params.categoryId;
        const result = await getMenuItemsByCategory_s(id,token);
        res.status(200).json(
            {
                message:result.message,
                menuItems:result.menuItems
            }
        )
        
    } catch (error) {
        console.log("Error, Failed to get Items by category(manager)",error);
        res.status(500).json(
            {
                message:"Internal server error, Failed to get Items by category(manager)",
                error:error.message
            }
        )
        
    }
}
const getMenuItemById = async(req,res)=>{
    try {
        const token = req.headers.token;
        const id = req.params.menuItemId;
        const result = await getMenuItemById_s(id,token);
        res.status(200).json(
            {
                message:result.message,
                menuItem:result.menuItem
            }
        )
        
    } catch (error) {
        console.log("Error, Failed to get item by id(manager)",error);
        res.status(500).json(
            {
                message:"Internal server error, Failed to get item by id(manager)",
                error:error.message
            }
        )
        
    }
}
const createMenuItem = async(req,res)=>{
    try {
        const token = req.headers.token;
        const id = req.params.categoryId;
        let payload = req.body;
        if(req.file){
            const image_m = {
                url:req.file.path,
                public_id:req.file.filename
            }
            payload = {...payload,image_m};
        }
        const result = await createMenuItem_s(payload,id,token);
        res.status(200).json(
            {
                message:result.message,
                menuItem:result.menuItem
            }
        )
        
    } catch (error) {
        console.log("Error, Failed to Create Item(manager)",error);
        res.status(500).json(
            {
                message:"Internal server error, Failed to Create Item(manager)",
                error:error.message
            }
        )
        
    }
}
const updateMenuItem = async(req,res)=>{
    try {
        const token = req.headers.token;
        const id = req.params.menuItemId;
        let payload = req.body;
        if(req.file){
            const image_m = {
                url:req.file.path,
                public_id:req.file.filename
            }
            payload = {...payload,image_m};
        }
        const result = await updateMenuItem_s(payload,id,token);
        res.status(200).json(
            {
                message:result.message,
                menuItem:result.menuItem
            }
        )
        
    } catch (error) {
        console.log("Error, Failed to update Item(manager)",error);
        res.status(500).json(
            {
                message:"Internal server error, Failed to update Item(manager)",
                error:error.message
            }
        )
        
    }
}
const deleteMenuItem = async(req,res)=>{
    try {
        const token = req.headers.token;
        const id = req.params.menuItemId;
        const result = await deleteMenuItem_s(id,token);
        res.status(200).json(
            {
                message:result.message,
                menuItem:result.menuItem
            }
        )
        
    } catch (error) {
        console.log("Error, Failed to delete Item(manager)",error);
        res.status(500).json(
            {
                message:"Internal server error, Failed to delete Item(manager)",
                error:error.message
            }
        )
        
    }
}
module.exports = {
    getMenuitemsByOutlet,
    getMenuItemsByCategory,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
}