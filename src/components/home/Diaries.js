import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../Avatar";
import moment from "moment";

const Diaries = () => {
  const diaries = useSelector((state) => state.postHome.diaries);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/diary/${id}`);
  };

  return (
    <div>
      {diaries.map((diary, index) => (
        <div className="diary_home" key={diary._id}>
          <div className="d-flex">
            <Avatar
              src={diary.user.profilePicture}
              alt="avatar"
              size="big-avatar"
            />
            <div className="m-2">
              <h6>
                <Link
                  to={`/user/${diary.user._id}`}
                  className="text-dark"
                  style={{ textDecoration: "none" }}
                >
                  {diary.user.username}
                </Link>
                {diary.user.roles === "expert" && (
                  <i
                    className="fa-solid fa-circle-check text-success"
                    style={{ fontSize: "10px", paddingLeft: "5px" }}
                  ></i>
                )}
              </h6>
              <p className="m-0 text-muted" style={{ fontSize: "0.7rem" }}>
                {moment(diary.createdAt).fromNow()}
              </p>
            </div>
          </div>
          <div className="content row my-4">
            <img
              src={
                diary.media[0] ? diary.media[0].url : diary.user.profilePicture
              }
              alt="pic_diary"
              className="col-md-3"
            />
            <p className="text col-md-9">{diary.text}</p>
          </div>
          <div
            style={{ fontWeight: "bold", cursor: "pointer" }}
            onClick={() => handleClick(diary._id)}
          >
            {diary.recipients.length} bài viết kèm theo
          </div>
        </div>
      ))}
    </div>
  );
};

export default Diaries;
