import { Fragment, useState } from "react";

import "../../style/Comments.scss";
import CommentsEdit from "../EditComments/CommentsEdit";
import CommentsVote from "../Elements/CommentsVote";
import Modal from "../Elements/Modal";
import ReplaidComments from "./ReplaidComments";
import Reply from "../Elements/Reply";

const Comments = ({ comment, id, handleEdited }) => {
  const [openModal, setOpenModal] = useState(false);
  const [replyComment, setReplyComment] = useState(null);
  const [editReply, setEditReply] = useState(null);

  const handleEditReply = (event, reply) => {
    event.preventDefault();
    setEditReply(reply.id);
  };

  const handleReply = (event, comment) => {
    event.preventDefault();
    setReplyComment(comment.id);
    console.log(id);
  };

  const handleDelete = () => {
    fetch("http://localhost:8000/comments/" + comment.id, {
      method: "DELETE",
    }).then(() => {
      console.log("comment deleted");
    });
  };

  return (
    <div className="comments">
      <div className="comments__body">
        <CommentsVote comment={comment} />
        <div className="comments__main">
          <div className="comments__info">
            <div className="comments__info--user">
              <img src={comment.user?.image?.png} alt="user" />
              <h4>{comment.user?.username}</h4>
              <h5>{comment.createdAt}</h5>
            </div>
            {/*Using ternary operator to determine which button to display*/}
            {comment.on ? (
              <div className="comments__actions">
                <button
                  className="reply"
                  onClick={(event) => handleReply(event, comment)}
                >
                  <img src="./images/icon-reply.svg" alt="reply" />
                  Reply
                </button>
              </div>
            ) : (
              <div className="comment__actions">
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
            <p>{comment.content}</p>
          </div>
        </div>
      </div>

      {replyComment && (
        <Reply
          setReplyComment={setReplyComment}
          id={comment.id}
          username={comment.username}
        />
      )}

      {comment.replies.map((comment) => (
        <Fragment key={comment.id}>
          {editReply === comment.id ? (
            <CommentsEdit
              id={comment.id}
              setEditComment={setEditReply}
              content={comment.content}
            />
          ) : (
            <ReplaidComments
              key={comment.id}
              handleDelete={handleDelete}
              openModal={openModal}
              setOpenModal={setOpenModal}
              handleEdited={handleEditReply}
              comment={comment}
            />
          )}
        </Fragment>
      ))}

      {openModal && (
        <Modal deleteModal={handleDelete} closeModal={setOpenModal} />
      )}
    </div>
  );
};

export default Comments;
