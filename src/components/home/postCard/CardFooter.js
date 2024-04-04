import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LikeBtn from "../../LikeBtn";
import ShareModal from "../../ShareModal";
import { useSelector, useDispatch } from "react-redux";
import {
  likePost,
  unlikePost,
  savePost,
  unSavePost,
} from "../../../redux/actions/postAction";
import { BASE_URL } from "../../../untils/config";

const CardFooter = ({ post }) => {
  const auth = useSelector((state) => state.auth);
  const socket = useSelector((state) => state.socket)

  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (post.like.find((lk) => lk._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [auth.user._id, post.like]);

  useEffect(() => {
    if (auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth.user.saved, post._id]);

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);
    setLoadLike(true);
    await dispatch(likePost({ post, auth, socket }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);
    setLoadLike(true);
    await dispatch(unlikePost({ post, auth, socket }));
    setLoadLike(false);
  };

  const handleSavePost = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  };

  const handleUnSavePost = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
  };

  return (
    <div className="card_footer">
      <div className="card_icon_menu">
        <div>
          <LikeBtn
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
          <Link to={`/post/${post._id}`} className="text-dark">
            <span className="material-symbols-outlined">comment</span>
          </Link>
          <span
            className="material-symbols-outlined"
            onClick={() => setIsShare(!isShare)}
          >
            share
          </span>
        </div>
        {saved ? (
          <span
            className="material-symbols-outlined text-success"
            onClick={handleUnSavePost}
          >
            bookmark
          </span>
        ) : (
          <span className="material-symbols-outlined"
            onClick={handleSavePost}>
            bookmark
          </span>
        )}
      </div>
      <div className="d-flex justify-content-between">
        <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
          {post.like.length} Thích
        </h6>
        <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
          {post.comments.length} Bình luận
        </h6>
      </div>
      {isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} />}
    </div>
  );
};

export default CardFooter;
