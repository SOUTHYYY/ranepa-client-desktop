// Tests for mapReducer

import mapReducer, {initialState} from "../../redux/reducers/map-reducer";
import {GET_COORDS_FAILURE, GET_COORDS_REQUEST, GET_COORDS_SUCCES} from "../../redux/consts/map";


describe('mapReducer test', () => {
    it('GET_COORDS_REQUEST TEST', () => {
        const action = {
            type: GET_COORDS_REQUEST
        }
        expect(mapReducer(initialState, action)).toEqual({
            ...initialState,
            loading: true,
            error: false,
            errorMsg: null
        })
    })

    it('GET_COORDS_SUCCES TEST', () => {
        const state = {
            ...initialState,
            loading: true,
            error: false,
            errorMsg: null
        }
        const action = {
            type: GET_COORDS_SUCCES,
            payload: [1, 2, 3, 4, 5]
        }
        expect(mapReducer(state, action)).toEqual({
            ...state,
            loading: false,
            pins: action.payload
        })
    })

    it('GET_COORDS_FAILURE TEST', () => {
        const state = {
            ...initialState,
            loading: true,
            error: false,
            errorMsg: null
        }
        const action = {
            type: GET_COORDS_FAILURE,
            payload: 'Error 404 lost connection'
        }
        expect(mapReducer(state, action)).toEqual({
            ...state,
            loading: false,
            error: true,
            errorMsg: action.payload
        })
    })
})