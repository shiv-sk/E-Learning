import { useEffect, useState } from "react";
import {Card} from "react-bootstrap";
import {getReq , baseurl} from "../utils/ApiCalls";
export default function Home(){
    const [categories , setCategories] = useState([]);
    const [courses , setCourses] = useState([]);
    useEffect(()=>{
        const fetchCategory = async()=>{
            try {
                const response = await getReq(`${baseurl}/category/`);
                // console.log(response.categories);
                setCategories(response.categories);
            } catch (error) {
                console.log("error fetching the category: " , error);
            }
        }
        fetchCategory();
    } , [])
    const fetchCourseByCategory = async(categoryId)=>{
        try {
            const response = await getReq(`${baseurl}/course/category/${categoryId}`);
            // console.log(response.courses);
            setCourses(response.courses);
        } catch (error) {
            console.log("error form fetching courses by category: " , error);
        }
    }

    return(
        <>
        {/* section-----1 why we need E-Learning */}
        <>
        <div style={{margin:"3.5rem 0"}}>
            <h2 style={{textAlign:"center" , marginBottom:"1.5rem"}}>Why E-Learning</h2>
            <section style={{display:"flex" , justifyContent:"center" , alignItems:"center" }}>
                <div style={{display:"flex" , flexWrap:"wrap" , gap:"15px" }}>
                    <Card style={{ width: '18rem' }} bg="dark">
                        <Card.Body style={{color:"whitesmoke"}}>
                        <Card.Title style={{borderBottom:"20px", color:"whitesmoke" , textAlign:"center"}}>section. 1</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the cards content. <br />
                        Some quick example text to build on the card title and make up the
                        bulk of the cards content.
                        </Card.Text>
                        
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }} bg="dark">
                        <Card.Body style={{color:"whitesmoke"}}>
                            <Card.Title style={{textAlign:"center"}}>section. 2</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the cards content. <br />
                            Some quick example text to build on the card title and make up the
                            bulk of the cards content.
                            </Card.Text>
                            
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }} bg="dark">
                        <Card.Body style={{color:"whitesmoke"}}>
                            <Card.Title style={{textAlign:"center"}}>section. 3</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the cards content. <br />
                            Some quick example text to build on the card title and make up the
                            bulk of the cards content.
                            </Card.Text>
                            
                        </Card.Body>
                    </Card>
                </div>
            </section>
        </div>
        </>
        {/* About us  */}
        <div style={{marginBottom:"3.5rem"}}>
            <h2 style={{textAlign:"center" , marginBottom:"1.5rem"}}>About Us</h2>
            <section style={{display:"flex" , justifyContent:"center" , alignItems:"center"}}>
                <div>
                    <Card style={{width:"60rem" , color:"whitesmoke"}} bg="dark">
                        <Card.Header>E-Learning</Card.Header>
                        <Card.Body>
                            <Card.Title>About Title</Card.Title>
                            <Card.Text>
                            With supporting text below as a natural lead-in to additional content.
                            </Card.Text>
                            {/* <Button variant="primary">Go somewhere</Button> */}
                        </Card.Body>
                    </Card>
                </div>
            </section>
        </div>

        {/* category-wise rendering(get-req) */}
        <div>
            <h2 style={{textAlign:"center"}} className="featured">Featured Couses</h2>
        </div>
        <div style={{display:"flex" , justifyContent:"center" , alignItems:"center" }}>
            
            
            <div style={{display:"flex" , flexWrap:"wrap"}}>
                {
                    categories.map((category)=>(
                        
                        <ul key={category._id} style={{padding:".5rem .5rem"}}>
                        <li onClick={()=>fetchCourseByCategory(category._id)} 
                        style={{cursor:"pointer" , listStyleType:"none" }}>{category.title}</li>
                        </ul>
                        
                        
                        
                    ))
                }
            </div>
        </div>

        {/* showing all courses with specified courses */}
        <div>
            <div style={{display:"flex" , flexWrap:"wrap" , gap:"15px" , justifyContent:"center"}}>
                {
                    courses.map((course)=>(
                        <Card style={{ width: '18rem' }} key={course._id}>
                            <Card.Img variant="top" src={course.coverImage} />
                            <Card.Body>
                            <Card.Title>{course.title}</Card.Title>
                            <Card.Text>
                                {course.description}
                            </Card.Text>
                        
                            </Card.Body>
                        </Card>
                    ))
                    
                }
            </div>
        </div>
        </>
    )
}