import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom';

import ProductList from './index/index';
import ProductCategory from './category/index';

class ProductRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/product/index" component={ProductList}/>
                <Redirect exact from="/product" to="/product/index"/>
                <Route path="/product/category" component={ProductCategory}/>
            </Switch>
        )
    }
}

export default ProductRouter;