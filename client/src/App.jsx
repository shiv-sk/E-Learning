import 'bootstrap/dist/css/bootstrap.min.css';

import { Outlet } from "react-router-dom";
import {Container} from "react-bootstrap";
import NavBar from './component/Navbar';
import Footer from './component/Footer';
function App() {
  return (
    <>
    <NavBar/>
     <Container>
     <Outlet />
     </Container>
     <Footer/>
    </>
  )
}

export default App
