import React from 'react';
import Route from 'react-router/lib/Route.js';
import IndexRoute from 'react-router/lib/IndexRoute.js';
import App from '../components/app/app.react.jsx';
import Redirect from 'react-router/lib/Redirect.js';

// Route components creators
import indexRoute from './app/index.route.js';

export const routes = (
    <Route path='/' component={App}>
        <Redirect from='login' to='/'/>
        <Redirect from='admin' to='/?next=admin'/>
    </Route>
);