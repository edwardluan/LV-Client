import { imageUpload } from "../../untils/imageUpload";
import { deleteDataAPI, getDataAPI, postDataAPI, putDataAPI } from "../../untils/fetchData";
import { GLOBALTYPES } from "./globalTyles";

export const DIARYTYPES = {
    CREATE_DIARY: "CREATE_DIARY",
    GET_DIARIES: "GET_DIARIES",
    GET_DIARY: "GET_DIARY",
    UPDATE_DIARY: "UPDATE_DIARY",
    DELETE_DIARY: "DELETE_DIARY"
}

export const createDiary = ({ content, images, arrId, auth }) => async (dispatch) => {
    let media = [];
    try {
        if (images.length > 0) media = await imageUpload(images);
        const res = await postDataAPI(
            "/diary",
            { text: content, media, recipients: arrId },
            auth.token
        );
        dispatch({ type: DIARYTYPES.CREATE_DIARY, payload: { ...res.data.newDiary, user: auth.user } })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.NOTIFY,
            payload: { err: err.response.data.msg },
        });
    }
};
export const getDiaryById = ({ id, auth }) => async (dispatch) => {
    try {
        const res = await getDataAPI(`/diary/${id}`, auth.token)
        dispatch({ type: DIARYTYPES.GET_DIARY, payload: res.data.diary })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.NOTIFY,
            payload: { err: err.response.data.msg },
        });
    }
};
export const updateDiary = ({ content, images, arrIdPost, auth, diary }) => async (dispatch) => {
    const newImgUrl = images.filter((img) => !img.url);
    dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: true } });
    try {
        if (newImgUrl.length > 0) images = await imageUpload(newImgUrl);
        await putDataAPI(
            `/diary/${diary._id}`,
            {
                text: content,
                media: images,
                recipients: arrIdPost
            },
            auth.token
        );
        const res = await getDataAPI(`/diary/${diary._id}`, auth.token)
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: false } });
        
        dispatch({ type: DIARYTYPES.UPDATE_DIARY, payload: res.data.diary })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.NOTIFY,
            payload: { err: err.response.data.msg },
        });
    }
};
export const deleteDiary = ({ auth, diary }) => async (dispatch) => {
    dispatch({ type: DIARYTYPES.DELETE_DIARY, payload: diary })

    try {
        await deleteDataAPI(`/diary/${diary._id}`, auth.token);
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { success: "Đã xóa bài viết !" } });
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.NOTIFY,
            payload: { err: err.response.data.msg },
        });
    }

};
export const saveDiary = ({ diary, auth }) => async (dispatch) => {
    const newUser = { ...auth.user, savedDiary: [...auth.user.savedDiary, diary._id] }
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } })
    try {
      await putDataAPI(`/diary/saveDiary/${diary._id}`, null, auth.token)
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.NOTIFY,
        payload: { err: err.response.data.msg },
      });
    }
};
export const unSaveDiary = ({ diary, auth }) => async (dispatch) => {
    const newUser = { ...auth.user, savedDiary: auth.user.savedDiary.filter(id => id !== diary._id) }
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } })
  
    try {
      await putDataAPI(`/diary/unSaveDiary/${diary._id}`, null, auth.token)
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.NOTIFY,
        payload: { err: err.response.data.msg },
      })
    }
  };

  