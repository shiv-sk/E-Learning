const bcrypt = require("bcryptjs")
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["student" , "instructor" , "admin"],
        default:"student"
    }
} , {timestamps:true});

userSchema.pre("save" , async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password , 10);
})

userSchema.methods.ispasswordcorrect = async function(password){
    return await bcrypt.compare(password , this.password);
}

const User = mongoose.model("User" , userSchema);
module.exports = User;