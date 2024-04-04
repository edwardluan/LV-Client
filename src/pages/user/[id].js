import React, { useEffect, useState } from "react";
import Infor from "../../components/profileUser/Infor";
import Post from "../../components/profileUser/Post";
import Saved from "../../components/profileUser/Saved";
import { getUserProfile } from "../../redux/actions/profileUserAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DiaryThumb from "../../components/profileUser/DiaryThumb";
import UserProducts from "../../components/profileUser/UserProducts";

const User = () => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const [saveTab, setSaveTab] = useState(false);
  const [diaryTab, setDiaryTab] = useState(false);
  const [postTab, setPostTab] = useState(true);
  const [productTab, setProductTab] = useState(false);

  const handleButtonSaveClick = () => {
    setDiaryTab(false);
    setPostTab(false);
    setSaveTab(true);
    setProductTab(false);
  };

  const handleButtonProductsClick = () => {
    setDiaryTab(false);
    setPostTab(false);
    setSaveTab(false);
    setProductTab(true);
  };

  const handleButtonPostClick = () => {
    setDiaryTab(false);
    setPostTab(true);
    setSaveTab(false);
    setProductTab(false);
  };

  const handleButtonDiaryClick = () => {
    setDiaryTab(true);
    setPostTab(false);
    setSaveTab(false);
    setProductTab(false);
  };

  const { id } = useParams();

  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getUserProfile({ users: profile.users, id, auth }));
    }
  }, [auth, dispatch, id, profile.ids, profile.users]);

  return (
    <div className="profile">
      <Infor auth={auth} profile={profile} dispatch={dispatch} id={id} />
      <div className="profile_tab">
        <button
          className={postTab ? "active" : ""}
          onClick={() => handleButtonPostClick()}
        >
          <i className="fas fa-table"></i>
        </button>
        <button
          className={diaryTab ? "active" : ""}
          onClick={() => handleButtonDiaryClick()}
        >
          <i className="fas fa-book"></i>
        </button>
        <button
          className={productTab ? "active" : ""}
          onClick={() => handleButtonProductsClick()}
        >
          <i className="fas fa-shopping-bag"></i>
        </button>
        {auth.user._id === id && (
          <button
            className={saveTab ? "active" : ""}
            onClick={() => handleButtonSaveClick()}
          >
            <i className="fas fa-bookmark"></i>
          </button>
        )}
      </div>
      {profile.loading ? (
        <i>Đang tải dữ liệu ...</i>
      ) : (
        <>
          {saveTab && <Saved auth={auth} dispatch={dispatch} id={id} />}
          {postTab && (
            <Post auth={auth} profile={profile} dispatch={dispatch} id={id} />
          )}
          {diaryTab && <DiaryThumb auth={auth} />}
          {productTab && <UserProducts id={id} />}
        </>
      )}
    </div>
  );
};

export default User;
