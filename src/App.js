import { Fragment, useEffect } from "react";
import { useState } from "react";
import "./style/App.scss";
import Comments from "./components/Comments/Comments";
import CommentsEdit from "./components/EditComments/CommentsEdit";
import CommentsForm from "./components/Form/CommentsForm";
import data from "./data/data.json";

function App() {
  const commentsFromData = localStorage.getItem("comments")
    ? JSON.parse(localStorage.getItem("comments"))
    : null;
  const [comments, setComments] = useState([commentsFromData]);
  const [editComment, setEditComment] = useState(null);

  const handleEdited = (event, comment) => {
    event.preventDefault();
    setEditComment(comment.id);
  };

  useEffect(() => {
    console.log(data);
    fetch("http://localhost:8000/comments?_embed=replies")
      .then((res) => res.json())
      .then((data) => setComments(data));
    localStorage.setItem("comments", JSON.stringify(data));
  }, []);

  return (
    <div className="App">
      {comments.map((comment) => (
        <Fragment key={comment.id}>
          {editComment === comment.id ? (
            <CommentsEdit
              key={comment.id}
              id={comment.id}
              setEditComment={setEditComment}
              content={comment.content}
            />
          ) : (
            <Comments
              key={comment.id}
              comment={comment}
              handleEdited={handleEdited}
            />
          )}
        </Fragment>
      ))}

      <CommentsForm submitLabel="Send" />
    </div>
  );
}

export default App;
