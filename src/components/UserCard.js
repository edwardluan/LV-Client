import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const UserCard = ({
  children,
  user,
  border,
  handleClose,
  setShowFollowers,
  setShowSubscribers,
  msg
}) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowSubscribers) setShowSubscribers(false);
  };

  return (
    <div className={`d-flex p-2 justify-content-between ${border}`}>
      <div>
        <Link
          to={`/user/${user._id}`}
          onClick={handleCloseAll}
          className="d-flex align-items-center"
          style={{ textDecoration: "none", color: "#000" }}
        >
          <Avatar src={user.profilePicture} size="medium-avatar" />
          <div className="px-2">
            <small className="fw-bold">{user.username}</small>
            { user.roles === "expert" && <i className="fa-solid fa-circle-check text-success" style={{fontSize: "10px", paddingLeft: "5px"}}></i>}
            <small className="d-flex">
              {
                msg
                ? user.text && <>
                  <div>{user.text.length > 10 ? user.text.slice(0, 10) + "..." : user.text}</div>
                  {
                    user.media?.length > 0 &&
                    <div style={{paddingLeft: "20px"}}>
                      {user.media.length} <i className="fas fa-image" ></i>
                    </div>
                  }
                </>
                : ""
              }
            </small>
          </div>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default UserCard;
