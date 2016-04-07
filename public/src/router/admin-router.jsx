import React from 'react';
import {Route, IndexRoute} from 'react-router';

// Route Handlers
import AdminRoot from './../components/admin-root/admin-root.react.jsx';
import Statistics from './../components/statistics/statistics.react.jsx';
import Products from './../components/products/products.react.jsx';
import Categories from './../components/categories/categories.react.jsx';

export const routes = (
    <Route path='/admin' component={AdminRoot}>
        <IndexRoute component={Statistics}/>
        <Route path='products' component={Products}/>
        <Route path='categories' component={Categories}/>
        <Route path='boxes' component={Products}/>
    </Route>
);