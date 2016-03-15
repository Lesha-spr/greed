import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './router/app-router.jsx';

render(
    <Router history={browserHistory}>
        {routes}
    </Router>,
    document.getElementById('app')
);