import { APIReducer } from './api_reducer';
import {AuthReducer} from './auth_reducer'
import { combineReducers } from 'redux';

export default combineReducers({ APIReducer, AuthReducer });