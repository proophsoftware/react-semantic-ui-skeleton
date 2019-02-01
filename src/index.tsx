import { createHashHistory } from 'history'
import {fromJS} from "immutable";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import configureStore from './configureStore';
import notify from './notify';
import * as serviceWorker from './serviceWorker';
import './theme/css/style.css';
import './theme/semantic/semantic.css';

// We use hash history because this example is going to be hosted statically.
// Normally you would use browser history.
const history = createHashHistory();

const store = configureStore(history, fromJS({}));

ReactDOM.render(<App store={store} history={history}/>, document.getElementById('root'));

notify();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
