import React from 'react';
import "./index.sass";

import {login} from 'api/index.js';
import {getParamsCode, setLocalStorage} from 'public/js/util';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'admin',
            password: 'admin',
            redirect: getParamsCode("redirect") || "/"
        }
    }

    componentWillMount() {
        document.title = "登录 - " + document.title;
    }

    onInputChange(e) {
        let inputName = e.target.name;
        let inputValue = e.target.value;
        this.setState({
            [inputName]: inputValue
        })
    }

    async onSubmit() {
        if (this.state.username.trim() == '') {
            // "用户名不能为空"
            return false;
        }
        if (this.state.password.trim() == '') {
            // "密码不能为空"
            return false;
        }
        let res = await login({
            username: this.state.username,
            password: this.state.password
        });
        if (res.status === 0) {
            setLocalStorage("userInfo", res.data);
            this.props.history.push(this.state.redirect);
        } else {

        }
    }

    onInputKeyUp(e) {
        if (e.keyCode === 13) {
            if (e.target.name === "username") {
                document.getElementsByName("password")[0].focus();
            } else {
                this.onSubmit();
            }
        }
    }

    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登陆</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="请输入用户名" name="username"
                                       defaultValue={this.state.username}
                                       onKeyUp={(event) => this.onInputKeyUp(event)}
                                       onChange={(event) => this.onInputChange(event)}/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="请输入密码" name="password"
                                       defaultValue={this.state.password}
                                       onKeyUp={(event) => this.onInputKeyUp(event)}
                                       onChange={(event) => this.onInputChange(event)}/>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block"
                                    onClick={() => this.onSubmit()}>登陆
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;