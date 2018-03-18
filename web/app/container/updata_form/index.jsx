// @updata_form container
import './less';
import { Icon, Button, Row, Col, Tabs, Divider, Modal, Message, Upload } from '../../skit_ui';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
const ButtonGroup = Button.Group;
import { UPLOAD_RADIO } from '../../redux/api/config';
import { fetchSelf } from '../../redux/api/common';
import token from '../../utils/token';
class UpdataForm extends Component {
    static defaultProps = {
    }
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            updataText: '上传文件',
            imgUrl: false
        }
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    handleUpLoadFile() {
        let { fileList } = this.state;
        let { curId } = this.props;
        if(fileList.length<=0){
            Message.error('请选择文件');
            return
        }
        fetchSelf('POST', UPLOAD_RADIO, {id: curId, file: fileList[0]}).then((res)=>{
            console.log(res);
        })
    }
    handleChange = (info) => {
        let fileList = info.fileList;
        this.setState({ updataText: '重新上传', imgUrl: true });
        // 1. Limit the number of uploaded files
        //    Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);

        // 2. read from response and show file link
        fileList = fileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        // 3. filter successfully uploaded files according to response from server
        fileList = fileList.filter((file) => {
            if (file.response) {
                if(file.response,status === 1){
                    Message.success('上传录音成功');
                   
                }else{
                    Message.error(file.response.errmsg || '上传录音失败');
                }
                // return file.response.status === 'success';
            }
            return true;
        });

        this.setState({ fileList });
    }
    render() {
        let { curId } = this.props;
        let { imgUrl } = this.state;
        const props = {
            // beforeUpload: () => { return false },
            action: '/api/call/clueUpload',
            onChange: this.handleChange,
            multiple: false,
            data: { id: curId },
            headers: {
                'x-access-token': token.getToken()
            }
        };
        let imgEle;
        imgUrl? imgEle = <img src='/container/updata_form/image/afresh.png' alt="" />: imgEle = <img src='/container/updata_form/image/updata.png' alt="" />
        
        return (
            <div className="updataContainer">
                <div className="buttonContainer">
                    {/* {imgEle} */}
                    <div className='bgImg' alt="" />
                    <ButtonGroup>
                        {/* <Button icon='upload' style={{ marginTop: 20 }} onClick={() => {
                            // this.handleUpLoadFile()
                        }} type="success">上传文件</Button> */}
                        <Upload {...props} fileList={this.state.fileList} style={{ marginRight: '88px' }}>
                            <Button icon='upload' style={{ marginTop: 20 }} onClick={() => {
                                // this.handleUpLoadFile()
                            }} type="success">{this.state.updataText}</Button>
                            {/* <Button icon='select' type="info">选择文件</Button> */}
                        </Upload>
                    </ButtonGroup>

                </div>

            </div>
        );
    }
}
export default UpdataForm;
UpdataForm.propTypes = {
    dispatch: PropTypes.object
};
const selectFile = {
    width: '120px',
    height: '40px',
    lineHeight: '40px',
    fontWeight: '400',
    marginBottom: '12px'
}