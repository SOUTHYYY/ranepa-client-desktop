import {SET_AUTH_USER_DATA_SUCCES, SET_AUTH_USER_DATA_FAILURE} from "./action_types";
import {stopSubmit} from 'redux-form'
import {getFireProfile} from "../../API/firebase/firebase-api";

export const setAuthUserData = (id, login, password, isAuth, siteName, isFailed, vkId) => ({
    type: SET_AUTH_USER_DATA_SUCCES,
    payload: {id, login, password, siteName, isAuth, isFailed, vkId}
});

export const AuthFail = (type) => ({
    type: SET_AUTH_USER_DATA_FAILURE,
    payload: {isFailed: type}
});

export const OnSetAuthUserData = () => async (dispatch) => {
    try {
        const data = window.localStorage.getItem('user');
        const parsed = JSON.parse(data);
        if (parsed !== undefined) {
            let {id, login, password, siteName, vkId} = parsed;
            dispatch(setAuthUserData(id, login, password, true, siteName, false, vkId))
        }
    } catch (e) {

    }
};

export const login = (login, password) => async (dispatch) => {
    const data = await getFireProfile(password, login);
    const response = {
        ...data.data,
        isAuth: data.isAuthed
    };
    if (data.resultCode === 0) {
        //Convert the state to a JSON string
        const serialisedState = JSON.stringify(response);
        //Save the serialised state to localStorage against the key 'user'
        await window.localStorage.setItem('user', serialisedState);
        dispatch(OnSetAuthUserData())

    } else {
        dispatch(AuthFail(true));
        let message = 'Упс... что-то пошло не так...';
        dispatch(stopSubmit('login', {_error: message}))
    }
};

export const logout = () => async (dispatch) => {
    const response = {
        data: {
            resultCode: 0,
        }
    };

    if (response.data.resultCode === 0) {
        window.localStorage.removeItem('user');
        dispatch(setAuthUserData(null, null, null, false, null, null))
    }
};
