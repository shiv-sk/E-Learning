import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { baseurl, getReq, postReq } from "../utils/ApiCalls";
import {ToastContainer, toast} from "react-toastify";
export default function Lesson(){
    const [lessonData , setLessonData] = useState({
        title:"",
        contentType:"",
        course:"",
        content:null
    })
    // console.log("the file of content: " , lessonData.content);
    const [courses , setCourses] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const [isError , setIsError] = useState(null);
    const token = localStorage.getItem("Token");
    token ? token : null;
    // console.log("courses array form state: " , courses);
    // console.log("localstate update: " , lessonData);
    useEffect(()=>{
        const fetchCourses = async()=>{
            try {
                setIsLoading(true);
                const response = await getReq(`${baseurl}/course/`);
                // console.log("the response for courses: ", response.course);
                setCourses(response.course || []);
            } catch (error) {
                console.log("error for courses: " , error);
                setIsError("lesson is not created");
            } finally{
                setIsLoading(false);
            }
        }
        fetchCourses();
    } , [])
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setIsLoading(true);
        setIsError(null);
        const formData = new FormData();
        formData.append("title" , lessonData.title);
        formData.append("contentType" , lessonData.contentType);
        formData.append("course" , lessonData.course);
        formData.append("content" , lessonData.content);
        try {
            const response = await postReq(`${baseurl}/lesson/` , formData , token , true);
            // console.log("response of the request: " , response);
            // alert(`reponse of the request: ${response.message}`)
            toast(response.message)
        } catch (error) {
            console.log("error form the request: " , error);
            toast(error.response.data.message);
        } finally{
            setIsLoading(false);
        }
    }
    return(
        <>
        
        <Form style={{paddingLeft:"30%"}} onSubmit={handleSubmit}>
            <Row>
                <Col xs={6}>
                    <h5 className="text-center">Add New Lesson</h5>
                    <Stack gap={4}>
                        <Form.Control type="text" placeholder="title" value={lessonData.title} onChange={(e)=>setLessonData({...lessonData , title:e.target.value})} required/>
                        <Form.Select placeholder="contentType" value={lessonData.contentType} onChange={(e)=>setLessonData({...lessonData , contentType:e.target.value})} required>
                            <option>content-type article is not handling yet</option>
                            <option>article</option>
                            <option>video</option>
                        </Form.Select>
                        <Form.Select value={lessonData.course} onChange={(e)=>setLessonData({...lessonData , course:e.target.value})} required>
                            <option>select course</option>
                            {
                                courses.map((course)=>(
                                    <option key={course._id} value={course._id}>{course.title}</option>
                                ))  
                            }
                        </Form.Select>
                        <Form.Control type="file" onChange={(e)=>setLessonData({...lessonData , content:e.target.files[0]})} required/>
                        <Button type="submit">Add</Button>
                        {isLoading && <p>processing</p>}
                        {isError && <p>{isError}</p>}
                    </Stack>
                </Col>
            </Row>
        </Form>
        <ToastContainer/>
        </>
    )
}