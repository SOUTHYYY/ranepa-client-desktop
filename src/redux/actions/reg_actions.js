import {
  FETCH_VK_CHECK_GROUP_SUCCESS,
  FETCH_FIREBASE_PUSH_SUCCESS,
  FETCH_FIREBASE_PUSH_FAILURE,
  FETCH_VK_CHECK_GROUP_FAILURE,
  CLEAR_DATA
} from "./action_types";
import {fetchVKChecker} from "../../API/VK/VK-api";
import {registerUser} from "../../API/firebase/firebase-api";


export function fetchVKCheckerSuccess(data) {
    return {
        type: FETCH_VK_CHECK_GROUP_SUCCESS,
        payload: data
    }
}

export function fetchVKCheckerFailure(err) {
    return {
        type: FETCH_VK_CHECK_GROUP_FAILURE,
        payload: err
    }
}

export function fetchFirebasePushSuccess() {
    return {
        type: FETCH_FIREBASE_PUSH_SUCCESS,
    }
}
export function fetchFirebasePushFailure(err) {
    return {
        type: FETCH_FIREBASE_PUSH_FAILURE,
        payload: err
    }
}

export function clearREGReducer() {
    return {
        type: CLEAR_DATA
    }
}

export function clearData() {
    return dispatch => {
        dispatch(clearREGReducer());
    }
}
export function fetchVK(id) {
    return async dispatch => {
        dispatch(fetchVKCheckerFailure(null));
        const data = await fetchVKChecker(id);
        if (data === 'similarity_err') {
            dispatch(fetchVKCheckerFailure('Ошибка безопастности'));
        }
        if (data === false) {
            dispatch(fetchVKCheckerFailure('Группа не найдена'));
        }
        dispatch(fetchVKCheckerSuccess(data));
    }
}

export function onRegister(login, siteName, vkId, password) {
    return async dispatch => {
        let registered = await registerUser(login, siteName, vkId, password);
        registered ? dispatch(fetchFirebasePushSuccess()) : dispatch(fetchFirebasePushFailure('Аккаунт уже зарегистрирован'));
    }
}