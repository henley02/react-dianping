import React from 'react';
import FileUpload from 'public/js/FileUpload.jsx';

class FileUploader extends React.Component {
    render() {
        const options = {
            baseUrl: '/manage/product/upload.do',
            fileFieldName: 'upload-file',
            dataType: 'json',
            chooseAndUpload: true,
            uploadSuccess: (res) => {
                console.log(res);
            },
            uploadError: (error) => {
                console.log(error);
            }
        }
        return (
            <FileUpload options={options}>
                <button ref="chooseAndUpload">请选择图片</button>
            </FileUpload>
        );
    }
}

export default FileUploader;