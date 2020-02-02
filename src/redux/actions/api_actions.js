import firebase from "firebase";
import {snapshotToArray} from "../../API/firebase/firebase-api";
import {
    FETCH_API_START,
    FETCH_API_SUCCESS,
    FETCH_API_FAILURE
} from "./action_types";

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
                "header": "Тут заглавие",
                "details": "Детали",
                "time": "Тут время"
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
        firebase.database().ref('markers').on('value', (snap) => {
            this.setState({
                data: this.createFeatureCollection(dispatch())
            });
        })
    }
}