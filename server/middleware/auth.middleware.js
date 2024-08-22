const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const startTime = Date.now();

exports.verifyjwt = async(req,res,next)=>{
    try {
        const token = req.headers["authorization"];
        if(!token){
            return res.status(404).json({
                status:"fail",
                message:"token is not found"
            })
        }
        const decoded = jwt.verify(token , process.env.TOKEN_SECRET);
        // console.log(`jwt verification took ${Date.now() - startTime}:ms and startTime is: ${new Date(startTime).toLocaleString()}`);
        const user = await User.findById(decoded.id).select("-password");
        // console.log(`user Fetching from db took ${Date.now() - startTime}:ms and ${startTime}`);
        if(!user){
            return res.status(404).json({
                status:"fail",
                message:"user is not found"
            })
        }
        // console.log("the requested user from middleware: " , user);
        console.log("the requested user role is: " , user.role);
        const roles = ["admin" , "instructor"];
        if(!roles.includes(user.role)){
            return res.status(403).json({
                status:"fail",
                message:"you are forbidden to access this route"
            })
        }
        
        req.user = user
        // console.log(`Auth middleware took ${Date.now() - startTime}:ms and ${startTime}`);
        next();
    } catch (error) {
        return res.status(401).json({
            status:"fail",
            message:error.message
        })
    }
}