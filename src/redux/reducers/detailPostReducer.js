import { POSTTYPES } from "../actions/postAction";
import { EditData } from "../actions/globalTyles";

const detailPostReducer = (state = [], action) => {
    switch(action.type){
        case POSTTYPES.GET_POST:
            const postExists = state.some(post => post._id === action.payload._id);
            if (!postExists) {
                return [...state, action.payload];
            }
            return state;
        case POSTTYPES.UPDATE_POST:
            return EditData(state, action.payload._id, action.payload)
        default:
            return state;
    }
}

export default detailPostReducer