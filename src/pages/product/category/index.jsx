import React from 'react';
import {Link} from 'react-router-dom';
import {FetchCategory, updateCategory} from 'api/index'

import PageTitle from 'component/page-title/page-title';
import TableList from 'component/table-list/table-list';

/**
 * 品类管理
 */
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            parentCategoryId: this.props.match.params.categoryId || 0,
        }
    }

    componentWillMount() {
        this.getData();
    }

    componentDidUpdate(prevProps, prevState) {
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId = this.props.match.params.categoryId || 0;
        if (oldPath !== newPath) {
            this.setState({
                parentCategoryId: newId || 0,
            }, () => {
                this.getData();
            })
        }
    }

    async getData() {
        let res = await FetchCategory({categoryId: this.state.parentCategoryId});
        if (res.status === 0) {
            this.setState({list: res.data})
        }
    }

    async onUpdateName(categoryId, categoryName) {
        let newName = window.prompt("请输入新的品类名称", categoryName);
        if (newName) {
            let res = await updateCategory({categoryId: categoryId, categoryName: newName});
            if (res.status === 0) {
                alert(res.msg);
                this.getData();
            } else {
                alert(res.msg);
            }
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="品类管理"/>
                <div className="row">
                    <div className="col-md-12">
                        <p>父品类ID：{this.state.parentCategoryId}</p>
                    </div>
                </div>
                <TableList tableHeaders={["商品ID", "商品名称", "操作"]}>
                    {
                        this.state.list.map((category, index) => {
                            return (<tr key={index}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>
                                    <a className="opear" onClick={(e) => this.onUpdateName(category.id, category.name)}>修改名称</a>
                                    {
                                        category.parentId === 0 ?
                                            <Link to={`/product-category/index/${category.id}`}>查看其子类</Link>
                                            :
                                            ""
                                    }
                                </td>
                            </tr>)
                        })
                    }
                </TableList>
            </div>
        );
    }
}

export default Index;