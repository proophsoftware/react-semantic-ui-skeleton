import * as React from 'react';
import * as ReactDOM from 'react-dom';
import notify from './notify';
import { createHashHistory } from 'history'
import * as serviceWorker from './serviceWorker';
import configureStore from './configureStore';
import './theme/semantic/semantic.css';
import './theme/css/style.css';
import App from './App';

// We use hash history because this example is going to be hosted statically.
// Normally you would use browser history.
const history = createHashHistory();

const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

ReactDOM.render(<App store={store} history={history}/>, document.getElementById('root'));

notify();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
