import React from 'react';
import Route from 'react-router/lib/Route.js';
import IndexRoute from 'react-router/lib/IndexRoute.js';

// Route components creators
import indexRoute from './admin/index.route.js';
import productsRoute from './admin/products.route.js';
import categoriesRoute from './admin/categories.route.js';
import boxesRoute from './admin/boxes.route.js';

// Route Handlers
import Admin from './../components/admin/admin.react.jsx';

// FIXME: Refactor
export const routes = (
    <Route path='/admin' component={Admin}>
        <IndexRoute getComponent={indexRoute}/>
        <Route path='products' getComponent={productsRoute}/>
        <Route path='categories' getComponent={categoriesRoute}/>
        <Route path='boxes' getComponent={boxesRoute}/>
    </Route>
);