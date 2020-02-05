import {SET_AUTH_USER_DATA_SUCCES} from "./action_types";
import { stopSubmit } from 'redux-form'

export const setAuthUserData = (id, email, login, isAuth) => ({
    type: SET_AUTH_USER_DATA_SUCCES,
    payload: {id, email, login, isAuth}
})

export const OnSetAuthUserData = () => async (dispatch) => {
    const response = {
        data: {
          id: 1,
          email: 'niuranepa@gmail.com',
          login: 'NIURANEPA'
        },
        resultCode: 0,
    }
    if (response.resultCode === 0) {
        let {id, login, email} = response.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email, password, rememberMe = true) => async (dispatch) => {
    const response = {
        data: {
            id: 1,
            email: 'niuranepa@gmail.com',
            login: 'NIURANEPA',
            resultCode: 0,
        },
    }
    if (response.data.resultCode === 0) {
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
        dispatch(setAuthUserData(null, null, null, false))
    }
}
