import { useParams } from "react-router-dom"
import { baseurl, getReq, postReq } from "../utils/ApiCalls";
import { useEffect, useState } from "react";
import {Card , Button} from "react-bootstrap";
import { ToastContainer , toast } from "react-toastify";

export default function CourseDetail(){
    const {courseId} = useParams();
    const [course , setCourse] = useState(null);
    const [category , setCategory] = useState(null);
    const [instructor , setInstructor] = useState();
    const [lessons , setLessons] = useState([]);
    const [content , setContent] = useState([]);
    const userId = JSON.parse(localStorage.getItem("User"));
    userId ? userId._id : null;
    // console.log("local state for course : ",course);
    // console.log("the id of the course: " , courseId);
    // console.log("the category is: " ,category);
    // console.log("the instructor is: " ,instructor);
    // console.log("the lessons are: " ,lessons);
    // console.log("the contents are: " ,content);
    useEffect(()=>{
        const fetchCourse = async()=>{
            try {
                const response = await getReq(`${baseurl}/course/${courseId}`);
                // console.log("the courses " , response);
                setCourse(response.course);
            } catch (error) {
                console.log("error for all courses: " ,error);
            }
        }
        fetchCourse()
    } , [courseId])
    
    //seting the lessons
    useEffect(()=>{
        if(course){
            setLessons(course.lesson)
        }
    } ,[course]);
    
    //category fetching
    useEffect(()=>{
        const fetchCategory = async ()=>{
            if(course){
                try {
                    const response = await getReq(`${baseurl}/category/${course.category}`);
                    // console.log("the category is: " , response);
                    setCategory(response.category);
                } catch (error) {
                    console.log("error from fetching category: " , error);
                }
            }
            
        }
        fetchCategory();
    } , [course])

   //getting the user

   useEffect(()=>{
      
      const fetchUser = async()=>{
        if(course){
            try {
                const response = await getReq(`${baseurl}/user/${course.instructor}`);
                // console.log(response);
                setInstructor(response.user);
            } catch (error) {
                console.log("error for fetching the use: " , error);
            }
        }
        
      }
      fetchUser();
   } , [course]);

   //lessonsDetails
   useEffect(()=>{
      const fetchLesson = async()=>{
        if(lessons && lessons.length > 0){
            try {
                const lessonpromise = lessons.map(async(lessonId)=>{
                    const response = await getReq(`${baseurl}/lesson/${lessonId}`);
                    console.log("the response for lessonId: " , lessonId , ":" , response );
                    return response.lesson;
                });
                const lessonResponse = await Promise.all(lessonpromise);
                console.log("all fetched lessons : " , lessonResponse);
                setContent(lessonResponse);
            } catch (error) {
                console.log("the error from fetchlesson: " , error);
            }
        }
      }
      fetchLesson()
   } , [lessons])

    const handleEnrollment = async()=>{
        try {
            const response = await postReq(`${baseurl}/enrollment/` , {userId,courseId});
            console.log("the response from enrollment: " , response);
            toast(response.message);
        } catch (error) {
            console.log("the error from enrollment: " , error);
            toast(error.response.data.message);
        }
    }
    return(
        <>
        <Card bg="dark" style={{color:"whitesmoke"}}>
            <Card.Header as="h5">Course</Card.Header>
            <Card.Body>
                <Card.Title>{course ? course.title : null}</Card.Title>
                <Card.Text>{course ? course.description : null}</Card.Text>
                <Card.Text>{category ? category.title : null}</Card.Text>
                <Card.Title>{content ? "contents are" : null}</Card.Title>
                <Card.Text>
                    {
                        content ? content.map((videos)=>(
                           <div key={videos._id}>
                            {
                                <>
                                <Card.Text>{videos.title}</Card.Text>
                                <Card.Text>contentType: {videos.contentType}</Card.Text>
                                <video controls src={videos.content} style={{height:"20%" , width:"20%"}}></video>
                                </>
                            }
                           </div>
                        )) : null
                    }
                </Card.Text>
                <Card.Text>
                    {
                        instructor ? (
                            <>
                                <Card.Header>Instructor:</Card.Header>
                                <Card.Text>{instructor.username}</Card.Text>
                            </>
                        ) : null
                    }
                </Card.Text>
                <Button variant="primary" onClick={handleEnrollment}>Enroll</Button>
            </Card.Body>
        </Card>
        <ToastContainer/>
        </>
    )
}