import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MESS_TYPES } from "../../redux/actions/messageAction";

const MessageBtn = ({ user }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMessage = () => {
        dispatch({ type: MESS_TYPES.ADD_USER, payload: { ...user, text: "", media: [] } });
        navigate(`/message/${user._id}`)
    };
    
    return (
        <div>
            <button className="btn btn-primary"
                onClick={handleMessage}
                style={{ marginLeft: "5px" }}>
                <i className="fas fa-envelope"></i>
            </button>
        </div>
    );
};

export default MessageBtn;
