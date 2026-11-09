const jwt = require('jsonwebtoken');
const Manager = require('../models/Manager');
const {getCache} = require('../utils/cache')
const verifyToken = async(req,res,next)=>{
    try {
        const token = req.headers.token;
        if(!token){
            return res.status(400).json(
                {
                    message:"Access denied. No token provided!(MANAGER)"
                }
            )
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        if(!decoded.id || !decoded.role){
            return res.status(400).json(
                {
                    messaeg:"Invalid Token Payload!"
                }
            )
        }
        const currentSession = await getCache(
            `${decoded.role}:session:${decoded.id}`
        )
        if(!currentSession){
            return res.status(400).json(
                {
                    message: "You have been logged out because your accoutn was logged  in elsewhere!."
                }
            )
        }
        req.role = decoded.role;
        if(decoded.role === "manager"){
            const authId = decoded.id;
            const manager = await Manager.findOne({authId});
            req.managerId = manager._id;
            req.outletId = manager.outlet;
            req.manager = manager;
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json(
            {
                message: "Internal server error, Token is InValid! OR session id is not verified.(vendor)",
                error: error.message
            }
        );
    }
}

module.exports = verifyToken;