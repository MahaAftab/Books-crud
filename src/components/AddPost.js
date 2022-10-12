import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button } from "react-bootstrap";
import PostDataService from "../services/post.services";

const AddPost = ({ id, setPostId }) => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  // const [status, setStatus] = useState("Available");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  //whenever we interact with the firebase it returns a promise
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (title === "" || post === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newPost = {
      title,
      post,
    };
    console.log(newPost);

    try {
      if (id !== undefined && id !== "") {
        await PostDataService.updatePost(id, newPost);
        setPostId("");
        setMessage({ error: false, msg: "Post Updated successfully!" });
      } else {
        await PostDataService.addPost(newPost);
        setMessage({ error: false, msg: "New Post added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setTitle("");
    setPost("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await PostDataService.getPost(id);
      console.log("the record is :", docSnap.data());
      setTitle(docSnap.data().title);
      setPost(docSnap.data().post);
      // setStatus(docSnap.data().status);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formPostTitle">
            <InputGroup>
              <InputGroup.Text id="formPostTitle">Title</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          {/* className="mb-3" */}
          <Form.Group controlId="formPost">
            <InputGroup>
              <InputGroup.Text id="formPost">Post</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Write a post"
                value={post}
                onChange={(e) => setPost(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Post/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddPost;
