import { useEffect, useState } from "react"
import { baseurl, getReq } from "../utils/ApiCalls";
import { Button, Card } from "react-bootstrap";

export default function Enrollment(){
    const [enrollments , setEnrollments] = useState([]);
    let userId = JSON.parse(localStorage.getItem("User"));
    // console.log("the enrollments are: " , enrollments);
    // console.log("title of the course" , enrollments[0].course.title)
    // console.log("description of the course" , enrollments[0].course.description)
    // console.log("Status of the course" , enrollments[0].status)
   if(userId){
    userId = userId._id
   }
    // console.log(userId);
    useEffect(()=>{
        const fetchEnrollment = async()=>{
            try {
                const response = await getReq(`${baseurl}/enrollment/${userId}`);
                // console.log("the response from enrollment: " , response);
                setEnrollments(response.userCourse);
            } catch (error) {
                console.log("error from enrollment: " , error);
            }
        }
        fetchEnrollment();
    } , [userId])
    return(
        <section style={{display:"flex" , justifyContent:"center"}}>
            {
                enrollments && enrollments.length > 0 ? (
                    enrollments.map((enrollment)=>(
                        <div style={{display:"flex" , flexWrap:"wrap"}} key={enrollment.course._id}>
                        <Card bg="dark" style={{color:"whitesmoke" , width:"18rem" , margin:"0 15px"}} >
                            <Card.Img />
                            <Card.Body>
                            <Card.Title>{enrollment.course.title}</Card.Title>
                            <Card.Text>{enrollment.course.description}</Card.Text>
                            <Button>{enrollment.status}</Button>
                            </Card.Body>
                            
                        </Card>
                    </div>
                    ))
                ) : (<p>you have not enrolled in course</p>)
            }
            
        </section>
    )
}