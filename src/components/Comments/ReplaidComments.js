import CommentsVote from "../Elements/CommentsVote";
import "../../style/ReplaidComments.scss";
import Modal from "../Elements/Modal";
import { useState } from "react";

const ReplaidComments = ({ comment, handleEdited }) => {
  const [openModal, setOpenModal] = useState(false);

  const deleteReply = () => {
    fetch("http://localhost:8000/replies/" + comment.id, {
      method: "DELETE",
    }).then(() => {
      console.log("comment deleted");
    });
  };

  return (
    <div className="comments">
      <div className="replaid__body">
        <CommentsVote comment={comment} />
        <div className="comments__main">
          <div className="comments__info">
            <div className="comments__info--user">
              <img src={comment.user.image.png} alt="user" />
              <h4>{comment.user.username}</h4>
              <h5>{comment.createdAt}</h5>
            </div>
            {/*Using ternary operator to determine which button to display*/}
            {comment.on ? (
              <div className="comments__reply--badge">
                <button className="reply">
                  <img src="./images/icon-reply.svg" alt="reply" />
                  Reply
                </button>
              </div>
            ) : (
              <div className="comment__update--badge">
                <button className="delete" onClick={() => setOpenModal(true)}>
                  <img src="./images/icon-delete.svg" alt="delete" />
                  Delete
                </button>
                <button
                  className="edit"
                  onClick={(event) => handleEdited(event, comment)}
                >
                  <img src="./images/icon-edit.svg" alt="edit" />
                  Edit
                </button>
              </div>
            )}
          </div>

          <div className="comments__description">
            <p>
              <span>@{comment.replyingTo}</span> {comment.content}
            </p>
          </div>
        </div>
      </div>
      {openModal && (
        <Modal deleteModal={deleteReply} closeModal={setOpenModal} />
      )}
    </div>
  );
};

export default ReplaidComments;
