import {APIReducer, initialState} from "../../redux/reducers/api_reducer";
import { FETCH_API_START, FETCH_API_SUCCESS, FETCH_API_FAILURE} from '../../redux/actions/action_types';



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
})