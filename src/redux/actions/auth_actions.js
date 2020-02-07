import {SET_AUTH_USER_DATA_SUCCES} from "./action_types";
import {stopSubmit} from 'redux-form'

export const setAuthUserData = (id, login, password, isAuth) => ({
    type: SET_AUTH_USER_DATA_SUCCES,
    payload: {id, login, password, isAuth}
})

export const OnSetAuthUserData = () => async (dispatch) => {
    try {
        const data = window.localStorage.getItem('user');
        const parsed = JSON.parse(data)
        debugger
        if (parsed !== undefined) {
            let {id, login, password} = parsed
            dispatch(setAuthUserData(id, login, password, true))
        }
    } catch (e) {

    }
}

export const login = (login, password) => async (dispatch) => {
    const response = {
        data: {
            id: 1,
            login,
            password,
            isAuth: true
        },
        resultCode: 0,
    }
    if (response.resultCode === 0) {
        //Convert the state to a JSON string
        const serialisedState = JSON.stringify(response.data);
        //Save the serialised state to localStorage against the key 'user'
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
