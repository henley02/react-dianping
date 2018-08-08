import React from 'react';
import {saveProduct, getProduct} from 'api/index';

import PageTitle from 'component/page-title/page-title';
import CategorySelect from 'pages/product/components/category-select/category-select';

import "./../save/save.sass";

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.pid,
            name: '',
            subtitle: '',
            categoryId: 0,
            parentCategoryId: 0,
            subImages: [],
            price: '',
            stock: '',
            detail: '',
            status: 1,//商品状态：在售
        }
    }

    componentDidMount() {
        this.loadProduct();
    }

    async loadProduct() {
        //编辑
        if (this.state.id) {
            let res = await getProduct({productId: this.state.id});
            if (res.status === 0) {
                let images = res.data.subImages.split(",");
                res.data.subImages = images.map((imageUri) => {
                    return {
                        url: res.data.imageHost + imageUri,
                        uri: imageUri
                    }
                })
                this.setState(res.data)
            } else {
                alert(res.msg);
            }
        }
    }

    /**
     * 提交表单
     * @param e
     */
    async onSubmit(e) {
        let product = {
            name: this.state.name,
            subtitle: this.state.subtitle,
            categoryId: parseInt(this.state.categoryId),
            parentCategoryId: parseInt(this.state.parentCategoryId),
            subImages: this.getSubImagesString(),
            price: parseFloat(this.state.price),
            stock: parseInt(this.state.stock),
            detail: this.state.detail,
            status: this.state.status,
        };
        let result = this.checkProduct(product);
        if (this.state.id) {
            product.id = this.state.id;
        }
        if (result.status) {
            let res = await saveProduct(product);
            if (res.status === 0) {
                this.props.history.push("/product/index");
            } else {
                alert(res.msg);
            }
        } else {
            alert(result.msg);
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="添加商品"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.subtitle}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelect
                            readOnly
                            parentCategoryId={this.state.parentCategoryId}
                            categoryId={this.state.categoryId}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" value={this.state.price} readOnly/>
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" value={this.state.stock} readOnly/>
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            {
                                this.state.subImages.length > 0
                                    ?
                                    this.state.subImages.map((item, index) => {
                                        return (
                                            <div className="img-con" key={index}>
                                                <img src={item.url}/>
                                            </div>
                                        )
                                    })
                                    :
                                    <div>暂无图片</div>
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10" dangerouslySetInnerHTML={{__html: this.state.detail}}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductDetail;