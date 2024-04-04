import React from "react";
import { useSelector } from "react-redux";
import UserCard from "../UserCard";
import FollowBtn from "./FollowBtn";

const Follower = ({ users, setShowFollowers }) => {
  const auth = useSelector((state) => state.auth);

  return (
    <div className="follow">
      <div className="follow_container">
        <h5 className="text-center">Người theo dõi</h5>
        {users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            setShowFollowers={setShowFollowers}
          >
            {auth.user._id !== user._id && <FollowBtn user={user} />}
          </UserCard>
        ))}
        <div className="close_btn" onClick={() => setShowFollowers(false)}>
          {" "}
          &times;{" "}
        </div>
      </div>
    </div>
  );
};

export default Follower;
