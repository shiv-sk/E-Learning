import {useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { useAuth } from "../context/Authcontext";
import {useNavigate} from "react-router-dom";


export default function Register(){
    const {register , isLoading} = useAuth();
    const [registerData , setRegisterData] = useState({
        username:"",
        email:"",
        password:""
    });
    console.log(registerData);
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            register(registerData);
            navigate("/"); 
        } catch (error) {
            console.error("error from registerpage: " , error);
        }
        
    }
    return isLoading ? (<p>regitsering a user</p>): (
        
        <Form style={{paddingLeft:"30%" , paddingTop:"5%"}} onSubmit={handleSubmit}>
            <Row>
                <Col xs={6}>
                <h5 className="text-center">Register</h5>
                <Stack gap={4}>
                    <Form.Control type="text" placeholder="username"  value={registerData.username} onChange={(e)=>setRegisterData({...registerData , username:e.target.value})} required/>
                    <Form.Control type="email" placeholder="example@email.com"  value={registerData.email} onChange={(e)=>setRegisterData({...registerData , email:e.target.value})} required/>
                    <Form.Control type="password" placeholder="pass@123"  value={registerData.password} onChange={(e)=>setRegisterData({...registerData , password:e.target.value})} required/>
                    <Button variant="primary" type="submit">Register</Button>
                </Stack>
                
                </Col>
            </Row>
        </Form>
    )
}