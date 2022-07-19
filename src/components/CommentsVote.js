import { useState } from "react";
import "../Styles/CommentsVote.scss";

const CommentsVote = ({votes}) => {

    const [vote, setVote] = useState(votes)

    const upVote = () => {
        setVote(prevVote => prevVote + 1)
    }

    const downVote = () => {
        setVote(prevVote => prevVote - 1)
    }

    return (
    <div className="comment__vote">
        <div className="comment__vote--up" onClick={upVote}><img src="./images/icon-plus.svg" alt="plus"/></div>
        <p className="score">{vote}</p>
        <div className="comment__vote--down" onClick={downVote}><img src="./images/icon-minus.svg" alt="plus"/></div>
    </div>
    );
}
 
export default CommentsVote;