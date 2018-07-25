import React from 'react';

class Home extends React.Component {
    render() {
        return (
            <div id="page-wrapper">
                <button type="button" className="btn btn-default">（默认样式）Default</button>
                <button type="button" className="btn btn-primary">（首选项）Primary</button>
                <button type="button" className="btn btn-success">（成功）Success</button>
                <button type="button" className="btn btn-info">（一般信息）Info</button>
                <button type="button" className="btn btn-warning">（警告）Warning</button>
                <button type="button" className="btn btn-danger">（危险）Danger</button>
                <button type="button" className="btn btn-link">（链接）Link</button>
            </div>
        );
    }
}

export default Home;