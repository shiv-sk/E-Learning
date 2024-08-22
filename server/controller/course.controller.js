const Mongoose = require("mongoose");
const Course = require("../model/course.model");
const uploadOnCloudinary = require("../utils/cloudinary");
//create new course 
exports.newCourse = async(req,res)=>{
    try {
        const {title , description , category , price , instructor} = req.body;
        const coverImage = req.files && req.files['coverImage'] ? req.files['coverImage'][0] : null;
        if(!coverImage){
            return res.status(400).json({
                status:"fail",
                message:"coverImage is required"
            })
        }
        // console.log("path of the coverimage" , coverImage);
        if(!(title && description && category && price && instructor)){
            return res.status(400).json({
                status:"fail",
                message:"all fields are required"
            })
        }
        const categoryId = new Mongoose.Types.ObjectId(category.trim());
        const instructorId = new Mongoose.Types.ObjectId(instructor.trim());
        // console.log("request body for the course: " , title , description , category , price , instructor);
        const existCourse = await Course.findOne({title});
        if(existCourse){
            return res.status(400).json({
                status:"fail",
                message:"the course is existed"
            })
        }
        // console.log("the files of the request: " , req.files);
        const coverImagePath = req.files?.coverImage[0]?.path;
        // console.log("path of the coverimage" , coverImage);
        if(!coverImagePath){
            return res.status(400).json({
                status:"fail",
                message:"coverimage path is not found"
            })
        }
        const cloudinaryUpload = await uploadOnCloudinary(coverImagePath);
        // console.log("the upload from controller file",cloudinaryUpload);
        const course = await Course.create({
            title,
            description,
            instructor:instructorId,
            category:categoryId,
            price,
            coverImage:cloudinaryUpload.url
        })
        if(!course){
            return res.status(500).json({
                status:"fail",
                message:"course is not created"
            })
        }
        return res.status(201).json({
            status:"success",
            message:"course is created",
            course
        })
    } catch (error) {
        console.log("error of the course: ", error);
        return res.status(404).json({
            status:"fail",
            message:error.message
        })
    }
}

//get all course 
exports.getAllCourse = async(req,res)=>{
    try {
        const course = await Course.find();
        if(course.length === 0){
            return res.status(404).json({
                status:"fail",
                message:"courses are not found"
            })
        }
        return res.status(200).json({
            status:"success",
            message:"courses are",
            course
        })
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}

//get single course
exports.getCourse = async(req,res)=>{
    try {
        const {courseId} = req.params;
        if(!courseId){
            return res.status(400).json({
                status:"fail",
                message:"courseId is required"
            })
        }
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                status:"fail",
                message:"course is not found"
            })
        }
        return res.status(200).json({
            status:"success",
            message:"course is",
            course
        })
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}

//get the course by category id
exports.getCourseByCategory = async (req,res)=>{
    try {
        const {categoryId} = req.params;
        if(!categoryId){
            return res.status(400).json({
                status:"fail",
                message:"category Id is required"
            })
        }
        const courses = await Course.find({category:categoryId});
        if(courses.length === 0){
            return res.status(404).json({
                status:"fail",
                message:"courses are not found"
            })
        }
        return res.status(200).json({
            status:"success",
            mesaage:"all Courses are ",
            courses
        })
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}

//delete the course
exports.deleteCourse = async(req,res)=>{
    try {
        const {courseId} = req.params;
        if(!courseId){
            return res.status(400).json({
                status:"fail",
                message:"courseId is required"
            })
        }
        const course = await Course.findByIdAndDelete(courseId);
        if(!course){
            return res.status(404).json({
                status:"fail",
                message:"course is not found"
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

//middleware-check-cntroller
exports.middlewareCheck = async(req,res)=>{
    try {
        return res.status(200).json({
            status:"success",
            message:"you r the autorized person",
            data:[
                {
                    name:"name1",
                    price:100
                },
                {
                    name:"name2",
                    price:100
                },
                {
                    name:"name3",
                    price:100
                },
                {
                    name:"name1",
                    price:100
                },
                {
                    name:"name1",
                    price:100
                }
    
            ]
        })
    } catch (error) {
        return res.status(500).json({
            status:"fail0000",
            message:error.message
        })
    }
}