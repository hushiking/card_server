// @subject_form container
import './less';
import React, { Component, ProTypes } from 'react';
import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, AutoComplete, Radio, Message, DatePicker, Cascader, Table, Divider, Popconfirm } from '../../skit_ui';
import moment from 'moment';
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const RadioGroup = Radio.Group;
import { PROVINCE_LIST, CITY_LIST, BRAND_LIST, MODEL_LIST, BUY_INFO, CLUE_ADD, CLUE_EDIT } from '../../redux/api/config';

// 更改拟态框状态
import { modalStatusAction, refrehTableAction } from '../../redux/actions';
import { connect } from 'react-redux';
import { fetchSelf, fetchGet, fetchRestful } from '../../redux/api/common';
// import { CONSUMER_URL, CONSUMER_ADD_URL } from '..../../redux/api/config';
// import token from '../utils/token';



class ConSubjectForm extends React.Component {
    static defaultProps = {
    }
    constructor(props) {
        super(props);
        this.state = {
            columns: [{
                title: '品牌',
                dataIndex: 'car_brand',
                key: 'car_brand',
                // render: text => <a href="#">{text}</a>,
                width: '20%'
            }, {
                title: '车型',
                dataIndex: 'car_model_name',
                key: 'car_model_name',
                width: '20%'
            }, {
                title: '级别',
                dataIndex: 'car_class',
                key: 'car_class',
                width: '20%'
            }, {
                title: '价格',
                dataIndex: 'price_range',
                key: 'price_range',
                width: '20%'
            }, {
                title: 'Action',
                key: 'action',
                width: '20%',
                render: (text, record, itemIndex) => (
                    <Popconfirm key={itemIndex} placement="topLeft" title='are you sure delete' onConfirm={() => {
                        this.confirm(record, itemIndex)
                    }} okText="Yes" cancelText="No">
                        <a href="#">Delete</a>
                    </Popconfirm>
                )
            }],
            provinceList: [],
            cityList: [],
            brandList: [],
            modelList: [],
            info: {
                budget: [],
                favor_level: [],
                contact_time: [],
                model_level: []
            },
            isEdit: true,
            intentionList: []
        };
    }
    componentDidMount() {
        // 获取公共数据
        let publicData = this.props.reducerSavePublic.toJS().data;
        this.setState({
            provinceList: publicData[PROVINCE_LIST],
            cityList: publicData[CITY_LIST],
            brandList: publicData[BRAND_LIST],
            modelList: publicData[MODEL_LIST]
        })
        fetchRestful('GET', BUY_INFO).then((res) => {
            if (res.status === 1) {
                this.setState({
                    info: res.data
                })
            }
        })
        // 根据状态 判断是否渲染表格
        let { status } = this.props;
        if (status === 'edit' || status === 'view') {
            let { curId } = this.props;
            fetchSelf('GET', CLUE_EDIT, { id: curId }).then((res) => {
                if (res.status === 1) {
                    let requestObj = res.data.info;
                    let aplayObj = {};
                    // 获取当前省份名字
                    let provinceList = this.state.provinceList;
                    let curentProvinceName = '';
                    provinceList.map((item) => {
                        if (item.id == requestObj.mem_buyprovince) {
                            curentProvinceName = item.name;
                        }
                    })
                    // 属性赋值
                    aplayObj.mem_favorlevel = requestObj.mem_favorlevel;
                    aplayObj.note = requestObj.note;
                    aplayObj.tags = requestObj.tags;
                    aplayObj.contact_time = requestObj.contact_time;
                    aplayObj.mem_name = requestObj.mem_name;
                    aplayObj.mem_gender = requestObj.mem_gender;
                    aplayObj.mem_originphone = requestObj.mem_originphone;
                    aplayObj.mem_fullphone = requestObj.mem_fullphone;
                    aplayObj.mem_nofullflag = requestObj.mem_nofullflag;
                    aplayObj.mem_buyprovince = curentProvinceName;
                    aplayObj.mem_buycity = requestObj.mem_buycityname;
                    aplayObj.mem_address = requestObj.mem_address;
                    aplayObj.mem_modelflag = requestObj.mem_modelflag;
                    aplayObj.mem_modellevel = requestObj.mem_modellevel;
                    aplayObj.mem_budget = requestObj.mem_budget;
                    aplayObj.mem_buytime = moment(this.handleFormatDateTime(requestObj.mem_buytime * 1000));
                    // let mem_buytime = this.handleFormatDateTime(requestObj.mem_buytime*1000);
                    // console.log(mem_buytime);
                    this.props.form.setFieldsValue(
                        aplayObj
                    );
                    this.setState({
                        intentionList: requestObj.mem_favormodel
                    })
                } else {
                    Message.error(res.errmsg || '请求失败');
                }
            })
        }
        if (status === 'view') {
            this.setState({
                isEdit: false
            })
        }



    }
    componentWillReceiveProps(nextprops) {
        // console.log(nextprops.toJS())
        // if (this.props.reducerSavePublic !== nextProps.reducerSavePublic){
        //     let reducerSavePublic = nextProps.reducerSavePublic.toJS().data;
        //     console.log(reducerSavePublic);
        //     // // 触发带参数的搜索
        //     // this.refreshPage(params);
        // }
    }
    handleFormatDateTime(inputTime) {
        let date = new Date(inputTime);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m;
    }
    confirm(record, itemIndex) {
        let { intentionList } = this.state;
        intentionList.splice(itemIndex, 1);
        this.setState({
            intentionList: intentionList
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch, status, router } = this.props;

        // const formState = this.props.reducerModal.curForm;
        // const curId = this.props.reducerModal.modalParams.id;
        this.props.form.validateFieldsAndScroll((err, values) => {
            // check 特殊处理
            if(!err){
                if (values.mem_nofullflag) {
                    values.mem_nofullflag = 1
                } else {
                    values.mem_nofullflag = 0
                }
    
                if (values.mem_modelflag) {
                    values.mem_modelflag = 1
                } else {
                    values.mem_modelflag = 0
                }
                if (values.mem_buytime) {
                    values.mem_buytime = moment(values.mem_buytime).format('YYYY-MM');
                    console.log(values.mem_buytime, 1111111)
                }
                values.mem_modellevel = values.mem_modellevel.join(',');
                values.mem_favormodel = this.state.intentionList;
                // 如果存在projectid 添加projectid
                if (router) {
                    let query = router.toJS().locationBeforeTransitions.query;
                    values.projectid = query.projectid;
                }
                // 对象转化字符串
                if (values.mem_favormodel) {
                    values.mem_favormodel.map((item) => {
                        delete item['key'];
                    });
                    values.mem_favormodel = JSON.stringify(values.mem_favormodel);
                }
                let _url = '';
                switch (status) {
                    case 'add':
                        _url = CLUE_ADD;
                        console.log(values)
                        break;
                    case 'edit':
                        console.log(values);
                        let { curId } = this.props;
                        values.id = curId;
                        _url = CLUE_EDIT;
                        break;
                    default:
                        break;
                }
    
                fetchSelf('POST', _url, values).then((res) => {
                    console.log(res);
                    if (res.status === 1) {
                        dispatch(refrehTableAction());
                        dispatch(modalStatusAction({
                            status: false
    
                        }));
                        Message.success(res.errmsg || '请求成功');
                        // this.setState({
                        //     [key]: res.data
                        // })
                        // if(typeProperty){
                        //     this.props.form.setFieldsValue({[typeProperty]: res.data[0].name})
                        // }
                    } else {
                        Message.error(res.errmsg || '请求失败');
                    }
                })
            }
           
        });
    }
    // 二级联动的方法
    handleCombinedSearch(key, url, data, typeProperty) {
        let Form = this.props.form;
        fetchSelf('GET', url, data).then((res) => {
            console.log(res);
            if (res.status === 1) {
                this.setState({
                    [key]: res.data
                })
                if (typeProperty) {
                    this.props.form.setFieldsValue({ [typeProperty]: res.data[0].id + '_' + res.data[0].name })
                }
            }
        })
    }
    handleProvinceChange(value) {
        console.log(value);
        this.handleCombinedSearch('cityList', CITY_LIST, { province_code: value }, 'mem_buycity')
    }
    handleBrandChange(value) {
        console.log(value);
        this.handleCombinedSearch('modelList', MODEL_LIST, { brand: value });
        let { intentionList } = this.state;
        let saveObject = {
            key: Math.random(0, 1),
            car_brand: value,
            car_model_name: '',
            car_class: '',
            price_range: ''
        }
        intentionList.push(saveObject)
        this.setState({
            intentionList: intentionList
        })
    }
    handleNoEdit() {
        Message.warn('不可编辑');
    }
    handleModelChange(value) {
        let { modelList, intentionList } = this.state;
        let keyVal = intentionList.length;
        let curSelect;
        let saveObject = {
            key: Math.random(0, 1),
            car_brand: '',
            car_model_name: '',
            car_class: '',
            price_range: ''
        }
        modelList.map((item) => {
            if (item.model_id === value) {
                curSelect = item;
                return;
            }
        })
        // 进行判断 是否添加 级别
        if (intentionList[keyVal - 1] && intentionList[keyVal - 1].brand !== curSelect.car_brand) {
            // 进行赋值
            saveObject.car_brand = curSelect.brand;
            saveObject.car_model_name = curSelect.model;
            saveObject.car_class = curSelect.car_class;
            saveObject.price_range = curSelect.price_level;
            intentionList.push(saveObject);
        } else {
            saveObject.car_brand = curSelect.brand;
            saveObject.car_model_name = curSelect.model;
            saveObject.car_class = curSelect.car_class;
            saveObject.price_range = curSelect.price_level;
            if (keyVal) {
                intentionList[keyVal - 1] = saveObject
            } else {
                intentionList[keyVal] = saveObject
            }
        }
        // 重新渲染表格
        this.setState({
            intentionList: intentionList
        })
    }
    render() {
        let isEditView;
        let { isEdit } = this.state;
        console.log(isEdit);
        isEdit ? isEditView = <div /> : isEditView = <div onClick={this.handleNoEdit} style={noEdit} />;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
                style: { textAlign: 'left' }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 }
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
                    offset: 6
                }
            }
        };

        return (
            <Form onSubmit={this.handleSubmit} style={formStyle}>
                {isEditView}
                <FormItem
                    {...formItemLayout}
                    label="用户姓名">
                    {getFieldDecorator('mem_name', {
                        rules: [{
                            required: true, message: '请输入用户名'
                        }]
                    })(
                        <Input placeholder="请输入用户名" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="性别">
                    {getFieldDecorator('mem_gender', {
                        rules: [{
                            required: true
                        }],
                        initialValue: 1
                    })(
                        <RadioGroup>
                            <Radio value={1}>先生</Radio>
                            <Radio value={0}>女士</Radio>
                        </RadioGroup>
                        // <Input disabled={true} placeholder="id" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="原始号码">
                    {getFieldDecorator('mem_originphone', {
                        rules: [{
                            required: true, message: '请输入原始号码'
                        }]
                    })(
                        <Input placeholder="请输入原始号码" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="留资号码">
                    {getFieldDecorator('mem_fullphone', {
                    })(
                        <Input placeholder="请输入留资号码" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="未留手机号码">
                    {getFieldDecorator('mem_nofullflag', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="购车省份">
                    {getFieldDecorator('mem_buyprovince', {
                        rules: [{
                            required: true, message: '请选择省份'
                        }]
                    })(
                        <Select
                            style={{ width: '100%' }}
                            showSearch
                            placeholder="请选择"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={
                                this.handleProvinceChange.bind(this)
                            }
                        >
                            {
                                this.state.provinceList.map((item) => {
                                    return (<Option key={item.id} value={item.id}>{item.name}</Option>)
                                })
                            }
                        </Select>
                    )}

                </FormItem>
                <FormItem
                    label="购车城市"
                    {...formItemLayout}>
                    {getFieldDecorator('mem_buycity', {
                        rules: [{
                            required: true, message: '请选择城市'
                        }]
                    })(
                        <Select
                            style={{ width: '100%' }}
                            showSearch
                            placeholder="请选择"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            {
                                this.state.cityList.map((item) => {
                                    return (<Option key={item.name} value={item.id + '_' + item.name}>{item.name}</Option>)
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="地址">
                    {getFieldDecorator('mem_address', {
                    })(
                        <Input placeholder="请输入地址" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="是否考虑本品牌车型">
                    {getFieldDecorator('mem_modelflag', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="意向品牌车型">
                    <div>
                        <Select
                            style={{ width: '30%' }}
                            showSearch
                            placeholder="请选择"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={
                                this.handleBrandChange.bind(this)
                            }>
                            {
                                this.state.brandList.map((item) => {
                                    return (<Option key={item} value={item}>{item}</Option>)
                                })
                            }
                        </Select>
                        <Select
                            style={{ width: '30%', marginLeft: '15%' }}
                            showSearch
                            placeholder="请选择"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={
                                this.handleModelChange.bind(this)
                            }>
                            {
                                this.state.modelList.map((item) => {
                                    return (<Option key={item.model} value={item.model_id}>{item.model}</Option>)
                                })
                            }
                        </Select>
                        <Table pagination={false} style={{ marginTop: '15px' }} columns={this.state.columns} dataSource={this.state.intentionList} />
                    </div>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="车型级别">
                    {getFieldDecorator('mem_modellevel', {
                        rules: [{
                            required: true, message: '请选择购车级别'
                        }]
                    })(
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Please select">
                            {
                                this.state.info.model_level.map((item) => {
                                    return (<Option key={item} value={item}>{item}</Option>)
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="购车预算">
                    {getFieldDecorator('mem_budget', {
                        rules: [{
                            required: true, message: '请选择购车预算'
                        }]
                    })(
                        <RadioGroup>
                            {
                                this.state.info.budget.map((item) => {
                                    return (<Radio key={item} value={item}>{item}</Radio>)
                                })
                            }
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="预计购车时间">
                    {getFieldDecorator('mem_buytime', {
                    })(
                        <DatePicker
                            format={'YYYY-MM'}
                            placeholder="Select Time"
                            style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="联系时间">
                    {getFieldDecorator('contact_time', {
                    })(
                        <RadioGroup>
                            {
                                this.state.info.contact_time.map((item) => {
                                    return (<Radio key={item} value={item}>{item}</Radio>)
                                })
                            }
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="标签1">
                    {getFieldDecorator('tags', {
                    })(
                        <Input placeholder="请填写标签" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="备注">
                    {getFieldDecorator('note', {
                    })(
                        <TextArea style={{ resize: 'none' }} placeholder="请输入备注" rows={6} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="意向程度">
                    {getFieldDecorator('mem_favorlevel', {
                        rules: [{
                            required: true, message: '请选择意向程度'
                        }]
                    })(
                        <Select
                            style={{ width: '100%' }}
                            placeholder="意向程度" >
                            {
                                this.state.info.favor_level.map((item) => {
                                    return (<Option key={item} value={item}>{item}</Option>)
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="info" htmlType="submit">立即提交</Button>
                </FormItem>
            </Form>

        );
    }
}

const mapStateToProps = state => {
    return {
        router: state.getIn(['router']),
        reducerSavePublic: state.getIn(['reducerSavePublic'])
    };
};

// 创建联系
export default connect(mapStateToProps)(Form.create()(ConSubjectForm));

const noEdit = {
    width: '88%',
    height: '89%',
    position: 'absolute',
    zIndex: '100'
};
const formStyle = {
    width: "620px",
    paddingLeft: "70px"
}