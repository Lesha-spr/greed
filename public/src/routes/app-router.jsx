import React from 'react';
import Route from 'react-router/lib/Route.js';
import IndexRoute from 'react-router/lib/IndexRoute.js';
import App from '../components/app/app.react.jsx';

// Route components creators
import indexRoute from './app/index.route.js';

export const routes = (
    <Route path='/' component={App}>

    </Route>
);