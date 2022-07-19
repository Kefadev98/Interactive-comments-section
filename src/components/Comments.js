import {Fragment, useState} from "react";
import "../Styles/Comments.scss"
import CommentsEdit from "./CommentsEdit";
import CommentsVote from "./CommentsVote";
import Modal from "./Modal";
import ReplaidComments from "./ReplaidComments";
import Reply from "./Reply";

const Comments = ({
  image, 
  username, 
  content, 
  createdAt, 
  votes, 
  on, 
  comment, 
  id, 
  handleEdited}) => {

    const [openModal, setOpenModal] = useState(false)
    const [replyComment, setReplyComment] = useState(null)
    const [editReply, setEditReply] = useState(null)

    const handleEditReply = (event, reply) => {
      event.preventDefault();
      setEditReply(reply.id);
    }

    const handleReply = (event, comment) => {
      event.preventDefault();
      setReplyComment(comment.id)
      console.log(id);
    }

    const handleDelete = () => {
      fetch("http://localhost:8000/comments/" + id, {
          method: 'DELETE'
      }).then(() => {
          console.log("comment deleted")
      })
  }

    return (
        <div className="comments">

          <div className="comments__body">
           <CommentsVote 
            votes={votes}
            />
            <div className="comments__main">

              <div className="comments__info">
               <div className="comments__info--user">
                <img src={image} alt="user" />
                <h4>{username}</h4>
                <h5>{createdAt}</h5>
              </div>
              {/*Using ternary operator to determine which button to display*/}
               {on ? 
                <div className="comments__actions">
                 <button className="reply" 
                  onClick={(event) => handleReply(event, comment)}> 
                  <img src="./images/icon-reply.svg" alt="reply"/>
                   Reply
                 </button>
                </div> 
                : 
                <div className="comment__actions"> 
                   <button className="delete" 
                    onClick={() => setOpenModal(true)}>
                    <img src="./images/icon-delete.svg" alt="delete"/>
                    Delete
                    </button>
                   <button className="edit" 
                    onClick={(event) => handleEdited(event, comment)}>
                    <img src="./images/icon-edit.svg" alt="edit"/>
                    Edit
                    </button>
                  </div>
                }   
                </div>

                <div className="comments__description">
                  <p>{content}</p>
                </div>
            </div>  
          </div>

          {replyComment && 
          <Reply 
           setReplyComment={setReplyComment} 
           id={comment.id}
           username={username}
          />}

            {comment.replies.map(reply => (

             <Fragment key={reply.id}>
              {editReply === reply.id ?
              <CommentsEdit 
               id={reply.id}
               setEditComment={setEditReply}
               content={reply.content}
              />
              :
              <ReplaidComments
               key={reply.id} 
               content={reply.content}
               image={reply.user.image.png}
               username={reply.user.username}
               createdAt={reply.createdAt}
               votes={reply.score}
               on={reply.on}
               id={reply.id}
               replyingTo={reply.replyingTo}
               handleDelete={handleDelete}
               openModal={openModal}
               setOpenModal={setOpenModal}
               handleEdited={handleEditReply}
               reply={reply}
              />
              }
             </Fragment>

          ))}

          {openModal && 
          <Modal 
           deleteModal={handleDelete} 
           closeModal={setOpenModal}
          />}
          
        </div>
    );
}
 
export default Comments;