// @subject page
import './less';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button} from '../../skit_ui';
import ModSearchSheet from '../../module/search_sheet';
import { SubjectConfig } from '../../config';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

class UpCluePage extends Component {
    static defaultProps = {
    }
    constructor(props) {
        super(props);
        this.state = {
            curProject: ''
        };
    }
    componentWillMount() {
    }
    componentDidMount() {
        let curProject = window.LS.get('curProject');
        this.setState({
            curProject: curProject
        })
    }
    handleSelecctSubject(){
        this.props.dispatch(push('/home/up_clue'));
    }
    render() {
        return (
            <div>   
                <div className="curSubjectContainer">
                    <span className="textStyle">当前项目</span>
                    <span className="textStyle">{this.state.curProject}</span>
                    <Button icon="swap" style={{color: '#fff'}} type="primary"className="swapSbuject" onClick={() => { this.handleSelecctSubject(); }}>切换项目</Button>
                </div>
                <ModSearchSheet dataConfig={SubjectConfig} />
            </div>
        );
    }
}
export default connect()(UpCluePage);
UpCluePage.propTypes = {
    dispatch: PropTypes.object
};