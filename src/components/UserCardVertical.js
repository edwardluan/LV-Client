import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const UserCardVertical = ({
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
    <div className={`p-2 text-center ${border}`}>
      <div>
        <Link
          to={`/user/${user._id}`}
          onClick={handleCloseAll}
          className=""
          style={{ textDecoration: "none", color: "#000" }}
        >
          <Avatar src={user.profilePicture} size="very-big-avatar" />
          <div className="py-2">
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

export default UserCardVertical;
