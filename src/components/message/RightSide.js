import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GLOBALTYPES } from "../../redux/actions/globalTyles";
import { imageShow, videoShow } from "../../untils/mediaShow";
import { imageUpload } from "../../untils/imageUpload";
import {
  addMessage,
  getMessages,
  loadMoreMessages,
  deleteConversation,
} from "../../redux/actions/messageAction";
import UserCard from "../UserCard";
import MsgDisplay from "./MsgDisplay";
import Icons from "../Icons";

const RightSide = () => {
  const auth = useSelector((state) => state.auth);
  const message = useSelector((state) => state.message);
  const socket = useSelector((state) => state.socket);

  const dispatch = useDispatch();
  const { id } = useParams();
  const refDisplay = useRef();
  const pageEnd = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState([]);
  const [loadMedia, setLoadMedia] = useState(false);
  const [data, setData] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(0);

  const handleChangeMedia = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newMedia = [];

    files.forEach((file) => {
      if (!file) return (err = "File không tồn tại !");
      if (file.size > 1024 * 1024 * 5) {
        return (err = "Dung lượng file quá lớn !");
      }
      return newMedia.push(file);
    });
    if (err) dispatch({ type: GLOBALTYPES.NOTIFY, payload: { err: err } });
    setMedia([...media, ...newMedia]);
  };

  const handleDeleteMedia = (index) => {
    const newArr = [...media];
    newArr.splice(index, 1);
    setMedia(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && media.length === 0) return;
    setText("");
    setMedia([]);
    setLoadMedia(true);

    let newArr = [];
    if (media.length > 0) newArr = await imageUpload(media);

    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString(),
    };
    setLoadMedia(false);
    await dispatch(addMessage({ msg, auth, socket }));
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const handleDeleteConversation = () => {
    if (window.confirm("Bạn có muốn xóa đoạn hội thoại này ?")) {
      dispatch(deleteConversation({ auth, id }));
      return navigate("/message");
    }
  };

  useEffect(() => {
    const newData = message.data.find((item) => item._id === id);
    if (newData) {
      setData(newData.messages);
      setResult(newData.result);
      setPage(newData.page);
    }
  }, [id, message.data]);

  useEffect(() => {
    if (id && message.users.length > 0) {
      setTimeout(() => {
        refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 50);

      const newUser = message.users.find((user) => user._id === id);
      if (newUser) setUser(newUser);
    }
  }, [message.users, id]);

  useEffect(() => {
    const getMessagesData = async () => {
      if (message.data.every((item) => item._id !== id)) {
        await dispatch(getMessages({ auth, id }));
        setTimeout(() => {
          refDisplay.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }, 50);
      }
    };
    getMessagesData();
  }, [id, dispatch, auth, message.data]);

  // Load More
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoadMore((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(pageEnd.current);
  }, [setIsLoadMore]);

  useEffect(() => {
    if (isLoadMore > 1) {
      if (result >= page * 9) {
        dispatch(loadMoreMessages({ auth, id, page: page + 1 }));
        setIsLoadMore(1);
      }
    }
  }, [auth, dispatch, id, isLoadMore, page, result]);

  return (
    <>
      <div className="message_header">
        {user.length !== 0 && (
          <>
            <UserCard user={user} />
            <i
              className="fa-solid fa-trash text-danger"
              onClick={handleDeleteConversation}
              style={{cursor: "pointer", marginLeft: "auto", paddingRight: "10px"}}
            ></i>
          </>

        )}
      </div>
      <div
        className="chat_container"
        style={{ height: media.length > 0 ? "calc(100% - 155px)" : "" }}
      >
        <div className="chat_display" ref={refDisplay}>
          <button
            className="btn btn-secondary"
            style={{ marginTop: "-30px", display: "none" }}
            ref={pageEnd}
          >
            Xem thêm
          </button>
          {data.map((msg, index) => (
            <div key={index}>
              {msg.sender !== auth.user._id && (
                <div className="chat_row other_message">
                  <MsgDisplay user={user} msg={msg} />
                </div>
              )}
              {msg.sender === auth.user._id && (
                <div className="chat_row you_message">
                  <MsgDisplay user={auth.user} msg={msg} data={data} />
                </div>
              )}
            </div>
          ))}
          {loadMedia && (
            <div className="chat_row you_message">
              <p>Đang gửi ...</p>
            </div>
          )}
        </div>
      </div>

      <div
        className="show_media"
        style={{ display: media.length > 0 ? "grid" : "none" }}
      >
        {media.map((item, index) => (
          <div key={index} id="file_media">
            {item.type.match(/video/i)
              ? videoShow(URL.createObjectURL(item))
              : imageShow(URL.createObjectURL(item))}
            <span onClick={() => handleDeleteMedia(index)}>&times;</span>
          </div>
        ))}
      </div>

      <form className="chat_input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tin nhắn..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Icons setContent={setText} content={text} />
        <div className="file_upload">
          <i className="fas fa-image text-danger" />
          <input
            type="file"
            name="file"
            id="file"
            multiple
            accept="image/*, video/*"
            onChange={handleChangeMedia}
          />
        </div>

        <button
          type="submit"
          className="material-icons"
          disabled={text || media.length ? false : true}
        >
          send
        </button>
      </form>
    </>
  );
};

export default RightSide;
