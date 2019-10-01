import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './sass/index.scss';
import 'bootstrap/dist/css/bootstrap.css';
import {register} from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
register();
