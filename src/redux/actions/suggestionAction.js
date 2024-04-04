import { GLOBALTYPES } from '../actions/globalTyles'
import { getDataAPI } from '../../untils/fetchData'

export const SUGGES_TYPES = {
    LOADING: 'LOADING_SUGGES',
    GET_USERS: 'GET_USERS_SUGGES',
}

export const getSuggestions = (token) => async (dispatch) => {
    try {
        dispatch({ type: SUGGES_TYPES.LOADING, payload: true })
        
        const res = await getDataAPI('/user/suggestionUser/result', token)

        dispatch({ type: SUGGES_TYPES.GET_USERS, payload: res.data })

        dispatch({ type: SUGGES_TYPES.LOADING, payload: false })
        
    } catch (err) {
        dispatch({type: GLOBALTYPES.NOTIFY, payload: {err: err.response.data.msg}})
    }
}