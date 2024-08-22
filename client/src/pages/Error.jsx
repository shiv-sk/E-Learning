import { Container } from "react-bootstrap";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Container>
      <div id="error-page" style={{paddingTop:"15%" , paddingLeft:"25%"}}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.error}</i>
        </p>
      </div>
    </Container>
    
  );
}