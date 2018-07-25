import React from 'react';
import "./theme.css";

import NavTop from 'component/nav-top/nav-top';
import NavSide from 'component/nav-side/nav-side';

class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="wrapper">
                <NavTop/>
                <NavSide/>
                {this.props.children}
            </div>
        );
    }
}

export default Layout;