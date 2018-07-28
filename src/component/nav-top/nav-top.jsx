import React from 'react';
import {Link} from 'react-router-dom';
import {getLocalStorage, removeLocalStorage} from 'public/js/util';
import {logout} from 'api/index'

class NavTop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: getLocalStorage("userInfo")
        }
    }

    async logout() {
        let res = await logout();
        removeLocalStorage("userInfo");
        window.location.href = "/login";
    }

    render() {
        return (
            <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/"><b>HAPPY</b>MALL</Link>
                </div>
                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;">
                            <i className="fa fa-user fa-fw"></i>
                            <span>欢迎，{this.state.userInfo.username}</span>
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={this.logout.bind(this)}>
                                    <i className="fa fa-sign-out fa-fw"></i>退出登陆
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NavTop;