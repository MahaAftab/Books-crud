import { useState } from "react";
import { Container, Navbar, Row, Col } from 'react-bootstrap';
import AddPost from "./components/AddPost";
import PostsList from "./components/PostsList";
import "./App.css";

function App() {
  const [postId, setPostId] = useState("");

  const getPostIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setPostId(id);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">Books - CRUD</Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddPost id={postId} setPostId={setPostId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
          <br />
            <PostsList getPostId={getPostIdHandler} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
