import React from 'react';
import PageTitle from 'component/page-title/page-title';
import {Link} from 'react-router-dom';
import Pagination from 'component/pagination/pagination';
import {FetchUserList} from 'api/index';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            list: [],
        }
    }

    componentWillMount() {
        this.getData();
    }

    async getData() {
        let res = await FetchUserList({pageNum: this.state.pageNum});
        if (res.status === 0) {
            this.setState(res.data)
        }
    }

    render() {
        let rowList = "";
        this.state.list.forEach((item, index) => {
            rowList += <tr>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.createTime}</td>
            </tr>
        })
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
                                rowList
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination current={11} total={200} onChange={(pageNum) => {
                    console.log(pageNum)
                }}/>
            </div>
        );
    }
}

export default Index;