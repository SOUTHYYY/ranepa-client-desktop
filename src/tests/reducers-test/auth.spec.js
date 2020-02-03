import {AuthReducer, initialState} from "../../redux/reducers/auth_reducer";
import {SET_AUTH_USER_DATA_SUCCES} from '../../redux/actions/action_types';



describe('AIUTH reducer test', () => {
    it('SET_AUTH_USER_DATA_SUCCES TEST', () => {
        const action = {
            type: SET_AUTH_USER_DATA_SUCCES,
            payload: {
                id: 1,
                email: 'example@gmail.com',
                login: 'southyyy'
            }
        }

        expect(AuthReducer(initialState, action)).toEqual({
            ...initialState,
            ...action.payload,
            isAuth: true
        })
    })


})