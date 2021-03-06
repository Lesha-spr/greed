import './validations/extendErrors.js';
import React from 'react';
import {render} from 'react-dom';
import Router from 'react-router/lib/Router.js';
import browserHistory from 'react-router/lib/browserHistory.js';
import {routes} from './routes/app-router.jsx';

import './app.scss';

render(
    <Router history={browserHistory}>
        {routes}
    </Router>,
    document.getElementById('app')
);