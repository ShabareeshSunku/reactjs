import React from 'react';
import ReactDOM from 'react-dom';
//import Playground from './Playground';
import BookStore from './BookStore/index'
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(<BookStore />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
