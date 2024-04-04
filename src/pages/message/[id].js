import React from "react";
import LeftSide from "../../components/message/LeftSide";
import RightSide from "../../components/message/RightSide";

const Conversation = () => {
  return (
    <div className="message row m-0">
      <div className="col-md-3 border-right px-2 left_side">
        <LeftSide />
      </div>
      <div className="col-md-9 px-2 h-100">
        <RightSide />
      </div>
    </div>
  );
};
  
export default Conversation;
