import React, { useState, useEffect } from "react";
import PostThumb from "./PostThumb";

const Post = ({ auth, id, dispatch, profile }) => {
  const [posts, setPosts] = useState([]);
  const [result, setResult] = useState(9);

  useEffect(() => {
    const foundData = profile.posts.find((data) => data._id === id);

    if (foundData) {
      setPosts(foundData.posts);
      setResult(foundData.result);
    }

  }, [id, profile.posts]);
  
  return (
    <div>
      <PostThumb posts={posts} result={result} />
    </div>
  );
};

export default Post;
