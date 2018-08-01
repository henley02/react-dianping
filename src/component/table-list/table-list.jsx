import React from 'react';

class TableList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirstLoading: true
        }
    }

    componentWillReceiveProps() {
        this.setState({
            isFirstLoading: false
        })
    }

    render() {
        let tableHeader = this.props.tableHeaders.map((item, index) => {
            if (typeof item === "object") {
                return <th key={index} width={item.width}>{item.name}</th>
            } else if (typeof item === "string") {
                return <th key={index}>{item}</th>
            }
        })

        let listBody = this.props.children;
        let listInfo = (
            <tr>
                <td colSpan={this.props.tableHeaders.length} className="text-center">
                    {this.state.isFirstLoading ? '正在加载数据...' : '没有获取到数据'}
                </td>
            </tr>
        );
        let tableBody = listBody.length > 0 ? listBody : listInfo;
        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-disabled">
                        <thead>
                        <tr>
                            {
                                tableHeader
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            tableBody
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TableList;