// @class_monitor page
import './less';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../skit_ui';
import ModSearchSheet from '../../module/search_sheet';
import { ClassManagerConfig } from '../../config';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { MONITOR_TABLE } from '../../redux/api/config';
import {Message} from '../../skit_ui';
import { fetchSelf } from '../../redux/api/common';
class ClassManagerPage extends Component {
    static defaultProps = {
    }
    constructor(props) {
        super(props);
        this.state = {
            clue_nums: {
                has_upload: 0,
                not_upload: 0,
                total: 0
            }
        };
    }
    componentWillMount() {
        fetchSelf('GET', MONITOR_TABLE).then(res => {
            if(res.status === 1){
                this.setState({
                    clue_nums: res.data && res.data.clue_nums,
                });
            }else{
                Message.error(errmsg || '请求失败');
            }
        });
    }
    componentDidMount() {
    }
    render() {
        let clueNums = this.state.clue_nums;
        let middleEle = <div className="classManager">总计上传线索 {clueNums.total} 条 已上传录音 {clueNums.not_upload} 条 未上传录音 {clueNums.has_upload} 条</div>
        return (
            <div>   
                <ModSearchSheet dataConfig={ClassManagerConfig} middleEle={middleEle}/>
            </div>
        );
    }
}
export default connect()(ClassManagerPage);
ClassManagerPage.propTypes = {
    dispatch: PropTypes.func
};