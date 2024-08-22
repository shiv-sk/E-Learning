const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

//creating the webtoken
const Token = (user)=>{
    try {
        return jwt.sign({id:user._id , username:user.username} , process.env.TOKEN_SECRET , {expiresIn:process.env.TOKEN_EXPIRY});
    } catch (error) {
        console.log("the token error: " , error);
        throw error;
    }
}

// registeruser

exports.registerUser = async(req,res)=>{
    try {
        const {username , email , password} = req.body
        if(!(username && email && password)){
            return res.status(400).json({
                status:"fail",
                message:"all fileds are required"
            })
        }
        console.log("the requested fields are: " , username , email , password);
        const existuser = await User.findOne({email});
        if(existuser){
            console.log("user is existed: " , existuser);
            return res.status(400).json({
                status:"fail",
                message:"user is already exist"
            })
        }
        
        const user = await User.create({
            username,
            email,
            password
        });
        
        if(!user){
            return res.status(500).json({
                status:"fail",
                message:"the user is not created"
            })
        }
        user.password = undefined;
        const token = Token(user);
        console.log("user from the server: ",user);
        return res.status(201).json({
            status:"success",
            message:"user is crested successfully",
            user,
            token
        })
    } catch (error) {
        console.log("error is registering the user: ", error);
        return res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}

//login user
exports.loginUser = async(req,res)=>{
    try {
        const {email , password} = req.body;
        if(!(email && password)){
            return res.status(400).json({
                status:"fail",
                message:"all fields are required"
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                status:"fail",
                message:"user is not found"
            })
        }
        const iscorrectpassword = await user.ispasswordcorrect(password);
        if(!iscorrectpassword){
            return res.status(400).json({
                status:"fail",
                message:"password is incorrect"
            })
        }
        user.password = undefined;
        const token = Token(user);
        return res.status(200).json({
            status:"success",
            message:"user is logedin successfully",
            user,
            token
        })
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}

//get all users from db
exports.getAllUser = async(req,res)=>{
    try {
        const user = await User.find().select("-password");
        if(user.length === 0){
            return res.status(404).json({
                status:"fail",
                message:"user is not found"
            })
        }
        return res.status(200).json({
            status:"success",
            message:"List of users",
            user
        })
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}

//get single user form db
exports.getUser = async(req,res)=>{
    try {
        const {userId} = req.params;
        if(!userId){
            return res.status(400).json({
                status:"fail",
                message:"the user id is required"
            })
        }
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({
                status:"fail",
                message:"the user is not found"
            })
        }
        return res.status(200).json({
            status:"success",
            message:"the requested user is",
            user
        })
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}

//update the user
exports.updateUser = async(req,res)=>{
    try {
        const {userId} = req.params;
        if(!userId){
            return res.status(400).json({
                status:"fail",
                message:"the user id is required"
            })
        }
        const user = await User.findByIdAndUpdate(userId , req.body , {new:true}).select("-password").exec();
        if(!user){
            return res.status(404).json({
                status:"fail",
                message:"user is not found"
            })
        }
        return res.status(200).json({
            status:"success",
            message:"updated user is",
            user
        })
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}

exports.deleteUser = async(req,res)=>{
    try {
        const {userId} = req.params;
        if(!userId){
            return res.status(400).json({
                status:"fail",
                message:"user id is required"
            })
        }
        const user = await User.findByIdAndDelete(userId);
        if(!user){
            return res.status(404).json({
                status:"fail",
                message:"user is not found"
            })
        }
        return res.status(204).json({});
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}