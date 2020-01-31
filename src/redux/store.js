import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'

const store  = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// Просмотр всего стейта в консоли window.store.getState()
window.store = store.getState()

export  default  store