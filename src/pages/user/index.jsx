import React from 'react';
import PageTitle from 'component/page-title/page-title';
import {Link} from 'react-router-dom';
import Pagination from 'component/pagination/pagination';
import {FetchUserList} from 'api/index';
import {dateFormat} from 'public/js/util.js';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            list: [],
            lastPage: 0,
            isLoading: true,
        }
    }

    componentWillMount() {
        this.getData();
    }

    async getData() {
        this.setState({isLoading: true});
        let res = await FetchUserList({pageNum: this.state.pageNum});
        if (res.status === 0) {
            this.setState(res.data, () => {
                this.setState({
                    isLoading: false
                })
            })
        }
    }

    onChangePageNum(pageNum) {
        if (this.state.isLoading) {
            return false;
        }
        this.setState({
            pageNum: pageNum
        }, () => {
            this.getData()
        })
    }

    render() {
        let list = this.state.isLoading
            ?
            <tr>
                <td colSpan={5} className="text-center">正在加载数据...</td>
            </tr>
            : (
                this.state.list.length > 0 ?
                    this.state.list.map((user, index) => {
                        return (<tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{dateFormat(user.createTime)}</td>
                        </tr>)
                    })
                    : <tr>
                        <td colSpan={5} className="text-center">暂无数据</td>
                    </tr>);
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表"/>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped table-disabled">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>用户名</th>
                                <th>邮箱</th>
                                <th>电话</th>
                                <th>注册时间</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                list
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination current={this.state.pageNum} total={this.state.total}
                            onChange={(pageNum) => this.onChangePageNum(pageNum)}/>
            </div>
        );
    }
}

export default Index;