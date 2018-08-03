import React from 'react';
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

    loadFirstCategoryList() {

    }

    render() {
        return (
            <div className="col-md-5">
                <select className="form-control category-select" name="">
                    <option value="">请选择一级分类</option>
                </select>
                <select className="form-control category-select " name="">
                    <option value="">请选择二级分类</option>
                </select>
            </div>
        );
    }
}

export default CategorySelect;