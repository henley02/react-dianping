import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';

import "babel-polyfill";

import Home from 'pages/home/index';
import Login from 'pages/login/index';
import Layout from 'component/layout/index.jsx';
import ErrorPage from 'pages/error/index';
import UserList from 'pages/user/index';
import ProductRouter from 'pages/product/router';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" render={(props) => (
                        <Layout>
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route path="/product" component={ProductRouter}/>
                                <Route path="/product-category" component={ProductRouter}/>
                                <Route path="/order" component={Home}/>
                                <Route page="/user/index" component={UserList}/>
                                <Redirect exact from="/user" to="/user/index"/>
                                <Route component={ErrorPage}/>
                            </Switch>
                        </Layout>
                    )}/>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));