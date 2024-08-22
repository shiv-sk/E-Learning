import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import {getReq , baseurl, postReq} from "../utils/ApiCalls"
import {ToastContainer, toast} from "react-toastify";

export default function Course(){
    const instructor = JSON.parse(localStorage.getItem("User"));
    const [courseData , setCourseData] = useState({
        title:"",
        description:"",
        category:"",
        price:"",
        instructor:instructor ? instructor._id : "",
        coverImage:null
    })
    const token = localStorage.getItem("Token");
    token ? token : null;
    // console.log(courseData);
    // console.log(instructor);
    // console.log("coverimage: " , courseData.coverImage);
    const [isLoading , setIsLoading] = useState(false);
    const [isError , setIsError] = useState(null);
    const [categories , setCategories] = useState([]);
    // console.log("categories from the state: ", categories);
    useEffect(()=>{
        const fetchCategory = async()=>{
            try {
                const response = await getReq(`${baseurl}/category/`);
                // console.log("type of the request: ", response.categories);
                setCategories(response.categories);
            } catch (error) {
                console.log("error from category fetch: ", error);
            }
        }
        fetchCategory();
    } , [])
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("title" , courseData.title)
        formData.append("description" , courseData.description)
        formData.append("price" , courseData.price)
        formData.append("category" , courseData.category)
        formData.append("instructor" , courseData.instructor)
        formData.append("coverImage" , courseData.coverImage)
        
        try {
            setIsLoading(true);
            const response = await postReq(`${baseurl}/course` , formData , token, true);
            // console.log("response from course: ", response);
            toast(response.message);
        } catch (error) {
            console.log("error from newcourse uploading: ", error);
            toast(error.response.data.message);
            setIsError("the error occured");
        } finally{
            setIsLoading(false);
        }
    }
    return(
        <>
        
       <Form style={{paddingLeft:"30%"}} onSubmit={handleSubmit}>
        <Row>
            <Col xs={6}>
                <h5 className="text-center">Add New Course</h5>
                <Stack gap={4}>
                    <Form.Control type="text" placeholder="title of course" value={courseData.title} onChange={(e)=>setCourseData({...courseData , title:e.target.value})} required/>
                    <Form.Select value={courseData.category} onChange={(e)=>setCourseData({...courseData , category:e.target.value})} required>
                        <option>select the category</option>
                        {
                            categories.map((category)=>(
                                <option key={category._id} value={category._id}>{category.title}</option>
                            ))
                        }
                    </Form.Select>
                    
                    <Form.Control as="textarea" rows={5} placeholder="description of the course" value={courseData.description} onChange={(e)=>setCourseData({...courseData , description:e.target.value})} required/>
                    <Form.Control type="number" min={0} placeholder="price" value={courseData.price} onChange={(e)=>setCourseData({...courseData , price:e.target.value})} required/>
                    <Form.Label>Choose CoverImage Of Course</Form.Label>
                    <Form.Control type="file" onChange={(e)=>setCourseData({...courseData , coverImage:e.target.files[0]})} required/>
                    <Button type="submit">Add</Button>
                    {isLoading && <p>the course is processing</p>}
                    {isError && <p>{isError}</p>}
                </Stack>
            </Col>
        </Row>
        
       </Form>
       <ToastContainer/>
       </>
    )
}