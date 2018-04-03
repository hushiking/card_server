// @star_form container
import './less';
import React, { Component, ProTypes } from 'react';
import { Form, Input, Tooltip, Icon, Select, Upload, Button, AutoComplete, Radio, Message } from '../../skit_ui';
// import moment from 'moment';
import PropTypes from 'prop-types';
const FormItem = Form.Item;
// const { TextArea } = Input;
const Option = Select.Option;
// const RadioGroup = Radio.Group;

// 更改拟态框状态
import { modalStatusAction, refrehTableAction } from '../../redux/actions';
import { connect } from 'react-redux';
import { fetchSelf, fetchGet, fetchRestful } from '../../redux/api/common';
import { USER_URL } from '../../redux/api/config';
// import token from '../utils/token';

class ConBadgeForm extends React.Component {
    static defaultProps = {
        
    }
    constructor(props) {
        super(props);
        this.state = {
            badgeSelect: [
                {
                    name: '登录',
                    id: '登录'
                },
                {
                    name: '评论点赞',
                    id: '评论点赞'
                },
                {
                    name: '卡片点赞',
                    id: '卡片点赞'
                },
                {
                    name: '发卡次数',
                    id: '发卡次数'
                },
                {
                    name: '刷卡',
                    id: '刷卡'
                },
                {
                    name: '评论',
                    id: '评论'
                },
                {
                    name: '求助',
                    id: '求助'
                },
                {
                    name: '展示',
                    id: '展示'
                },
                {
                    name: '资源',
                    id: '资源'
                },
                {
                    name: '技能',
                    id: '技能'
                }
            ],
            saveBtn: '新建',
            icon_url: '',
            fileList: []
        };
    }
    componentDidMount() {
        const formState = this.props.curStatus;
        if (formState === 'edit') {
            this.setState({
                saveBtn: '保存'
            });
            const curId = this.props.id;
            fetchSelf('GET', USER_URL + '/viewBadge/id/' + curId).then(res => {
                console.log(res);
                if (res.status === 1) {

                    let curEditObj = {};
                    curEditObj.name = res.data.name;
                    curEditObj.team = res.data.team;
                    // curEditObj.icon_url = res.data.icon_url;
                    curEditObj.type = res.data.type;
                    curEditObj.times = res.data.times;
                    curEditObj.personal = res.data.personal;
                    this.props.form.setFieldsValue(
                        curEditObj
                    );
                    this.setState({
                        icon_url: res.data.icon_url
                    })
                }
            });
        }
    }
    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    handleChange(info) {
        let fileList = info.fileList;
        // 1. Limit the number of uploaded files
        //    Only to show two recent uploaded files, and old ones will be replaced by the new
        console.log(info.file);
        if (info.file.status === 'uploading') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                icon_url: imageUrl
            }));
        }
        // 2. read from response and show file link
        // fileList = fileList.map((file) => {
        //     if (file.response) {
        //         // Component will show file.url as link
        //         file.url = file.response.url;
        //     }
        //     return file;
        // });

        // 3. filter successfully uploaded files according to response from server
        // fileList = fileList.filter((file) => {
        //     if (file.response) {
        //         if (file.response, status === 1) {
        //             Message.success('上传录音成功');

        //         } else {
        //             Message.error(file.response.errmsg || '上传录音失败');
        //         }
        //         // return file.response.status === 'success';
        //     }
        //     return true;
        // });
        this.setState({ fileList });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        // const formState = this.props.reducerModal.toJS().data.curForm;
        const formState = this.props.curStatus;
        this.props.form.validateFieldsAndScroll((err, values) => {
            values.icon_url = this.state.icon_url;
            if (!err) {
                let _url = '';
                let _method = '';
                switch (formState) {
                case 'edit':
                    const curId = this.props.id;
                    _url = USER_URL + '/editBadge/id/' + curId;
                    _method = 'POST';
                    break;
                case 'add':
                    _url = USER_URL + '/addBadge';
                    _method = 'POST';
                    break;
                default:
                    break;
                }
                fetchSelf(_method, _url, values, {}).then(res => {
                    if (res.status === 1) {
                        Message.success(res.errmsg);
                        dispatch(modalStatusAction({
                            status: false
                        }));
                        dispatch(refrehTableAction({ rodam: Math.random(0, 1) }));
                    } else {
                        Message.error(res.errmsg);
                    }
                });
            }
        });
    }
    render() {
        const props = {
            beforeUpload: (file) => {
                const type = file.type;
                const typeArr = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'];
                const isPic = typeArr.indexOf(type) !== -1;
                if (!isPic) {
                    Message.error('You can only upload JPG/PNG/GIF/BMP file!');
                }
                return isPic;
            },
            customRequest: () => { return false; },
            onChange: this.handleChange.bind(this),
            showUploadList: false,
            multiple: false,
            data: { id: this.props.id }
            // headers: {
            //     'x-access-token': token.getToken()
            // }
        };
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.icon_url ;
        // const reducerSelectList = this.props.reducerSelectList.data;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
                style: { textAlign: 'left' }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 }
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 4
                }
            }
        };
        return (
            <Form
                onSubmit={
                    (e) => {
                        this.handleSubmit(e);
                    }}
                style={formStyle} >
                <FormItem
                    {...formItemLayout}
                    label="徽章名">
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '请输入徽章名'
                        }]
                    })(
                        <Input placeholder="请输入徽章名" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="徽章类型">
                    {getFieldDecorator('type', {
                        rules: [{
                            required: true, message: '请选择徽章类型'
                        }]
                    })(
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="请选择徽章类型"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            {
                                this.state.badgeSelect.map((item, index) => {
                                    return (<Option value={item.id} key={item.name + index}>{item.name}</Option>)
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="获得次数">
                    {getFieldDecorator('times', {
                        rules: [{
                            required: true, message: '请填写获得次数'
                        }]
                    })(
                        <Input placeholder="请填写获得次数" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="徽章图片">
                    {getFieldDecorator('icon_url', {
                        rules: [{
                            required: true, message: '请上传徽章图片'
                        }]
                    })(
                        <Upload
                            {...props}
                            listType="picture-card"
                            className="avatar-uploader">
                            {imageUrl ? <img className="upload" src={imageUrl} alt="" /> : uploadButton}
                        </Upload>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="个人分数">
                    {getFieldDecorator('personal', {
                        rules: [{
                            required: true, message: '请填写个人分数'
                        }]
                    })(
                        <Input placeholder="请填写个人分数" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="团队分数">
                    {getFieldDecorator('team', {
                        rules: [{
                            required: true, message: '请填写团队分数'
                        }]
                    })(
                        <Input placeholder="请填写团队分数" />
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="info" htmlType="submit">{this.state.saveBtn}</Button>
                </FormItem>
            </Form>
        );
    }
}

const mapStateToProps = state => {
    return { reducerModal: state.getIn(['reducerModal']) };
};

// 创建联系
export default connect(mapStateToProps)(Form.create()(ConBadgeForm));
ConBadgeForm.propTypes = {
    dispatch: PropTypes.func,
    reducerModal: PropTypes.object,
    reducerSelectList: PropTypes.object,
    form: PropTypes.object,
    id: PropTypes.number,
    curStatus: PropTypes.string
    // status: PropTypes.bool,
    // modalTitle: PropTypes.string
};
const formStyle = {
    width: '620px',
    paddingLeft: '70px'
};
