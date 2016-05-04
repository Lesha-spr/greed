import React from 'react';
import Route from 'react-router/lib/Route.js';
import IndexRoute from 'react-router/lib/IndexRoute.js';
import AsyncActions from './../actions/async/async.actions.js';

// Route Handlers
import Admin from './../components/admin/admin.react.jsx';

let statistics, products, categories, boxes;

// FIXME: Refactor
export const routes = (
    <Route path='/admin' component={Admin}>
        <IndexRoute getComponent={(nextState, cb) => {
            if (!statistics) {
                AsyncActions.toggle.defer(true);
            }

            require.ensure([], require => {
                if (!statistics) {
                    AsyncActions.toggle.defer(false);
                    statistics = true;
                }

                cb(null, require('./../components/statistics/statistics.react.jsx').default);
            });
        }}/>
        <Route path='products' getComponent={(nextState, cb) => {
            if (!products) {
                AsyncActions.toggle.defer(true);
            }

            require.ensure([], require => {
                if (!products) {
                    AsyncActions.toggle.defer(false);
                    products = true;
                }

                cb(null, require('./../components/products/products.react.jsx').default);
            });
        }}/>
        <Route path='categories' getComponent={(nextState, cb) => {
            if (!categories) {
                AsyncActions.toggle.defer(true);
            }

            require.ensure([], require => {
                if (!categories) {
                    AsyncActions.toggle.defer(false);
                    categories = true;
                }

                cb(null, require('./../components/categories/categories.react.jsx').default);
            });
        }}/>
        <Route path='boxes' getComponent={(nextState, cb) => {
            if (!boxes) {
                AsyncActions.toggle.defer(true);
            }

            require.ensure([], require => {
                if (!boxes) {
                    AsyncActions.toggle.defer(false);
                    boxes = true;
                }

                cb(null, require('./../components/boxes/boxes.react.jsx').default);
            });
        }}/>
    </Route>
);