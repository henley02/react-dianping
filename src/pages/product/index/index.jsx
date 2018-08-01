import React from 'react';
import PageTitle from 'component/page-title/page-title';
import {Link} from 'react-router-dom';
import {FetchProductList, ChangeProductStatus} from 'api/index';

import Pagination from 'component/pagination/pagination';
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
        let res = await FetchProductList({pageNum: this.state.pageNum});
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

    async onSetProductStatus(e, product) {
        let newStatus = product.status == 1 ? 2 : 1,
            confirmTops = product.status == 1 ? '确认要下架该商品？' : '确认要上架该商品？';
        if (window.confirm(confirmTops)) {
            let res = await ChangeProductStatus({productId: product.id, status: newStatus});
            if (res.code === 0) {
                this.getData();
            } else {

            }
        }

    }

    render() {
        let tableHeaders = [
            {name: '商品ID', width: '10%'},
            {name: '商品信息', width: '50%'},
            {name: '价格', width: '10%'},
            {name: '状态', width: '15%'},
            {name: '操作', width: '15%'},
        ]
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表"/>
                <TableList tableHeaders={tableHeaders}>
                    {
                        this.state.list.map((product, index) => {
                            return (<tr key={index}>
                                <td>{product.id}</td>
                                <td>
                                    <p>{product.name}</p>
                                    <p>{product.subtitle}</p>
                                </td>
                                <td>￥{product.price}</td>
                                <td>
                                    <span>{product.status == 1 ? '在售' : '已下架'}</span>
                                    <button
                                        onClick={(e) => this.onSetProductStatus(e, product)}>{product.status == 1 ? '下架' : '上架'}</button>
                                </td>
                                <td>
                                    <Link to={`/product/detail/${product.id}`}>查看详情</Link>
                                    &nbsp;&nbsp;
                                    <Link to={`/product/save/${product.id}`}>编辑</Link>
                                </td>
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