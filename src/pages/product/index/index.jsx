import React from 'react';
import PageTitle from 'component/page-title/page-title';
import {Link} from 'react-router-dom';
import {FetchProductList, ChangeProductStatus, SearchProduct} from 'api/index';

import Pagination from 'component/pagination/pagination';
import TableList from 'component/table-list/table-list';
import SearchWrapper from './components/search-wrapper/search-wrapper';

import "./index.sass";

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
            alert(res.data);
            if (res.status === 0) {
                this.getData();
            } else {

            }
        }
    }

    async onSearch(type, keyword) {
        if (keyword === "") {
            this.setState({
                pageNum: 1
            }, () => {
                this.getData();
            })
        } else {
            let res = await SearchProduct({[type]: keyword});
            if (res.status === 0) {
                this.setState(res.data)
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
                <PageTitle title="用户列表">
                    <div className="page-header-right">
                        <Link to={`/product/save`} className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加商品</span>
                        </Link>
                    </div>
                </PageTitle>
                <SearchWrapper
                    onSearch={(searchType, searchKeyword) => this.onSearch(searchType, searchKeyword)}></SearchWrapper>
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
                                    <p>{product.status == 1 ? '在售' : '已下架'}</p>
                                    <button
                                        className={"btn btn-xs " + ( product.status == 1 ? 'btn-primary' : 'btn-warning')}
                                        onClick={(e) => this.onSetProductStatus(e, product)}>{product.status == 1 ? '下架' : '上架'}</button>
                                </td>
                                <td>
                                    <Link className="opear" to={`/product/detail/${product.id}`}>详情</Link>
                                    <Link className="opear" to={`/product/save/${product.id}`}>编辑</Link>
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