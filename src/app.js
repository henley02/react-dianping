import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class A extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                Component A
                参数：{this.props.match.params.id}
                <switch>
                    <Route path={`${this.props.match.path}`/:id}/>
                </switch>
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