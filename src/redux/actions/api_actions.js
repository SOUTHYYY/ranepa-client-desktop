import {transformData} from "../../API/firebase/firebase-api";
import axios from "axios";
import {
    FETCH_API_START,
    FETCH_API_SUCCESS,
    FETCH_API_FAILURE, FETCH_USER_PINS_START, FETCH_USER_PINS_SUCCES, FETCH_USER_PINS_FAILURE
} from "./action_types";

import {findMarkersByUser} from '../../API/firebase/firebase-api'

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
                "header": `${point.siteName}`,
                "details": "Детали",
                "address": `${point.address}` //
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

export function fetchUserPinsStart(user) {
    return {
        type: FETCH_USER_PINS_START,
        payload: user
    }
}

export function fethUserPinsSucces(data) {
    return {
        type: FETCH_USER_PINS_SUCCES,
        payload: data
    }
}

export function fethUserPinsFailure(error) {
    return {
        type: FETCH_USER_PINS_FAILURE,
        payload: error
    }
}

export function fetchFromAPI() {
    return dispatch => {
        dispatch(fetchAPIStart());
        axios.get(api_url)
            .then((res) => transformData(res.data))
            .then((res) => dispatch(fetchAPISuccess(res)))
            .catch((error) => dispatch(fetchAPIFailure()))
    }
}

export function fethUserPins(user) {
    return async dispatch => {
        dispatch(fetchUserPinsStart())
        try {
            const data = await findMarkersByUser(user)
            dispatch(fethUserPinsSucces(transformData(data)))
        } catch (error) {
            dispatch(fethUserPinsFailure(error))
        }
    }
}