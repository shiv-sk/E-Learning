const Enrollment = require("../model/enrollment.model");
exports.enrollInCourse = async (req,res)=>{
    try {
        const {userId , courseId} = req.body
        if(!(userId && courseId)){
            return res.status(400).json({
                status:"fail",
                message:"Please select the course or user"
            })
        }
        const existingEnroll = await Enrollment.findOne({user:userId , course:courseId})
        if(existingEnroll){
            return res.status(400).json({
                status:"fail",
                message:"you are already enrolled this course"
            })
        }
        const newEnroll = await Enrollment.create({
            user:userId,
            course:courseId
        })
        if(!newEnroll){
            return res.status(404).json({
                status:"fail",
                message:"Enrollment is not successfully created"
            })
        }
        // console.log("the new Enrolled course: " , newEnroll);
        return res.status(201).json({
            status:"success",
            message:"Hurray Succesfully Enrolled In this course"
        })
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}

exports.userEnrollment = async (req,res)=>{
    try {
        const {userId} = req.params;
        if(!userId){
            return res.status(400).json({
                status:"fail",
                message:"Send the userId"
            })
        }
        const userCourse = await Enrollment.find({user:userId}).populate("course" , "title , price , coverImage , description")
        if(!userCourse.length){
            return res.status(404).json({
                status:"fail",
                message:"no enrollment for this user"
            })
        }
        return res.status(200).json({
            status:"success",
            message:"the enrollments are",
            userCourse
        })
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}