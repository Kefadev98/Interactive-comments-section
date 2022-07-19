import CommentsVote from "./CommentsVote";
import "../Styles/ReplaidComments.scss";
import Modal from "./Modal";
import { useState } from "react";

const ReplaidComments = ({content, 
    image, 
    username, 
    createdAt, 
    votes, 
    on,
    id,
    replyingTo, handleEdited, reply
}) => {

  const [openModal, setOpenModal] = useState(false)

      const deleteReply = () => {
        fetch("http://localhost:8000/replies/" + id, {
            method: 'DELETE'
        }).then(() => {
            console.log("comment deleted")
        })
    }

    return (
        <div className="comments">

        <div className="replaid__body">
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
                  <div className="comments__reply--badge">
                   <button className="reply"> 
                    <img src="./images/icon-reply.svg" alt="reply"/>
                    Reply
                   </button>
                  </div> 
                  : 
                  <div className="comment__update--badge"> 
                     <button className="delete" 
                        onClick={() => setOpenModal(true)}>
                        <img src="./images/icon-delete.svg" alt="delete"/>
                        Delete
                        </button>
                     <button className="edit" 
                        onClick={(event) => handleEdited(event, reply)}>
                        <img src="./images/icon-edit.svg" alt="edit" />
                        Edit
                     </button>
                  </div>
                }     
              </div>

              <div className="comments__description">
                <p><span>@{replyingTo}</span> {content}</p>
              </div>
          </div>  
        </div>
        {openModal && 
        <Modal 
         deleteModal={deleteReply} 
         closeModal={setOpenModal}
        />}
      </div>
    );
}
 
export default ReplaidComments;