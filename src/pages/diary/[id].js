import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDiary,
  getDiaryById,
  saveDiary,
  unSaveDiary,
} from "../../redux/actions/diaryAction";
import { Link, useNavigate, useParams } from "react-router-dom";
import Avatar from "../../components/Avatar";
import moment from "moment";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import DiaryModal from "../../components/DiaryModal";
import { BASE_URL } from "../../untils/config";
import { GLOBALTYPES } from "../../redux/actions/globalTyles";

const DiaryId = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const diary = useSelector((state) => state.diary.diary);
  const [onEdit, setOnEdit] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(`${BASE_URL}/post/${diary._id}`)
      .then(() => {
        dispatch({
          type: GLOBALTYPES.NOTIFY,
          payload: { success: "Đã sao chép liên kết thành công" },
        });
      })
      .catch((error) => {
        dispatch({
          type: GLOBALTYPES.NOTIFY,
          payload: { err: "Lỗi khi sao chép:" + error },
        });
      });
  };

  const handleDeleteDiary = () => {
    if (window.confirm("Bạn có muốn xóa nhật ký này ?")) {
      dispatch(deleteDiary({ auth, diary }));
      return navigate(`/user/${auth.user._id}`);
    }
  };

  const handleSaveDiary = async () => {
    if (saveLoad) return;
    setSaveLoad(true);
    await dispatch(saveDiary({ diary, auth }));
    setSaveLoad(false);
  };

  const handleUnSaveDiary = async () => {
    if (saveLoad) return;
    setSaveLoad(true);
    await dispatch(unSaveDiary({ diary, auth }));
    setSaveLoad(false);
  };

  useEffect(() => {
    if (auth.user.savedDiary.find((id) => id === diary._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth.user.savedDiary, diary._id]);

  useEffect(() => {
    dispatch(getDiaryById({ id, auth }));
  }, [auth, dispatch, id]);

  return (
    diary._id && (
      <>
        <div className="diary_id">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <Avatar
                src={diary.user.profilePicture}
                alt="avatar"
                size="big-avatar"
              />
              <div className="m-2">
                <h6>
                  <Link
                    to={`/user/${diary.user._id}`}
                    className="text-dark"
                    style={{ textDecoration: "none" }}
                  >
                    {diary.user.username}
                  </Link>
                  {diary.user.roles === "expert" && (
                    <i
                      className="fa-solid fa-circle-check text-success"
                      style={{ fontSize: "10px", paddingLeft: "5px" }}
                    ></i>
                  )}
                </h6>
                <p className="m-0 text-muted" style={{ fontSize: "0.7rem" }}>
                  {moment(diary.createdAt).fromNow()}
                </p>
              </div>
            </div>
            <div className="nav-item dropdown">
              <span
                className="material-icons"
                id="moreLink"
                data-bs-toggle="dropdown"
              >
                more_horiz
              </span>
              <div className="dropdown-menu">
                {auth.user._id === diary.user._id && (
                  <>
                    <div
                      className="dropdown-item"
                      onClick={() => setOnEdit(true)}
                    >
                      <span className="material-symbols-outlined">edit</span>{" "}
                      Chỉnh sửa nhật ký
                    </div>
                    <div className="dropdown-item" onClick={handleDeleteDiary}>
                      <span className="material-symbols-outlined">delete</span>{" "}
                      Xóa nhật ký
                    </div>
                  </>
                )}
                <div className="dropdown-item" onClick={handleCopyLink}>
                  <span className="material-symbols-outlined">share</span> Sao
                  chép liên kết
                </div>
                {saved ? (
                  <div
                    className="dropdown-item text-success"
                    onClick={handleUnSaveDiary}
                  >
                    <span className="material-symbols-outlined">bookmark</span>{" "}
                    Đã lưu xem sau
                  </div>
                ) : (
                  <div className="dropdown-item" onClick={handleSaveDiary}>
                    <span className="material-symbols-outlined">bookmark</span>{" "}
                    Lưu xem sau
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="content row my-4">
            <img
              src={
                diary.media[0] ? diary.media[0].url : diary.user.profilePicture
              }
              alt="pic_diary"
              className="col-md-3"
            />
            <p className="text col-md-9">{diary.text}</p>
          </div>
          <div className="timeline">
            {diary.recipients.length > 0 ? (
              <VerticalTimeline className="vertical-timeline">
                {diary.recipients.map((item, index) => (
                  <VerticalTimelineElement
                    key={item._id}
                    className="vertical-timeline-element--work"
                    icon={index + 1}
                  >
                    <img
                      src={
                        item.img.length > 0
                          ? item.img[0].url
                          : diary.user.profilePicture
                      }
                      alt="pic_post"
                    />
                    <div className="content_timeline">
                      <div style={{textAlign: "justify"}}>{item.desc.slice(0, 300)}</div>
                      <i className="fa-solid fa-heart"></i>
                      <small>{item.like.length}</small>
                      <i
                        className="fa-solid fa-comment"
                        style={{ marginLeft: "10px" }}
                      ></i>
                      <small>{item.comments.length}</small>
                      <div>
                        <Link
                          to={`/post/${item._id}`}
                          style={{
                            textDecoration: "none",
                            color: "#000",
                            fontStyle: "italic",
                          }}
                        >
                          <i className="far fa-share-square"></i> Xem bài viết
                        </Link>
                      </div>
                    </div>
                  </VerticalTimelineElement>
                ))}
              </VerticalTimeline>
            ) : (
              <p>Không có bài viết kèm theo !</p>
            )}
          </div>
        </div>
        {onEdit && <DiaryModal diary={diary} setOnEdit={setOnEdit} />}
      </>
    )
  );
};

export default DiaryId;
