import {transformData} from "../../API/firebase/firebase-api";
import axios from "axios";
import {
    FETCH_API_START,
    FETCH_API_SUCCESS,
    FETCH_API_FAILURE
} from "./action_types";

const api_url = 'https://basic-lock-238415.firebaseio.com/markers.json?auth=QpEDGE1BvmXlj6cSboFbxwCwkOsN3UBcLVxdj68o';

function createFeatureCollection(data) {
    let features = [];
    data.forEach(point => {
        features.push({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    point.longitude,
                    point.latitude
                ]
            },
            "properties": {
                "header": "Заглавие",
                "details": "Детали",
                "time": `${point.address}` //
            }
        });
    });

    return {
        "type": "FeatureCollection",
        "features": features
    }
}

export function fetchAPIStart() {
    return {
        type: FETCH_API_START
    }
}

export function fetchAPISuccess(data) {
    return {
        type: FETCH_API_SUCCESS,
        payload: data
    }
}

export function fetchAPIFailure() {
    return {
        type: FETCH_API_FAILURE
    }
}

export function fetchFromAPI() {
    return dispatch => {
        dispatch(fetchAPIStart());
        axios.get(api_url)
            .then((res) => transformData(res.data))
            .then((res) => createFeatureCollection(res))
            .then((res) => dispatch(fetchAPISuccess(res)))
            .catch((error) => dispatch(fetchAPIFailure()))
    }
}