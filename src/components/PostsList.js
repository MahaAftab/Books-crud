import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import PostDataService from "../services/post.services";

const PostsList = ({ getPostId }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const data = await PostDataService.getAllPosts();
    console.log(data.docs);
    setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await PostDataService.deleteBook(id);
    getPosts();
  };
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getPosts}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Post</th>
            {/* <th>Status</th> */}
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {posts.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.post}</td>
                {/* <td>{doc.status}</td> */}
                <td>
                  <Button
                    // variant="success"
                    style={{backgroundColor: 'lightseagreen'}}
                    className="edit"
                    onClick={(e) => getPostId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    // variant="secondary"
                    className="delete"
                    style={{backgroundColor: 'lightblack'}}

                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default PostsList;
