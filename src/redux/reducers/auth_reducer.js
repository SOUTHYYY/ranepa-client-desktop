import {SET_AUTH_USER_DATA_SUCCES, SET_AUTH_USER_DATA_FAILURE} from "../actions/action_types";

export const initialState = {
    id: null,
    login: null,
    password: null,
    isAuth: false,
    isFailed: false,
    siteName: null,
    icon: null,
    isFretching: false,
}

export function AuthReducer(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case SET_AUTH_USER_DATA_SUCCES:
            return {...state, ...payload};
        case SET_AUTH_USER_DATA_FAILURE:
            return {...state, ...payload};
        default:
            return state;
    }
}