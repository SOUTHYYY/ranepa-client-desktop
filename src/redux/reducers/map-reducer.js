import {GET_COORDS_FAILURE, GET_COORDS_REQUEST, GET_COORDS_SUCCES, VIEWPORT_CHANGED} from "../consts/map";

export const initialState = {
    pins: [],
    token: 'pk.eyJ1IjoibWFmYWhlcyIsImEiOiJjazV6cW5xdDUwMDRrM21ueHF2Z3EzY3VyIn0.RRuRqnVCy3VWno0v3Xk__w',
    viewport: {
        width: 1920,
        height: 1280,
        zoom: 17,
        latitude: 56.3081,
        longitude: 43.9863
    },
    error: true,
    loading: false,
    errorMsg: null
}


const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case VIEWPORT_CHANGED:
            return {
                ...state,
                viewport: action.payload
            }
        case GET_COORDS_REQUEST:
            return {
                ...state,
                loading: true,
                errorMsg: null,
                error: false
            }
        case GET_COORDS_SUCCES:
            return {
                ...state,
                loading: false,
                pins: action.payload
            }
        case GET_COORDS_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload
            }
        default:
            return state
    }
}


export default mapReducer