import { useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [loginData , setLoginData] = useState({
       email:"",
       password:"" 
    });
    const {isLoading , login} = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        try {
            e.preventDefault();
            login(loginData);
            navigate("/");
        } catch (error) {
            console.log("error fromt the handlesubmit: " , error);
        }
    }
    return isLoading ? (<p>loging the user</p>): (
        <Form style={{paddingTop:"5%" , paddingLeft:"30%"}} onSubmit={handleSubmit}>
            <Row>
                <Col xs={6}>
                <h5 className="text-center">Login</h5>
                <Stack gap={4}>
                    <Form.Control type="email" placeholder="example@email.com" value={loginData.email} onChange={(e)=>setLoginData({...loginData , email:e.target.value})} required/>
                    <Form.Control type="password" placeholder="pass@123" value={loginData.password} onChange={(e)=>setLoginData({...loginData , password:e.target.value})} required/>
                    <Button type="submit" variant="primary">Login</Button>
                </Stack>
                
                </Col>
            </Row>
        </Form>
    )
}