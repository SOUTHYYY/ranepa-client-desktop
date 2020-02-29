import { transformData } from "../../API/firebase/firebase-api";
import axios from "axios";
import {
  FETCH_API_START,
  FETCH_API_SUCCESS,
  FETCH_API_FAILURE,
  FETCH_USER_PINS_START,
  FETCH_USER_PINS_SUCCES,
  FETCH_USER_PINS_FAILURE,
  FETCH_USER_BOOK_START,
  FETCH_USER_BOOK_FAILURE,
  FETCH_USER_BOOK_SUCCESS,
  FETCH_MAP_POLYGON
} from "./action_types";

import { findMarkersByUser } from "../../API/firebase/firebase-api";
import { getRanepaS } from "../../API/ranepa/ranepa-services";

const ranepa_book_url =
    "http://services.niu.ranepa.ru/API/public/student/getDiary";

const api_url =
    "https://basic-lock-238415.firebaseio.com/markers.json?auth=QpEDGE1BvmXlj6cSboFbxwCwkOsN3UBcLVxdj68o";

const polygon_url = "https://nominatim.openstreetmap.org/search.php?q=Нижний+Новгород&polygon_geojson=1&format=geojson";

export function fetchAPIStart() {
  return {
    type: FETCH_API_START
  };
}

export function fetchAPISuccess(data) {
  return {
    type: FETCH_API_SUCCESS,
    payload: data
  };
}

export function fetchAPIFailure() {
  return {
    type: FETCH_API_FAILURE
  };
}

export function fetchMapPolygon(data) {
  return {
    type: FETCH_MAP_POLYGON,
    payload: data
  };
}

export function fetchUserPinsStart(user) {
  return {
    type: FETCH_USER_PINS_START,
    payload: user
  };
}

export function fethUserPinsSucces(data) {
  return {
    type: FETCH_USER_PINS_SUCCES,
    payload: data
  };
}

export function fethUserPinsFailure(error) {
  return {
    type: FETCH_USER_PINS_FAILURE,
    payload: error
  };
}

export function fetchBookmarksStart(id) {
  return {
    type: FETCH_USER_BOOK_START,
    payload: id
  };
}

export function fetchBookmarksSuccess(data) {
  return {
    type: FETCH_USER_BOOK_SUCCESS,
    payload: data
  };
}

export function fetchBoormarksFailure(error) {
  return {
    type: FETCH_USER_BOOK_FAILURE,
    payload: error
  };
}

export function fetchFromAPI() {
  return dispatch => {
    dispatch(fetchAPIStart());
    axios
        .get(api_url)
        .then(res => transformData(res.data))
        .then(res => dispatch(fetchAPISuccess(res)))
        .catch(error => dispatch(fetchAPIFailure()));
  };
}

export function fethUserPins(user) {
  return async dispatch => {
    dispatch(fetchUserPinsStart());
    try {
      const data = await findMarkersByUser(user);
      dispatch(fethUserPinsSucces(transformData(data)));
    } catch (error) {
      dispatch(fethUserPinsFailure(error));
    }
  };
}

export function fetchFromRanepaAPI(id) {
  return async dispatch => {
    dispatch(fetchBookmarksStart());
    await axios
        .post(ranepa_book_url, {
          recBook: id
        })
        .then(res => dispatch(fetchBookmarksSuccess(res.data)));
  };
}

export function fetchPolygonData() {
  return async dispatch => {
    await axios
        .get(polygon_url)
        .then(res => dispatch(fetchMapPolygon(res.data)))
  }
}