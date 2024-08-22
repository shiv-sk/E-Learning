import { Button, Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link , useNavigate} from "react-router-dom";
import { useAuth } from "../context/Authcontext";
export default function NavBar(){
  const {logout} = useAuth();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("User"));
  const onclickevent = ()=>{
    try {
      logout();
      navigate("/");
    } catch (error) {
      console.log("error from the logout function: " , error);
    }
  }
    return(
        <Navbar bg="primary" data-bs-theme="dark" style={{padding:"4px 10px"}} className="mb-5">
            <Container>
            <Stack direction="horizontal" gap={4} >
            <Link to={"/"} className="text-decoration-none link-dark heading">E-Learning</Link>
            </Stack>
          
          <Nav>
            {
              user && user.role === "instructor" ? (
                <>
                  <Stack direction="horizontal" gap={4} >
                    <Link to={"/course"} className="text-decoration-none link-dark nav-Item">Course</Link>
                    <Link to={"/lesson"} className="text-decoration-none link-dark nav-Item">Lesson</Link>
                    <Link to={"/allcourse"} className="text-decoration-none link-dark nav-Item">All Course</Link>
                  </Stack>
                </>
              ) : (
                <>
                <Stack direction="horizontal" gap={4} style={{margin:"0 10px"}}>
                  <Link to={"/allcourse"} className="text-decoration-none link-dark nav-Item">allcourse</Link>
                </Stack>
                </>
              )
            }
            {
              user ? (
                <>
                {/* <Button variant="dark" style={{padding:"5px" , margin:"0 10px"}} onClick={onclickevent}>logout</Button> */}
                  <Stack direction="horizontal" gap={4}>
                    <Link to={"/enrollment"} className="text-decoration-none link-dark" style={{margin:"0 10px"}}>MyEnrollment</Link>
                    <Button variant="dark" style={{padding:"5px"}} onClick={onclickevent}>logout</Button>
                  </Stack>
                </>
              ) : (
                <>
                  <Stack direction="horizontal" gap={4} >
                    <Link to={"/register"} className="text-decoration-none link-dark nav-Item">Register</Link>
                    <Link to={"/login"} className="text-decoration-none link-dark nav-Item">Login</Link>
                  </Stack>
                </>
              )
            }
            
          </Nav>
          </Container>
      </Navbar>
    )
}