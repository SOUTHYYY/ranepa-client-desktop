import {
    FETCH_API_START,
    FETCH_API_SUCCESS,
    FETCH_API_FAILURE, FETCH_USER_PINS_START, FETCH_USER_PINS_SUCCES, FETCH_USER_PINS_FAILURE
} from "../actions/action_types";

export const initialState =  {
    loading: false,
    data: false,
    userPins: [],
    errorMessage: null
};

export function APIReducer(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case FETCH_API_START:
            return { ...state, loading: true };
        case FETCH_API_SUCCESS:
            return { ...state, loading: false, data: payload};
        case FETCH_API_FAILURE:
            return { ...state, loading: false, data: 'Not found Data'};
        case FETCH_USER_PINS_START:
            return { ...state, loading: true, errorMessage: null };
        case FETCH_USER_PINS_SUCCES:
            return { ...state, loading: false, userPins: payload};
        case FETCH_USER_PINS_FAILURE:
            return { ...state, loading: false, errorMessage: payload};
        default:
            return state;
    }
}