import {
  FETCH_VK_CHECK_GROUP_SUCCESS,
  FETCH_FIREBASE_PUSH_SUCCESS,
  FETCH_FIREBASE_PUSH_FAILURE,
  FETCH_VK_CHECK_GROUP_FAILURE,
  CLEAR_DATA,
  UPDATE_VK_STATE
} from "./action_types";
import {fetchVKChecker} from "../../API/VK/VK-api";
import {registerUser} from "../../API/firebase/firebase-api";
import {reset} from 'redux-form';


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

export function updVkState(state) {

    if(!state) return {
        type: UPDATE_VK_STATE,
        payload: false
    };

    return {
        type: UPDATE_VK_STATE,
        payload: state
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
        const data = await fetchVKChecker(id);
        switch (data) {
            case 'similarity_err': {
                dispatch(fetchVKCheckerFailure('Ошибка безопастности'));
                break;
            }
            case false: {
                dispatch(fetchVKCheckerFailure('Группа не найдена'));
                break;
            }
            default: {
                dispatch(fetchVKCheckerSuccess(data));
            }
        }

    }
}

export function onRegister(login, siteName, vkId, password) {
    return async dispatch => {
        let registered = await registerUser(login, siteName, vkId, password);
        if(registered) {
            dispatch(fetchFirebasePushSuccess())
        } else {
            dispatch(fetchFirebasePushFailure('Аккаунт уже зарегистрирован'));
            dispatch(reset('register'));
            dispatch(clearData());
        }
    }
}