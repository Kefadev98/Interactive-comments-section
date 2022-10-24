import { createContext, useState, useEffect } from "react";
import data from "../data/data.json";

export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [editComment, setEditComment] = useState(null);

  const handleEdited = (event, comment) => {
    event.preventDefault();
    setEditComment(comment.id);
  };

  useEffect(() => {
    console.log("data", data);
    fetch("http://localhost:8000/comments?_embed=replies")
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  return (
    <CommentContext.Provider
      value={{
        comments,
        setComments,
        editComment,
        setEditComment,
        handleEdited,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
