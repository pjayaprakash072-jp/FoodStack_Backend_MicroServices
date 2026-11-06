const authorizeRoles = (...allowedRoles)=>{
    return (req,res,next)=>{
        if(!req.role){
            return res.status(401).json(
                {
                    message:"Authentication required!, Failed to retrieve user role."
                }
            )
        }
        if(!allowedRoles.includes(req.role)){
            return res.status(403).json(
                {
                    message:"Access denied!, Provided role is not present."
                }
            )
        }
        next();
    }
}
module.exports = authorizeRoles;