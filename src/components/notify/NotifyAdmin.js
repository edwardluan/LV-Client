import React from "react";
import { useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTyles";

const NotifyAdmin = ({ msg, setShowAdminNotify }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    setShowAdminNotify(false);
    dispatch({ type: GLOBALTYPES.NOTIFY, payload: { notifyAmin: {} } });
  };

  return (
    <div
      className="position-fixed w-100 h-100"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0008",
        color: "white",
        top: 0,
        left: 0,
        zIndex: "50",
      }}
    >
      <div className="bg-light text-dark p-4 w-50">
        <div className="d-flex justify-content-between">
          <h5>{msg.text}</h5>
          <span onClick={handleClose} style={{ cursor: "pointer" }}>
            &times;
          </span>
        </div>
        <hr className="mt-0" />
        <p>{msg.content}</p>
      </div>
    </div>
  );
};

export default NotifyAdmin;
