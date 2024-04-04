import React from "react";
import Avatar from "../Avatar";
import moment from "moment";
import { Link } from "react-router-dom";

const NewsCard = ({ posts }) => {
  return (
    <Link
      to={`/post/${posts._id}`}
      style={{ textDecoration: "none", color: "#000" }}
    >
      <div className="news_card">
        <Avatar src={posts.user.profilePicture} size="big-avatar" />
        <div className="news_container">
          <div className="card_header">
            <div>
              <small className="card_username">
                {posts.user.username}
              </small>
              {posts.user.roles === "expert" && (
                <i
                  className="fa-solid fa-circle-check text-success"
                  style={{ fontSize: "10px", paddingLeft: "5px" }}
                ></i>
              )}
            </div>
            <small className="time">{moment(posts.createdAt).fromNow()}</small>
          </div>
          <p className="mt-2 news_desc">{posts.desc}</p>
          <small>{posts.hashtag}</small>
          <div className="card_footer">
            <i className="fa-solid fa-heart"></i>
            <small>
              {posts.like.length}
            </small>
            <i
              className="fa-solid fa-comment"
              style={{ marginLeft: "10px" }}
            ></i>
            <small>
              {posts.comments.length}
            </small>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
