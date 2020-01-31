import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './redux/store'

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App/>
        </Provider>
    </Router>, document.getElementById('root'));


serviceWorker.unregister();
