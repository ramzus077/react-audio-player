import React from 'react';
import ReactDOM from 'react-dom';
import { createStore,applyMiddleware } from 'redux';
import {logger} from 'redux-logger';
import './index.css';
import App from './App';
import reducer from './reducers'

let store = createStore(reducer, applyMiddleware(logger));

function render(){
    ReactDOM.render(<App store={store}/>, document.getElementById('root'));
}


store.subscribe(render);

render();
