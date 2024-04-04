import React from "react";
import { useSelector } from "react-redux";
import UserCard from "../UserCard";
import FollowBtn from "./FollowBtn";

const Subscriber = ({ users, setShowSubscribers }) => {
  const auth = useSelector((state) => state.auth);
  return (
    <div className="follow">
      <div className="follow_container">
        <h5 className="text-center">Đang theo dõi</h5>
        {users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            setShowSubscribers={setShowSubscribers}
          >
            {auth.user._id !== user._id && <FollowBtn user={user} />}
          </UserCard>
        ))}
        <div className="close_btn" onClick={() => setShowSubscribers(false)}>
          {" "}
          &times;{" "}
        </div>
      </div>
    </div>
  );
};

export default Subscriber;
