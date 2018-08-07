import React from 'react';
import {saveProduct, getProduct} from 'api/index';

import PageTitle from 'component/page-title/page-title';
import CategorySelect from 'pages/product/components/category-select/category-select';
import FileUploader from 'component/file-upload/file-upload';
import RichEditor from 'component/rich-editor/rich-editor.jsx';

import "./save.sass";

class save extends React.Component {
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
     * 品类选择器
     * @param firstCategoryId
     * @param secondCategoryId
     */
    onCategoryChange(firstCategoryId, secondCategoryId) {
        this.setState({
            categoryId: secondCategoryId,
            parentCategoryId: firstCategoryId
        })
    }

    /**
     * 图片上传成功
     * @param res
     */
    onUploadFileSuccess(res) {
        if (res.status === 0) {
            let oldValue = this.state.subImages;
            oldValue.push(res.data);
            this.setState({
                subImages: oldValue
            });
        } else {
            alert(res.msg);
        }
    }

    /**
     * 图片上传失败
     * @param error
     */
    onUploadFileError(error) {
        alert(error.message || '上传图片失败');
    }

    /**
     * 删除图片
     * @param e
     */
    onImageDelete(e) {
        let index = parseInt(e.target.getAttribute("index")), subImages = this.state.subImages;
        subImages.splice(index, 1);
        this.setState({
            subImages: subImages
        })
    }

    /**
     * 富文本编辑器的变化
     * @param value
     */
    onRichEditorChange(value) {
        this.setState({
            detail: value
        })
    }

    /**
     * 普通输入框值的变化
     * @param e
     */
    onChangeValue(e) {
        let input = e.target.value;
        let name = e.target.name;
        this.setState({
            [name]: input
        })
    }

    getSubImagesString() {
        return this.state.subImages.map(item => item.uri).join(",");
    }

    /**
     * 检查表单数据
     * @param product
     * @returns {{status: number, msg: string}}
     */
    checkProduct(product) {
        let res = {status: true, msg: '验证通过'}
        if (typeof product.name !== 'string' || product.name.trim() === '') {
            return {status: false, msg: '商品名称不能为空'}
        }
        if (typeof product.name !== 'string' || product.subtitle.trim() === '') {
            return {status: false, msg: '商品描述不能为空'}
        }
        if (typeof product.categoryId !== 'number' || product.categoryId === 0) {
            return {status: false, msg: '请选择商品品类'}
        }
        if (typeof product.price !== 'number' || !(product.price >= 0)) {
            return {status: false, msg: '请输入正确的商品价格'}
        }
        if (typeof product.stock !== 'number' || !(product.stock >= 0)) {
            return {status: false, msg: '请输入正确的库存数量'}
        }
        return res;
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
                            <input type="text" className="form-control" placeholder="请输入商品名称" name="name"
                                   value={this.state.name}
                                   onChange={(e) => this.onChangeValue(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" placeholder="请输入商品描述" name="subtitle"
                                   value={this.state.subtitle}
                                   onChange={(e) => this.onChangeValue(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelect
                            parentCategoryId={this.state.parentCategoryId}
                            categoryId={this.state.categoryId}
                            onCategoryChange={(firstCategoryId, secondCategoryId) => this.onCategoryChange(firstCategoryId, secondCategoryId)}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" placeholder="请输入商品价格" name="price"
                                       value={this.state.price}
                                       onChange={(e) => this.onChangeValue(e)}/>
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" placeholder="请输入商品库存" name="stock"
                                       value={this.state.stock}
                                       onChange={(e) => this.onChangeValue(e)}/>
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            {
                                this.state.subImages.map((item, index) => {
                                    return (
                                        <div className="img-con" key={index}>
                                            <img src={item.url}/>
                                            <i className="fa fa-close" index={index}
                                               onClick={(e) => this.onImageDelete(e)}></i>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="col-md-offset-2 col-md-10 file-upload-con">
                            <FileUploader onSuccess={(res) => this.onUploadFileSuccess(res)}
                                          onError={(res) => this.onUploadFileError(res)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                            <RichEditor detail={this.state.detail}
                                        onValueChange={(value) => this.onRichEditorChange(value)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>提交</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default save;