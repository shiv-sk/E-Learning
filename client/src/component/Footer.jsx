import { Container, Row } from "react-bootstrap";

export default function Footer(){
    return(
        <footer className="mt-5">
            <Container fluid>
                <Row className=" text-light">
                    <small className="text-center mt-2 footer-copyright" style={{padding:"5px 0"}}>
                        &copy; Fun-Project, 2024. All rights reserved.
                    </small>
                </Row>
            </Container>
        </footer>
    )
}