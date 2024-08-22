import { Button, Card } from "react-bootstrap";
import { baseurl, getReq } from "../utils/ApiCalls";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function AllCourse(){
    const [courses , setCourses] = useState([]);
    const fetchAllCourse = async()=>{
        try {
            const response = await getReq(`${baseurl}/course`);
            // console.log(response.course);
            setCourses(response.course);
        } catch (error) {
            console.log("error for fetching all courses: " , error);
        }
    }
    useEffect(()=>{
        fetchAllCourse();
    },[])
    return(
        <>
        <div  style={{display:"flex" , flexWrap:"wrap" , gap:"15px" , justifyContent:"center"}}>
        {
            courses.map((course)=>(
                
                <Card style={{ width: '18rem'  , color:"whitesmoke"}} key={course._id} bg="dark">
                    <Card.Img variant="top" src={course.coverImage} />
                        <Card.Body>
                            <Card.Title>{course.title}</Card.Title>
                            <Card.Text>{course.description}</Card.Text>
                            <Card.Text>{course.price}</Card.Text>
                            <Link to={`/course/${course._id}`}>
                            <Button variant="primary">More</Button>
                            </Link>
                        </Card.Body>
                </Card>
                
                
            ))
        }
        </div>
        </>
    )
}