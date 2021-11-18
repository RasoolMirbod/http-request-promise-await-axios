import axios from "axios";
import { useState } from "react";
import "./newComment.css";
const NewComment = ({setComments}) => {
  const [comment, setComment] = useState({
    name: "",
    email: "",
    content: "",
  });

  const changeHandler = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const postCommentHandler = () => {
    axios
      .post("http://localhost:3002/comments", {
        ...comment,
        postId: 10,
      })
      .then((res) => axios.get("http://localhost:3002/comments"))
      .then((res) => setComments(res.data))

      .catch();
  };
  return (
    <div className="newComment">
      <h2>Add new comment</h2>
      <div className="formControl">
        <lable> name</lable>
        <input type="text" onChange={changeHandler} name="name" />
      </div>
      <div className="formControl">
        <lable> email</lable>
        <input type="email" onChange={changeHandler} name="email" />
      </div>
      <div className="formControl">
        <lable> body</lable>
        <input type="textarea" onChange={changeHandler} name="content" />
      </div>
      <button onClick={postCommentHandler}>add New Comment</button>
    </div>
  );
};

export default NewComment;
