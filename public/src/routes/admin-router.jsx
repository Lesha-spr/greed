import React from 'react';
import Route from 'react-router/lib/Route.js';
import IndexRoute from 'react-router/lib/IndexRoute.js';
import fetchComponent from './../helpers/fetchComponent/fetchComponent.js';

// Route Handlers
import Admin from './../components/admin/admin.react.jsx';

let statistics = fetchComponent();
let products = fetchComponent();
let categories = fetchComponent();
let boxes = fetchComponent();

// FIXME: Refactor
export const routes = (
    <Route path='/admin' component={Admin}>
        <IndexRoute getComponent={(nextState, cb) => {
            statistics.before();

            require.ensure([], require => {
                statistics.after();

                cb(null, require('./../components/statistics/statistics.react.jsx').default);
            });
        }}/>
        <Route path='products' getComponent={(nextState, cb) => {
            products.before();

            require.ensure([], require => {
                products.after();

                cb(null, require('./../components/products/products.react.jsx').default);
            });
        }}/>
        <Route path='categories' getComponent={(nextState, cb) => {
            categories.before();

            require.ensure([], require => {
                categories.after();

                cb(null, require('./../components/categories/categories.react.jsx').default);
            });
        }}/>
        <Route path='boxes' getComponent={(nextState, cb) => {
            boxes.before();

            require.ensure([], require => {
                boxes.after();

                cb(null, require('./../components/boxes/boxes.react.jsx').default);
            });
        }}/>
    </Route>
);