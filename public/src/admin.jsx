import 'babel-polyfill';
import 'whatwg-fetch';
import './validations/extendErrors.js';
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {routes} from './router/admin-router.jsx';

import './app.scss';

render(
    <Router history={browserHistory}>
        {routes}
    </Router>,
    document.getElementById('app')
);