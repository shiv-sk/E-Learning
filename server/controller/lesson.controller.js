const Lesson = require("../model/lesson.model");
const Course = require("../model/course.model");
const uploadOnCloudinary = require("../utils/cloudinary");
const startTime = Date.now();
//creating new lesson
exports.newLesson = async (req,res)=>{
    try {
        const {title , contentType , course} = req.body;
        if(!(title && contentType && course)){
            return res.status(400).json({
                status:"fail",
                message:"all fields are required"
            })
        }
        // console.log(`request parsing and validation took ${Date.now() - startTime}:ms and ${startTime}`);
        const courseData = await Course.findById(course).populate("lesson");
        // console.log(`course fetch took ${Date.now() - startTime}:ms and ${startTime}`);
        if(!courseData){
            return res.status(404).json({
                status:"fail",
                message:"course is not found"
            })
        }
        const existlesson =courseData.lesson.some((lesson)=>lesson.title.trim().toLowerCase() === title.trim().toLowerCase());
        if(existlesson){
            return res.status(400).json({
                status:"fail",
                message:"lesson is already exist"
            })
        }
       
        const contentLocalPath = req.files?.content[0].path;
        if(!contentLocalPath){
            return res.status(400).json({
                status:"fail",
                message:"there no localPath"
            })
        }
        const cloudinaryUpload = await uploadOnCloudinary(contentLocalPath);
        // console.log(`Cloudinary media took ${Date.now() - startTime}:ms and ${startTime}`);
        if(!cloudinaryUpload){
            return res.status(400).json({
                status:"fail",
                message:"lesson is not uploaded"
            })
        }
        const lesson = await Lesson.create({
            title,
            contentType,
            course,
            content:cloudinaryUpload.url
        })
        // console.log(`creating new lesson in db took ${Date.now() - startTime}:ms and ${startTime}`);
        if(!lesson){
            return res.status(500).json({
                status:"fail",
                message:"the lesson is not created"
            })
        }
        const updatedCourse = await Course.findByIdAndUpdate(
            course,
            { $push: { lesson: lesson._id } },
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(400).json({
                status: "fail",
                message: "Failed to add lesson to course"
            });
        }
        return res.status(201).json({
            status:"success",
            message:"lesson is created",
            lesson
        })
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}

//get all lesson
exports.getAllLesson = async(req,res)=>{
    try {
        const lessons = await Lesson.find();
        if(lessons.length === 0){
            return res.status(404).json({
                status:"fail",
                message:"lessons are not found"
            })
        }
        return res.status(200).json({
            status:"success",
            message:"lessons are",
            lessons
        })
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}

//get a lesson
exports.getLesson = async(req,res)=>{
    try {
        const {lessonId} = req.params;
        if(!lessonId){
            return res.status(400).json({
                status:"fail",
                message:"lesson id is required"
            })
        }
        const lesson = await Lesson.findById(lessonId);
        if(!lesson){
            return res.status(404).json({
                status:"fail",
                message:"lesson is not found"
            })
        }
        return res.status(200).json({
            status:"success",
            message:"the lesson is",
            lesson
        })
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}

//delete lesson

exports.deleteLesson = async(req,res)=>{
    try {
        const {lessonId} = req.params;
        if(!lessonId){
            return res.status(400).json({
                status:"fail",
                message:"lesson id is required"
            })
        }
        const lesson = await Lesson.findByIdAndDelete(lessonId);
        if(!lesson){
            return res.status(404).json({
                status:"fail",
                message:"lesson is not found"
            })
        }
        return res.status(204).json({})
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}