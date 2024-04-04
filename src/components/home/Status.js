import React from "react";
import Avatar from "../Avatar";
import { useSelector, useDispatch } from "react-redux"; 
import { GLOBALTYPES } from "../../redux/actions/globalTyles";

const Status = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="status my-3 d-flex">
      <Avatar src={auth.user.profilePicture} size="big-avatar" />
      <button className="status_button flex-fill" onClick={() => dispatch({type: GLOBALTYPES.STATUS, payload: true})}>
        {auth.user.username}, Bạn đang nghĩ gì ?
      </button>
    </div>
  );
};

export default Status;
