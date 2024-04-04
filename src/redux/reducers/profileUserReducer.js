import { EditData } from "../actions/globalTyles";
import { PROFILE_USER } from "../actions/profileUserAction";

const initialState = {
    loading: false,
    users: [],
    posts: [],
    ids: []
};

const profileUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_USER.LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case PROFILE_USER.GET_USER:
            const existingUser = state.users.find(
                (user) => user._id === action.payload.user._id
            );
            if (existingUser) {
                return state;
            } else {
                return {
                    ...state,
                    users: [...state.users, action.payload.user],
                };
            }
        case PROFILE_USER.FOLLOW:
            return {
                ...state,
                users: EditData(state.users, action.payload._id, action.payload)
            };
        case PROFILE_USER.UNFOLLOW:
            return {
                ...state,
                users: EditData(state.users, action.payload._id, action.payload)
            };
        case PROFILE_USER.GET_ID:
            return {
                ...state,
                ids: [...state.ids, action.payload]
            };
        case PROFILE_USER.GET_POSTS:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            };
        case PROFILE_USER.UPDATE_POST:
            return {
                ...state,
                posts: EditData(state.posts, action.payload._id, action.payload)
            };
        default:
            return state;
    }
};

export default profileUserReducer;
