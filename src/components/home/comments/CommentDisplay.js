import React, { useState, useEffect } from "react";
import CommentCard from "./CommentCard";

const CommentDisplay = ({ comment, post, replyCmt }) => {
  const [showRep, setShowRep] = useState([]);
  const [next, setNext] = useState(1);

  useEffect(() => {
    setShowRep(replyCmt.slice(replyCmt.length - next));
  }, [replyCmt, next]);

  return (
    <div className="comment_display">
      <CommentCard comment={comment} post={post} commentId={comment._id}>
        <div className="pl-4">
          {showRep.map(
            (item, index) =>
              item.reply && (
                <CommentCard
                  key={index}
                  comment={item}
                  post={post}
                  commentId={comment._id}
                />
              )
          )}

          {replyCmt.length - next > 0 ? (
            <div
              style={{ cursor: "pointer" }}
              className="text-primary"
              onClick={() => setNext(next + 10)}
            >
              Xem thêm bình luận ...
            </div>
          ) : (
            replyCmt.length > 2 && (
              <div
                style={{ cursor: "pointer" }}
                className="text-primary"
                onClick={() => setNext(1)}
              >
                Ẩn bớt bình luận ...
              </div>
            )
          )}
        </div>
      </CommentCard>
    </div>
  );
};

export default CommentDisplay;
