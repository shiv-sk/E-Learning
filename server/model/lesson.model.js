const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        // unique:true
    },
    contentType:{
        type:String,
        required:true,
        enum:["video" , "article"]
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true
    },
    content:{
        type:String,
        required:true
    }
} , {timestamps:true});
const Lesson = mongoose.model("Lesson" , lessonSchema);
module.exports = Lesson;