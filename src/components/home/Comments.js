import React, { useState, useEffect } from "react";
import CommentDisplay from "./comments/CommentDisplay";

const Comments = ({ post }) => {

  const [comments, setComments] = useState([])
  const [showComments, setShowComments] = useState([])

  const [next, setNext] = useState(2)
  const [replyComments, setReplyComments] = useState([])

  useEffect(() => {
    const newCmt = post.comments.filter(cmt => !cmt.reply)
    setComments(newCmt)
    setShowComments(newCmt.slice(newCmt.length - next))
  }, [next, post.comments]);

  useEffect(()=> {
    const newRep = post.comments.filter(cmt => cmt.reply)
    setReplyComments(newRep)
}, [post.comments])

  return (
    <div className="comments">
      {showComments.map((comment, index) => (
        <CommentDisplay key={index} comment={comment} post={post} 
        replyCmt={replyComments.filter(item => item.reply === comment._id)}/>
      ))}
      {
        comments.length - next > 0
          ? <div className="px-4 text-primary"
          onClick={() => setNext(next + 10)}>
            Xem thêm bình luận ...
          </div>
          : comments.length > 2 &&
          <div className="px-4 text-primary"
          onClick={() => setNext(2)}>
            Ẩn bớt bình luận ...
          </div>
      }
    </div>
  );
};

export default Comments;
