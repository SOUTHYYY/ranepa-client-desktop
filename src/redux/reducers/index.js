import { APIReducer } from './api_reducer';
import { AuthReducer } from './auth_reducer'
import { REGReducer } from "./reg_reducer";
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    APIReducer,
    AuthReducer,
    REGReducer,
    form: formReducer
});