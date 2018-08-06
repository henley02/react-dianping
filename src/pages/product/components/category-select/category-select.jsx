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

    async loadFirstCategoryList() {
        let res = await FetchCategory({categoryId: 0});
        if (res.status === 0) {
            this.setState({
                firstCategoryList: res.data
            }, () => {
                console.log(this.state.firstCategoryList);
            })
        }
    }

    async loadSecondCategoryList(val) {
        let res = await FetchCategory({categoryId: val});
        if (res.status === 0) {
            this.setState({
                secondCategoryList: res.data
            }, () => {
                console.log(this.state.secondCategoryList);
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
                <select className="form-control category-select" name=""
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
                        <select className="form-control category-select " name=""
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