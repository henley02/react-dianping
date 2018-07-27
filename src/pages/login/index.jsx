import React from 'react';
import "./index.sass";

import axios from 'public/js/service';
import {login} from 'api/index.js';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'admin',
            password: '',
        }
    }

    onInputChange(e) {
        let inputName = e.target.name;
        let inputValue = e.target.value;
        this.setState({
            [inputName]: inputValue
        })
        console.log([inputName] + "  " + inputValue)
        console.log(this.state);
    }

    async onSubmit(e) {
        let res = await login({
            url: "/manage/user/login.do",
            data: {
                username: this.state.username,
                password: this.state.password
            }
        });
        console.log(res);
        if (res.status === 0) {

        } else {

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
                                       onChange={(event) => this.onInputChange(event)}/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="请输入密码" name="password"
                                       onChange={(event) => this.onInputChange(event)}/>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block"
                                    onClick={(e) => this.onSubmit(e)}>登陆
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;