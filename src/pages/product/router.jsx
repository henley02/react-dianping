import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom';

import ProductList from './index/index';
import ProductCategory from './category/index';
import ProductSave from './save/save';
import ProductDetail from './detail/detail';

class ProductRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/product/index" component={ProductList}/>
                <Route path="/product/save/:pid?" component={ProductSave}/>
                <Route path="/product/detail/:pid" component={ProductDetail}/>
                <Route path="/product/category" component={ProductCategory}/>
                <Redirect exact from="/product" to="/product/index"/>
            </Switch>
        )
    }
}

export default ProductRouter;