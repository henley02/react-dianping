import React from 'react';
import {FetchUserList} from 'api/index';
import {dateFormat} from 'public/js/util.js';

import Pagination from 'component/pagination/pagination';
import PageTitle from 'component/page-title/page-title';
import TableList from 'component/table-list/table-list';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            list: [],
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
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表"/>
                <TableList tableHeaders={["ID", "用户名", "邮箱", "电话", "注册时间"]}>
                    {
                        this.state.list.map((user, index) => {
                            return (<tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{dateFormat(user.createTime)}</td>
                            </tr>)
                        })
                    }
                </TableList>
                <Pagination current={this.state.pageNum} total={this.state.total}
                            onChange={(pageNum) => this.onChangePageNum(pageNum)}/>
            </div>
        );
    }
}

export default Index;