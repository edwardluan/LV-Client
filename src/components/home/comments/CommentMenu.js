import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "../../../redux/actions/commentAction";

const CommentMenu = ({ post, comment, setOnEdit }) => {
  const auth = useSelector((state) => state.auth);
  const socket = useSelector((state) => state.socket);

  const dispatch = useDispatch();

  const handleRemove = () => {
    if (post.user._id === auth.user._id || comment.user._id === auth.user._id) {
      dispatch(deleteComment({ post, auth, comment, socket }));
    }
  };
  const MenuItem = () => {
    return (
      <>
        <div className="dropdown-item" onClick={() => setOnEdit(true)}>
          <span className="material-symbols-outlined">edit</span>
          Chỉnh sửa
        </div>
        <div className="dropdown-item" onClick={handleRemove}>
          <span className="material-symbols-outlined">delete</span>
          Xóa
        </div>
      </>
    );
  };
  return (
    <div className="cmt_menu">
      {(post.user._id === auth.user._id ||
        comment.user._id === auth.user._id) && (
        <div className="nav-item dropdown" style={{ cursor: "pointer" }}>
          <span
            className="material-symbols-outlined"
            id="moreLink"
            data-bs-toggle="dropdown"
          >
            more_vert
          </span>

          <div className="dropdown-menu" aria-labelledby="moreLink">
            {post.user._id === auth.user._id ? (
              comment.user._id === auth.user._id ? (
                MenuItem()
              ) : (
                <div className="dropdown-item">
                  <span className="material-symbols-outlined">delete</span> Xóa
                </div>
              )
            ) : (
              comment.user._id === auth.user._id && MenuItem()
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentMenu;
