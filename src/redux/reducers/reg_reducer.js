import {
    FETCH_FIREBASE_PUSH_SUCCESS,
    FETCH_VK_CHECK_GROUP_SUCCESS,
    FETCH_VK_CHECK_GROUP_FAILURE,
    CLEAR_DATA,
    FETCH_FIREBASE_PUSH_FAILURE
} from "../actions/action_types";

export const rootState = {
    vkId: null,
    error: null,
    registered: null
};

export const initialState = {
    vkId: false,
    error: null,
    registered: null
};

export function REGReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_FIREBASE_PUSH_SUCCESS:
            return { ...state, registered: true };
        case FETCH_FIREBASE_PUSH_FAILURE:
            return { ...state, error: payload};
        case FETCH_VK_CHECK_GROUP_SUCCESS:
            return { ...state, vkId: payload };
        case FETCH_VK_CHECK_GROUP_FAILURE:
            return { ...state, error: payload};
        case CLEAR_DATA:
            return { ...rootState };
        default:
            return state;
    }
}