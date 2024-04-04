import React from "react";
import CardBody from "./home/postCard/CardBody";
import CardFooter from "./home/postCard/CardFooter";
import CardHeader from "./home/postCard/CardHeader";

import CommentInput from "./home/CommentInput";
import Comments from "./home/Comments";

const PostCard = ({ post }) => {
  return (
      <div className="card my-3">
        <CardHeader post={post} />
        <CardBody post={post} />
        <CardFooter post={post} />

        <Comments post={post}/>
        <CommentInput post={post}/>
      </div>
  );
};

export default PostCard;
