import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from '../components/app/app.react.jsx';

export const routes = (
    <Route path='/' component={App}>
        <IndexRoute/>
    </Route>
);