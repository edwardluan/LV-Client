import { GLOBALTYPES } from "../actions/globalTyles";

const initialState = {}

const notifyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.NOTIFY:
            return action.payload;
        default:
            return state;
    }
}

export default notifyReducer