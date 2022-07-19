import { useState } from "react";
import { nanoid } from "nanoid";

const Reply = ({setReplyComment, id, username}) => {

    const [newReplyComment, setNewReplyComment] = useState('')
    const isInputDisabled = newReplyComment.length === 0;

    const handleReply = (e) => {
        e.preventDefault()
        const newReply = {
          id: nanoid(),
          commentId: id,
          on: false,
          content: newReplyComment,
          createdAt: "a moment ago",
          score: 0,
          replyingTo: username,
          user: {
            image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp"
            },
            username: "juliusomo",
           }
          }
           fetch("http://localhost:8000/replies", {
             method: 'POST',
             headers: {"Content-Type": "application/json"},
             body: JSON.stringify(newReply)
           }).then(() => {
             console.log("new reply added")
           })
           setNewReplyComment("")
           setReplyComment(null)
    }
    return (
        <form className="comments__form" onSubmit={handleReply}>
        <img src="./images/avatars/image-juliusomo.png" alt="user" />
        <textarea 
          placeholder="Add a comment..."
          value={newReplyComment}
          onChange={(e)=> setNewReplyComment(e.target.value)}
        />
          <button disabled={isInputDisabled}>Reply</button>
      </form>
    );
}
 
export default Reply;