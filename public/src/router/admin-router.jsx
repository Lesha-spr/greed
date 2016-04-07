import React from 'react';
import {Route, IndexRoute} from 'react-router';

// Route Handlers
import Admin from '../components/admin/admin.react.jsx';
import Statistics from './../components/statistics/statistics.react.jsx';
import Products from './../components/products/products.react.jsx';
import Categories from './../components/categories/categories.react.jsx';
import Boxes from './../components/boxes/boxes.react.jsx';

export const routes = (
    <Route path='/admin' component={Admin}>
        <IndexRoute component={Statistics}/>
        <Route path='products' component={Products}/>
        <Route path='categories' component={Categories}/>
        <Route path='boxes' component={Boxes}/>
    </Route>
);