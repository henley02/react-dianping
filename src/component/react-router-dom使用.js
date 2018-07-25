import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

class A extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                Component A
                <Switch>
                    <Route path={`${this.props.match.path}`} exact render={(route) => {
                        return <div>当前组件是不带参数的A</div>
                    }}/>
                    <Route path={`${this.props.match.path}/sub`} render={(route) => {
                        return <div>当前组件A sub</div>
                    }}/>
                    <Route path={`${this.props.match.path}/:id`} render={(route) => {
                        return <div>当前组件是带参数的A， 参数：{route.match.params.id}</div>
                    }}/>
                </Switch>
            </div>
        )
    }
}

class B extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>Component B </div>
        )
    }
}

class Wrapper extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Link to="/a">组件A</Link>
                <br/>
                <Link to="/a/sub">组件A Sub</Link>
                <br/>
                <Link to="/a/123">组件A</Link>
                <br/>
                <Link to="/b">组件B</Link>
                <div>{this.props.children}</div>
            </div>
        )
    }
}

ReactDOM.render(
    <Router>
        <Wrapper>
            <Route path="/a" component={A}/>
            <Route path="/b" component={B}/>
        </Wrapper>
    </Router>
    , document.getElementById('app')
);