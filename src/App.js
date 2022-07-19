import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import './App.scss';
import Comments from './components/Comments';
import CommentsEdit from './components/CommentsEdit';
import CommentsForm from './components/CommentsForm';
import data from "./data.json";

function App() {

  const [comments, setComments] = useState([])
  const [editComment, setEditComment] = useState(null) 

  const handleEdited = (event, comment) => {
    event.preventDefault();
    setEditComment(comment.id);
  }

  useEffect(() => {
    console.log(data)
    fetch("http://localhost:8000/comments?_embed=replies")
    .then(res => res.json())
    .then(data => setComments(data))
  }, [])

  return (
    <div className="App">
      {comments.map(comment => (
        <Fragment key={comment.id}>

          {editComment === comment.id ? 
          <CommentsEdit 
           id={comment.id} 
           setEditComment={setEditComment}
           content={comment.content}
          /> 
          : 
          <Comments 
          key={comment.id}
          image={comment.user.image.png}
          username={comment.user.username}
          createdAt={comment.createdAt}
          content={comment.content}
          votes={comment.score}
          on={comment.on}
          comment={comment}
          id={comment.id}
          handleEdited={handleEdited}
         />
          } 
        </Fragment>
      ))}
      
      <CommentsForm 
       submitLabel="Send"
      />
    </div>
  );
}

export default App;
