import { GLOBALTYPES } from "./globalTyles";
import { postDataAPI, deleteDataAPI, getDataAPI, putDataAPI } from "../../untils/fetchData";

export const NOTIFY_TYPES = {
  GET_NOTIFIES: "GET_NOTIFIES",
  CREATE_NOTIFY: "CREATE_NOTIFY",
  REMOVE_NOTIFY: "REMOVE_NOTIFY",
  UPDATE_NOTIFY: "UPDATE_NOTIFY",
  UPDATE_SOUND: "UPDATE_SOUND",
  DELETE_ALL_NOTIFIES: "DELETE_ALL_NOTIFIES",
};

export const createNotify = ({ msg, auth, socket }) => async (dispatch) => {
  try {
    const res = await postDataAPI("/notify", msg, auth.token);

    socket.emit('createNotify', {
      ...res.data.notify,
      user: {
          username: auth.user.username,
          profilePicture: auth.user.profilePicture
      }
  })
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { err: err.response.data.msg },
    });
  }
};

export const removeNotify = ({ msg, auth, socket }) => async (dispatch) => {
  try {
    await deleteDataAPI(
      `/notify/${msg.id}?url=${msg.url}`,
      auth.token
    );
    socket.emit('removeNotify', msg)
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { err: err.response.data.msg },
    });
  }
};

export const getNotifies = (token) => async (dispatch) => {
  try {
    const res = await getDataAPI("/notify", token);

    dispatch({ type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { err: err.response.data.msg },
    });
  }
};

export const isReadNotify = ({msg, auth}) => async (dispatch) => {
  dispatch({type: NOTIFY_TYPES.UPDATE_NOTIFY, payload: {...msg, isRead: true}})
  try {
      await putDataAPI(`/notify/isReadNotify/${msg._id}`, null, auth.token)
  } catch (err) {
      dispatch({type: GLOBALTYPES.NOTIFY, payload: {err: err.response.data.msg}})
  }
};

export const deleteAllNotifies = (token) => async (dispatch) => {
  dispatch({type: NOTIFY_TYPES.DELETE_ALL_NOTIFIES, payload: []})
  try {
      await deleteDataAPI('/notify', token)
  } catch (err) {
      dispatch({type: GLOBALTYPES.NOTIFY, payload: {err: err.response.data.msg}})
  }
};
