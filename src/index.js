import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter as Router} from 'react-router-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import {initialState} from "./redux/reducers/auth_reducer";

if (localStorage.getItem('user')) {
    var authState = JSON.parse(localStorage.getItem('user'))
}

const store = createStore(
    rootReducer,
    authState ? {AuthReducer: authState} : {AuthReducer: initialState},
    composeWithDevTools(
        applyMiddleware(thunk)
    ));

window.store = store.getState()

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App/>
        </Provider>

    </Router>, document.getElementById('root'));


serviceWorker.unregister();
