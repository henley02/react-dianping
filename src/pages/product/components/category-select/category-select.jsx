import React from 'react';

import {FetchCategory} from 'api/index';

import './category-select.sass';

class CategorySelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCategoryList: [],
            firstCategoryId: 0,
            secondCategoryList: [],
            secondCategoryId: 0,
        }
    }

    componentDidMount() {
        this.loadFirstCategoryList();
    }

    componentWillReceiveProps(nextProps) {
        let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
        if (!categoryIdChange && !parentCategoryIdChange) {
            return;
        }
        //如果只有一级品类
        if (nextProps.parentCategoryId === 0) {
            this.setState({
                firstCategoryId: nextProps.parentCategoryId,
                secondCategoryList: [],
                secondCategoryId: 0,
            })
        } else {
            this.setState({
                firstCategoryId: nextProps.parentCategoryId,
                secondCategoryId: nextProps.categoryId,
            }, () => this.loadSecondCategoryList(nextProps.categoryId))
        }
    }

    async loadFirstCategoryList() {
        let res = await FetchCategory({categoryId: 0});
        if (res.status === 0) {
            this.setState({
                firstCategoryList: res.data
            })
        }
    }

    async loadSecondCategoryList(val) {
        let res = await FetchCategory({categoryId: val});
        if (res.status === 0) {
            this.setState({
                secondCategoryList: res.data
            })
        }
    }

    async changeFirstCategoryId(e) {
        let val = e.target.value || 0;
        this.setState({
            firstCategoryId: val,
            secondCategoryList: [],
            secondCategoryId: 0,
        }, () => {
            this.onPropsCategoryChange();
        })
        if (val !== 0) {
            this.loadSecondCategoryList();
        }
    }

    changeSecondCategoryId(e) {
        let val = e.target.value || 0;
        this.setState({
            secondCategoryId: val
        }, () => {
            this.onPropsCategoryChange();
        })
    }

    onPropsCategoryChange() {
        let categoryChangable = typeof this.props.onCategoryChange === 'function';
        categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId, this.state.secondCategoryId);
    }

    render() {
        return (
            <div className="col-md-5">
                <select className="form-control category-select"
                        value={this.state.firstCategoryId}
                        onChange={(e) => this.changeFirstCategoryId(e)}>
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCategoryList.map((item, index) => {
                            return (<option value={item.id} key={index}>{item.name}</option>)
                        })
                    }
                </select>
                {
                    this.state.secondCategoryList.length > 0
                        ?
                        <select className="form-control category-select "
                                value={this.state.secondCategoryId}
                                onChange={(e) => this.changeSecondCategoryId(e)}>
                            <option value="">请选择二级分类</option>
                            {
                                this.state.secondCategoryList.map((item, index) => {
                                    return (<option value={item.id} key={index}>{item.name}</option>);
                                })
                            }
                        </select>
                        :
                        null
                }

            </div>
        );
    }
}

export default CategorySelect;