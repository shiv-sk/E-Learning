const mongoose = require("mongoose");
const enrollmentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true,
    },
    status:{
        type:String,
        enum:["Active" , "Inactive"],
        default:"Active"
    }
} ,{timestamps:true});

const Enrollment = mongoose.model("Enrollment" , enrollmentSchema);
module.exports = Enrollment;