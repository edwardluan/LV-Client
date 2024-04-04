import { DIARYTYPES } from "../actions/diaryAction";
import { DeleteData, EditData } from "../actions/globalTyles";

const initialState = {
    loading: false,
    diaries: [],
    diary: [],
    result: 0
}

const diaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case DIARYTYPES.CREATE_DIARY:
            return {
                ...state,
                diaries: [action.payload, ...state.diaries],
            }
        case DIARYTYPES.GET_DIARY:
            return {
                ...state,
                diary: action.payload,
            }
        case DIARYTYPES.UPDATE_DIARY:
            return {
                ...state,
                diary: action.payload,
                diaries: EditData(state.diaries, action.payload._id, action.payload)
            }
        case DIARYTYPES.GET_DIARIES:
            return {
                ...state,
                diaries: action.payload,
            }
        case DIARYTYPES.DELETE_DIARY:
            return {
                ...state,
                diaries: DeleteData(state.diaries, action.payload._id)
            }
        default:
            return state;
    }
}

export default diaryReducer