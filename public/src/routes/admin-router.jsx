import React from 'react';
import Route from 'react-router/lib/Route.js';
import IndexRoute from 'react-router/lib/IndexRoute.js';

// Route Handlers
import Admin from './../components/admin/admin.react.jsx';

export const routes = (
    <Route path='/admin' component={Admin}>
        <IndexRoute getComponent={(nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./../components/statistics/statistics.react.jsx').Statistics);
            })
        }}/>
        <Route path='products' getComponent={(nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./../components/products/products.react.jsx').Products);
            })
        }}/>
        <Route path='categories' getComponent={(nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./../components/categories/categories.react.jsx').Categories);
            })
        }}/>
        <Route path='boxes' getComponent={(nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./../components/boxes/boxes.react.jsx').Boxes);
            })
        }}/>
    </Route>
);