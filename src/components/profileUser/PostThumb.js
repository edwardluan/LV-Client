import React from "react";
import { Link } from "react-router-dom";

const PostThumb = ({ posts, result }) => {

  if (result === 0) return <h5>Chưa có bài viết !</h5>

  return (
    <div className="post_thumb">
      {posts.map((post) => (
        <Link key={post._id} to={`/post/${post._id}`} style={{ textDecoration: "none" }}>
          <div className="post_thumb_display">
            {
              post.img.length > 0 ? (
                post.img[0].url.match(/video/i) ? (
                  <video controls src={post.img[0].url} alt={post.img[0].url} />
                ) : (
                  <img src={post.img[0].url} alt={post.img[0].url} />
                )
              ) : (
                <div className="p-4">{post.desc}</div>
              )
            }
            <div className="post_thumb_menu">
              <i className="fa-solid fa-heart">{post.like.length}</i>
              <i className="fa-solid fa-comment">{post.comments.length}</i>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostThumb;
