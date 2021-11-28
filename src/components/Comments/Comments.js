import { useEffect, useState } from "react";
import Comment from "./Comment/Comment";
import "./comments.css";
import { getAllComments } from "../../services/getAllComentsService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const CommentsList = () => {
  const [comments, setComments] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getComments = async () => {
      try {
        const { data } = await getAllComments();
        setComments(data);
      } catch (error) {
        //console.log(error);
        setError(true);
      }
    };
    getComments();
  }, []);

  const renderComments = () => {
    let renderedValue = <p>Loading ...</p>;
    if (error) {
      renderedValue = <p>fetching data failed !</p>;
      toast.error("there is an error");
    }
    if (comments && !error) {
      renderedValue = comments.map((c) => (
        <Link to={`/comment/${c.id}`} key={c.id}>
          <Comment name={c.name} email={c.email} />
        </Link>
      ));
    }
    return renderedValue;
  };

  return <section>{renderComments()}</section>;
};

export default CommentsList;
