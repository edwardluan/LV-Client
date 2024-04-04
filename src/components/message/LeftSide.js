import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GLOBALTYPES } from "../../redux/actions/globalTyles";
import { getDataAPI } from "../../untils/fetchData";
import { MESS_TYPES, getConversations } from "../../redux/actions/messageAction";
import UserCard from "../UserCard";

const LeftSide = () => {
  const auth = useSelector((state) => state.auth);
  const message = useSelector((state) => state.message);
  const online = useSelector((state) => state.online);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const [loadUsers, setloadUsers] = useState(false);

  const isActive = (user) => {
    if (id === user._id) return "active"
    return ""
  }

  const handleAddUser = (user) => {
    setSearch("");
    setSearchUsers([]);
    dispatch({ type: MESS_TYPES.ADD_USER, payload: { ...user, text: "", media: [] } });
    dispatch({ type: MESS_TYPES.CHECK_ONLINE, payload: online })
    return navigate(`/message/${user._id}`);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;
    try {
      setloadUsers(true);
      await getDataAPI(
        `/user/search/result?username=${search}`,
        auth.token
      ).then((res) => {
        const result = res.data.users;
        if (result.length === 0) {
          dispatch({
            type: GLOBALTYPES.NOTIFY,
            payload: { err: "Không tìm thấy !" },
          });
        } else {
          setSearchUsers(result);
        }
      });
      setloadUsers(false);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.NOTIFY,
        payload: {
          err: err.response.statusText,
        },
      });
    }
  };

  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations({ auth }))
  }, [auth, dispatch, message.firstLoad])

  useEffect(() => {
    if (message.firstLoad) dispatch({ type: MESS_TYPES.CHECK_ONLINE, payload: online })
  }, [dispatch, message.firstLoad, online]);

  return (
    <>
      <form className="message_header_search" onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          placeholder="Tìm kiếm ..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" id="search">
          Tìm
        </button>
      </form>
      <div className="message_list">
        {searchUsers.length !== 0 ? (
          <>
            {searchUsers.map((user) => (
              <div
                key={user._id}
                className={`message_user ${isActive(user)}`}
                onClick={() => handleAddUser(user)}

              >
                <UserCard user={user} />
              </div>
            ))}
          </>
        ) : (
          <>
            {message.users.map((user) => (
              <div
                key={user._id}
                className={`message_user ${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <div className="d-flex align-items-center">
                  <UserCard user={user} msg={true} />
                  {auth.user.subscribes.find(item => item._id === user._id)
                    ?
                    (user.online
                      ? <i className="fa-solid fa-user-group text-success" style={{ marginLeft: "auto", paddingRight: "10px", opacity: "0.5" }}></i>
                      : <i className="fa-solid fa-user-group" style={{ marginLeft: "auto", paddingRight: "10px", opacity: "0.5" }}></i>
                    )
                    : ""
                  }
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default LeftSide;
