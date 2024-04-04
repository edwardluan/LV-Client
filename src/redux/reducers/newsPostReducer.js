import { POSTTYPES } from "../actions/postAction";

const initialState = {
    loading: false,
    posts: [],
    result: 0,
    page: 2,
};

const newsPostReducer = (state = initialState, action) => {
    switch (action.type) {
        case POSTTYPES.LOADING_NEWS_POST:
            return {
                ...state,
                loading: action.payload,
            };
        case POSTTYPES.NEWS_POST:
            return {
                ...state,
                posts: action.payload.post,
                result: action.payload.result,
                page: action.payload.page
            };
        default:
            return state;
    }
};

export default newsPostReducer;
