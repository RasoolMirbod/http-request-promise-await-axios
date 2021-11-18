import { useEffect, useState } from "react";
import Comment from "../../components/Comment/Comment";
import FullComment from "../../components/FullComment/FullComment";
import NewComment from "../../components/NewComment/NewComment";
import "./discussion.css";
import axios from "axios";
import { toast } from "react-toastify";
const Discussion = () => {
  const [comments, setComments] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getComments = async () => {
      try {
        const { data } = await axios.get("http://localhost:3002/comments");
        setComments(data);
      } catch (error) {
        //console.log(error);
        setError(true);
      }
    };
    getComments();
  }, []);

  const selectCommentHandler = (id) => {
    setSelectedId(id);
  };

  const renderComments = () => {
    let renderedValue = <p>Loading ...</p>;
    if (error) {
      renderedValue = <p>fetching data failed !</p>;
      toast.error("there is an error");
    }
    if (comments && !error) {
      renderedValue = comments.map((c) => (
        <Comment
          key={c.id}
          name={c.name}
          email={c.email}
          onClick={() => selectCommentHandler(c.id)}
        />
      ));
    }
    return renderedValue;
  };

  

  return (
    <main>
      <section>{renderComments()}</section>
      <section>
        <FullComment commentId={selectedId} />
      </section>
      <section>
        <NewComment setComments={setComments} />
      </section>
    </main>
  );
};

export default Discussion;
