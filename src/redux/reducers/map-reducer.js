import {VIEWPORT_CHANGED} from "../consts/map";


const initialState = {
    pins: [
        {
            id: 1,
            latitude: 56.3081,
            longitude: 43.9863
        },
        {
            id: 2,
            latitude: 56.3181,
            longitude: 43.9763
        }
    ],
    token: 'pk.eyJ1IjoibWFmYWhlcyIsImEiOiJjazV6cW5xdDUwMDRrM21ueHF2Z3EzY3VyIn0.RRuRqnVCy3VWno0v3Xk__w',
    viewport: {
        width: 1920,
        height: 1280,
        zoom: 17,
        latitude: 56.3081,
        longitude: 43.9863
    },
};


const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'VIEWPORT_CHANGED':
            return {
                ...state,
                viewport: action.payload
            };

        default:
            return state
    }
};


export default mapReducer