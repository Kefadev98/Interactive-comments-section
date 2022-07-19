import "../Styles/CommentsForm.scss";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import data from "../data.json";

const CommentsForm = ({submitLabel}) => {

  const [user, setUser] = useState([])
  const [text, setText] = useState('')
  const isInputDisabled = text.length === 0;
 
  useEffect(() => {
    console.log(data)
    fetch("http://localhost:8000/currentUser")
    .then(res => res.json())
    .then(data => setUser(data))
  },[])

  const handleSubmit = (e) => { 
      e.preventDefault()
      const newComment = {
         id: nanoid(),
         on: false,
         content: text,
         createdAt: "a moment ago",
         score: 0,
         user: {
             image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp"
            },
            username: "juliusomo"
              },
              replies: []
        }
        fetch("http://localhost:8000/comments", {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(newComment)
        }).then(() => {
          console.log("new comment added")
        })
        setText("")
      }

    return (
        <form className="comments__form" onSubmit={handleSubmit}>
        <img src={user.img} alt="user" />
        <textarea 
          placeholder="Add a comment..."
          value={text}
          onChange={(e)=> setText(e.target.value)}
        />
          <button disabled={isInputDisabled}>{submitLabel}</button>
      </form>
    );
}
 
export default CommentsForm;