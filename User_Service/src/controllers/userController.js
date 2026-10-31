const User = require('../models/User')
const bcrypt = require('bcryptjs');
const cloudinary = require('../config/cloudinary')
const createUser = async(req,res)=>{
    try{
        const authId = req.params.authId;
        const {
            name,
            email,
            phone
        } = req.body;
        if(!name || !email ){
            return res.status(400).json(
                {
                    message:"Name and email required!"
                }
            )
        }
        const existingUser = await User.findOne({email:email.toLowerCase()});
        if(existingUser){
            return res.status(400).json(
                {
                    message:"User with this email already Existe."
                }
            )
        }
        const profileImg = req.file?
        {
            url:req.file.path,
            public_id:req.file.filename
        }:{
            url:"",
            public_id:""
        }
        const user = new User(
            {
                authId,
                name,
                email:email.toLowerCase(),
                phone,
                profileImg,
                authProvider:"local",
            }
        )
        await user.save();
    res.status(201).json(
        {
            message:"user Created Successfull! Please Verify email",user
        }
    )
    }catch(err){
        console.log("Error",err);
        res.status(500).json(
            {
                message:"Internal server Error, Failed to create User/Customer!" , 
                error:err.message
            }
        )
    }
}

const updateUser = async(req,res)=>{
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json(
                {
                    message:"user Not found, Failed to find user to update user."
                }
            )
        }
        if(req.file){
            if(user.profileImg?.public_id){
                await cloudinary.uploader.destroy(user.profileImg.public_id)
            }
            user.profileImg = {
                public_id:req.file.filename,
                url:req.file.path
            }
        }
        const {password,...otherFields} = req.body;
        Object.assign(user,otherFields);
        if(password){
            const hashedPassword = await bcrypt.hash(password,10);
            user.password = hashedPassword;
        }
        await user.save();
        const userResponse = user.toObject();
        delete user.password;
        res.status(200).json(
            {
                message:"User updated successfully!",
                user:userResponse
            }
        )
    } catch (error) {
        console.log("Error, while updating user!",error);
        res.status(500).json(
            {
                message:"Internal server Error, Failed to update User!",
                error:error.message
            }
        )
    }
}
const getOneUser = async(req,res)=>{
    try {
        const authId = req.params.authId;
        const user = await User.findOne({authId});
        if(!user){
            return res.status(400).json(
                {
                    message:"user not found"
                }
            )
        }
        res.status(200).json(
            {
                message:"user retrieved successfully",
                user
            }
        )
    } catch (error) {
        console.log("Failed to retrieve the user",error);
        res.status(400).json(
            {
                message:"Internal server Error, Failed to retrieve user",
                error:error.message
            }
        )
    }
}
module.exports = {
    createUser,
    updateUser,
    getOneUser
}