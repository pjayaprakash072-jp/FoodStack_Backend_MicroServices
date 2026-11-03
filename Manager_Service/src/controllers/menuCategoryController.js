const {
        getMenuCategoriesByOutlet_s, 
    createMenuCategory_s, 
    getMenuCategoryById_s, 
    updateMenuCategory_s, 
    deleteMenuCategory_s
} = require('../service/outletServices')
const getMenuCategoriesByOutlet = async(req,res)=>{
    try {
        const token = req.headers.token;
        const result = await getMenuCategoriesByOutlet_s(req.outletId,token);
        res.status(200).json(
            {
                message:result.message,
                menuCategories:result.menuCategories
            }
        )
        
    } catch (error) {
        console.log("Error, Failed to get categories by outlet(manager)",error);
        res.status(500).json(
            {
                message:"Internal server error, Failed to get categories by outlet(manager)",
                error:error.message
            }
        )
        
    }
}
const createMenuCategory = async(req,res)=>{
    try {
        const token = req.headers.token;
        const outletId = req.outletId;
        let payload = req.body;
        if(req.file){
            const image_m = {
                url:req.file.path,
                public_id:req.file.filename
            }
            payload = {...payload,image_m};
        }
        const result = await createMenuCategory_s(payload,outletId,token);
        res.status(200).json(
            {
                message:result.message,
                menuCategory:result.menuCategory
            }
        )
        
    } catch (error) {
        console.log("Error, Failed to Create Category(manager)",error);
        res.status(500).json(
            {
                message:"Internal server error, Failed to Create Category(manager)",
                error:error.message
            }
        )
        
    }
}
const getMenuCategoryById = async(req,res)=>{
    try {
        const token = req.headers.token;
        const result = await getMenuCategoryById_s(req.params.id,token);
        res.status(200).json(
            {
                message:result.message,
                menuCategory:result.menuCategory
            }
        )
        
    } catch (error) {
        console.log("Error, Failed to get category by id(manager)",error);
        res.status(500).json(
            {
                message:"Internal server error, Failed to get category by id(manager)",
                error:error.message
            }
        )
        
    }
}
const updateMenuCategory = async(req,res)=>{
    try {
        const token = req.headers.token;
        let payload = req.body;
        if(req.file){
            const image_m = {
                url:req.file.path,
                public_id:req.file.filename
            }
            payload = {...payload,image_m};
        }
        const id = req.params.id;
        const result = await updateMenuCategory_s(payload,id,token);
        res.status(200).json(
            {
                message:result.message,
                menuCategory:result.menuCategory
            }
        )
        
    } catch (error) {
        console.log("Error, Failed to Update category(manager)",error);
        res.status(500).json(
            {
                message:"Internal server error, Failed to Update category(manager)",
                error:error.message
            }
        )
        
    }
}
const deleteMenuCategory = async(req,res)=>{
    try {
        const token = req.headers.token;
        const id = req.params.id;
        const result = await deleteMenuCategory_s(id,token);
        res.status(200).json(
            {
                message:result.message,
                menuCategory:result.menuCategory
            }
        )
        
    } catch (error) {
        console.log("Error, Failed to delete category(manager)",error);
        res.status(500).json(
            {
                message:"Internal server error, Failed to delete category(manager)",
                error:error.message
            }
        )
        
    }
}

module.exports = {
    getMenuCategoriesByOutlet, 
    createMenuCategory, 
    getMenuCategoryById, 
    updateMenuCategory, 
    deleteMenuCategory
}