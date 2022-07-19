import { useState } from "react";
import "../Styles/CommentsForm.scss";
import {nanoid} from "nanoid";


const CommentsEdit = ({id, content, setEditComment}) => {

  const [edit, setEdit] = useState(content)
  const isInputDisabled = edit.length === 0;

  const handleEdit = (e) => {
      e.preventDefault()
      const editComment = {
          id: nanoid(),
          on: false,
          content: edit,
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
      fetch("http://localhost:8000/comments/"  + id, {
          method: 'PUT',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(editComment)
      }).then(() => {
          console.log("edited")
      })
      setEdit("")
      setEditComment(null)
    }


    return ( 
      
    <form className="comments__form" onSubmit={handleEdit}>
     <img src="./images/avatars/image-juliusomo.png" alt="user" />
     <textarea 
       value={edit}
       onChange={(e) => setEdit(e.target.value)}
     />
      <button disabled={isInputDisabled}>Update</button>
    </form>);
}
 
export default CommentsEdit;