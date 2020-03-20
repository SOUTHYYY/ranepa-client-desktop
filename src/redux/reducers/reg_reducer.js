import {
    FETCH_FIREBASE_PUSH_SUCCESS,
    FETCH_VK_CHECK_GROUP_SUCCESS,
    FETCH_VK_CHECK_GROUP_FAILURE,
    CLEAR_DATA
} from "../actions/action_types";

export const rootState = {
    login: null,
    password: null,
    siteName: null,
    vkId: null,
    error: null,
    registered: null
};

export const initialState = {
    login: null,
    password: null,
    siteName: null,
    vkId: null,
    error: null,
    registered: null
};

export function REGReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_FIREBASE_PUSH_SUCCESS:
            return { ...state, registered: true };
        case FETCH_VK_CHECK_GROUP_SUCCESS:
            debugger;
            return { ...state, vkId: payload };
        case FETCH_VK_CHECK_GROUP_FAILURE:
            return { ...state, error: payload};
        case CLEAR_DATA:
            return { ...rootState };
        default:
            return state;
    }
}