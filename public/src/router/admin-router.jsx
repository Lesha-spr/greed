import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Menu from './../components/menu/menu.react.jsx';

// Route Handlers
import AdminRoot from './../components/admin-root/admin-root.react.jsx';

const routes = (
    <Route path='admin' component={AdminRoot}>

    </Route>
);

export default routes;