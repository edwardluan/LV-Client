import { GLOBALTYPES } from "../actions/globalTyles";

const initialState = {}

const modeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTYPES.MODE:
            return action.payload;
        default:
            return state;
    }
}

export default modeReducer