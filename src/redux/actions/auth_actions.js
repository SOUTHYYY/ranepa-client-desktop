import {SET_AUTH_USER_DATA_SUCCES} from "./action_types";
import { stopSubmit } from 'redux-form'

export const setAuthUserData = (id, email, login, isAuth) => ({
    type: SET_AUTH_USER_DATA_SUCCES,
    payload: {id, email, login, isAuth}
})

export const OnSetAuthUserData = () => async (dispatch) => {
    try {
        const data = window.localStorage.getItem('user');
        if (data !== undefined) {
            let {id, login, email} = data
            dispatch(setAuthUserData(id, email, login, true))
        }
    }catch (e) {

    }

}

export const login = (email, password, rememberMe = true) => async (dispatch) => {
    const response = {
        data: {
            id: 1,
            email: 'niuranepa@gmail.com',
            login: 'NIURANEPA',
            isAuth: true
        },
        resultCode: 0,
    }
    if (response.resultCode === 0) {
        //Convert the state to a JSON string
        const serialisedState = JSON.stringify(response.data);
        //Save the serialised state to localStorage against the key 'app_state'
        await window.localStorage.setItem('user', serialisedState)
        dispatch(OnSetAuthUserData())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Упс... что-то пошло не так...'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logout = () => async (dispatch) => {
    const response = {
        data: {
            resultCode: 0,
        }
    }

    if (response.data.resultCode === 0) {
        window.localStorage.removeItem('user');
        dispatch(setAuthUserData(null, null, null, false))
    }
}
