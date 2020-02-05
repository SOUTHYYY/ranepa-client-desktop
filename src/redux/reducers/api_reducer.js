import {
    FETCH_API_START,
    FETCH_API_SUCCESS,
    FETCH_API_FAILURE
} from "../actions/action_types";

export const initialState =  {
    loading: false,
    data: false
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
        default:
            return state;
    }
}