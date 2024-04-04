import { postDataAPI } from "../../untils/fetchData";
import { GLOBALTYPES } from "./globalTyles";
import validForm from "../../untils/validForm";

export const register = (data) => async (dispatch) => {
  try {
    const checkForm = validForm(data);
    if (checkForm.errLenght > 0) {
      return dispatch({ type: GLOBALTYPES.NOTIFY, payload: checkForm.errMsg })
    }
    dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: true } });
    const res = await postDataAPI("/auth/register", data);
    dispatch({ type: GLOBALTYPES.NOTIFY, payload: { success: res.data.msg } })
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: {
        err: err.response.data.msg
      }
    })
  }
}

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: true } });
    const res = await postDataAPI( "/auth/login", data);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.accessToken,
        user: res.data,
      }
    })
    localStorage.setItem("firstLogin", true)
    dispatch({ type: GLOBALTYPES.NOTIFY, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: {
        err: err.response.data.msg
      }
    })
  }
};

export const rfToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: true } });
    try {
      const res = await postDataAPI("/auth/refresh");
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.accessToken,
          user: res.data
        }
      })
      dispatch({ type: GLOBALTYPES.NOTIFY, payload: {} });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.NOTIFY,
        payload: {
          err: err.response.data.msg
        }
      })
    }
  }
}

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("firstLogin")
    await postDataAPI("/auth/logout")
    window.location.href = "/"
  } catch (err) {
    dispatch({
      type: "NOTIFY",
      payload: {
        err: err.response.data.msg
      }
    })
  }
}