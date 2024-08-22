const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    lesson:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Lesson"
    }],
    coverImage:{
        type:String,
        required:true
    }
},{timestamps:true});

const Course = mongoose.model("Course" , courseSchema);
module.exports = Course;