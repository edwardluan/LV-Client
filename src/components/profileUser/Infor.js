import React, { useEffect, useState } from "react";
import { GLOBALTYPES } from "../../redux/actions/globalTyles";
import Avatar from "../Avatar";
import EditProfile from "./EditProfile";
import FollowBtn from "./FollowBtn";
import Follower from "./Follower";
import Subscriber from "./Subscriber";
import MessageBtn from "./MessageBtn";
import Diary from "./Diary";

import { createReport } from "../../redux/actions/reportAction";

const Infor = ({ id, auth, profile, dispatch }) => {
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showSubscribers, setShowSubscribers] = useState(false);
  const [onDiary, setOnDiary] = useState(false);


  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [auth, dispatch, id, profile.users]);

  const handleReport = () => {
    const confirmReport = window.prompt("Lý do báo cáo: ");
    if (confirmReport) {
      const report = {
       user: auth.user._id,
       related: id,
       text: confirmReport,
       type: "user"
      }
       dispatch(createReport({report, auth}));
       dispatch({
        type: GLOBALTYPES.NOTIFY,
        payload: { success: "Cảm ơn bạn đã đóng góp !" },
      });
    } 
  };

  return (
    <div className="infor">
      {userData.map((user) => (
        <div className="infor_user" key={user._id}>
          <Avatar src={user.profilePicture} size="very-big-avatar" />
          <div className="infor_content">
            <div className="title_content">
              <div className="user_name d-flex align-items-center">
                <h3 style={{ fontWeight: "bold" }}>{user.username}</h3>
                {user.roles === "expert" && (
                  <i
                    className="fa-solid fa-circle-check text-success"
                    style={{ fontSize: "20px", paddingLeft: "10px" }}
                  ></i>
                )}
              </div>
            </div>
            <div className="sub_follower">
              <span onClick={() => setShowFollowers(true)}>
                {user.followers.length} Người theo dõi
              </span>
              <br />
              <span onClick={() => setShowSubscribers(true)}>
                {user.subscribes.length} Đang theo dõi
              </span>
            </div>
            <p>{user.desc}</p>
            {user._id === auth.user._id ? (
              <>
                <button
                  className="btn btn-outline-primary"
                  style={{marginRight: "10px"}}
                  onClick={() => setOnEdit(true)}
                >
                  Cập nhật
                </button>
                <button className="btn btn-success" onClick={() => setOnDiary(true)}>
                <i className="fas fa-book"></i>
                </button>
              </>
            ) : (
              <div className="d-flex">
                <FollowBtn user={user} />
                <MessageBtn user={user} />
                <button className="btn btn-warning" style={{marginLeft: "5px"}} onClick={handleReport}>!</button>
              </div>
            )}
          </div>
          {onEdit && <EditProfile user={user} setOnEdit={setOnEdit} />}
          {onDiary && <Diary setOnDiary={setOnDiary} profile={profile} id={id} />}
          {showFollowers && (
            <Follower
              users={user.followers}
              setShowFollowers={setShowFollowers}
            />
          )}
          {showSubscribers && (
            <Subscriber
              users={user.subscribes}
              setShowSubscribers={setShowSubscribers}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Infor;
