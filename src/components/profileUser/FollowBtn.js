import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  unFollowUser,
} from "../../redux/actions/profileUserAction";

const FollowBtn = ({ user }) => {
  const [followed, setFollowed] = useState(false);
  const [load, setLoad] = useState(false);

  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const socket = useSelector((state) => state.socket);

  const dispatch = useDispatch();

  const handleFollow = async () => {
    if (load) return;

    setFollowed(true);
    setLoad(true);
    await dispatch(followUser({ users: profile.users, user, auth, socket }));
    setLoad(false);
  };

  const handleUnFollow = async () => {
    if (load) return;

    setFollowed(false);
    setLoad(true);
    await dispatch(unFollowUser({ users: profile.users, user, auth, socket }));
    setLoad(false);
  };

  useEffect(() => {
    if (auth.user.subscribes.find((item) => item._id === user._id)) {
      setFollowed(true);
    }
  }, [auth.user.subscribes, user._id]);
  return (
    <>
      {followed ? (
        <button className="btn btn-outline-danger" onClick={handleUnFollow}>
          Bỏ theo dõi
        </button>
      ) : (
        <button className="btn btn-outline-primary" onClick={handleFollow}>
          Theo dõi
        </button>
      )}
    </>
  );
};

export default FollowBtn;
