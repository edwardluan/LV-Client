import { postDataAPI, putDataAPI, deleteDataAPI } from "../../untils/fetchData";
import { DeleteData, EditData, GLOBALTYPES } from "./globalTyles";
import { createNotify, removeNotify } from "./notifyAction";
import { POSTTYPES } from "./postAction";

export const createComment = ({ post, newComment, auth, socket }) => async (dispatch) => {
  const newPost = { ...post, comments: [...post.comments, newComment] };

  dispatch({ type: POSTTYPES.UPDATE_POST, payload: newPost });
  try {
    const data = { ...newComment, postId: post._id, postUserId: post.user._id };
    const res = await postDataAPI("/comment", data, auth.token);
    const newData = { ...res.data.newComment, user: auth.user };
    const newPost = { ...post, comments: [...post.comments, newData] };

    dispatch({ type: POSTTYPES.UPDATE_POST, payload: newPost });

    socket.emit('createComment', newPost)

    //Notify
    const msg = {
      id: res.data.newComment._id,
      text: newComment.reply ? "Đã nhắc đến bạn trong một bình luận !" : "Đã bình luận bài viết của bạn !",
      recipients: newComment.reply ? [newComment.tag._id] : [post.user._id],
      url: `/post/${post._id}`,
      content: post.content,
      image: post.img.length > 0 ? post.img[0].url : ""
    }

    dispatch(createNotify({ msg, auth, socket }))

  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { err: err.response.data.msg },
    });
  }
};

export const updateComment = ({ comment, post, content, auth }) => async (dispatch) => {
  const newCmt = EditData(post.comments, comment._id, {
    ...comment,
    content,
  });
  const newPost = { ...post, comments: newCmt };

  dispatch({ type: POSTTYPES.UPDATE_POST, payload: newPost });

  try {
    await putDataAPI(`/comment/${comment._id}`, { content }, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { err: err.response.data.msg },
    });
  }
};

export const likeComment = ({ comment, post, auth }) => async (dispatch) => {
  const newComment = { ...comment, likes: [...comment.likes, auth.user] };
  const newComments = EditData(post.comments, comment._id, newComment);
  const newPost = { ...post, comments: newComments };

  dispatch({ type: POSTTYPES.UPDATE_POST, payload: newPost });

  try {
    await putDataAPI(`/comment/${comment._id}/like`, null, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { err: err.response.data.msg },
    });
  }
};

export const unlikeComment = ({ comment, post, auth }) => async (dispatch) => {
  const newComment = {
    ...comment,
    likes: DeleteData(comment.likes, auth.user._id),
  };
  const newComments = EditData(post.comments, comment._id, newComment);
  const newPost = { ...post, comments: newComments };

  dispatch({ type: POSTTYPES.UPDATE_POST, payload: newPost });

  try {
    await putDataAPI(`/comment/${comment._id}/unlike`, null, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { err: err.response.data.msg },
    });
  }
};

export const deleteComment = ({ post, comment, auth, socket }) => async (dispatch) => {
  const deleteArr = [...post.comments.filter(cm => cm.reply === comment._id), comment]
  const newPost = {
    ...post,
    comments: post.comments.filter(cm => !deleteArr.find(da => cm._id === da._id))
  }
  dispatch({ type: POSTTYPES.UPDATE_POST, payload: newPost })

  socket.emit('deleteComment', newPost)

  try {
    deleteArr.forEach(item => {
      deleteDataAPI(`/comment/${item._id}`, auth.token)
      const msg = {
        id: item._id,
        text: comment.reply ? "Đã nhắc đến bạn trong một bình luận !" : "Đã bình luận bài viết của bạn !",
        recipients: comment.reply ? [comment.tag._id] : [post.user._id],
        url: `/post/${post._id}`,
      }
      
      dispatch(removeNotify({ msg, auth, socket }))
  
    })
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { err: err.response.data.msg },
    });
  }

}