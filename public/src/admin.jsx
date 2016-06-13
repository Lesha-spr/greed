import './validations/extendErrors.js';
import React from 'react';
import {render} from 'react-dom';
import Router from 'react-router/lib/Router.js';
import browserHistory from 'react-router/lib/browserHistory.js';
import {routes} from './routes/admin-router.jsx';

import Dialog from './components/dialog/dialog.react.jsx';

import './app.scss';

render(
    <Router history={browserHistory}>
        {routes}
    </Router>,
    document.getElementById('app')
);

render(
    <Dialog/>,
    document.getElementById('dialog')
);