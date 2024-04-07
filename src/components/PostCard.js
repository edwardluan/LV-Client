import React from "react";
import CardBody from "./home/postCard/CardBody";
import CardFooter from "./home/postCard/CardFooter";
import CardHeader from "./home/postCard/CardHeader";

import CommentInput from "./home/CommentInput";
import Comments from "./home/Comments";

import "./PostCard.css"; // Import file CSS cho PostCard

const PostCard = ({ post }) => {
  return (
      <div className="card my-3 post-container"> {/* Thêm lớp 'post-container' */}
        <CardHeader post={post} />
        <CardBody post={post} />
        <CardFooter post={post} />

        <Comments post={post}/>
        <CommentInput post={post}/>
      </div>
  );
};

export default PostCard;
