import { APIReducer } from './api_reducer';
import { AuthReducer } from './auth_reducer'
import { REGReducer } from "./reg_reducer";
import { combineReducers } from 'redux';

export default combineReducers({
    APIReducer,
    AuthReducer,
    REGReducer,
});