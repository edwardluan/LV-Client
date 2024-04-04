import { postDataAPI } from "../../untils/fetchData";
import { GLOBALTYPES } from "./globalTyles";


export const createReport = ({report, auth}) => async(dispatch) => {
    try {
        await postDataAPI("/report", report, auth.token);
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.NOTIFY,
            payload: { err: err.response.data.msg },
          });
    }
}