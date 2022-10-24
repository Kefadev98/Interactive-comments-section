import { useState } from "react";
import "../../style/CommentsVote.scss";

const CommentsVote = ({ comment }) => {
  const votes = comment.score;
  const [vote, setVote] = useState(votes);

  const upVote = () => {
    setVote((prevVote) => prevVote + 1);
  };

  const downVote = () => {
    setVote((prevVote) => prevVote - 1);
  };

  return (
    <div className="comment__vote">
      <div className="comment__vote--up" onClick={upVote}>
        <img src="./images/icon-plus.svg" alt="plus" />
      </div>
      <p className="score">{vote}</p>
      <div className="comment__vote--down" onClick={downVote}>
        <img src="./images/icon-minus.svg" alt="plus" />
      </div>
    </div>
  );
};

export default CommentsVote;
