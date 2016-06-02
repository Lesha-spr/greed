import React from 'react';
import {render} from 'react-dom';
import Router from 'react-router/lib/Router.js';
import browserHistory from 'react-router/lib/browserHistory.js';
import {routes} from './routes/app-router.jsx';
import FastClick from 'fastclick';

import './app.scss';

FastClick.attach(document.body);

render(
    <Router history={browserHistory}>
        {routes}
    </Router>,
    document.getElementById('app')
);