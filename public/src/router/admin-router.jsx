import React from 'react';
import {Route, IndexRedirect} from 'react-router';

// Route Handlers
import App from './../components/app/app.react.jsx';
import AdminRoot from './../components/admin-root/admin-root.react.jsx';
import Products from './../components/products/products.react.jsx';
import Categories from './../components/categories/categories.react.jsx';

export const routes = (
    <Route path='/admin' component={App}>
        <IndexRedirect to='/admin/start'/>
        <Route path='start' component={AdminRoot}>
            <Route path='products' component={Products}/>
            <Route path='categories' component={Categories}/>
            <Route path='boxes' component={Products}/>
        </Route>
    </Route>
);