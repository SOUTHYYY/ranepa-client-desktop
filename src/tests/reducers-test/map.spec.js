import {APIReducer, initialState} from "../../redux/reducers/api_reducer";
import {
    FETCH_API_START,
    FETCH_API_SUCCESS,
    FETCH_API_FAILURE,
    FETCH_USER_PINS_START, FETCH_USER_PINS_SUCCES, FETCH_USER_PINS_FAILURE
} from '../../redux/actions/action_types';



describe('APIReducer test', () => {
    it('FETCH_API_START TEST', () => {
        const action = {
            type: FETCH_API_START
        }
        expect(APIReducer(initialState, action)).toEqual({
            ...initialState,
            loading: true,
        })
    })

    it('GET_COORDS_SUCCES TEST', () => {
        const state = {
            ...initialState,
            loading: true,

        }
        const action = {
            type: FETCH_API_SUCCESS,
            payload: [1, 2, 3, 4, 5]
        }
        expect(APIReducer(state, action)).toEqual({
            ...state,
            loading: false,
            data: action.payload
        })
    })

    it('GET_COORDS_FAILURE TEST', () => {
        const state = {
            ...initialState,
            loading: true,
        }
        const action = {
            type: FETCH_API_FAILURE,
            payload: 'Not found Data'
        }
        expect(APIReducer(state, action)).toEqual({
            ...state,
            loading: false,
            data: action.payload
        })
    })
    it ('FETCH_USER_PINS_START TEST', () => {
        const action = {
            type: FETCH_USER_PINS_START,
        }
        expect(APIReducer(initialState, action)).toEqual({
            ...initialState,
            loading: true,
            errorMessage: null
        })
    })
    it ('FETCH_USER_PINS_SUCCES TEST', () => {
        const state = {
            ...initialState,
            loading: true,
        }
        const action = {
            type: FETCH_USER_PINS_SUCCES,
            payload: [{id: 1, data: 123123}, {id: 1, data: 123123}, {id: 1, data: 123123}]
        }
        expect(APIReducer(state, action)).toEqual({
            ...state,
            loading: false,
            userPins: action.payload
        })
    })
    it ('FETCH_USER_PINS_FAILURE TEST', () => {
        const state = {
            ...initialState,
            loading: true,
        }
        const action = {
            type: FETCH_USER_PINS_FAILURE,
            payload: 'Some error'
        }
        expect(APIReducer(state, action)).toEqual({
            ...state,
            loading: false,
            errorMessage: action.payload
        })
    })
})